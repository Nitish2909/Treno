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
import IndiaTrips from './IndiaTrips.jsx'

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
  title="Terno- Your Travel Partner | Best Travel Agency in Karnal | Tour Packages, Flight & Hotel Booking | Trip With Treno"
  description="Treno- Your Travel Partner is a trusted travel agency in Karnal offering domestic and international tour packages, flight booking, hotel booking, train and bus ticket booking, visa assistance, honeymoon packages, family vacations, group tours, customized holiday packages, and affordable travel deals across India and worldwide."
  keywords={[
    "Treno Your Travel Partner",
    "Trip With Treno",
    "TripWithTreno",
    "Treno",
    "Best Travel Agency in Karnal",
    "Travel Agency Karnal",
    "Tour Packages Karnal",
    "Holiday Packages Karnal",
    "Domestic Tour Packages",
    "International Tour Packages",
    "Travel Booking",
    "Online Travel Booking",
    "Flight Booking",
    "Hotel Booking",
    "Train Ticket Booking",
    "Bus Booking",
    "Cab Booking",
    "Travel Planner",
    "Travel Consultant",
    "Family Tour Packages",
    "Honeymoon Packages",
    "Group Tour Packages",
    "Customized Tour Packages",
    "Adventure Tours",
    "Weekend Getaways",
    "Vacation Packages",
    "Travel Deals",
    "Visa Assistance",
    "Travel Insurance",
    "Manali Tour Package",
    "Shimla Tour Package",
    "Kashmir Tour Package",
    "Goa Tour Package",
    "Kerala Tour Package",
    "Leh Ladakh Tour Package",
    "Andaman Tour Package",
    "Dubai Tour Package",
    "Thailand Tour Package",
    "Bali Tour Package",
    "Singapore Tour Package",
    "Maldives Tour Package",
    "Europe Tour Package"
  ]}
  ogImage="/og-home.jpg"
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
        <section className="">
          <Categories />
        </section>

        {/*  */}
        <section className="">
          <IndiaTrips/>
        </section>

        {/* Featured Trips */}
        <section className="">
          <FeaturedTrips />
        </section>

        {/* Popular Destinations */}
        <section className="">
          <PopularDestinations />
        </section>

        {/* Why Choose Us */}
        <section className="">
          <WhyChooseUs />
        </section>

        {/* Trending Destinations */}
        <section className="">
          <TrendingDestinations />
        </section>

        {/* Testimonials */}
        <section className="">
          <Testimonials />
        </section>

        {/* Newsletter */}
        <section className="">
          <NewsletterSection />
        </section>
      </motion.div>
    </>
  )
}
