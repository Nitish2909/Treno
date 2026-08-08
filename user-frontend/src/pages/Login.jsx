// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
// import toast from "react-hot-toast";
// import { useLoginMutation } from "../store/api/authApi.js";
// import { useAuth } from "../hooks/useAuth.js";
// import clsx from "clsx";
// import TrenoLogo from "../assets/TrenoLogo.webp";
// import { setCredentials } from "../store/slices/authSlice.js";
// import {useDispatch} from 'react-redux'
// const PEXELS_IMAGE =
//   "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

// const GoogleIcon = () => (
//   <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
//     <path
//       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//       fill="#4285F4"
//     />
//     <path
//       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//       fill="#34A853"
//     />
//     <path
//       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//       fill="#FBBC05"
//     />
//     <path
//       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//       fill="#EA4335"
//     />
//   </svg>
// );

// const FacebookIcon = () => (
//   <svg
//     viewBox="0 0 24 24"
//     className="w-5 h-5"
//     fill="#1877F2"
//     aria-hidden="true"
//   >
//     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//   </svg>
// );

// export default function Login() {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();
//   const [login, { isLoading }] = useLoginMutation();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const dispatch = useDispatch()

//   useEffect(() => {
//     if (isAuthenticated) {
//       const redirect =
//         localStorage.getItem("Treno_auth_redirect") || "/dashboard";
//       navigate(redirect, { replace: true });
//     }
//   }, [isAuthenticated, navigate]);

//   const validate = () => {
//     const errs = {};
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
//       errs.email = "Enter a valid email address.";
//     if (form.password.length < 6)
//       errs.password = "Password must be at least 6 characters.";
//     return errs;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errs = validate();
//     if (Object.keys(errs).length) {
//       setErrors(errs);
//       return;
//     }

//     try {
//       const result = await login({ email: form.email, password: form.password }).unwrap();
//       const redirect =
//         localStorage.getItem("Treno_auth_redirect") || "/dashboard";
//       localStorage.removeItem("Treno_auth_redirect");
//       console.log(result?.data)
//       dispatch(setCredentials(result?.data))
//       navigate(redirect, { replace: true });

//     } catch (err) {
//       toast.error(
//         err?.data?.message || "Login failed. Please check your credentials.",
//       );
//     }
//   };

//   return (
//     <motion.div
//       className="min-h-screen flex"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       {/* ── Left: Form ── */}
//       <div className="flex flex-col justify-center w-full md:w-1/2 px-8 py-12 sm:px-16 lg:px-24 bg-white">
//         <div className="max-w-md w-full mx-auto">
//           {/* Logo */}
//           <div className="flex items-center gap-2 mb-10">
//             <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center">
//               <svg
//                 viewBox="0 0 24 24"
//                 className="w-5 h-5 text-white fill-current"
//                 aria-hidden="true"
//               >
//                 <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
//               </svg>
//             </div>
//             <Link
//               to="/"
//               className="flex items-center justify-center flex-shrink-0 group relative"
//             >
//               {/* Soft background glow adjusted for the larger logo profile */}
//               <div
//                 className={clsx(
//                   "absolute -inset-4 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-lg",
//                 )}
//               />

//               {/* Significantly larger logo profile (w-24 h-24 / 96px) */}
//               <img
//                 src={TrenoLogo}
//                 alt="Treno Logo"
//                 className="w-32 h-32 transform group-hover:scale-105 transition-all duration-300 ease-out relative z-10 drop-shadow-md group-hover:drop-shadow-lg"
//               />
//             </Link>
//           </div>

//           <h1
//             className="text-3xl font-bold text-gray-900 mb-2"
//             style={{ fontFamily: "Playfair Display, serif" }}
//           >
//             Welcome Back
//           </h1>
//           <p className="text-gray-500 mb-8">
//             Sign in to continue your journey.
//           </p>

//           <form onSubmit={handleSubmit} noValidate className="space-y-5">
//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Email address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="you@example.com"
//                   className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${
//                     errors.email
//                       ? "border-red-400 bg-red-50"
//                       : "border-gray-300 bg-white"
//                   }`}
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-xs text-red-500 mt-1">{errors.email}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   autoComplete="current-password"
//                   value={form.password}
//                   onChange={handleChange}
//                   placeholder="••••••••"
//                   className={`w-full pl-10 pr-10 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${
//                     errors.password
//                       ? "border-red-400 bg-red-50"
//                       : "border-gray-300 bg-white"
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((v) => !v)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-4 h-4" />
//                   ) : (
//                     <Eye className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-xs text-red-500 mt-1">{errors.password}</p>
//               )}
//             </div>

