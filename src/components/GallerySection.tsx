import React, { useState, useRef } from 'react';
import { HIMACHAL_GALLERY, GalleryItem } from '../data/himachalGallery';
import { ScriptMode } from '../types';
import {
  Image as ImageIcon,
  MapPin,
  Tag,
  ZoomIn,
  Upload,
  Trash2,
  X,
  Sparkles,
  Share2,
  Volume2,
  FileImage,
  Link as LinkIcon,
  AlertCircle,
  CheckCircle2,
  Search,
  User,
  Info,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { universalConvert } from '../utils/takriTransliterator';
import { speakPhonetic } from '../utils/audioAmbience';

interface GallerySectionProps {
  scriptMode: ScriptMode;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ scriptMode }) => {
  const [items, setItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('himvaani_custom_gallery');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...parsed, ...HIMACHAL_GALLERY];
      } catch (e) {
        console.error('Failed to parse saved gallery items', e);
      }
    }
    return HIMACHAL_GALLERY;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);

  const galleryFilterRef = useRef<HTMLDivElement | null>(null);

  const scrollGalleryFilters = (direction: 'left' | 'right') => {
    if (galleryFilterRef.current) {
      galleryFilterRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      });
    }
  };

  // Upload Form State
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [imageFilePreview, setImageFilePreview] = useState<string>('');
  const [imageUrlInput, setImageUrlInput] = useState<string>('');
  const [titleEng, setTitleEng] = useState('');
  const [titleHindi, setTitleHindi] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [categoryInput, setCategoryInput] = useState<GalleryItem['category']>('landscape');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [contributorName, setContributorName] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Auto Hindi generation on title change
  const handleTitleChange = (val: string) => {
    setTitleEng(val);
    if (!titleHindi || titleHindi === universalConvert(titleEng).devanagari) {
      const conv = universalConvert(val);
      setTitleHindi(conv.devanagari);
    }
  };

  // File Upload Handlers (Drag & Drop + Click)
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setFormErrors((prev) => ({ ...prev, image: 'Please select a valid image file (PNG, JPG, WEBP).' }));
      return;
    }
    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      setFormErrors((prev) => ({ ...prev, image: 'Image size should be under 5MB.' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageFilePreview(reader.result as string);
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next.image;
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  // Form Submit Handler with Compulsory Validation
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    const finalImage = uploadMode === 'file' ? imageFilePreview : imageUrlInput.trim();

    if (!finalImage) {
      errors.image = 'Compulsory: Please upload a photo or provide an image URL.';
    }
    if (!titleEng.trim()) {
      errors.title = 'Compulsory: Title / Name of the place is required.';
    }
    if (!locationInput.trim()) {
      errors.location = 'Compulsory: Location (District, Valley or Town) is required.';
    }
    if (!descriptionInput.trim() || descriptionInput.trim().length < 15) {
      errors.description =
        'Compulsory: Please write detailed information (at least 15 characters) about the history, significance, or lore of this place.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Prepare tags
    const cleanTags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);
    if (cleanTags.length === 0) {
      cleanTags.push(categoryInput, locationInput.split(',')[0].trim());
    }

    const newItem: GalleryItem = {
      id: `gallery-user-${Date.now()}`,
      title: titleEng.trim(),
      titleHindi: titleHindi.trim() || universalConvert(titleEng).devanagari || titleEng.trim(),
      category: categoryInput,
      location: locationInput.trim(),
      imageUrl: finalImage,
      description: descriptionInput.trim(),
      tags: cleanTags,
      isUserAdded: true,
      uploadedAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      contributorName: contributorName.trim() || 'Himalayan Explorer',
    };

    const updated = [newItem, ...items];
    setItems(updated);

    // Save only user added items in localStorage
    const userOnly = updated.filter((it) => it.isUserAdded);
    localStorage.setItem('himvaani_custom_gallery', JSON.stringify(userOnly));

    // Reset Form
    setImageFilePreview('');
    setImageUrlInput('');
    setTitleEng('');
    setTitleHindi('');
    setLocationInput('');
    setDescriptionInput('');
    setTagsInput('');
    setContributorName('');
    setFormErrors({});
    setShowUploadModal(false);
    showToast('Photo and written information uploaded to the gallery successfully!');
  };

  // Delete Handler
  const confirmDelete = () => {
    if (!itemToDelete) return;
    const filtered = items.filter((it) => it.id !== itemToDelete.id);
    setItems(filtered);

    const userOnly = filtered.filter((it) => it.isUserAdded);
    localStorage.setItem('himvaani_custom_gallery', JSON.stringify(userOnly));

    if (activeImage && activeImage.id === itemToDelete.id) {
      setActiveImage(null);
    }
    setItemToDelete(null);
    showToast('Photo and its record were removed from the gallery.');
  };

  // Share Handler
  const handleShare = (item: GalleryItem) => {
    const text = `${item.title} (${item.titleHindi}) - ${item.location} • ${item.description}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  // Filter Items
  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'user' && !item.isUserAdded) {
      return false;
    }
    if (selectedCategory !== 'all' && selectedCategory !== 'user' && item.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        item.title.toLowerCase().includes(q) ||
        item.titleHindi.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const userItemsCount = items.filter((it) => it.isUserAdded).length;

  return (
    <section id="himachal-gallery-section" className="py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#2c1d11] text-white px-5 py-3 rounded-2xl shadow-2xl border border-season-badge-border flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-season-badge-border text-season-accent text-xs font-bold uppercase tracking-widest shadow-xs">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>चित्र दीर्घा • High-Definition Visual Archive</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2c1d11] tracking-tight">
          {scriptMode === 'bilingual' ? (
            <span>
              हिमाचल दृश्य दीर्घा{' '}
              <span className="block text-xl sm:text-2xl font-sans font-normal text-season-accent mt-1">
                Himalayan Heritage Gallery & Community Photos
              </span>
            </span>
          ) : (
            <span>Himalayan Heritage Gallery</span>
          )}
        </h2>
        <p className="text-sm sm:text-base text-[#5c4a3b] leading-relaxed">
          Explore high-resolution visual archives of Kath-Kuni timber castles, sacred high-altitude lakes, and living traditions. If you have photographs of Himalayan places, upload them with compulsory historical lore and information!
        </p>

        {/* Action Button: Upload Photo */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            id="open-upload-gallery-btn"
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-3 rounded-full bg-season-accent hover:opacity-90 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 hover:scale-103"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Place Photo & Lore • चित्र अपलोड करें</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/75 backdrop-blur-xl p-3.5 rounded-2xl border border-[#e5d8c7]/90 shadow-xs">
          {/* Filter Tabs with Scroll Controls */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-hidden">
            <button
              onClick={() => scrollGalleryFilters('left')}
              className="p-1.5 rounded-full bg-white/90 hover:bg-white text-season-accent border border-season-badge-border shadow-2xs transition-all cursor-pointer shrink-0 hover:scale-105"
              title="Scroll Left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div
              ref={galleryFilterRef}
              className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none flex-nowrap scroll-smooth"
            >
              {[
                { id: 'all', label: 'All Archives (समस्त)' },
                { id: 'user', label: `🌟 Community Uploads (${userItemsCount})` },
                { id: 'landscape', label: '🏔️ Landscapes & Peaks' },
                { id: 'architecture', label: '🏛️ Kath-Kuni & Shrines' },
                { id: 'crafts', label: '🎨 GI Crafts' },
                { id: 'festivals', label: '🥁 Fairs & Festivals' },
                { id: 'manuscripts', label: '📜 Takri Manuscripts' },
                { id: 'culture', label: '🧣 Attire & Lore' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  id={`filter-gallery-${filter.id}`}
                  onClick={() => setSelectedCategory(filter.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer backdrop-blur-md shrink-0 ${
                    selectedCategory === filter.id
                      ? 'bg-season-accent text-white font-bold shadow-md scale-102'
                      : 'bg-white/70 text-[#5c4a3b] hover:bg-white border border-[#e5d8c7]'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollGalleryFilters('right')}
              className="p-1.5 rounded-full bg-white/90 hover:bg-white text-season-accent border border-season-badge-border shadow-2xs transition-all cursor-pointer shrink-0 hover:scale-105"
              title="Scroll Right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 text-[#7a695a] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places, lore, tags..."
              className="w-full bg-white border border-[#d5be9d] rounded-full pl-9 pr-3 py-1.5 text-xs text-[#2c1d11] placeholder-[#a89988] focus:outline-none focus:border-season-accent"
            />
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            id={`gallery-card-${item.id}`}
            className="group relative rounded-[28px] overflow-hidden bg-white/80 backdrop-blur-xl border border-[#e5d8c7]/90 shadow-sm hover:shadow-xl hover:border-season-accent transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Thumbnail Container */}
            <div
              className="relative h-64 overflow-hidden bg-[#f4ebe1] cursor-pointer"
              onClick={() => setActiveImage(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Category & User Badge */}
              <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/95 font-bold text-[#2c1d11] shadow-xs">
                  {item.category}
                </span>
                {item.isUserAdded && (
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-season-badge-bg font-bold text-season-accent border border-season-badge-border shadow-xs flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    Community
                  </span>
                )}
              </div>

              {/* Quick Actions (Zoom & Delete) */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage(item);
                  }}
                  className="p-1.5 rounded-full bg-black/50 hover:bg-black text-white backdrop-blur-md transition-all cursor-pointer"
                  title="View High Resolution"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                {/* Delete Button */}
                <button
                  id={`delete-btn-${item.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setItemToDelete(item);
                  }}
                  className="p-1.5 rounded-full bg-rose-600/80 hover:bg-rose-700 text-white backdrop-blur-md transition-all cursor-pointer shadow-xs"
                  title="Delete this photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Overlay Title */}
              <div className="absolute bottom-3 left-4 right-4 text-white space-y-1">
                <div className="flex items-center gap-1 text-[11px] text-[#f4d19b] font-medium">
                  <MapPin className="w-3 h-3 text-season-accent shrink-0" />
                  <span className="line-clamp-1">{item.location}</span>
                </div>
                <h4 className="text-base font-serif font-bold text-white leading-snug line-clamp-1">
                  {item.title}
                </h4>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between bg-white/70">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-serif font-bold text-season-accent line-clamp-1">
                    {item.titleHindi}
                  </span>
                  <button
                    onClick={() => speakPhonetic(item.titleHindi || item.title)}
                    className="p-1 rounded-full text-[#8a7b6e] hover:text-season-accent hover:bg-[#faf6f0] transition-colors cursor-pointer shrink-0"
                    title="Pronounce Name"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-[#5c4a3b] leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#e5d8c7] text-[#7a695a]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer with Details CTA and Contributor info */}
              <div className="pt-3 border-t border-[#f0e6da] flex items-center justify-between gap-2 text-[11px] text-[#7a695a]">
                <span>
                  {item.contributorName ? `By ${item.contributorName}` : 'Himachal Heritage Record'}
                </span>

                <button
                  onClick={() => setActiveImage(item)}
                  className="px-3 py-1 rounded-full bg-season-accent/10 hover:bg-season-accent hover:text-white text-season-accent font-bold text-xs transition-all cursor-pointer"
                >
                  Read Lore →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="p-12 text-center bg-white/80 rounded-3xl border-2 border-dashed border-[#d5be9d] space-y-4 max-w-lg mx-auto">
          <ImageIcon className="w-10 h-10 text-season-accent mx-auto" />
          <h4 className="font-serif font-bold text-base text-[#2c1d11]">No Gallery Photos Found</h4>
          <p className="text-xs text-[#7a695a]">
            Be the first to upload a photograph of this place with its rich written history!
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-5 py-2.5 rounded-full bg-season-accent text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            Upload Photo Now
          </button>
        </div>
      )}

      {/* ================= MODAL: UPLOAD PHOTO & COMPULSORY INFORMATION ================= */}
      {showUploadModal && (
        <div
          id="upload-gallery-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto"
          onClick={() => setShowUploadModal(false)}
        >
          <div
            className="relative w-full max-w-2xl rounded-[32px] bg-[#fdfcf9] border-2 border-season-accent shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto text-[#2c1d11]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#e5d8c7]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-season-accent rounded-full animate-pulse" />
                <h3 className="text-lg font-serif font-bold text-[#2c1d11]">
                  Upload Place Photo & Heritage Lore (चित्र व विस्तृत जानकारी)
                </h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1.5 rounded-full hover:bg-[#faf6f0] text-[#7a695a] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUploadSubmit} className="space-y-5">
              {/* Photo Input Mode Tabs */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider text-[#5c4a3b] font-bold">
                  1. Place Photograph (फोटो अपलोड करें) <span className="text-rose-500">* (Compulsory)</span>
                </label>

                <div className="flex items-center gap-2 pb-1">
                  <button
                    type="button"
                    onClick={() => setUploadMode('file')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                      uploadMode === 'file'
                        ? 'bg-season-accent text-white border-season-accent font-bold'
                        : 'bg-white text-[#5c4a3b] border-[#e5d8c7]'
                    }`}
                  >
                    <FileImage className="w-3.5 h-3.5" />
                    <span>Upload from Device (Drag & Drop)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMode('url')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                      uploadMode === 'url'
                        ? 'bg-season-accent text-white border-season-accent font-bold'
                        : 'bg-white text-[#5c4a3b] border-[#e5d8c7]'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Image Web URL</span>
                  </button>
                </div>

                {uploadMode === 'file' ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-season-accent bg-season-badge-bg/50 scale-101'
                        : 'border-[#d5be9d] hover:border-season-accent bg-white/80'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />

                    {imageFilePreview ? (
                      <div className="space-y-2">
                        <img
                          src={imageFilePreview}
                          alt="Preview"
                          className="w-full max-h-48 object-cover rounded-xl mx-auto shadow-sm"
                        />
                        <p className="text-xs text-season-accent font-bold">✓ Click or drag another image to replace</p>
                      </div>
                    ) : (
                      <div className="space-y-2 py-4">
                        <Upload className="w-8 h-8 text-season-accent mx-auto" />
                        <div className="text-xs font-semibold text-[#2c1d11]">
                          Click to browse or drag & drop photograph here
                        </div>
                        <div className="text-[11px] text-[#7a695a]">Supports JPG, PNG, WEBP (up to 5MB)</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      placeholder="https://images.unsplash.com/... or any public image URL"
                      className="w-full bg-white border border-[#d5be9d] rounded-xl px-3.5 py-2.5 text-xs text-[#2c1d11] focus:outline-none focus:border-season-accent"
                    />
                    {imageUrlInput && (
                      <img
                        src={imageUrlInput}
                        alt="Preview"
                        className="w-full max-h-40 object-cover rounded-xl shadow-xs"
                      />
                    )}
                  </div>
                )}

                {formErrors.image && (
                  <p className="text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{formErrors.image}</span>
                  </p>
                )}
              </div>

              {/* Title & Hindi Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-[#5c4a3b] font-bold">
                    Place / Heritage Title (English) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={titleEng}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Ancient Temple of Devi Kothi"
                    className="w-full bg-white border border-[#d5be9d] rounded-xl px-3 py-2 text-xs text-[#2c1d11] focus:outline-none focus:border-season-accent"
                  />
                  {formErrors.title && (
                    <p className="text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{formErrors.title}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-[#5c4a3b] font-bold">
                    Title in Hindi (नाम हिंदी में):
                  </label>
                  <input
                    type="text"
                    value={titleHindi}
                    onChange={(e) => setTitleHindi(e.target.value)}
                    placeholder="e.g. देवी कोठी का प्राचीन मंदिर"
                    className="w-full bg-white border border-[#d5be9d] rounded-xl px-3 py-2 text-xs text-[#2c1d11] focus:outline-none focus:border-season-accent"
                  />
                </div>
              </div>

              {/* Location & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-[#5c4a3b] font-bold">
                    Location / Valley / District <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    placeholder="e.g. Churah Valley, Chamba"
                    className="w-full bg-white border border-[#d5be9d] rounded-xl px-3 py-2 text-xs text-[#2c1d11] focus:outline-none focus:border-season-accent"
                  />
                  {formErrors.location && (
                    <p className="text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{formErrors.location}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-[#5c4a3b] font-bold">
                    Heritage Category (श्रेणी) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value as GalleryItem['category'])}
                    className="w-full bg-white border border-[#d5be9d] rounded-xl px-3 py-2 text-xs text-[#2c1d11] focus:outline-none focus:border-season-accent"
                  >
                    <option value="landscape">🏔️ Landscapes & Peaks</option>
                    <option value="architecture">🏛️ Kath-Kuni & Temple Architecture</option>
                    <option value="crafts">🎨 GI Crafts & Traditional Art</option>
                    <option value="festivals">🥁 Fairs & Devta Celebrations</option>
                    <option value="manuscripts">📜 Takri Manuscripts & Inscriptions</option>
                    <option value="culture">🧣 Traditional Attire & Folk Lore</option>
                  </select>
                </div>
              </div>

              {/* Compulsory Written Information / Lore */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs uppercase tracking-wider text-[#5c4a3b] font-bold">
                    Written Information & Lore about this Place <span className="text-rose-500">* (Compulsory)</span>
                  </label>
                  <span className="text-[11px] text-[#7a695a]">Min 15 characters</span>
                </div>
                <textarea
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                  rows={4}
                  placeholder="Compulsory: Share the history, folklore, spiritual significance, architectural style, altitude, or local oral stories about this place..."
                  className="w-full bg-white border border-[#d5be9d] rounded-xl p-3 text-xs text-[#2c1d11] focus:outline-none focus:border-season-accent"
                />
                {formErrors.description ? (
                  <p className="text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{formErrors.description}</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-[#7a695a] flex items-center gap-1">
                    <Info className="w-3 h-3 text-season-accent" />
                    <span>Detailed context helps preserve indigenous memory for researchers and travelers.</span>
                  </p>
                )}
              </div>

              {/* Tags & Contributor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-[#5c4a3b] font-bold">
                    Tags (Comma separated):
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="e.g. Temple, Chamba, Woodcraft, Sacred"
                    className="w-full bg-white border border-[#d5be9d] rounded-xl px-3 py-2 text-xs text-[#2c1d11] focus:outline-none focus:border-season-accent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-[#5c4a3b] font-bold">
                    Your Name / Contributor:
                  </label>
                  <input
                    type="text"
                    value={contributorName}
                    onChange={(e) => setContributorName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-white border border-[#d5be9d] rounded-xl px-3 py-2 text-xs text-[#2c1d11] focus:outline-none focus:border-season-accent"
                  />
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-[#e5d8c7] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-full text-xs uppercase tracking-wider text-[#7a695a] font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-season-accent hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Post to Gallery (प्रकाशित करें)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: DELETE CONFIRMATION ================= */}
      {itemToDelete && (
        <div
          id="delete-confirm-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setItemToDelete(null)}
        >
          <div
            className="w-full max-w-md bg-[#fdfcf9] rounded-[28px] border-2 border-rose-400 p-6 space-y-4 shadow-2xl text-[#2c1d11]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2 rounded-full bg-rose-100">
                <Trash2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif font-bold">Delete Gallery Photo & Record?</h4>
            </div>

            <p className="text-xs text-[#5c4a3b] leading-relaxed">
              Are you sure you want to delete <strong>"{itemToDelete.title}"</strong> ({itemToDelete.location})? This will remove the photo and its written information from the gallery archive.
            </p>

            <div className="pt-3 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-[#7a695a] hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="confirm-delete-button"
                onClick={confirmDelete}
                className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: HIGH-RESOLUTION LIGHTBOX DOSSIER ================= */}
      {activeImage && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="max-w-4xl w-full bg-[#1b120c] rounded-[32px] overflow-hidden border border-white/20 shadow-2xl text-white my-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Full Image Preview */}
            <div className="relative max-h-[62vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeImage.imageUrl}
                alt={activeImage.title}
                className="w-full h-full object-contain max-h-[62vh] mx-auto"
                referrerPolicy="no-referrer"
              />

              {/* Action Buttons on top right */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => handleShare(activeImage)}
                  className="w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer shadow-md transition-all"
                  title="Share details"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setItemToDelete(activeImage)}
                  className="w-9 h-9 rounded-full bg-rose-600/80 hover:bg-rose-700 text-white flex items-center justify-center cursor-pointer shadow-md transition-all"
                  title="Delete photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveImage(null)}
                  className="w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer text-base font-bold shadow-md transition-all"
                >
                  ✕
                </button>
              </div>
            </div>

            {copiedShare && (
              <div className="p-2 bg-emerald-600 text-white text-xs text-center font-semibold">
                ✓ Place details copied to clipboard!
              </div>
            )}

            {/* Written Information Dossier */}
            <div className="p-6 sm:p-8 space-y-4 bg-[#2c1d11]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-season-accent font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>{activeImage.location}</span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-white/90">
                    {activeImage.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speakPhonetic(activeImage.titleHindi || activeImage.title)}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-season-accent cursor-pointer flex items-center gap-1 text-xs"
                    title="Pronounce"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Pronounce</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                  {activeImage.title}
                </h3>
                <h4 className="text-base sm:text-lg font-serif text-[#f4d19b] pt-0.5">
                  {activeImage.titleHindi}
                </h4>
              </div>

              {/* Written Information */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <span className="text-[11px] uppercase tracking-wider text-season-accent font-bold block">
                  Place Lore & History:
                </span>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                  {activeImage.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10 text-xs text-white/60">
                <div className="flex flex-wrap gap-1.5">
                  {activeImage.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white/10 text-white/80">
                      #{t}
                    </span>
                  ))}
                </div>

                {activeImage.contributorName && (
                  <span className="flex items-center gap-1 text-season-accent">
                    <User className="w-3.5 h-3.5" />
                    Contributed by {activeImage.contributorName}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
