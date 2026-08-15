import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Feather,
  Heart,
  Share2,
  Send,
  Sparkles,
  Search,
  Keyboard,
  CornerDownRight,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { CommunityPost, CommunityComment, ScriptMode } from '../types';
import { INITIAL_COMMUNITY_POSTS } from '../data/communityData';
import { universalConvert } from '../utils/takriTransliterator';
import { TAKRI_CONSONANTS, TAKRI_VOWELS, TAKRI_MATRAS } from '../data/takriAlphabet';

interface CommunitySectionProps {
  scriptMode: ScriptMode;
  initialOpenComposer?: boolean;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  scriptMode,
  initialOpenComposer = false,
}) => {
  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('takri_community_posts');
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
  const [authorLocation, setAuthorLocation] = useState('Himachal Pradesh');
  const [rawTitle, setRawTitle] = useState('');
  const [rawContent, setRawContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'practice' | 'poetry' | 'folklore' | 'manuscript' | 'general'>('practice');
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);
  const [focusedInput, setFocusedInput] = useState<'title' | 'content' | 'comment'>('content');

  // Comment Form State for specific post
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [rawCommentText, setRawCommentText] = useState('');

  // Live transliteration previews for composer
  const titleConverted = universalConvert(rawTitle);
  const contentConverted = universalConvert(rawContent);
  const commentConverted = universalConvert(rawCommentText);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('takri_community_posts', JSON.stringify(posts));
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

  // Insert character from virtual keyboard
  const handleInsertChar = (char: string) => {
    if (focusedInput === 'title') {
      setRawTitle((prev) => prev + char);
    } else if (focusedInput === 'content') {
      setRawContent((prev) => prev + char);
    } else if (focusedInput === 'comment') {
      setRawCommentText((prev) => prev + char);
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawContent.trim()) return;

    const finalTitleTakri = titleConverted.takri || '𑚔𑚭𑚊𑚤𑚯 𑚨𑚫𑚛𑚲𑚧';
    const finalTitleDev = titleConverted.devanagari || 'टाकरी संदेश';
    const finalTitleEng = rawTitle || 'Takri Message';

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: authorName.trim() || 'Pahari Scribe',
      authorLocation: authorLocation.trim() || 'Himachal Pradesh',
      avatarSeed: `user-${Date.now()}`,
      titleTakri: finalTitleTakri,
      titleDevanagari: finalTitleDev,
      titleEnglish: finalTitleEng,
      contentTakri: contentConverted.takri || '𑚔𑚭𑚊𑚤𑚯 𑚀𑚡𑚣𑚭𑚨',
      contentDevanagari: contentConverted.devanagari || 'टाकरी अभ्यास',
      contentEnglish: rawContent,
      tags: [`#${selectedCategory}`, '#TakriPractice'],
      timestamp: 'Just now',
      likes: 1,
      userLiked: true,
      category: selectedCategory,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setRawTitle('');
    setRawContent('');
    setShowComposer(false);
  };

  const handleAddComment = (postId: string) => {
    if (!rawCommentText.trim()) return;

    const newComment: CommunityComment = {
      id: `comment-${Date.now()}`,
      authorName: commentAuthor.trim() || 'Learner',
      authorLocation: 'Himachal',
      avatarSeed: `commenter-${Date.now()}`,
      takriText: commentConverted.takri || '𑚝𑚢𑚨𑚙𑚲',
      devanagariText: commentConverted.devanagari || 'नमस्ते',
      englishText: rawCommentText,
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

    setRawCommentText('');
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

  const handleCopyTakri = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesTag = activeTag === 'all' || post.tags.some((t) => t.toLowerCase().includes(activeTag.toLowerCase())) || post.category === activeTag;
    const matchesSearch =
      searchQuery === '' ||
      post.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.titleDevanagari.includes(searchQuery) ||
      post.contentEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <section id="community-sangam-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#c5a059]/30 text-[#c5a059] text-[10px] uppercase tracking-[0.25em]">
          <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full"></span>
          {scriptMode === 'takri-only' ? (
            <span className="font-takri normal-case tracking-normal text-xs text-[#dfbe7b]">𑚏𑚵𑚞𑚭𑚥 𑚨𑚫𑚌𑚢</span>
          ) : scriptMode === 'bilingual' ? (
            <span>चौपाल संवाद • 𑚏𑚵𑚞𑚭𑚥</span>
          ) : (
            <span>चौपाल • COMMUNITY SANGAM</span>
          )}
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
          {scriptMode === 'takri-only' ? (
            <span className="font-takri text-[#dfbe7b] text-4xl sm:text-5xl">𑚔𑚭𑚊𑚤𑚯 𑚏𑚵𑚞𑚭𑚥 𑚨𑚫𑚌𑚢</span>
          ) : scriptMode === 'bilingual' ? (
            <span>टाकरी चौपाल अभ्यास मंच</span>
          ) : (
            <span>Community Takri Practice Board</span>
          )}
        </h2>
        <p className="text-sm sm:text-base text-white/70 font-light italic">
          {scriptMode === 'takri-only' ? (
            <span className="font-takri text-lg text-[#dfbe7b] not-italic">
              𑚃𑚚𑚯 𑚨𑚠𑚲 𑚨𑚫𑚛𑚲𑚧 𑚙𑚲 𑚏𑚤𑚏𑚭 𑚞𑚪𑚮𑚙𑚤 𑚔𑚭𑚊𑚤𑚯 𑚥𑚮𑚞𑚮 𑚢𑚫𑚑 𑚩𑚴𑚫𑚛𑚲 𑚝𑚲।
            </span>
          ) : scriptMode === 'bilingual' ? (
            <span>
              एक खुला मंच जहाँ सारा संवाद केवल टाकरी लिपि में होता है। हिंदी या अंग्रेजी में लिखें — स्वतः टाकरी में रूपांतरित होगा।
            </span>
          ) : (
            <span>
              An open forum where all communication is rendered in authentic Takri script. Type in English, Hindi, or Takri — our smart engine converts your words into living Takri script for real practice.
            </span>
          )}
        </p>
      </div>

      {/* Community Rule & Action Callout */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#c5a059] to-[#8a6d35] flex items-center justify-center text-[#1a2a2c] shrink-0 font-bold font-takri text-2xl shadow-lg">
            𑚔
          </div>
          <div>
            <h4 className="text-sm font-serif text-white flex items-center gap-2">
              {scriptMode === 'takri-only' ? (
                <span className="font-takri text-base text-[#dfbe7b]">𑚏𑚵𑚞𑚭𑚥 𑚤𑚭 𑚝𑚮𑚣𑚢: 𑚨𑚮𑚤𑚍 𑚔𑚭𑚊𑚤𑚯 𑚢𑚫𑚑 𑚥𑚮𑚋𑚴</span>
              ) : scriptMode === 'bilingual' ? (
                <span>चौपाल का नियम: केवल टाकरी लिपि में संवाद</span>
              ) : (
                <span>Rule of चौपाल: Practice Communicating in Takri</span>
              )}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40 uppercase tracking-wider font-sans">
                {scriptMode === 'takri-only' ? '𑚔𑚭𑚊𑚤𑚯' : 'Takri Enforced'}
              </span>
            </h4>
            <p className="text-xs text-white/70 font-light italic">
              {scriptMode === 'takri-only' ? (
                <span className="font-takri text-xs text-[#dfbe7b] not-italic">
                  𑚨𑚠𑚲 𑚥𑚲𑚋 𑚙𑚲 𑚂𑚙𑚙𑚤 𑚔𑚭𑚊𑚤𑚯 𑚢𑚫𑚑 𑚛𑚮𑚝𑚲 𑚑𑚭𑚝𑚲।
                </span>
              ) : scriptMode === 'bilingual' ? (
                <span>प्रत्येक पोस्ट और टिप्पणी स्वतः प्रामाणिक टाकरी यूनिकोड में प्रकाशित होती है।</span>
              ) : (
                <span>Every post & comment automatically transforms into Takri Unicode with bilingual learner annotations.</span>
              )}
            </p>
          </div>
        </div>

        <button
          id="open-takri-composer-btn"
          onClick={() => {
            setShowComposer(true);
          }}
          className="px-5 py-3 rounded-xl bg-[#c5a059] hover:bg-white text-[#1a2a2c] font-bold text-xs shadow-xl shadow-black/30 transition-all hover:scale-102 flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Feather className="w-4 h-4" />
          {scriptMode === 'takri-only' ? (
            <span className="font-takri text-base font-bold text-[#1a2a2c]">𑚝𑚪𑚭𑚫 𑚨𑚫𑚛𑚲𑚧 𑚥𑚮𑚋𑚴</span>
          ) : scriptMode === 'bilingual' ? (
            <span className="flex items-center gap-1.5 font-bold">
              <span>नया संदेश लिखें</span>
              <span className="font-takri text-sm font-bold text-[#1a2a2c]">(𑚥𑚮𑚋𑚴)</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px]">
              <span>New Post in Takri</span>
              <span className="normal-case font-takri text-sm font-bold text-[#1a2a2c] tracking-normal">(𑚥𑚮𑚋𑚴)</span>
            </span>
          )}
        </button>
      </div>

      {/* Interactive Takri Post Composer (Natural Tones Form) */}
      {showComposer && (
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-[#c5a059]/40 shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#c5a059] rounded-full"></span>
              <h3 className="text-base font-serif text-[#c5a059] flex items-center gap-2">
                {scriptMode === 'takri-only' ? (
                  <span className="font-takri text-lg text-[#dfbe7b] font-bold">𑚝𑚪𑚭𑚫 𑚨𑚫𑚛𑚲𑚧 𑚥𑚮𑚋𑚴</span>
                ) : scriptMode === 'bilingual' ? (
                  <span className="flex items-center gap-1.5">
                    <span>टाकरी लिपि में नया संदेश</span>
                    <span className="font-takri text-sm text-[#dfbe7b] font-bold">(𑚥𑚮𑚋𑚴)</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <span>Create a Post in Takri Script</span>
                    <span className="font-takri text-sm text-[#dfbe7b] font-bold">(𑚥𑚮𑚋𑚴)</span>
                  </span>
                )}
              </h3>
            </div>
            <button
              onClick={() => setShowComposer(false)}
              className="text-xs text-white/50 hover:text-white uppercase tracking-wider px-2 py-1 rounded hover:bg-white/5 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreatePost} className="space-y-4">
            {/* Author details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1">Your Name / Scribe Alias</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Rahul Sharma, Anjali Devi..."
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1">Your Valley in Himachal</label>
                <input
                  type="text"
                  value={authorLocation}
                  onChange={(e) => setAuthorLocation(e.target.value)}
                  placeholder="e.g. Chamba, Kangra, Mandi, Spiti..."
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            {/* Category Select */}
            <div className="space-y-1">
              <label className="block text-[11px] uppercase tracking-wider text-white/70">Category</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'practice', label: 'Script Practice (अभ्यास)' },
                  { id: 'poetry', label: 'Pahari Poetry (कविता)' },
                  { id: 'folklore', label: 'Folklore & Legends (कथा)' },
                  { id: 'manuscript', label: 'Manuscript Study (पाण्डुलिपि)' },
                  { id: 'general', label: 'General Chat (चर्चा)' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#c5a059] text-[#1a2a2c] font-bold shadow'
                        : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Post Title */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1">
                Post Title (Type in English or Hindi):
              </label>
              <input
                type="text"
                value={rawTitle}
                onChange={(e) => setRawTitle(e.target.value)}
                onFocus={() => setFocusedInput('title')}
                placeholder="e.g. Chamba ki sundar pahaadiyan, Namaste friends..."
                className="w-full bg-black/30 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#c5a059]"
                required
              />
              {rawTitle && (
                <div className="mt-2 p-2.5 rounded-xl bg-black/30 border border-[#c5a059]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#c5a059] uppercase tracking-wider font-bold block">Live Takri Title:</span>
                    <span className="font-takri text-lg text-[#dfbe7b] font-bold">{titleConverted.takri}</span>
                  </div>
                  <span className="text-xs text-white/60 font-serif italic">{titleConverted.devanagari}</span>
                </div>
              )}
            </div>

            {/* Post Content */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] uppercase tracking-wider text-white/70">
                  Your Message or Poem (Hindi, English, or Takri):
                </label>
                <button
                  type="button"
                  onClick={() => setShowVirtualKeyboard(!showVirtualKeyboard)}
                  className="text-xs text-[#c5a059] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Keyboard className="w-3.5 h-3.5" />
                  <span>{showVirtualKeyboard ? 'Hide Virtual Keys' : 'On-Screen Takri Keys'}</span>
                </button>
              </div>

              <textarea
                value={rawContent}
                onChange={(e) => setRawContent(e.target.value)}
                onFocus={() => setFocusedInput('content')}
                rows={4}
                placeholder="Write whatever you want to share with the community... our engine will transform it into authentic Takri script!"
                className="w-full bg-black/30 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#c5a059] resize-y"
                required
              />

              {/* Real-time Takri Script Transformation Preview */}
              {rawContent && (
                <div className="mt-3 p-4 rounded-2xl bg-black/40 border border-[#c5a059]/40 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-serif text-[#c5a059]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Transformed Takri Script Preview:</span>
                  </div>
                  <div className="font-takri text-2xl text-[#dfbe7b] leading-relaxed select-all">
                    {contentConverted.takri}
                  </div>
                  <div className="text-xs text-white/60 pt-1 border-t border-white/10 font-serif italic">
                    <strong>Hindi Transliteration:</strong> {contentConverted.devanagari}
                  </div>
                </div>
              )}
            </div>

            {/* Virtual Takri Keyboard Bar */}
            {showVirtualKeyboard && (
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span className="font-serif text-[#c5a059]">Virtual Takri Keyboard (Click to insert)</span>
                  <span className="text-[10px] uppercase tracking-wider">Target: {focusedInput}</span>
                </div>

                {/* Consonants */}
                <div className="space-y-1">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">Consonants (व्यंजन)</span>
                  <div className="flex flex-wrap gap-1.5">
                    {TAKRI_CONSONANTS.map((c) => (
                      <button
                        key={c.unicode}
                        type="button"
                        onClick={() => handleInsertChar(c.char)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#c5a059] hover:text-[#1a2a2c] text-[#dfbe7b] font-takri text-lg font-bold border border-white/10 transition-all flex items-center justify-center cursor-pointer"
                        title={`${c.devanagari} (${c.iast})`}
                      >
                        {c.char}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vowels & Matras */}
                <div className="space-y-1">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">Vowels & Matras (स्वर / मात्राएं)</span>
                  <div className="flex flex-wrap gap-1.5">
                    {TAKRI_VOWELS.map((v) => (
                      <button
                        key={v.unicode}
                        type="button"
                        onClick={() => handleInsertChar(v.char)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#c5a059] hover:text-[#1a2a2c] text-white font-takri text-lg font-bold border border-white/10 flex items-center justify-center cursor-pointer"
                        title={`${v.devanagari}`}
                      >
                        {v.char}
                      </button>
                    ))}
                    {TAKRI_MATRAS.map((m) => (
                      <button
                        key={m.unicode}
                        type="button"
                        onClick={() => handleInsertChar(m.char)}
                        className="w-8 h-8 rounded-lg bg-[#c5a059]/15 hover:bg-[#c5a059] hover:text-[#1a2a2c] text-[#dfbe7b] font-takri text-lg font-bold border border-[#c5a059]/30 flex items-center justify-center cursor-pointer"
                        title={`${m.devanagari}`}
                      >
                        {m.char}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowComposer(false)}
                className="px-4 py-2 rounded-xl text-xs uppercase tracking-wider text-white/60 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#c5a059] hover:bg-white text-[#1a2a2c] font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                {scriptMode === 'takri-only' ? (
                  <span className="font-takri text-base font-bold text-[#1a2a2c]">𑚨𑚫𑚛𑚲𑚧 𑚥𑚮𑚋𑚴</span>
                ) : scriptMode === 'bilingual' ? (
                  <span className="flex items-center gap-1">
                    <span>प्रकाशित करें</span>
                    <span className="font-takri text-sm font-bold text-[#1a2a2c]">(𑚥𑚮𑚋𑚴)</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 uppercase tracking-wider text-[11px]">
                    <span>Publish Post</span>
                    <span className="normal-case font-takri text-sm font-bold text-[#1a2a2c] tracking-normal">(𑚥𑚮𑚋𑚴)</span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Tags */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
          {[
            {
              id: 'all',
              render: () =>
                scriptMode === 'takri-only' ? (
                  <span className="font-takri text-sm font-bold">𑚨𑚠𑚲 𑚨𑚫𑚛𑚲𑚧</span>
                ) : scriptMode === 'bilingual' ? (
                  <span className="flex items-center gap-1 font-medium">
                    <span>सभी</span>
                    <span className="font-takri text-xs font-bold">(𑚨𑚠𑚲)</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <span>All</span>
                    <span className="font-takri text-xs font-bold text-[#dfbe7b]">(𑚨𑚠𑚲)</span>
                  </span>
                ),
            },
            {
              id: 'practice',
              render: () =>
                scriptMode === 'takri-only' ? (
                  <span className="font-takri text-sm font-bold">𑚀𑚡𑚣𑚭𑚨</span>
                ) : scriptMode === 'bilingual' ? (
                  <span className="flex items-center gap-1 font-medium">
                    <span>अभ्यास</span>
                    <span className="font-takri text-xs font-bold">(𑚀𑚡𑚣𑚭𑚨)</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <span>Practice</span>
                    <span className="font-takri text-xs font-bold text-[#dfbe7b]">(𑚀𑚡𑚣𑚭𑚨)</span>
                  </span>
                ),
            },
            {
              id: 'poetry',
              render: () =>
                scriptMode === 'takri-only' ? (
                  <span className="font-takri text-sm font-bold">𑚊𑚪𑚮𑚙𑚭</span>
                ) : scriptMode === 'bilingual' ? (
                  <span className="flex items-center gap-1 font-medium">
                    <span>कविता</span>
                    <span className="font-takri text-xs font-bold">(𑚊𑚪𑚮𑚙𑚭)</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <span>Poetry</span>
                    <span className="font-takri text-xs font-bold text-[#dfbe7b]">(𑚊𑚪𑚮𑚙𑚭)</span>
                  </span>
                ),
            },
            {
              id: 'manuscript',
              render: () =>
                scriptMode === 'takri-only' ? (
                  <span className="font-takri text-sm font-bold">𑚞𑚭𑚫𑚖𑚰𑚥𑚮𑚞𑚮</span>
                ) : scriptMode === 'bilingual' ? (
                  <span className="flex items-center gap-1 font-medium">
                    <span>पांडुलिपि</span>
                    <span className="font-takri text-xs font-bold">(𑚞𑚭𑚫𑚖𑚰𑚥𑚮𑚞𑚮)</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <span>Manuscripts</span>
                    <span className="font-takri text-xs font-bold text-[#dfbe7b]">(𑚞𑚭𑚫𑚖𑚰)</span>
                  </span>
                ),
            },
            {
              id: 'folklore',
              render: () =>
                scriptMode === 'takri-only' ? (
                  <span className="font-takri text-sm font-bold">𑚥𑚴𑚊 𑚊𑚚𑚭</span>
                ) : scriptMode === 'bilingual' ? (
                  <span className="flex items-center gap-1 font-medium">
                    <span>लोककथा</span>
                    <span className="font-takri text-xs font-bold">(𑚥𑚴𑚊)</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <span>Folklore</span>
                    <span className="font-takri text-xs font-bold text-[#dfbe7b]">(𑚥𑚴𑚊)</span>
                  </span>
                ),
            },
          ].map((tag) => (
            <button
              key={tag.id}
              onClick={() => {
                setActiveTag(tag.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-all cursor-pointer ${
                activeTag === tag.id
                  ? 'bg-[#c5a059] text-[#1a2a2c] font-bold shadow-md'
                  : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
              }`}
            >
              {tag.render()}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={scriptMode === 'takri-only' ? '𑚋𑚴𑚑𑚴...' : scriptMode === 'bilingual' ? 'खोजें...' : 'Search discussions...'}
            className="w-full bg-black/30 border border-white/10 rounded-full pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#c5a059]"
          />
        </div>
      </div>

      {/* Community Posts Feed (Matches Natural Tones Board Style) */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            id={`post-card-${post.id}`}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#c5a059]/40 transition-all space-y-4 shadow-2xl"
          >
            {/* Post Author Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#c5a059] to-[#8a6d35] flex items-center justify-center text-[#1a2a2c] font-bold font-takri text-lg shadow-md">
                  {post.authorName[0] || '𑚔'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">{post.authorName}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30 font-takri">
                      𑚥𑚮𑚋𑚭𑚤𑚯
                    </span>
                  </div>
                  <span className="text-[10px] text-white/40">
                    {scriptMode === 'takri-only' ? (
                      <span className="font-takri text-xs text-[#dfbe7b]">𑚩𑚮𑚢𑚭𑚏𑚥</span>
                    ) : (
                      `${post.authorLocation} • ${post.timestamp}`
                    )}
                  </span>
                </div>
              </div>

              {/* Tag Badge & Delete Action */}
              <div className="flex items-center gap-2">
                {post.tags.slice(0, 2).map((t, idx) => (
                  <span key={idx} className="hidden sm:inline-block text-[10px] text-[#c5a059] bg-white/5 px-2.5 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                    {scriptMode === 'takri-only' ? '𑚔𑚭𑚊𑚤𑚯' : t}
                  </span>
                ))}
                <button
                  id={`delete-post-${post.id}`}
                  onClick={() => setPostToDelete(post.id)}
                  className="p-1.5 rounded-lg text-white/30 hover:text-rose-400 hover:bg-rose-500/15 transition-all cursor-pointer"
                  title="Delete post"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Inline Delete Confirmation */}
            {postToDelete === post.id && (
              <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/50 flex flex-wrap items-center justify-between gap-3 text-xs animate-fadeIn">
                <div className="flex items-center gap-2 text-rose-200">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>
                    {scriptMode === 'takri-only'
                      ? '𑚊𑚯 𑚊𑚮𑚨𑚯 𑚢𑚮𑚔𑚭𑚘𑚭 𑚏𑚭𑚩𑚰𑚫𑚛𑚲?'
                      : 'Delete this post from the community feed?'}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-bold text-[11px] uppercase tracking-wide transition-colors cursor-pointer"
                  >
                    {scriptMode === 'takri-only' ? '𑚢𑚮𑚔𑚭𑚍' : 'Confirm Delete'}
                  </button>
                  <button
                    onClick={() => setPostToDelete(null)}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white rounded-lg text-[11px] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Post Headline in Takri Script */}
            <div className="space-y-1">
              <div className="font-takri text-2xl sm:text-3xl text-[#dfbe7b] font-bold tracking-wide select-all">
                {post.titleTakri}
              </div>
              {scriptMode !== 'takri-only' && (
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <span className="font-serif italic text-white">{post.titleDevanagari}</span>
                  {scriptMode === 'all' && (
                    <>
                      <span className="text-white/30">•</span>
                      <span className="text-white/50 text-[11px] uppercase tracking-tight">{post.titleEnglish}</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Post Content Body in Takri Script */}
            <div className="p-4 rounded-2xl bg-black/20 border border-white/5 space-y-3">
              <div className="font-takri text-xl sm:text-2xl text-[#dfbe7b] leading-relaxed select-all">
                {post.contentTakri}
              </div>

              {/* Toggleable / Script-mode Annotations */}
              {scriptMode !== 'takri-only' && (
                <div className="pt-3 border-t border-white/10 space-y-1 text-xs font-light">
                  <p className="font-serif italic text-white/90 leading-snug">
                    {post.contentDevanagari}
                  </p>
                  {scriptMode === 'all' && (
                    <p className="text-[10px] text-white/40 mt-1 uppercase tracking-tight">
                      ({post.contentEnglish})
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Post Footer Actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLikePost(post.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    post.userLiked
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm'
                      : 'bg-white/5 text-white/60 hover:text-white border-white/10'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${post.userLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                  <span>{post.likes}</span>
                </button>

                <button
                  onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-[#c5a059] px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  {scriptMode === 'takri-only' ? (
                    <span className="font-takri text-xs">{post.comments.length} 𑚂𑚙𑚙𑚤</span>
                  ) : scriptMode === 'bilingual' ? (
                    <span>{post.comments.length} उत्तर (𑚂𑚙𑚙𑚤)</span>
                  ) : (
                    <span>{post.comments.length} Practice Replies</span>
                  )}
                </button>
              </div>

              <button
                onClick={() => handleCopyTakri(post.contentTakri)}
                className="flex items-center gap-1 text-xs text-white/50 hover:text-[#c5a059] transition-colors p-1.5 cursor-pointer"
                title="Copy Takri Unicode text"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline uppercase text-[10px] tracking-wider">
                  {scriptMode === 'takri-only' ? '𑚔𑚭𑚊𑚤𑚯 𑚥𑚮𑚞𑚮' : 'Copy Takri'}
                </span>
              </button>
            </div>

            {/* Comments Thread */}
            {post.comments.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-white/40 block">
                  {scriptMode === 'takri-only' ? (
                    <span className="font-takri text-xs text-[#dfbe7b]">𑚏𑚵𑚞𑚭𑚥 𑚂𑚙𑚙𑚤:</span>
                  ) : scriptMode === 'bilingual' ? (
                    <span>चौपाल टाकरी उत्तर (अभ्यास):</span>
                  ) : (
                    <span>Community Takri Practice Responses:</span>
                  )}
                </span>
                {post.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-3.5 rounded-2xl bg-black/20 border border-white/5 space-y-2 text-left"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{comment.authorName}</span>
                      <span className="text-[10px] text-white/40">
                        {scriptMode === 'takri-only' ? '' : comment.timestamp}
                      </span>
                    </div>

                    <div className="font-takri text-xl text-[#dfbe7b] select-all">
                      {comment.takriText}
                    </div>

                    {scriptMode !== 'takri-only' && (
                      <div className="text-[11px] text-white/60 font-serif italic flex items-center justify-between">
                        <span>{comment.devanagariText}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleLikeComment(post.id, comment.id)}
                            className="flex items-center gap-1 text-white/40 hover:text-rose-400 text-[10px] cursor-pointer"
                          >
                            <Heart className={`w-3 h-3 ${comment.userLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                            <span>{comment.likes}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteComment(post.id, comment.id)}
                            className="text-white/30 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                            title="Delete comment"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                    {scriptMode === 'takri-only' && (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleLikeComment(post.id, comment.id)}
                          className="flex items-center gap-1 text-white/40 hover:text-rose-400 text-[10px] cursor-pointer"
                        >
                          <Heart className={`w-3 h-3 ${comment.userLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                          <span>{comment.likes}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteComment(post.id, comment.id)}
                          className="text-white/30 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                          title="Delete comment"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Quick Reply Form */}
            {activeCommentPostId === post.id && (
              <div className="p-4 rounded-2xl bg-black/40 border border-[#c5a059]/30 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between text-xs text-white/80">
                  <span className="font-serif text-[#c5a059] flex items-center gap-1">
                    <CornerDownRight className="w-3.5 h-3.5" />
                    <span>Reply in Takri Script:</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowVirtualKeyboard(!showVirtualKeyboard)}
                    className="text-[10px] uppercase tracking-wider text-[#c5a059] hover:underline cursor-pointer"
                  >
                    {showVirtualKeyboard ? 'Hide Keys' : 'Use Virtual Keys'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    placeholder="Your Name"
                    className="bg-black/30 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#c5a059]"
                  />
                  <input
                    type="text"
                    value={rawCommentText}
                    onChange={(e) => setRawCommentText(e.target.value)}
                    onFocus={() => setFocusedInput('comment')}
                    placeholder="Type in English or Hindi (e.g. Bohat sundar!)..."
                    className="bg-black/30 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                {rawCommentText && (
                  <div className="p-2 rounded-xl bg-black/30 border border-[#c5a059]/20">
                    <span className="text-[10px] uppercase tracking-wider text-[#c5a059] block">Takri Output:</span>
                    <span className="font-takri text-lg text-[#dfbe7b]">{commentConverted.takri}</span>
                  </div>
                )}

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setActiveCommentPostId(null)}
                    className="px-3 py-1 text-xs uppercase tracking-wider text-white/50 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="px-4 py-1.5 rounded-xl bg-[#c5a059] hover:bg-white text-[#1a2a2c] font-bold text-xs uppercase tracking-tight transition-all cursor-pointer"
                  >
                    Post Reply
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}

        {filteredPosts.length === 0 && (
          <div className="p-8 text-center bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 space-y-3">
            <p className="text-white/60 text-sm">No community discussions matching this filter.</p>
            <button
              onClick={() => {
                setActiveTag('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#c5a059] text-[#1a2a2c] font-bold text-xs uppercase tracking-tight cursor-pointer"
            >
              Show All Posts
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
