import React from 'react';

export default function Careers() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* 1. Hero Banner */}
      <section 
        className="relative h-64 md:h-80 bg-cover bg-center flex flex-col justify-center items-center text-white px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')`
        }}
      >
        <h2 className="text-xl md:text-2xl font-medium tracking-wide">
          Ready To Take Off?
        </h2>
        <h1 className="text-2xl md:text-4xl font-extrabold text-yellow-400 mt-1">
          We're Hiring!
        </h1>
      </section>

      {/* 2. Intro / Join Section */}
      <section className="max-w-4xl mx-auto text-center px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Be Part Of <span className="text-sky-500">The Travel Revolution</span>
        </h2>
        <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Join us for the opportunity to be a part of a dynamic team that's dedicated to making travel dreams come true. Your career here will be as adventurous as our travel experiences. We nurture growth, ignite ambition, and add a sprinkle of uniqueness. Join us for a career that's as unique as you are!
        </p>
        <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2.5 rounded-md shadow transition-colors duration-200">
          Open Positions
        </button>
      </section>

      {/* 3. Alternating Feature Sections (Gray Background Container) */}
      <section className="bg-slate-50 py-12 px-4 md:px-12 space-y-16">
        
        {/* Row 1: Images Left, Text Right */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Images Grid */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
              alt="Team collaborating outdoors"
              className="w-full h-48 md:h-56 object-cover rounded-lg shadow-sm"
            />
            <img
              src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80"
              alt="Motorcycle adventure"
              className="w-full h-48 md:h-56 object-cover rounded-lg shadow-sm"
            />
          </div>

          {/* Text Content */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-2xl font-bold text-gray-900">
              Embracing <span className="text-sky-500">A Common Vision</span>
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We're a vibrant community of passionate, creative individuals united by a shared vision to revolutionize the way people explore the world. We're the Global Community of Travellers, a collective of innovative thinkers with boundless ideas and unwavering dedication.
            </p>
          </div>
        </div>

        {/* Row 2: Text Left, Images Right */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Text Content (Placed first on mobile, but ordered appropriately) */}
          <div className="md:col-span-5 md:order-1 order-2 space-y-3 text-left md:text-right">
            <h3 className="text-2xl font-bold text-gray-900">
              The Spark That <span className="text-sky-500">Fuels Our Progress</span>
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We are weavers of happy memories! We're all about balance: working hard, playing hard, and giving our all. Our values fuel us. Adventure is our compass, integrity guides us, and exceeding expectations is our mission—for ourselves and our amazing community of travelers.
            </p>
          </div>

          {/* Images Grid */}
          <div className="md:col-span-7 md:order-2 order-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=600&q=80"
              alt="Snowboarder preparing"
              className="w-full h-48 md:h-56 object-cover rounded-lg shadow-sm"
            />
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
              alt="Man sitting in snow"
              className="w-full h-48 md:h-56 object-cover rounded-lg shadow-sm"
            />
          </div>
        </div>

      </section>

      {/* 4. Values Header & Cards Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            We Live By <span className="text-sky-500">Our Values</span>
          </h2>
          <p className="mt-2 text-xs md:text-sm text-gray-500">
            When you join Treno, you join a global community. We ensure our team members have as many unforgettable moments as our wanderers.
          </p>
        </div>

        {/* Value Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Example Card (Innovation) */}
          <div className="bg-white border border-sky-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex items-start space-x-4">
            <div className="flex-shrink-0 bg-yellow-100 p-2.5 rounded-lg text-yellow-600">
              {/* Lightbulb Icon */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 103.636 5.05l-.707.707a1 1 0 001.414 1.414l.707-.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14H8a4 4 0 01-3.465-2C4.19 11.4 4 10.72 4 10a6 6 0 1112 0c0 .72-.19 1.4-.535 2A4 4 0 0112 14z" />
              </svg>
            </div>
            <div>
              <h4 className="text-base font-bold text-sky-500">Innovation</h4>
              <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                We encourage creativity, innovation and continuous improvement. We are open to experimenting and creating things from scratch.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}