import { motion } from 'framer-motion'
import SEOHead from '../components/common/SEOHead.jsx'
import HeroBanner from '../components/home/HeroBanner.jsx'
import Categories from '../components/home/Categories.jsx'
import FeaturedTrips from '../components/home/FeaturedTrips.jsx'
import PopularDestinations from '../components/home/PopularDestinations.jsx'
import WhyChooseUs from '../components/home/WhyChooseUs.jsx'
import TrendingDestinations from '../components/home/TrendingDestinations.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import NewsletterSection from '../components/home/NewsletterSection.jsx'
import EventBanner from '../components/home/EventBanner.jsx'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Home() {
  return (
    <>
      <SEOHead
        title={"Treno - Explore. Experience. Remember."}
        description={"Discover handcrafted travel experiences across India and the world. Treno offers group tours, trekking adventures, weekend getaways, and custom holiday packages designed for every kind of traveller. Explore breathtaking destinations, connect with like-minded explorers, and create memories that last a lifetime."}
        keywords={["travel, tours, trips, group travel, trekking, adventure, holiday packages, India travel, weekend getaways, Treno"]}
        ogImage={"/og-home.jpg"}
      />

      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="min-h-screen"
      >
        {/* Hero Banner — full viewport, no extra padding */}
        <HeroBanner />

        {/* New Events Banner */}
        <EventBanner/>

        {/* Trip Categories */}
        <section className="py-16 bg-white">
          <Categories />
        </section>

        {/* Featured Trips */}
        <section className="py-20 bg-gray-50">
          <FeaturedTrips />
        </section>

        {/* Popular Destinations */}
        <section className="py-16 bg-white">
          <PopularDestinations />
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-amber-50">
          <WhyChooseUs />
        </section>

        {/* Trending Destinations */}
        <section className="py-16 bg-white">
          <TrendingDestinations />
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <Testimonials />
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-white">
          <NewsletterSection />
        </section>
      </motion.div>
    </>
  )
}
