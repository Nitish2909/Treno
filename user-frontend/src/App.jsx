import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy } from "react";

// Layout components
import Navbar from "./components/common/Navbar.jsx";
import Footer from "./components/common/Footer.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import Loader from "./components/common/Loader.jsx";

// Pages - eager loaded
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Destination from "./pages/Destination.jsx";
import Sitmap from "./pages/Sitmap.jsx";
import Packages from "./pages/Packages.jsx";
import Sitemap from "./pages/Sitmap.jsx";
import Disclaimer from "./components/common/Disclaimer.jsx";
import Careers from "./components/common/Careers.jsx";
import WeekendGateways from "./pages/WeekendGateways.jsx";

// Pages - lazy loaded
const Trips = lazy(() => import("./pages/Trips.jsx"));
const TripDetail = lazy(() => import("./pages/TripDetail.jsx"));
const Booking = lazy(() => import("./pages/Booking.jsx"));
const BookingConfirmation = lazy(
  () => import("./pages/BookingConfirmation.jsx"),
);
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const MyBookings = lazy(() => import("./pages/MyBookings.jsx"));
const Wishlist = lazy(() => import("./pages/Wishlist.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));
const BlogDetail = lazy(() => import("./pages/BlogDetail.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.jsx"));
const EventAndFestivals = lazy(() => import("./pages/EventsAndFestivals.jsx"));
// const Sitemap = lazy(()=> import('./pages/Sitemap.jsx'))

// Pages without Navbar/Footer (auth pages)
const AUTH_ROUTES = ["/auth/login", "/auth/register", "/auth/forgot-password"];

function AppContent() {
  const location = useLocation();
  const isAuthPage = AUTH_ROUTES.some((path) =>
    location.pathname.startsWith("/auth/"),
  );
  const isNoNavPage = false; // add routes here if needed

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!isAuthPage && !isNoNavPage && <Navbar />}
      <main className="flex-1">
        <Suspense fallback={<Loader variant="fullpage" />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/trips/:slug" element={<TripDetail />} />
              <Route path="/trips/category/:categorySlug" element={<Trips />} />
              <Route path="/destination/:state" element={<Trips />} />
              <Route path="/packages" element={<Packages />} />
               <Route
                path="/event-and-festivels"
                element={<EventAndFestivals />}
              />
              {/* Destinations*/}
              <Route path="/destinations" element={<Destination />} />
              {/* WeekendGateways*/}
              <Route path="/weekend-gateways" element={<WeekendGateways />} />


              {/* Auth Routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route
                path="/auth/forgot-password"
                element={<ForgotPassword />}
              />
              <Route
                path="/auth/reset-password/:token"
                element={<ResetPassword />}
              />

              {/* Protected Routes */}
              <Route
                path="/booking/:tripId"
                element={
                  // <ProtectedRoute>
                    <Booking />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/booking/confirm/:bookingId"
                element={
                  <ProtectedRoute>
                    <BookingConfirmation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/bookings"
                element={
                  <ProtectedRoute>
                    <MyBookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/wishlist"
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Content Routes */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
               <Route path="/careers" element={<Careers />} />
             


              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      {!isAuthPage && !isNoNavPage && <Footer />}
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}











// import React, { useState } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { AnimatePresence } from "framer-motion";
// import { Suspense, lazy } from "react";

// // Layout components
// import Navbar from "./components/common/Navbar.jsx";
// import Footer from "./components/common/Footer.jsx";
// import ScrollToTop from "./components/common/ScrollToTop.jsx";
// import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
// import Loader from "./components/common/Loader.jsx";

// // Custom Destination Flow Imports
// // import DestinationDropdown from "./DestinationDropdown";
// import DestinationPage from "./pages/Destination.jsx";
// import { destinations } from "./components/Destinations/DestinationsData.js";

// // Pages - eager loaded
// import Home from "./pages/Home.jsx";
// import NotFound from "./pages/NotFound.jsx";
// import Destination from "./pages/Destination.jsx";
// import Sitmap from "./pages/Sitmap.jsx";
// import Packages from "./pages/Packages.jsx";
// import Sitemap from "./pages/Sitmap.jsx";
// import Disclaimer from "./components/common/Disclaimer.jsx";
// import Careers from "./components/common/Careers.jsx";
// import DestinationDropdown from "./components/Destinations/DestinationDropDown.jsx";

// // Pages - lazy loaded
// const Trips = lazy(() => import("./pages/Trips.jsx"));
// const TripDetail = lazy(() => import("./pages/TripDetail.jsx"));
// const Booking = lazy(() => import("./pages/Booking.jsx"));
// const BookingConfirmation = lazy(
//   () => import("./pages/BookingConfirmation.jsx"),
// );
// const Login = lazy(() => import("./pages/Login.jsx"));
// const Register = lazy(() => import("./pages/Register.jsx"));
// const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
// const ResetPassword = lazy(() => import("./pages/ResetPassword.jsx"));
// const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
// const MyBookings = lazy(() => import("./pages/MyBookings.jsx"));
// const Wishlist = lazy(() => import("./pages/Wishlist.jsx"));
// const Profile = lazy(() => import("./pages/Profile.jsx"));
// const Blog = lazy(() => import("./pages/Blog.jsx"));
// const BlogDetail = lazy(() => import("./pages/BlogDetail.jsx"));
// const About = lazy(() => import("./pages/About.jsx"));
// const Contact = lazy(() => import("./pages/Contact.jsx"));
// const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
// const TermsOfService = lazy(() => import("./pages/TermsOfService.jsx"));
// const EventAndFestivals = lazy(() => import("./pages/EventsAndFestivals.jsx"));

// // Pages without Navbar/Footer (auth pages)
// const AUTH_ROUTES = ["/auth/login", "/auth/register", "/auth/forgot-password"];

// // Component for handling the dropdown & destination view logic
// function DestinationExplorer() {
//   const [selectedDestination, setSelectedDestination] = useState(null);

//   const handleSelect = (item) => {
//     if (item === "all") {
//       setSelectedDestination({ isAll: true, data: destinations });
//     } else {
//       setSelectedDestination(item);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-800 flex items-center justify-center p-4">
//       {!selectedDestination ? (
//         <div className="text-center">
//           <h2 className="text-white text-2xl font-bold mb-6">
//             Explore Top Travel Spots
//           </h2>
//           <DestinationDropdown onSelectDestination={handleSelect} />
//         </div>
//       ) : (
//         <DestinationPage
//           destination={
//             selectedDestination.isAll ? selectedDestination : selectedDestination
//           }
//           onBack={() => setSelectedDestination(null)}
//         />
//       )}
//     </div>
//   );
// }

// function AppContent() {
//   const location = useLocation();
//   const isAuthPage = AUTH_ROUTES.some((path) =>
//     location.pathname.startsWith("/auth/"),
//   );
//   const isNoNavPage = false;

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       {!isAuthPage && !isNoNavPage && <Navbar />}
//       <main className="flex-1">
//         <Suspense fallback={<Loader variant="fullpage" />}>
//           <AnimatePresence mode="wait">
//             <Routes location={location} key={location.pathname}>
//               {/* Public Routes */}
//               <Route path="/" element={<Home />} />
//               <Route path="/trips" element={<Trips />} />
//               <Route path="/trips/:slug" element={<TripDetail />} />
//               <Route
//                 path="/trips/category/:categorySlug"
//                 element={<Trips />}
//               />
//               <Route path="/destination/:state" element={<Trips />} />
//               <Route path="/packages" element={<Packages />} />

//               {/* Destinations View Route */}
//               <Route path="/destinations" element={<DestinationExplorer />} />

//               {/* Auth Routes */}
//               <Route path="/auth/login" element={<Login />} />
//               <Route path="/auth/register" element={<Register />} />
//               <Route
//                 path="/auth/forgot-password"
//                 element={<ForgotPassword />}
//               />
//               <Route
//                 path="/auth/reset-password/:token"
//                 element={<ResetPassword />}
//               />

//               {/* Protected Routes */}
//               <Route path="/booking/:tripId" element={<Booking />} />
//               <Route
//                 path="/booking/confirm/:bookingId"
//                 element={
//                   <ProtectedRoute>
//                     <BookingConfirmation />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/dashboard"
//                 element={
//                   <ProtectedRoute>
//                     <Dashboard />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/dashboard/bookings"
//                 element={
//                   <ProtectedRoute>
//                     <MyBookings />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/dashboard/wishlist"
//                 element={
//                   <ProtectedRoute>
//                     <Wishlist />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/dashboard/profile"
//                 element={
//                   <ProtectedRoute>
//                     <Profile />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* Content Routes */}
//               <Route path="/blog" element={<Blog />} />
//               <Route path="/blog/:slug" element={<BlogDetail />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/contact" element={<Contact />} />
//               <Route path="/privacy" element={<PrivacyPolicy />} />
//               <Route path="/terms" element={<TermsOfService />} />
//               <Route path="/sitemap" element={<Sitemap />} />
//               <Route path="/disclaimer" element={<Disclaimer />} />
//               <Route path="/careers" element={<Careers />} />
//               <Route
//                 path="/event-and-festivels"
//                 element={<EventAndFestivals />}
//               />

//               {/* 404 */}
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </AnimatePresence>
//         </Suspense>
//       </main>
//       {!isAuthPage && !isNoNavPage && <Footer />}
//       <ScrollToTop />
//     </div>
//   );
// }

// export default function App() {
//   return <AppContent />;
// }

