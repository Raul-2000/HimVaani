import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Feather,
  Heart,
  Share2,
  Send,
  Sparkles,
  Search,
  Trash2,
  AlertCircle,
  MapPin,
  Tag,
  PlusCircle,
} from 'lucide-react';
import { CommunityPost, CommunityComment } from '../types';
import { INITIAL_COMMUNITY_POSTS } from '../data/communityData';

interface CommunitySectionProps {
  initialOpenComposer?: boolean;
  scriptMode?: any;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  initialOpenComposer = false,
}) => {
  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('himachal_community_posts_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved community posts', e);
      }
    }
    return INITIAL_COMMUNITY_POSTS;
  });

  const [activeTag, setActiveTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showComposer, setShowComposer] = useState(initialOpenComposer);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  // New Post Form State
  const [authorName, setAuthorName] = useState('');
  const [authorLocation, setAuthorLocation] = useState('Chamba, HP');
  const [titleEng, setTitleEng] = useState('');
  const [titleHindi, setTitleHindi] = useState('');
  const [contentEng, setContentEng] = useState('');
  const [contentHindi, setContentHindi] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'practice' | 'poetry' | 'folklore' | 'manuscript' | 'general'>('folklore');

  // Comment Form State for specific post
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('himachal_community_posts_v2', JSON.stringify(posts));
  }, [posts]);

  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    setPostToDelete(null);
  };

  const handleDeleteComment = (postId: string, commentId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: p.comments.filter((c) => c.id !== commentId),
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentEng.trim() && !contentHindi.trim()) return;

    const finalTitleEng = titleEng.trim() || titleHindi.trim() || 'Cultural Note';
    const finalTitleHindi = titleHindi.trim() || titleEng.trim() || 'सांस्कृतिक टिप्पणी';

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: authorName.trim() || 'Himachal Explorer',
      authorLocation: authorLocation.trim() || 'Himachal Pradesh',
      avatarSeed: `user-${Date.now()}`,
      titleTakri: finalTitleHindi,
      titleDevanagari: finalTitleHindi,
      titleEnglish: finalTitleEng,
      contentTakri: contentHindi || contentEng,
      contentDevanagari: contentHindi || contentEng,
      contentEnglish: contentEng || contentHindi,
      tags: [`#${selectedCategory.toUpperCase()}`, '#HimachalHeritage'],
      timestamp: 'Just now',
      likes: 1,
      userLiked: true,
      category: selectedCategory,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setTitleEng('');
    setTitleHindi('');
    setContentEng('');
    setContentHindi('');
    setShowComposer(false);
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;

    const newComment: CommunityComment = {
      id: `comment-${Date.now()}`,
      authorName: commentAuthor.trim() || 'Fellow Explorer',
      authorLocation: 'Himachal',
      avatarSeed: `commenter-${Date.now()}`,
      takriText: commentText,
      devanagariText: commentText,
      englishText: commentText,
      timestamp: 'Just now',
      likes: 1,
      userLiked: true,
    };

    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, newComment],
          };
        }
        return p;
      })
    );

    setCommentText('');
    setActiveCommentPostId(null);
  };

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          const isLiked = p.userLiked;
          return {
            ...p,
            likes: isLiked ? p.likes - 1 : p.likes + 1,
            userLiked: !isLiked,
          };
        }
        return p;
      })
    );
  };

  const handleLikeComment = (postId: string, commentId: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: p.comments.map((c) => {
              if (c.id === commentId) {
                const isLiked = c.userLiked;
                return {
                  ...c,
                  likes: isLiked ? c.likes - 1 : c.likes + 1,
                  userLiked: !isLiked,
                };
              }
              return c;
            }),
          };
        }
        return p;
      })
    );
  };

  const handleCopyPost = (post: CommunityPost) => {
    const text = `${post.titleEnglish} (${post.titleDevanagari}) by ${post.authorName} - ${post.contentEnglish}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesTag =
      activeTag === 'all' ||
      post.tags.some((t) => t.toLowerCase().includes(activeTag.toLowerCase())) ||
      post.category === activeTag;
    const matchesSearch =
      searchQuery === '' ||
      post.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.titleDevanagari.includes(searchQuery) ||
      post.contentEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.contentDevanagari.includes(searchQuery) ||
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <section id="community-sangam-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-season-badge-bg border border-season-badge-border text-season-badge-text text-[11px] uppercase tracking-[0.25em] font-semibold shadow-xs">
          <span className="w-2 h-2 bg-season-accent rounded-full"></span>
          <span>HIMACHAL HERITAGE FORUM • सामुदायिक संवाद</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif text-season-heading tracking-tight font-bold">
          Himachal Community & Cultural Sangam
        </h2>

        <p className="text-sm sm:text-base text-[#5c4a3b] font-normal leading-relaxed">
          An open platform for sharing village folklore, temple chronicles, traditional culinary recipes, architectural heritage, and local cultural experiences across all twelve districts of Himachal Pradesh.
        </p>
      </div>

      {/* Community Action Callout */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-season-badge-border flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-2xl bg-season-accent text-white flex items-center justify-center shrink-0 shadow-sm">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-serif font-bold text-[#2c1d11]">
              Share Your Local Story or Heritage Experience (अपनी बात साझा करें)
            </h4>
            <p className="text-xs text-[#5c4a3b] leading-snug pt-0.5">
              Contribute stories from your village, sacred fair memories, recipes, or historical insights in English or Hindi.
            </p>
          </div>
        </div>

        <button
          id="open-community-composer-btn"
          onClick={() => setShowComposer(true)}
          className="px-5 py-3 rounded-xl bg-season-accent hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-102 flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Feather className="w-4 h-4" />
          <span>New Discussion Post</span>
        </button>
      </div>

      {/* Interactive Post Composer */}
      {showComposer && (
        <div className="bg-[#fdfcf9] rounded-3xl p-6 sm:p-8 border-2 border-season-accent shadow-xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-[#e5d8c7]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-season-accent rounded-full"></span>
              <h3 className="text-base font-serif font-bold text-season-accent flex items-center gap-2">
                Contribute to Himachal Cultural Community (नया संवाद जोड़ें)
              </h3>
            </div>
            <button
              onClick={() => setShowComposer(false)}
              className="text-xs text-[#7a695a] hover:text-[#2c1d11] uppercase tracking-wider px-3 py-1 rounded-lg hover:bg-[#f5ece2] cursor-pointer font-semibold"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreatePost} className="space-y-4 text-left">
            {/* Author details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5c4a3b] font-bold mb-1">
                  Your Name (आपका नाम):
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Surender Verma, Priya Sharma..."
                  className="w-full bg-white border border-[#d5be9d] rounded-xl px-3.5 py-2 text-xs text-[#2c1d11] placeholder-[#a89988] focus:outline-none focus:border-season-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5c4a3b] font-bold mb-1">
                  District / Valley in Himachal (जिला / घाटी):
                </label>
                <input
                  type="text"
                  value={authorLocation}
                  onChange={(e) => setAuthorLocation(e.target.value)}
                  placeholder="e.g. Chamba, Kullu, Mandi, Spiti, Kinnaur..."
                  className="w-full bg-white border border-[#d5be9d] rounded-xl px-3.5 py-2 text-xs text-[#2c1d11] placeholder-[#a89988] focus:outline-none focus:border-season-accent"
                />
              </div>
            </div>

            {/* Category Select */}
            <div className="space-y-1">
              <label className="block text-[11px] uppercase tracking-wider text-[#5c4a3b] font-bold">
                Heritage Category (श्रेणी):
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'folklore', label: 'Folklore & Legends (लोकगाथा)' },
                  { id: 'practice', label: 'Cuisine & Dham (धाम व व्यंजन)' },
                  { id: 'manuscript', label: 'Temples & History (मंदिर व इतिहास)' },
                  { id: 'poetry', label: 'Folk Poetry & Songs (कविता व गीत)' },
                  { id: 'general', label: 'Community Chat (सामान्य संवाद)' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer font-semibold ${
                      selectedCategory === cat.id
                        ? 'bg-season-accent text-white shadow-xs font-bold'
                        : 'bg-white text-[#5c4a3b] hover:text-[#2c1d11] border border-[#e5d8c7]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Post Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5c4a3b] font-bold mb-1">
                  Title in English:
                </label>
                <input
                  type="text"
                  value={titleEng}
                  onChange={(e) => setTitleEng(e.target.value)}
                  placeholder="e.g. Traditional Wooden Temples of Parvati Valley..."
                  className="w-full bg-white border border-[#d5be9d] rounded-xl px-3.5 py-2 text-xs text-[#2c1d11] placeholder-[#a89988] focus:outline-none focus:border-season-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5c4a3b] font-bold mb-1">
                  Title in Hindi (शीर्षक हिंदी में):
                </label>
                <input
                  type="text"
                  value={titleHindi}
                  onChange={(e) => setTitleHindi(e.target.value)}
                  placeholder="e.g. पार्वती घाटी के पारंपरिक काष्ठ मंदिर..."
                  className="w-full bg-white border border-[#d5be9d] rounded-xl px-3.5 py-2 text-xs text-[#2c1d11] placeholder-[#a89988] focus:outline-none focus:border-season-accent"
                />
              </div>
            </div>

            {/* Post Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5c4a3b] font-bold mb-1">
                  Description / Story in English:
                </label>
                <textarea
                  value={contentEng}
                  onChange={(e) => setContentEng(e.target.value)}
                  rows={4}
                  placeholder="Describe the folklore, festival tradition, recipe, or travel insight..."
                  className="w-full bg-white border border-[#d5be9d] rounded-xl p-3 text-xs text-[#2c1d11] placeholder-[#a89988] focus:outline-none focus:border-season-accent resize-y"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5c4a3b] font-bold mb-1">
                  विवरण / वृत्तांत हिंदी में:
                </label>
                <textarea
                  value={contentHindi}
                  onChange={(e) => setContentHindi(e.target.value)}
                  rows={4}
                  placeholder="लोकगाथा, मंदिर इतिहास, पारंपरिक व्यंजन या यात्रा का अनुभव साझा करें..."
                  className="w-full bg-white border border-[#d5be9d] rounded-xl p-3 text-xs text-[#2c1d11] placeholder-[#a89988] focus:outline-none focus:border-season-accent resize-y"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3 border-t border-[#e5d8c7] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowComposer(false)}
                className="px-4 py-2 rounded-xl text-xs uppercase tracking-wider text-[#7a695a] hover:text-[#2c1d11] font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-season-accent hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Post (प्रकाशित करें)</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#e5d8c7] shadow-sm">
        {/* Category Tags */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Discussions (सभी)' },
            { id: 'folklore', label: 'Folklore & Lore (लोकगाथा)' },
            { id: 'practice', label: 'Cuisine & Dham (धाम)' },
            { id: 'manuscript', label: 'Temples & History (इतिहास)' },
            { id: 'poetry', label: 'Poetry & Songs (गीत)' },
          ].map((tag) => (
            <button
              key={tag.id}
              onClick={() => setActiveTag(tag.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all cursor-pointer font-semibold ${
                activeTag === tag.id
                  ? 'bg-season-accent text-white shadow-xs font-bold'
                  : 'bg-[#faf6f0] text-[#5c4a3b] hover:text-[#2c1d11] border border-[#e5d8c7]'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#7a695a] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions, places, authors..."
            className="w-full bg-[#faf6f0] border border-[#d5be9d] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#2c1d11] placeholder-[#a89988] focus:outline-none focus:border-season-accent"
          />
        </div>
      </div>

      {/* Community Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            id={`post-card-${post.id}`}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e5d8c7] hover:border-season-accent shadow-sm hover:shadow-md transition-all space-y-4 text-left"
          >
            {/* Post Author Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#e5d8c7]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-season-accent text-white flex items-center justify-center font-bold font-serif text-base shadow-xs">
                  {post.authorName[0] || 'H'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#2c1d11]">{post.authorName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-season-badge-bg text-season-accent border border-season-badge-border font-bold">
                      {post.authorLocation.split(',')[0]}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#7a695a] flex items-center gap-1 pt-0.5">
                    <MapPin className="w-3 h-3 text-season-accent" />
                    <span>{post.authorLocation} • {post.timestamp}</span>
                  </span>
                </div>
              </div>

              {/* Tag Badge & Delete Action */}
              <div className="flex items-center gap-2">
                {post.tags.slice(0, 2).map((t, idx) => (
                  <span
                    key={idx}
                    className="hidden sm:inline-block text-[10px] font-bold text-season-accent bg-season-badge-bg px-2.5 py-1 rounded-full border border-season-badge-border uppercase tracking-wider"
                  >
                    {t}
                  </span>
                ))}
                <button
                  id={`delete-post-${post.id}`}
                  onClick={() => setPostToDelete(post.id)}
                  className="p-1.5 rounded-lg text-[#a89988] hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                  title="Delete post"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Inline Delete Confirmation */}
            {postToDelete === post.id && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex flex-wrap items-center justify-between gap-3 text-xs animate-fadeIn">
                <div className="flex items-center gap-2 text-rose-800">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="font-medium">
                    Are you sure you want to remove this post from the community feed?
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-[11px] uppercase tracking-wide transition-colors cursor-pointer"
                  >
                    Confirm Delete
                  </button>
                  <button
                    onClick={() => setPostToDelete(null)}
                    className="px-2.5 py-1 bg-white hover:bg-stone-100 text-[#5c4a3b] rounded-lg text-[11px] border border-stone-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Post Headline in English & Hindi */}
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-serif text-[#2c1d11] font-bold tracking-tight">
                {post.titleEnglish}
              </h3>
              {post.titleDevanagari && post.titleDevanagari !== post.titleEnglish && (
                <div className="text-xs font-serif font-semibold text-season-accent">
                  {post.titleDevanagari}
                </div>
              )}
            </div>

            {/* Post Content Body */}
            <div className="p-4 rounded-2xl bg-[#faf6f0] border border-[#ebd8c5] space-y-3">
              <p className="text-xs sm:text-sm text-[#423223] leading-relaxed">
                {post.contentEnglish}
              </p>

              {post.contentDevanagari && post.contentDevanagari !== post.contentEnglish && (
                <div className="pt-3 border-t border-[#e5d8c7] text-xs font-serif text-[#5c4a3b] leading-relaxed">
                  <strong className="text-[#2c1d11]">हिंदी विवरण: </strong>
                  {post.contentDevanagari}
                </div>
              )}
            </div>

            {/* Post Footer Actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleLikePost(post.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    post.userLiked
                      ? 'bg-rose-50 text-rose-700 border-rose-300 shadow-xs'
                      : 'bg-[#faf6f0] text-[#5c4a3b] hover:text-[#2c1d11] border-[#e5d8c7]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${post.userLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{post.likes}</span>
                </button>

                <button
                  onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#5c4a3b] hover:text-season-accent px-3 py-1.5 rounded-xl bg-[#faf6f0] hover:bg-[#f5ece2] border border-[#e5d8c7] transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-season-accent" />
                  <span>{post.comments.length} Comments & Replies</span>
                </button>
              </div>

              <button
                onClick={() => handleCopyPost(post)}
                className="flex items-center gap-1 text-xs text-[#7a695a] hover:text-season-accent transition-colors p-1.5 cursor-pointer font-semibold"
                title="Share post"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline uppercase text-[10px] tracking-wider">
                  Share
                </span>
              </button>
            </div>

            {/* Comments Thread */}
            {post.comments.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-[#e5d8c7]">
                <span className="text-[10px] uppercase tracking-wider text-[#7a695a] font-bold block">
                  Community Discussion ({post.comments.length}):
                </span>

                {post.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-3.5 rounded-2xl bg-[#faf6f0] border border-[#ebd8c5] space-y-1.5 text-left"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#2c1d11]">{comment.authorName}</span>
                      <span className="text-[10px] text-[#7a695a]">
                        {comment.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-[#423223] leading-relaxed">
                      {comment.englishText || comment.devanagariText}
                    </p>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => handleLikeComment(post.id, comment.id)}
                        className="flex items-center gap-1 text-[#7a695a] hover:text-rose-600 text-[10px] cursor-pointer"
                      >
                        <Heart className={`w-3 h-3 ${comment.userLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                        <span>{comment.likes}</span>
                      </button>
                      <button
                        onClick={() => handleDeleteComment(post.id, comment.id)}
                        className="text-[#a89988] hover:text-rose-600 p-1 transition-colors cursor-pointer"
                        title="Delete comment"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Reply Form */}
            {activeCommentPostId === post.id && (
              <div className="p-4 rounded-2xl bg-[#faf6f0] border-2 border-season-badge-border space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between text-xs text-[#2c1d11]">
                  <span className="font-serif text-season-accent font-bold">
                    Write a reply (उत्तर दें):
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    placeholder="Your Name"
                    className="bg-white border border-[#d5be9d] rounded-xl px-3 py-1.5 text-xs text-[#2c1d11] placeholder-[#a89988] focus:outline-none focus:border-season-accent"
                  />
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write your thought, insight, or reply..."
                    className="bg-white border border-[#d5be9d] rounded-xl px-3 py-1.5 text-xs text-[#2c1d11] placeholder-[#a89988] focus:outline-none focus:border-season-accent"
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setActiveCommentPostId(null)}
                    className="px-3 py-1 text-xs uppercase tracking-wider text-[#7a695a] hover:text-[#2c1d11] font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="px-4 py-1.5 rounded-xl bg-season-accent hover:opacity-90 text-white font-bold text-xs uppercase tracking-tight transition-all cursor-pointer"
                  >
                    Post Reply
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}

        {filteredPosts.length === 0 && (
          <div className="p-8 text-center bg-white rounded-3xl border border-[#e2d5c3] space-y-3">
            <p className="text-[#5c4a3b] text-sm">No community discussions matching this filter.</p>
            <button
              onClick={() => {
                setActiveTag('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-season-accent text-white font-bold text-xs uppercase tracking-tight cursor-pointer"
            >
              Show All Posts
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
