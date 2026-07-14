import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Clock, Eye, Calendar, Share2, Copy, Check,
  BookOpen, Twitter, MessageCircle, ChevronRight
} from 'lucide-react'
import SEOHead from '../components/common/SEOHead.jsx'
import BlogCard from '../components/blog/BlogCard.jsx'
import { useGetBlogBySlugQuery, useGetRelatedBlogsQuery } from '../store/api/blogApi.js'

// ── Mock data ──────────────────────────────────────────────────────────────────

const MOCK_BLOG = {
  _id: 'mock-1',
  title: 'The Ultimate Guide to Trekking in the Himalayas',
  slug: 'ultimate-guide-trekking-himalayas',
  excerpt: 'Everything you need to know before embarking on your first Himalayan trek.',
  category: 'Trekking',
  author: { name: 'Aryan Kapoor', bio: 'Aryan is a seasoned trekker and travel writer with over 10 years of experience exploring the Himalayas. He has guided more than 200 treks and writes about adventure travel, gear reviews, and safety tips.' },
  coverImage: 'https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg',
  publishedAt: '2024-01-15',
  readTime: '8 min read',
  tags: ['himalaya', 'trekking', 'adventure', 'india', 'mountains'],
  views: 12400,
  content: `## Introduction

The Himalayas — the roof of the world — call out to adventurers from across the globe. Whether you are a first-time trekker or an experienced mountaineer, there is always a trail that matches your skill level and ignites your spirit.

## Choosing the Right Trek

Before you lace up your boots, it is crucial to pick a trek that aligns with your fitness level, available time, and budget. Popular beginner-friendly routes include the Triund Trek in Himachal Pradesh, the Kedarkantha Trek in Uttarakhand, and the Sandakphu Trek in West Bengal.

## Essential Gear

A successful Himalayan trek depends heavily on the gear you carry. The essentials include:
- **Layered clothing**: Thermals, fleece mid-layer, and a waterproof outer shell
- **Sturdy trekking boots** with good ankle support
- **Trekking poles** to reduce knee strain on steep descents
- **Sleeping bag** rated for at least -10°C
- **Headlamp** with extra batteries

## Acclimatization & Safety

Altitude sickness is a real danger above 3,000 metres. Follow the golden rule: climb high, sleep low. Ascend no more than 300–500 metres per day once above 3,000 m, take rest days every three to four days, and stay well-hydrated.

## Best Seasons

The best months for most Himalayan treks are April–June (spring) and September–November (autumn). Avoid July–August for high-altitude routes due to heavy monsoon rains and landslide risk.

## Permits and Regulations

Many trek zones require Inner Line Permits or National Park entry permits. Always check requirements for your specific route in advance and carry multiple copies of your identification.

## Leave No Trace

The Himalayas are a fragile ecosystem. Carry out all your waste, use designated campsites, avoid single-use plastics, and respect local customs and wildlife.

## Conclusion

Trekking in the Himalayas is a life-changing experience. With the right preparation, gear, and attitude, you will return home with stories that will last a lifetime. Happy trekking!`,
}

const MOCK_RELATED = [
  {
    _id: 'r1',
    title: 'Ladakh on a Budget: Complete 2024 Cost Breakdown',
    slug: 'ladakh-budget-travel-2024',
    excerpt: 'Yes, you can experience the magic of Ladakh without breaking the bank.',
    category: 'Tips',
    author: { name: 'Sneha Joshi' },
    coverImage: 'https://images.pexels.com/photos/2437290/pexels-photo-2437290.jpeg',
    publishedAt: '2024-03-01',
    readTime: '10 min read',
    tags: ['ladakh'],
    views: 18900,
  },
  {
    _id: 'r2',
    title: 'Monsoon Travel Tips: Make the Most of the Rainy Season',
    slug: 'monsoon-travel-tips',
    excerpt: 'Monsoon transforms India into a lush paradise.',
    category: 'Tips',
    author: { name: 'Rohan Mehta' },
    coverImage: 'https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg',
    publishedAt: '2024-02-18',
    readTime: '7 min read',
    tags: ['monsoon'],
    views: 5600,
  },
  {
    _id: 'r3',
    title: 'The Culture and Festivals of Northeast India',
    slug: 'northeast-india-culture-festivals',
    excerpt: 'Discover the incredible diversity of Northeast India.',
    category: 'Culture',
    author: { name: 'Amit Das' },
    coverImage: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg',
    publishedAt: '2024-03-14',
    readTime: '9 min read',
    tags: ['northeast'],
    views: 6300,
  },
]

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatDate(d) {
  if (!d) return ''
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return String(d)
  }
}

// Convert markdown-ish content to simple HTML paragraphs/headings
function renderContent(content) {
  if (!content) return null
  const lines = content.split('\n')
  const elements = []
  let key = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} id={line.slice(3).toLowerCase().replace(/\s+/g, '-')} className="font-playfair text-2xl font-bold text-slate-800 mt-8 mb-3">
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('# ')) {
      elements.push(
        <h1 key={key++} className="font-playfair text-3xl font-bold text-slate-800 mt-8 mb-4">
          {line.slice(2)}
        </h1>
      )
    } else if (line.startsWith('- ')) {
      // collect list items
      const items = []
      let j = i
      while (j < lines.length && lines[j].startsWith('- ')) {
        items.push(lines[j].slice(2))
        j++
      }
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1.5 text-slate-700 leading-relaxed my-3 pl-2">
          {items.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </ul>
      )
      i = j - 1
    } else if (line.trim() !== '') {
      elements.push(
        <p key={key++} className="text-slate-700 leading-relaxed my-3" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
      )
    }
  }
  return elements
}