//             {/* Remember me + Forgot password */}
//             <div className="flex items-center justify-between">
//               <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
//                 <input
//                   name="rememberMe"
//                   type="checkbox"
//                   checked={form.rememberMe}
//                   onChange={handleChange}
//                   className="w-4 h-4 accent-amber-500 rounded"
//                 />
//                 Remember me
//               </label>
//               <Link
//                 to="/auth/forgot-password"
//                 className="text-sm text-amber-600 hover:text-amber-700 font-medium"
//               >
//                 Forgot password?
//               </Link>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold py-3 rounded-lg transition-colors text-sm shadow-sm"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   Signing in…
//                 </>
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="relative my-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-200" />
//             </div>
//             <div className="relative flex justify-center">
//               <span className="bg-white px-3 text-xs text-gray-400 uppercase tracking-wider">
//                 or continue with
//               </span>
//             </div>
//           </div>

//           {/* Social buttons */}
//           <div className="grid grid-cols-2 gap-3">
//             <button
//               type="button"
//               disabled
//               className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-500 bg-gray-50 cursor-not-allowed opacity-60"
//             >
//               <GoogleIcon />
//               Google
//             </button>
//             <button
//               type="button"
//               disabled
//               className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-500 bg-gray-50 cursor-not-allowed opacity-60"
//             >
//               <FacebookIcon />
//               Facebook
//             </button>
//           </div>

//           <p className="mt-8 text-center text-sm text-gray-500">
//             Don&apos;t have an account?{" "}
//             <Link
//               to="/auth/register"
//               className="text-amber-600 hover:text-amber-700 font-semibold"
//             >
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* ── Right: Hero image (desktop only) ── */}
//       <div className="hidden md:block md:w-1/2 relative overflow-hidden">
//         <img
//           src={PEXELS_IMAGE}
//           alt="Travel landscape"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-amber-900/50" />
//         <div className="absolute inset-0 flex flex-col justify-end p-12">
//           <blockquote className="text-white max-w-xs">
//             <svg
//               className="w-8 h-8 text-amber-400 mb-4 opacity-80"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//               aria-hidden="true"
//             >
//               <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
//             </svg>
//             <p
//               className="text-xl font-medium leading-relaxed"
//               style={{ fontFamily: "Playfair Display, serif" }}
//             >
//               The world is a book, and those who do not travel read only one
//               page.
//             </p>
//             <footer className="mt-4 text-amber-300 text-sm font-medium">
//               — Saint Augustine
//             </footer>
//           </blockquote>
//         </div>
//       </div>
//     </motion.div>
//   );
// }




import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useLoginMutation } from "../store/api/authApi.js";
import { useAuth } from "../hooks/useAuth.js";
import clsx from "clsx";
import TrenoLogo from "../assets/TrenoLogo.webp";
import { setCredentials } from "../store/slices/authSlice.js";
import { useDispatch } from "react-redux";

const PEXELS_IMAGE =
  "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#1877F2" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

