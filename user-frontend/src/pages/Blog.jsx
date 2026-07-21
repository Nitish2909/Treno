import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, X, ChevronLeft, ChevronRight, TrendingUp, Clock, Eye } from 'lucide-react'
import SEOHead from '../components/common/SEOHead.jsx'
import BlogCard from '../components/blog/BlogCard.jsx'
import { useGetAllBlogsQuery, useGetFeaturedBlogsQuery } from '../store/api/blogApi.js'

//  Mock data 

const MOCK_BLOGS = [
  {
    _id: '1',
    title: 'The Ultimate Guide to Trekking in the Himalayas',
    slug: 'ultimate-guide-trekking-himalayas',
    excerpt: 'Everything you need to know before embarking on your first Himalayan trek — from essential gear to altitude acclimatization tips.',
    category: 'Trekking',
    author: { name: 'Aryan Kapoor' },
    coverImage: 'https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg',
    publishedAt: '2024-01-15',
    readTime: '8 min read',
    tags: ['himalaya', 'trekking', 'adventure'],
    views: 12400,
  },
  {
    _id: '2',
    title: 'Hidden Beaches of Goa You Never Knew Existed',
    slug: 'hidden-beaches-goa',
    excerpt: 'Beyond the crowded tourist spots lie secret shores where the sand is pristine and the vibe is blissfully serene.',
    category: 'Destinations',
    author: { name: 'Priya Sharma' },
    coverImage: 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg',
    publishedAt: '2024-01-22',
    readTime: '6 min read',
    tags: ['goa', 'beaches', 'hidden-gems'],
    views: 9800,
  },
  {
    _id: '3',
    title: 'Rajasthan Street Food: A Culinary Journey',
    slug: 'rajasthan-street-food-guide',
    excerpt: 'Dive into the vibrant flavours of Rajasthan — from dal baati churma in Jaipur to the iconic ghewar of Udaipur.',
    category: 'Food',
    author: { name: 'Neha Verma' },
    coverImage: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
    publishedAt: '2024-02-05',
    readTime: '5 min read',
    tags: ['food', 'rajasthan', 'street-food'],
    views: 7200,
  },
  {
    _id: '4',
    title: 'Monsoon Travel Tips: Make the Most of the Rainy Season',
    slug: 'monsoon-travel-tips',
    excerpt: 'Monsoon transforms India into a lush paradise. Here is how to travel safely and make the most of the season.',
    category: 'Tips',
    author: { name: 'Rohan Mehta' },
    coverImage: 'https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg',
    publishedAt: '2024-02-18',
    readTime: '7 min read',
    tags: ['monsoon', 'travel-tips', 'india'],
    views: 5600,
  },
  {
    _id: '5',
    title: 'Ladakh on a Budget: Complete 2024 Cost Breakdown',
    slug: 'ladakh-budget-travel-2024',
    excerpt: 'Yes, you can experience the magic of Ladakh without breaking the bank. We break down every expense so you can plan better.',
    category: 'Tips',
    author: { name: 'Sneha Joshi' },
    coverImage: 'https://images.pexels.com/photos/2437290/pexels-photo-2437290.jpeg',
    publishedAt: '2024-03-01',
    readTime: '10 min read',
    tags: ['ladakh', 'budget-travel', 'planning'],
    views: 18900,
  },
  {
    _id: '6',
    title: 'The Culture and Festivals of Northeast India',
    slug: 'northeast-india-culture-festivals',
    excerpt: 'Discover the incredible diversity of Northeast India — its tribes, languages, cuisine, and breathtaking festivals.',
    category: 'Culture',
    author: { name: 'Amit Das' },
    coverImage: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg',
    publishedAt: '2024-03-14',
    readTime: '9 min read',
    tags: ['northeast', 'culture', 'festivals'],
    views: 6300,
  },
    {
    _id: '6',
    title: 'The Culture and Festivals of Northeast India',
    slug: 'northeast-india-culture-festivals',
    excerpt: 'Discover the incredible diversity of Northeast India — its tribes, languages, cuisine, and breathtaking festivals.',
    category: 'Culture',
    author: { name: 'Amit Das' },
    coverImage: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg',
    publishedAt: '2024-03-14',
    readTime: '9 min read',
    tags: ['northeast', 'culture', 'festivals'],
    views: 6300,
  },
  {
    _id: '7',
    title: 'Hidden Gems of the Western Ghats: A Hiker\'s Paradise',
    slug: 'hidden-gems-western-ghats-hiking-guide',
    excerpt: 'Escape the crowds and explore misty peaks, cascading waterfalls, and endemic wildlife along the Western Ghats.',
    category: 'Adventure',
    author: { name: 'Priya Sharma' },
    coverImage: 'https://images.pexels.com/photos/15286/pexels-photo.jpg',
    publishedAt: '2024-03-20',
    readTime: '7 min read',
    tags: ['trekking', 'nature', 'westernghats'],
    views: 4850,
  },
  {
    _id: '8',
    title: 'Spices, Silk, and Sea: The Culinary Heritage of Malabar',
    slug: 'culinary-heritage-malabar-coast-spices',
    excerpt: 'Journey through coastal Kerala to unearth century-old recipes, aromatic spice trade stories, and rich coastal flavors.',
    category: 'Food',
    author: { name: 'Rohan Nair' },
    coverImage: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
    publishedAt: '2024-04-02',
    readTime: '6 min read',
    tags: ['food', 'kerala', 'heritage'],
    views: 5210,
  },
  {
    _id: '9',
    title: 'A Guide to High-Altitude Lakes in Spiti & Ladakh',
    slug: 'high-altitude-lakes-spiti-ladakh-guide',
    excerpt: 'From Pangong Tso to Chandratal, discover the turquoise high-altitude waters cradled in the Trans-Himalayan desert.',
    category: 'Travel',
    author: { name: 'Amit Das' },
    coverImage: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg',
    publishedAt: '2024-04-18',
    readTime: '8 min read',
    tags: ['himalayas', 'ladakh', 'lakes'],
    views: 7420,
  },
  {
    _id: '10',
    title: 'Living Architecture: The Sacred Temples of Tamil Nadu',
    slug: 'living-architecture-temples-tamil-nadu',
    excerpt: 'Uncover Dravidian architectural marvels, intricate gopurams, and millennia-old traditions preserved in South India.',
    category: 'History',
    author: { name: 'Ananya Roy' },
    coverImage: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg',
    publishedAt: '2024-05-05',
    readTime: '10 min read',
    tags: ['architecture', 'southindia', 'history'],
    views: 3910,
  }

]