// Extract TOC headings
function extractTOC(content) {
  if (!content) return []
  return content
    .split('\n')
    .filter(l => l.startsWith('## '))
    .map(l => ({ label: l.slice(3), id: l.slice(3).toLowerCase().replace(/\s+/g, '-') }))
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function BlogDetail() {
  const { slug } = useParams()
  const [copied, setCopied] = useState(false)
  const [activeTocId, setActiveTocId] = useState('')

  const { data: blogData, isLoading, isError } = useGetBlogBySlugQuery(slug, { skip: !slug })
  const blog = isError || !blogData ? MOCK_BLOG : (blogData.blog ?? blogData ?? MOCK_BLOG)

  const { data: relatedData, isLoading: relatedLoading } = useGetRelatedBlogsQuery(
    { blogId: blog._id, limit: 3 },
    { skip: !blog._id || blog._id === 'mock-1' }
  )
  const relatedPosts = !relatedData ? MOCK_RELATED : (relatedData.blogs ?? relatedData ?? MOCK_RELATED)

  const tocItems = extractTOC(blog.content)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${blog.title} — via @TrenoIn`)
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`${blog.title}\n${window.location.href}`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 animate-pulse space-y-4">
        <div className="h-10 bg-slate-200 rounded w-3/4" />
        <div className="h-64 bg-slate-200 rounded-2xl" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-4 bg-slate-200 rounded" />)}
        </div>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title={blog.title}
        description={blog.excerpt}
        image={blog.coverImage}
        type="article"
        keywords={blog.tags}
      />

      {/* Hero cover */}
      <div className="relative w-full overflow-hidden" style={{ height: '50vh', minHeight: 320 }}>
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl">
          <span className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
            {blog.category}
          </span>
          <h1 className="font-playfair text-2xl md:text-4xl font-bold text-white leading-tight line-clamp-3">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-screen-xl mx-auto px-4 py-10 lg:flex lg:gap-10">

        {/* Article */}
        <article className="flex-1 min-w-0 max-w-3xl mx-auto lg:mx-0">

          {/* Back link */}
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-amber-600 font-semibold hover:text-amber-700 mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog
          </Link>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-4">
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
              {blog.category}
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {blog.readTime}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(blog.publishedAt)}</span>
            {blog.views > 0 && (
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {blog.views >= 1000 ? `${(blog.views / 1000).toFixed(1)}k` : blog.views} views</span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Author row */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-slate-100">
            <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-700 text-lg flex-shrink-0">
              {blog.author?.name?.[0]?.toUpperCase() ?? 'A'}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{blog.author?.name ?? 'Anonymous'}</p>
              <p className="text-xs text-slate-500">Published on {formatDate(blog.publishedAt)}</p>
            </div>
          </div>

          {/* Article body */}
          <div className="prose prose-slate max-w-none">
            {renderContent(blog.content)}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-100">
              <p className="text-sm font-semibold text-slate-600 mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map(tag => (
                  <Link
                    key={tag}
                    to={`/blog?tag=${tag}`}
                    className="text-xs px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full hover:bg-amber-100 hover:text-amber-700 transition-colors font-medium"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share buttons */}
          <div className="mt-8 p-5 bg-amber-50 rounded-2xl border border-amber-100">
            <p className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-500" /> Share this article
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={shareOnWhatsApp}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </button>
              <button
                onClick={shareOnTwitter}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                <Twitter className="w-4 h-4" /> Twitter / X
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold px-4 py-2 rounded-xl border border-slate-200 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block w-72 flex-shrink-0 space-y-6 pt-16">

          {/* TOC */}
          {tocItems.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-24">
              <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" /> Table of Contents
              </h3>
              <ul className="space-y-2">
                {tocItems.map(item => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600 transition-colors group"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-400" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Posts */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 text-sm mb-4">Related Posts</h3>
            {relatedLoading ? (
              <div className="space-y-3 animate-pulse">
                {[1,2,3].map(i => <div key={i} className="h-20 bg-slate-200 rounded-xl" />)}
              </div>
            ) : (
              <div className="space-y-4">
                {relatedPosts.slice(0, 3).map(post => (
                  <Link key={post._id} to={`/blog/${post.slug}`} className="flex gap-3 group">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 line-clamp-2 group-hover:text-amber-600 transition-colors leading-snug">
                        {post.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{post.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Author bio */}
          <div className="bg-amber-50 rounded-2xl border border-amber-100 p-5">
            <h3 className="font-bold text-slate-800 text-sm mb-3">About the Author</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-700 text-lg flex-shrink-0">
                {blog.author?.name?.[0]?.toUpperCase() ?? 'A'}
              </div>
              <p className="font-semibold text-slate-800 text-sm">{blog.author?.name ?? 'Anonymous'}</p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {blog.author?.bio ?? 'A passionate traveller and storyteller sharing experiences from the road.'}
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}
