import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronDown, 
  MapPin, 
  Compass, 
  BookOpen, 
  Layers, 
  Globe, 
  Sparkles,
  ArrowRight,
  Filter,
  FileText
} from 'lucide-react';

// --- DATA DEFINITIONS ---

const internationalTripsData = [
  [
    "Volcanoes, Islands & Adventure Group Trip to Bali",
    "Party, Surfing & Adventure Group Trip to Bali",
    "Upbeat Egypt Group Trip: Exit Festival Nights, Cairo, Luxor & Red Sea",
    "11-Day New Zealand Backpacking Trip | Hobbiton & Milford Cruise",
    "11 Days Vietnam Group Tour: Sapa, Halong Bay, Hoi An, & Phu Quoc",
    "Vietnam Community Trip: Cable Car, Bay Cruises & Lantern Boats",
    "8D Egypt Group Trip: Pyramids of Giza & Desert Safari Adventure",
    "5D Phuket Tour Package with Rafting & Zipline",
    "5D Thailand Couple Trip with Catamaran Cruise & Spa",
    "8 Days Sri Lanka Honeymoon Trip- Escape Together",
    "7 Days Philippines Islands Hopping Tour Package",
    "5-Day Kenya Couple Tour- Magical Safari And Balloon Ride"
  ],
  [
    "New Zealand Sports Tour With Hobbiton & Milford Sound",
    "Europe Community Trip for F1 Fans: Italian Grand Prix | Swiss Alps",
    "Singapore Community Trip: Ultimate City Escape for BTS ARMY",
    "Festive Spain Group Trip | La Tomatina & Ibiza | Seasoned Traveller Edition",
    "Malaysia Community Trip: Langkawi and Kuala Lumpur Adventures",
    "Vietnam Group Trip - Highlight of Sapa, Hanoi and Hoi An",
    "7D Thailand Couple Tour Package: Adventures in Krabi & Phuket",
    "6D Thailand Adventure Vacation: Krabi & Phuket",
    "7D Thailand Couple Trip : Tropical Wellness Getaway",
    "8D Thailand Couple Trip | Luxury Krabi Phuket Honeymoon",
    "7 Days Philippines Friends Getaway - Beach, Besties & Boracay",
    "8-Day Japan Family Trip - Temples, Trains & Theme Parks!"
  ],
  [
    "Cultural Bhutan Group Trip: Celebrate Grand Tsechu Festival",
    "Bali Christmas & New Year Group Trip | Gili, Nusa Penida & Ubud",
    "Iceland Group Trip with Glacier Lagoon & Golden Circle | Winter Edition",
    "11-Day New Zealand Community Trip | Hobbiton & Milford Cruise",
    "Bali Group Tour Package: Gili and Nusa Penida Island",
    "8D Thailand Adventure Tour: Krabi, Phuket & Phi Phi Islands",
    "Thailand Adventure Holiday: From Mangroves To Maya Bay",
    "6 Days Vietnam Backpacking Trip | Hanoi, Ha Long Bay, Da Nang & Hoi An",
    "7D Romantic Thailand Escape with Luxury Island Tours",
    "11 Days Europe Trip with Oktoberfest | Community Trip",
    "6-Day Kenya Travel Package with Masai Mara Safari and Village Tour",
    "8-Day Romantic Sri Lanka Tour Package for Couple"
  ]
];

const indiaTripsData = [
  [
    "8D Leh Ladakh Bike Expedition: Pangong Lake & Khardung La",
    "Spiti Valley Circuit Road Trip: Kaza, Chandratal & Key Monastery",
    "Meghalaya Backpacking Trip: Living Root Bridges & Cherrapunji",
    "Kerala Houseboat & Hill Station Experience: Munnar to Alleppey"
  ],
  [
    "Kashmir Autumn & Winter Getaway: Srinagar, Gulmarg & Pahalgam",
    "Rajasthan Cultural Heritage Tour: Jaipur, Jodhpur & Udaipur",
    "Andaman Island Hopping Tour: Havelock & Neil Island Adventure",
    "Coorg & Ooty Nature Retreat: Tea Gardens & Waterfalls"
  ],
  [
    "Sikkim & Darjeeling Tour: Gangtok, Pelling & Kanchenjunga Views",
    "Gokarna & Dandeli Beach Camp & River Rafting Trip",
    "Himachal Backpacking Trip: Manali, Kasol & Tosh Trek",
    "Rishikesh Camping, River Rafting & Yoga Retreat"
  ]
];

const blogPostsData = [
  [
    "Top 10 Things to Do in Bali for First-Time Travelers",
    "The Ultimate Vietnam Itinerary: 10 Days Route Guide",
    "How to Plan a Budget-Friendly Trip to New Zealand",
    "Essential Backpacking Packing List for Southeast Asia"
  ],
  [
    "10 Best Cafes & Nightlife Spots in Phuket",
    "Complete Guide to Visiting Pyramids of Giza in Egypt",
    "Best Time to Visit Ladakh for Road Trips & Biking",
    "Exploring Meghalaya: The Land of Living Root Bridges"
  ],
  [
    "Europe Schengen Visa Guide: Step-by-Step Requirements",
    "Island Hopping in the Philippines: Best Route & Tips",
    "Safety Tips for Solo Female Travelers in Southeast Asia",
    "Top Cultural Festivals Around the World to Experience"
  ]
];

