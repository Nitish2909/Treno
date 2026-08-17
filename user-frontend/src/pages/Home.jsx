import { motion } from "framer-motion";
import SEOHead from "../components/common/SEOHead.jsx";
import HeroBanner from "../components/home/HeroBanner.jsx";
import Categories from "../components/home/Categories.jsx";
import FeaturedTrips from "../components/home/FeaturedTrips.jsx";
import PopularDestinations from "../components/home/PopularDestinations.jsx";
import WhyChooseUs from "../components/home/WhyChooseUs.jsx";
import TrendingDestinations from "../components/home/TrendingDestinations.jsx";
import Testimonials from "../components/home/Testimonials.jsx";
import NewsletterSection from "../components/home/NewsletterSection.jsx";
import EventBanner from "../components/home/EventBanner.jsx";
import IndiaTrips from "../components/home/IndiaTrips.jsx";
import InternationalTrips from "../components/home/InternationalTrips.jsx";
import RomanticEscapes from "../components/home/RomanticEscapes.jsx";
import Chatbot from "../components/home/Chatbot.jsx";
import WhatsApp from "../components/home/Whatsapp.jsx";
// import WhatsApp from '../components/home/Whatsapp.jsx'
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      <SEOHead
        title="Treno - Your Travel Partner | Treno Travel | Best Travel Agency in Karnal| Trip With Treno"
        description="Book domestic and international tour packages, honeymoon packages and customized holidays at affordable prices."
        keywords={[
          // Brand
          "Treno Your Travel Partner",
          "Trip With Treno",
          "Treno Travel",
          "Treno",
          
          // Core Services
          "Travel Agency",
          "Best Travel Agency",
          "Travel Agency Karnal",
          "Travel Packages",
          "Tour Packages",
          "Holiday Packages",
          "Domestic Tour Packages",
          "International Tour Packages",
          "Customized Tour Packages",
          "Affordable Tour Packages",

          // Booking Services
          "Flight Booking",
          "Hotel Booking",
          "Train Ticket Booking",
          "Bus Ticket Booking",
          "Cab Booking",
          "Online Travel Booking",

          // Travel Types
          "Honeymoon Packages",
          "Family Tour Packages",
          "Group Tour Packages",
          "Corporate Tour Packages",
          "Adventure Tours",
          "Weekend Getaways",
          "Vacation Packages",
          "Pilgrimage Tour Packages",

          // Travel Support
          "Visa Assistance",
          "Travel Insurance",
          "Travel Planner",
          "Travel Consultant",

          // Popular Destinations
          "Manali Tour Package",
          "Shimla Tour Package",
          "Kashmir Tour Package",
          "Goa Tour Package",
          "Kerala Tour Package",
          "Leh Ladakh Tour Package",
          "Andaman Tour Package",
          "Rajasthan Tour Package",
          "Dubai Tour Package",
          "Thailand Tour Package",
          "Bali Tour Package",
          "Singapore Tour Package",
          "Maldives Tour Package",
          "Europe Tour Package",
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
        <EventBanner />

        {/* India Trip  */}
        <section className="">
          <IndiaTrips/>
        </section>
          
           {/* International Trip  */}
         <section className="">
          <InternationalTrips/>
        </section>

          {/* RomanticEscapes */}
         <section className="">
          <RomanticEscapes/>
        </section>

         {/* Trip Categories */}
        <section className="">
          <Categories />
        </section>

        {/* Featured Trips */}
        {/* <section className="">
          <FeaturedTrips />
        </section> */}

        {/* Popular Destinations */}
        <section className="">
          <PopularDestinations />
        </section>

         <section className="overflow-hidden">
          < Chatbot/>
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

        {/* Whatapp */}
        <section className="relative bottom-64">
          <WhatsApp/>
        </section>
      </motion.div>
    </div>
  );
}