const CATEGORIES = ['All', 'Destinations', 'Trekking', 'Culture', 'Tips', 'Food', 'Gear']

const POPULAR_POSTS = MOCK_BLOGS.slice(0, 5)

const TAG_CLOUD = [
  'himalaya', 'goa', 'rajasthan', 'ladakh', 'trekking', 'beaches',
  'food', 'culture', 'budget-travel', 'monsoon', 'adventure', 'northeast',
  'planning', 'festivals', 'street-food', 'india',
]

//  Skeleton 

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
      <div className="aspect-video bg-slate-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-200 rounded w-1/4" />
        <div className="h-5 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-5/6" />
        <div className="h-8 bg-slate-200 rounded w-1/3 mt-2" />
      </div>
    </div>
  )
}

//  Main component 

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 6

  // API calls — fall back to mock data on error / loading
  const {
    data: blogsData,
    isLoading: blogsLoading,
    isError: blogsError,
  } = useGetAllBlogsQuery({
    category: activeCategory !== 'All' ? activeCategory : undefined,
    search: searchQuery || undefined,
    page,
    limit: PAGE_SIZE,
  })

  const {
    data: featuredData,
    isLoading: featuredLoading,
  } = useGetFeaturedBlogsQuery(1)

  // Resolve data
  const allBlogs = blogsError || !blogsData ? MOCK_BLOGS : (blogsData.blogs ?? MOCK_BLOGS)
  const featuredPost = !featuredData ? MOCK_BLOGS[0] : (featuredData[0] ?? MOCK_BLOGS[0])

  // Local filter when using mock data
  const filteredBlogs = blogsError || !blogsData
    ? allBlogs.filter(b => {
        const matchCat = activeCategory === 'All' || b.category === activeCategory
        const matchSearch = !searchQuery || b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        return matchCat && matchSearch
      })
    : allBlogs

  const totalPages = blogsData?.totalPages ?? Math.ceil(filteredBlogs.length / PAGE_SIZE)
  const displayedBlogs = blogsError || !blogsData ? filteredBlogs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) : filteredBlogs

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setPage(1)
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    setPage(1)
  }

  return (
    <>
      <SEOHead
        title="Travel Blog"
        description="Explore travel stories, trekking guides, destination tips, and cultural insights from Treno's travel community."
        keywords={['travel blog', 'trekking guides', 'india travel tips', 'destination stories', 'Treno blog']}
      />

      {/* Hero */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: '40vh', minHeight: 280 }}
      >
        <img
          src="https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg"
          alt="Travel Blog"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/80" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center px-4"
        >
          <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-3">Treno</p>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white leading-tight">
            Travel Stories &amp; Inspiration
          </h1>
          <p className="mt-4 text-slate-200 text-lg max-w-xl mx-auto">
            Guides, tips, culture &amp; adventures from the road
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-12 lg:flex lg:gap-10">
        {/* Left / Main */}
        <main className="flex-1 min-w-0">

          {/* Featured Post */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-slate-800">Featured Post</h2>
            </div>
            {featuredLoading ? (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
                <div className="h-64 bg-slate-200" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-full" />
                </div>
              </div>
            ) : (
              <BlogCard post={featuredPost} featured={true} />
            )}
          </section>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400 hover:text-amber-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search articles..."
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(''); setPage(1) }} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>

          {/* Latest Articles heading */}
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            {searchQuery ? `Results for "${searchQuery}"` : activeCategory === 'All' ? 'Latest Articles' : `${activeCategory} Articles`}
          </h2>

          {/* Grid */}
          {blogsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : displayedBlogs.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <Search className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="text-lg font-medium">No articles found</p>
              <p className="text-sm mt-1">Try a different category or search term.</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {displayedBlogs.map((post, idx) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <BlogCard post={post} featured={false} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-xl text-sm font-bold transition-colors border ${
                    page === p
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>

        {/* Sidebar */}
        <aside className="hidden lg:block w-72 flex-shrink-0 space-y-8">

          {/* Popular Posts */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" /> Popular Posts
            </h3>
            <ul className="space-y-4">
              {POPULAR_POSTS.map(post => (
                <li key={post._id}>
                  <a href={`/blog/${post.slug}`} className="flex gap-3 group">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 line-clamp-2 group-hover:text-amber-600 transition-colors leading-snug">
                        {post.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Browse by Category */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 text-base mb-4">Browse by Category</h3>
            <ul className="space-y-2">
              {[
                { name: 'Destinations', count: 28 },
                { name: 'Trekking', count: 19 },
                { name: 'Culture', count: 14 },
                { name: 'Tips', count: 32 },
                { name: 'Food', count: 11 },
                { name: 'Gear', count: 8 },
              ].map(cat => (
                <li key={cat.name}>
                  <button
                    onClick={() => handleCategoryChange(cat.name)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-amber-50 transition-colors group"
                  >
                    <span className="text-sm text-slate-700 group-hover:text-amber-700">{cat.name}</span>
                    <span className="text-xs bg-slate-100 text-slate-500 group-hover:bg-amber-100 group-hover:text-amber-600 px-2 py-0.5 rounded-full font-medium transition-colors">
                      {cat.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 text-base mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {TAG_CLOUD.map(tag => (
                <button
                  key={tag}
                  onClick={() => { setSearchQuery(tag); setPage(1) }}
                  className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-700 transition-colors font-medium"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