// Framer motion animation variants for staggered children
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [login, { isLoading }] = useLoginMutation();

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      const redirect = localStorage.getItem("Treno_auth_redirect") || "/dashboard";
      navigate(redirect, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const errs = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address.";
    if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      const result = await login({ email: form.email, password: form.password }).unwrap();
      const redirect = localStorage.getItem("Treno_auth_redirect") || "/dashboard";
      localStorage.removeItem("Treno_auth_redirect");
      console.log(result?.data);
      dispatch(setCredentials(result?.data));
      navigate(redirect, { replace: true });
    } catch (err) {
      toast.error(
        err?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-slate-900 font-sans selection:bg-amber-500 selection:text-white">
      {/* ── Cinematic Animated Background ── */}
      <motion.div
        animate={{ scale: 1.05 }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <img
          src={PEXELS_IMAGE}
          alt="Scenic travel destination"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>
      
      {/* ── Gradient Overlays ── */}
      <div className="fixed inset-0 z-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent pointer-events-none lg:block hidden" />
      <div className="fixed inset-0 z-0 bg-slate-900/40 backdrop-blur-[2px] pointer-events-none lg:hidden block" />

      <div className="relative z-10 flex min-h-screen w-full">
        {/* ── Left Side: Brand & Cinematic Quote (Desktop Only) ── */}
        <div className="hidden lg:flex flex-col justify-between w-full p-16 xl:p-24 text-white">
          <Link to="/" className="w-fit transition-transform hover:scale-105 duration-300">
            {/* Using brightness-0 invert to make the webp logo pure white for dark background */}
            <img src={TrenoLogo} alt="Treno Logo" className="w-36 h-36 drop-shadow-2xl brightness-0 invert" />
          </Link>

          <div className="max-w-xl pb-12">
            <svg
              className="w-12 h-12 text-amber-500 mb-6 drop-shadow-lg"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <h2
              className="text-4xl xl:text-5xl font-medium leading-[1.3] tracking-wide drop-shadow-2xl"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              The world is a book, and those who do not travel read only one page.
            </h2>
            <p className="mt-6 text-amber-400 font-semibold tracking-widest uppercase text-sm drop-shadow-md">
              — Saint Augustine
            </p>
          </div>
        </div>

        {/* ── Right Side: Glassmorphism Form Panel ── */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 90 }}
          className="w-full lg:w-[640px] flex-shrink-0 bg-white/80 dark:bg-white/70 backdrop-blur-3xl shadow-[-20px_0_60px_rgba(0,0,0,0.15)] lg:border-l border-white/40 flex flex-col justify-center px-8 py-12 sm:px-16 overflow-y-auto"
        >
          <div className="w-full max-w-md mx-auto">
            
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center mb-10">
              <Link to="/">
                <img src={TrenoLogo} alt="Treno Logo" className="w-28 h-28 drop-shadow-md" />
              </Link>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="mb-10">
              <motion.h1
                variants={fadeUpItem}
                className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Welcome Back
              </motion.h1>
              <motion.p variants={fadeUpItem} className="text-slate-600 text-sm font-medium">
                Please enter your details to sign in.
              </motion.p>
            </motion.div>

            <motion.form variants={staggerContainer} initial="hidden" animate="show" onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Email */}
              <motion.div variants={fadeUpItem}>
                <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 pl-1">
                  Email address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-amber-500 transition-colors duration-300" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={clsx(
                      "block w-full pl-12 pr-4 py-4 bg-white/50 border rounded-2xl text-slate-900 font-medium placeholder-slate-400 backdrop-blur-sm transition-all duration-300 outline-none focus:bg-white focus:ring-4 shadow-sm",
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50"
                        : "border-white/60 focus:border-amber-500 focus:ring-amber-500/20"
                    )}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 font-semibold mt-2 pl-1">{errors.email}</p>}
              </motion.div>

              {/* Password */}
              <motion.div variants={fadeUpItem}>
                <label htmlFor="password" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 pl-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-amber-500 transition-colors duration-300" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={clsx(
                      "block w-full pl-12 pr-12 py-4 bg-white/50 border rounded-2xl text-slate-900 font-medium placeholder-slate-400 backdrop-blur-sm transition-all duration-300 outline-none focus:bg-white focus:ring-4 shadow-sm",
                      errors.password
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50"
                        : "border-white/60 focus:border-amber-500 focus:ring-amber-500/20"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 transition-colors focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 font-semibold mt-2 pl-1">{errors.password}</p>}
              </motion.div>

              {/* Remember me + Forgot password */}
              <motion.div variants={fadeUpItem} className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-3 text-sm text-slate-600 font-medium cursor-pointer select-none group">
                  <div className="relative flex items-center justify-center">
                    <input
                      name="rememberMe"
                      type="checkbox"
                      checked={form.rememberMe}
                      onChange={handleChange}
                      className="peer w-5 h-5 appearance-none border-2 border-slate-300 rounded bg-white/50 checked:bg-amber-500 checked:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition-all cursor-pointer"
                    />
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="group-hover:text-slate-900 transition-colors">Remember me</span>
                </label>
                <Link to="/auth/forgot-password" className="text-sm text-amber-600 hover:text-amber-700 font-bold transition-colors">
                  Forgot password?
                </Link>
              </motion.div>

              {/* Submit */}
              <motion.div variants={fadeUpItem} className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative group w-full flex items-center justify-center gap-2 bg-gradient-to-tr from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold tracking-wide py-4 rounded-2xl transition-all duration-300 shadow-[0_8px_25px_-8px_rgba(245,158,11,0.6)] hover:shadow-[0_12px_35px_-8px_rgba(245,158,11,0.7)] active:scale-[0.98] overflow-hidden"
                >
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </motion.div>
            </motion.form>

            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="mt-8">
              <motion.div variants={fadeUpItem} className="relative flex items-center mb-8">
                <div className="flex-grow border-t border-slate-200/80"></div>
                <span className="flex-shrink-0 mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
                <div className="flex-grow border-t border-slate-200/80"></div>
              </motion.div>

              {/* Social buttons */}
              <motion.div variants={fadeUpItem} className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  disabled
                  className="flex items-center justify-center gap-3 bg-white/40 border border-white/60 rounded-2xl py-3.5 text-sm font-semibold text-slate-600 shadow-sm cursor-not-allowed opacity-60"
                >
                  <GoogleIcon />
                  Google
                </button>
                <button
                  type="button"
                  disabled
                  className="flex items-center justify-center gap-3 bg-white/40 border border-white/60 rounded-2xl py-3.5 text-sm font-semibold text-slate-600 shadow-sm cursor-not-allowed opacity-60"
                >
                  <FacebookIcon />
                  Facebook
                </button>
              </motion.div>

              <motion.p variants={fadeUpItem} className="mt-10 text-center text-sm font-medium text-slate-600">
                Don&apos;t have an account?{" "}
                <Link to="/auth/register" className="text-amber-600 hover:text-amber-700 font-bold transition-colors">
                  Sign up now
                </Link>
              </motion.p>
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* Tailwind custom animation for the button shine */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </main>
  );
}