export default function SitemapPage() {
  const [activeTab, setActiveTab] = useState('Trip Sitemap');
  
  // Accordion open states
  const [openSections, setOpenSections] = useState({
    international: true,
    india: true,
    blogs: true,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const tabs = [
    { id: 'Trip Sitemap', label: 'Trip Sitemap', icon: Compass },
    { id: 'Blog Sitemap', label: 'Blog Sitemap', icon: BookOpen },
    { id: 'Pillar Sitemap', label: 'Pillar Sitemap', icon: Layers },
  ];

  const categories = ['All', 'Bali', 'Thailand', 'Vietnam', 'India', 'Ladakh', 'New Zealand', 'Egypt', 'Europe'];

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Helper function to filter link matrices
  const filterMatrix = (matrix) => {
    const flat = matrix.flat();
    return flat.filter((link) => {
      const matchesSearch = link.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || link.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  };

  const filteredInternational = useMemo(() => filterMatrix(internationalTripsData), [searchQuery, selectedCategory]);
  const filteredIndia = useMemo(() => filterMatrix(indiaTripsData), [searchQuery, selectedCategory]);
  const filteredBlogs = useMemo(() => filterMatrix(blogPostsData), [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      {/* 1. Hero Section */}
      <section className="relative bg-slate-900 text-white py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Navigation Hub
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Explore Our World Sitemap
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover all group tours, domestic packages, travel guides, and resources cleanly organized for your next journey.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations, packages, or guides..."
                className="w-full pl-11 pr-4 py-3.5 bg-slate-800/90 text-white placeholder-slate-400 rounded-2xl border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all shadow-inner text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full space-y-8">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1.5 bg-slate-200/70 rounded-2xl backdrop-blur-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-md shadow-slate-200/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-500' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5" /> Quick Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- VIEW 1: TRIPS SITEMAP --- */}
        {(activeTab === 'Trip Sitemap' || activeTab === 'Pillar Sitemap') && (
          <div className="space-y-6">
            {/* International Trips Accordion */}
            <AccordionSection
              title="International Trips"
              subtitle="Curated packages and community tours around the globe"
              icon={Globe}
              isOpen={openSections.international}
              onToggle={() => toggleSection('international')}
              filteredCount={filteredInternational.length}
              filteredLinks={filteredInternational}
              rawMatrixData={internationalTripsData}
              isSearching={Boolean(searchQuery || selectedCategory !== 'All')}
            />

            {/* India Trips Accordion */}
            <AccordionSection
              title="India Trips & Expeditions"
              subtitle="Himalayan treks, cultural retreats, and beach getaways"
              icon={MapPin}
              isOpen={openSections.india}
              onToggle={() => toggleSection('india')}
              filteredCount={filteredIndia.length}
              filteredLinks={filteredIndia}
              rawMatrixData={indiaTripsData}
              isSearching={Boolean(searchQuery || selectedCategory !== 'All')}
            />
          </div>
        )}

        {/* --- VIEW 2: BLOG SITEMAP --- */}
        {(activeTab === 'Blog Sitemap' || activeTab === 'Pillar Sitemap') && (
          <div className="space-y-6">
            <AccordionSection
              title="Travel Guides & Articles"
              subtitle="Expert tips, itineraries, and culture guides"
              icon={FileText}
              isOpen={openSections.blogs}
              onToggle={() => toggleSection('blogs')}
              filteredCount={filteredBlogs.length}
              filteredLinks={filteredBlogs}
              rawMatrixData={blogPostsData}
              isSearching={Boolean(searchQuery || selectedCategory !== 'All')}
              isBlog
            />
          </div>
        )}
      </main>
    </div>
  );
}

// Sub-component for Accordion Sections
function AccordionSection({ 
  title, 
  subtitle, 
  icon: Icon, 
  isOpen, 
  onToggle, 
  filteredCount, 
  filteredLinks, 
  rawMatrixData, 
  isSearching,
  isBlog = false
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:px-8 bg-slate-50/50 hover:bg-slate-100/50 border-b border-slate-100 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
            <Icon className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-slate-900">{title}</h2>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-xs bg-teal-50 text-teal-700 border border-teal-100 font-semibold px-3 py-1 rounded-full">
            {filteredCount} Available
          </span>
          <div className={`p-1.5 rounded-full text-slate-400 hover:bg-slate-200/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="p-6 md:p-8">
          {filteredLinks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500 text-sm">No results matched your filter in this category.</p>
            </div>
          ) : isSearching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLinks.map((text, idx) => (
                <TripCard key={idx} text={text} isBlog={isBlog} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {rawMatrixData.map((column, colIdx) => (
                <div key={colIdx} className="flex flex-col space-y-3">
                  {column.map((text, index) => (
                    <TripCard key={index} text={text} isBlog={isBlog} />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Sub-component for individual links styled as interactive cards
function TripCard({ text, isBlog }) {
  const getBadge = (t) => {
    if (isBlog) return 'Guide';
    if (t.toLowerCase().includes('couple') || t.toLowerCase().includes('honeymoon')) return 'Honeymoon';
    if (t.toLowerCase().includes('community')) return 'Community';
    if (t.toLowerCase().includes('adventure') || t.toLowerCase().includes('bike') || t.toLowerCase().includes('trek')) return 'Adventure';
    return null;
  };

  const badge = getBadge(text);

  return (
    <a
      href="#"
      className="group flex items-start justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-white hover:border-teal-200 hover:shadow-sm transition-all duration-200"
    >
      <div className="space-y-1">
        {badge && (
          <span className="inline-block text-[10px] font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">
            {badge}
          </span>
        )}
        <p className="text-xs md:text-[13px] font-medium text-slate-700 group-hover:text-teal-600 transition-colors leading-snug">
          {text}
        </p>
      </div>
      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0 ml-2" />
    </a>
  );
}