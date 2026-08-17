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
import Sitmap from "./pages/Sitmap.jsx";
import Packages from "./pages/Packages.jsx";
import Sitemap from "./pages/Sitmap.jsx";
import Disclaimer from "./components/common/Disclaimer.jsx";
import Careers from "./components/common/Careers.jsx";
import WeekendGateways from "./pages/WeekendGateways.jsx";
import Destinations from "./pages/Destinations.jsx";
import DestinationDetails from "./pages/DestinationDetails.jsx";
import CustomCursor from "./components/common/CustomCursor.jsx";
import BookingDetails from "./pages/BookingDetails.jsx";
import BottomNavigation from "./components/home/BottomNavigation.jsx";
import EmployeeLogin from "./pages/EmployeeLogin.jsx";
import InternationalTrips from "./components/home/InternationalTrips.jsx";
import InternationalTripDetails from "./pages/InternationalTripDetails.jsx";
import IndiaTrips from "./components/home/IndiaTrips.jsx";
import IndiaTripDetails from "./pages/IndiaTripDetails.jsx";
import CorporateTour from "./pages/CorporateTour.jsx";
import UpcomingTrips from "./pages/UpcomingTrips.jsx";
import GroupTourDetails from "./pages/GroupTourDetails.jsx";

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
          {/* <CustomCursor/> */}
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
              <Route path="/destinations" element={<Destinations />} />
              <Route
                path="/destinations/:city"
                element={
                  // <ProtectedRoute>
                  <DestinationDetails />
                  // </ProtectedRoute>
                }
              />
              {/* WeekendGateways*/}
              <Route path="/international-trip" element={<InternationalTrips />} />

              <Route path="/international-trip/:name" element={<InternationalTripDetails />} />

              <Route path="/india-trip" element={<IndiaTrips />} />

              <Route path="/india-trip/:name" element={<IndiaTripDetails />} />

              <Route path="/group-tour/:name" element={<GroupTourDetails />} />

              <Route path="/packages" element={<Packages />} />

              <Route path="/corporate-tour" element={<CorporateTour />} />

               <Route path="/upcoming-trip" element={<UpcomingTrips />} />

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

              <Route path="/auth/employee-login" element={<EmployeeLogin />} />

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
                path="/dashboard/bookings/:id"
                element={
                  <ProtectedRoute>
                    <BookingDetails />
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

      {/* bottom navigation  */}
      <BottomNavigation />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
