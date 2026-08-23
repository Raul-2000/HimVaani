import React, { useState } from 'react';
import { HIMACHAL_GALLERY, GalleryItem } from '../data/himachalGallery';
import { ScriptMode } from '../types';
import { Image as ImageIcon, MapPin, Tag, ZoomIn } from 'lucide-react';

interface GallerySectionProps {
  scriptMode: ScriptMode;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  scriptMode
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const filteredItems = HIMACHAL_GALLERY.filter(item =>
    selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <section id="himachal-gallery-section" className="py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-season-badge-border text-season-accent text-xs font-bold uppercase tracking-widest shadow-xs">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>चित्र दीर्घा • High-Definition Visual Archive</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2c1d11] tracking-tight">
          {scriptMode === 'bilingual' ? (
            <span>हिमाचल दृश्य दीर्घा <span className="block text-xl sm:text-2xl font-sans font-normal text-season-accent mt-1">Himalayan Heritage Gallery</span></span>
          ) : (
            <span>Himalayan Heritage Gallery</span>
          )}
        </h2>
        <p className="text-sm sm:text-base text-[#5c4a3b] leading-relaxed">
          Explore high-resolution visual archives of Kath-Kuni timber castles, sacred high-altitude lakes, ancient Takri copper plates, and vibrant living traditions.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {[
          { id: 'all', label: 'All Archives (समस्त चित्र)' },
          { id: 'landscape', label: '🏔️ Landscapes & Peaks' },
          { id: 'architecture', label: '🏛️ Kath-Kuni & Shrines' },
          { id: 'crafts', label: '🎨 GI Crafts & Art' },
          { id: 'festivals', label: '🥁 Fairs & Celebrations' },
          { id: 'manuscripts', label: '📜 Takri Manuscripts' },
          { id: 'culture', label: '🧣 Attire & Nomadic Lore' },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedCategory(filter.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer backdrop-blur-md ${
              selectedCategory === filter.id
                ? 'bg-season-accent text-white font-bold shadow-md'
                : 'bg-white/60 text-[#5c4a3b] hover:bg-white/90 border border-[#e5d8c7]/80'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveImage(item)}
            className="group relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border border-[#e5d8c7]/80 shadow-sm hover:shadow-xl hover:border-season-accent transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-64 overflow-hidden bg-[#f4ebe1]">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/90 font-bold text-[#2c1d11] shadow-xs">
                  {item.category}
                </span>
              </div>

              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                <div className="flex items-center gap-1 text-[10px] text-white/80">
                  <MapPin className="w-3 h-3 text-season-accent" />
                  <span>{item.location}</span>
                </div>
                <h4 className="text-base font-serif font-bold text-white leading-snug">
                  {item.title}
                </h4>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <p className="text-xs text-[#5c4a3b] line-clamp-2">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {item.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-white/60 text-[#7a695a] border border-[#e5d8c7]/50">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="max-w-4xl w-full bg-[#1b120c] rounded-3xl overflow-hidden border border-white/20 shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[70vh] overflow-hidden">
              <img
                src={activeImage.imageUrl}
                alt={activeImage.title}
                className="w-full h-full object-contain max-h-[70vh] mx-auto"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-2 bg-[#2c1d11]">
              <div className="flex items-center gap-2 text-xs text-season-accent font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeImage.location}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {activeImage.title} ({activeImage.titleHindi})
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {activeImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
