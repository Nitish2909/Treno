// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { User, Mail, Phone, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
// import toast from "react-hot-toast";
// import { useRegisterMutation } from "../store/api/authApi.js";
// import { useAuth } from "../hooks/useAuth.js";
// import clsx from "clsx";
// import TrenoLogo from "../assets/TrenoLogo.webp";

// const PEXELS_IMAGE =
//   "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

// function getPasswordStrength(password) {
//   if (!password) return { label: "", color: "", width: "0%", level: 0 };
//   let score = 0;
//   if (password.length >= 8) score++;
//   if (/[A-Z]/.test(password)) score++;
//   if (/[0-9]/.test(password)) score++;
//   if (/[^A-Za-z0-9]/.test(password)) score++;
//   if (score <= 1)
//     return { label: "Weak", color: "bg-red-400", width: "33%", level: 1 };
//   if (score <= 2)
//     return { label: "Medium", color: "bg-yellow-400", width: "66%", level: 2 };
//   return { label: "Strong", color: "bg-green-500", width: "100%", level: 3 };
// }

// export default function Register() {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();
//   const [register, { isLoading }] = useRegisterMutation();

//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     agreeTerms: false,
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [errors, setErrors] = useState({});

//   const strength = getPasswordStrength(form.password);

//   useEffect(() => {
//     if (isAuthenticated) navigate("/dashboard", { replace: true });
//   }, [isAuthenticated, navigate]);

//   const validate = () => {
//     const errs = {};
//     if (!form.fullName.trim() || form.fullName.trim().length < 2)
//       errs.fullName = "Full name must be at least 2 characters.";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
//       errs.email = "Enter a valid email address.";
//     if (!/^[6-9]\d{9}$/.test(form.phone))
//       errs.phone = "Enter a valid 10-digit Indian mobile number.";
//     if (form.password.length < 6)
//       errs.password = "Password must be at least 6 characters.";
//     if (form.password !== form.confirmPassword)
//       errs.confirmPassword = "Passwords do not match.";
//     if (!form.agreeTerms)
//       errs.agreeTerms = "You must accept the Terms of Service.";
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
//       await register({
//         name: form.fullName.trim(),
//         email: form.email,
//         // phone: `+91${form.phone}`,
//            phone: form.phone,
//         password: form.password,
//       }).unwrap();
//       toast.success("Account created! Welcome to Treno 🎉");
//       navigate("/dashboard", { replace: true });
//     } catch (err) {
//       toast.error(
//         err?.data?.message || "Registration failed. Please try again.",
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
//       <div className="flex flex-col justify-center w-full md:w-1/2 px-8 py-12 sm:px-16 lg:px-24 bg-white overflow-y-auto">
//         <div className="max-w-md w-full mx-auto">
//           {/* Logo */}
//           <div className="flex items-center gap-2 mb-8">
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
//                 className="w-40 h-40 transform group-hover:scale-105 transition-all duration-300 ease-out relative z-10 drop-shadow-md group-hover:drop-shadow-lg"
//               />
//             </Link>
//           </div>

//           <h1
//             className="text-3xl font-bold text-gray-900 mb-2"
//             style={{ fontFamily: "Playfair Display, serif" }}
//           >
//             Create Account
//           </h1>
//           <p className="text-gray-500 mb-6">
//             Join thousands of explorers on Treno.
//           </p>

//           <form onSubmit={handleSubmit} noValidate className="space-y-4">
//             {/* Full Name */}
//             <div>
//               <label
//                 htmlFor="fullName"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Full Name
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   id="fullName"
//                   name="fullName"
//                   type="text"
//                   autoComplete="name"
//                   value={form.fullName}
//                   onChange={handleChange}
//                   placeholder="full name"
//                   className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${errors.fullName ? "border-red-400 bg-red-50" : "border-gray-300"}`}
//                 />
//               </div>
//               {errors.fullName && (
//                 <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
//               )}
//             </div>

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Email
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
//                   className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${errors.email ? "border-red-400 bg-red-50" : "border-gray-300"}`}
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-xs text-red-500 mt-1">{errors.email}</p>
//               )}
//             </div>

//             {/* Phone */}
//             <div>
//               <label
//                 htmlFor="phone"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Phone
//               </label>
//               <div className="relative flex">
//                 <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm select-none">
//                   <Phone className="w-3.5 h-3.5 mr-1" />
//                   +91
//                 </span>
//                 <input
//                   id="phone"
//                   name="phone"
//                   type="tel"
//                   inputMode="numeric"
//                   maxLength={10}
//                   value={form.phone}
//                   onChange={handleChange}
//                   placeholder="9876543210"
//                   className={`flex-1 px-4 py-2.5 rounded-r-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-300"}`}
//                 />
//               </div>
//               {errors.phone && (
//                 <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
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
//                   autoComplete="new-password"
//                   value={form.password}
//                   onChange={handleChange}
//                   placeholder="Min 6 characters"
//                   className={`w-full pl-10 pr-10 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${errors.password ? "border-red-400 bg-red-50" : "border-gray-300"}`}
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
//               {/* Strength indicator */}
//               {form.password && (
//                 <div className="mt-2">
//                   <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
//                     <div
//                       className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
//                       style={{ width: strength.width }}
//                     />
//                   </div>
//                   <p
//                     className={`text-xs mt-1 font-medium ${strength.level === 1 ? "text-red-500" : strength.level === 2 ? "text-yellow-600" : "text-green-600"}`}
//                   >
//                     {strength.label}
//                   </p>
//                 </div>
//               )}
//               {errors.password && (
//                 <p className="text-xs text-red-500 mt-1">{errors.password}</p>
//               )}
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label
//                 htmlFor="confirmPassword"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showConfirm ? "text" : "password"}
//                   autoComplete="new-password"
//                   value={form.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="Repeat password"
//                   className={`w-full pl-10 pr-10 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${errors.confirmPassword ? "border-red-400 bg-red-50" : "border-gray-300"}`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirm((v) => !v)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   aria-label={showConfirm ? "Hide password" : "Show password"}
//                 >
//                   {showConfirm ? (
//                     <EyeOff className="w-4 h-4" />
//                   ) : (
//                     <Eye className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p className="text-xs text-red-500 mt-1">
//                   {errors.confirmPassword}
//                 </p>
//               )}
//             </div>

//             {/* Terms */}
//             <div>
//               <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer select-none">
//                 <input
//                   name="agreeTerms"
//                   type="checkbox"
//                   checked={form.agreeTerms}
//                   onChange={handleChange}
//                   className="w-4 h-4 mt-0.5 accent-amber-500 rounded flex-shrink-0"
//                 />
//                 <span>
//                   I agree to the{" "}
//                   <Link to="/terms" className="text-amber-600 hover:underline">
//                     Terms of Service
//                   </Link>{" "}
//                   and{" "}
//                   <Link
//                     to="/privacy"
//                     className="text-amber-600 hover:underline"
//                   >
//                     Privacy Policy
//                   </Link>
//                 </span>
//               </label>
//               {errors.agreeTerms && (
//                 <p className="text-xs text-red-500 mt-1">{errors.agreeTerms}</p>
//               )}
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold py-3 rounded-lg transition-colors text-sm shadow-sm mt-2"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   Creating account…
//                 </>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>

//           <p className="mt-6 text-center text-sm text-gray-500">
//             Already have an account?{" "}
//             <Link
//               to="/auth/login"
//               className="text-amber-600 hover:text-amber-700 font-semibold"
//             >
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* ── Right: Hero image ── */}
//       <div className="hidden md:block md:w-1/2 relative overflow-hidden">
//         <img
//           src={PEXELS_IMAGE}
//           alt="Travel destination"
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
//               Travel is the only thing you buy that makes you richer.
//             </p>
//             <footer className="mt-4 text-amber-300 text-sm font-medium">
//               — Anonymous
//             </footer>
//           </blockquote>
//         </div>
//       </div>
//     </motion.div>
//   );
// }




import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Star,
  Globe2
} from "lucide-react";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../store/api/authApi.js";
import { useAuth } from "../hooks/useAuth.js";
import clsx from "clsx";
import TrenoLogo from "../assets/TrenoLogo.webp";

const PEXELS_IMAGE =
  "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

function getPasswordStrength(password) {
  if (!password) return { label: "", color: "", width: "0%", level: 0 };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1)
    return { label: "Weak", color: "bg-rose-500", width: "33%", level: 1 };
  if (score <= 2)
    return { label: "Medium", color: "bg-amber-500", width: "66%", level: 2 };
  return { label: "Strong", color: "bg-emerald-500", width: "100%", level: 3 };
}

export default function Register() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [register, { isLoading }] = useRegisterMutation();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const strength = getPasswordStrength(form.password);

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2)
      errs.fullName = "Full name must be at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address.";
    if (!/^[6-9]\d{9}$/.test(form.phone))
      errs.phone = "Enter a valid 10-digit Indian mobile number.";
    if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match.";
    if (!form.agreeTerms)
      errs.agreeTerms = "You must accept the Terms of Service.";
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
      await register({
        name: form.fullName.trim(),
        email: form.email,
        phone: form.phone,
        password: form.password,
      }).unwrap();
      toast.success("Account created! Welcome to Treno 🎉");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(
        err?.data?.message || "Registration failed. Please try again.",
      );
    }
  };

  const formContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        staggerChildren: 0.06 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className="min-h-screen flex bg-slate-950 font-sans antialiased text-slate-800 selection:bg-amber-500 selection:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Left Side: Modern Form Container ── */}
      <div className="flex flex-col justify-between w-full md:w-1/2 px-6 py-8 sm:px-12 lg:px-20 bg-white relative z-10 overflow-y-auto min-h-screen">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent pointer-events-none -z-10 blur-2xl" />

        <div className="max-w-md w-full mx-auto my-auto py-6">
          
          {/* Logo & Header Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={formContainerVariants}
            className="mb-8"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
              <Link
                to="/"
                className="flex items-center justify-center flex-shrink-0 group relative"
              >
                {/* Glowing ring behind logo */}
                <div
                  className={clsx(
                    "absolute -inset-3 rounded-full bg-amber-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl scale-90 group-hover:scale-105",
                  )}
                />

                {/* Main Logo */}
                <img
                  src={TrenoLogo}
                  alt="Treno Logo"
                  className="w-36 h-36 object-contain transform group-hover:scale-105 transition-all duration-300 ease-out relative z-10 drop-shadow-md group-hover:drop-shadow-xl"
                />
              </Link>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-2"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Start Your Journey
            </motion.h1>
            <motion.p variants={itemVariants} className="text-slate-500 text-sm sm:text-base">
              Create an account to unlock tailored stays and seamless travel planning.
            </motion.p>
          </motion.div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            
            {/* Full Name Input */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="fullName"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors w-4 h-4" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Alex Morgan"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 ${
                    errors.fullName ? "border-rose-400 bg-rose-50/30" : "border-slate-200 hover:border-slate-300"
                  }`}
                />
              </div>
              <AnimatePresence>
                {errors.fullName && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-rose-500 mt-1.5 font-medium flex items-center gap-1"
                  >
                    {errors.fullName}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Email Input */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors w-4 h-4" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="alex@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 ${
                    errors.email ? "border-rose-400 bg-rose-50/30" : "border-slate-200 hover:border-slate-300"
                  }`}
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-rose-500 mt-1.5 font-medium flex items-center gap-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Phone Input */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="phone"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Mobile Number
              </label>
              <div className="relative flex rounded-xl border bg-slate-50/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:border-amber-500 transition-all duration-200 border-slate-200 hover:border-slate-300 overflow-hidden">
                <span className="inline-flex items-center px-3.5 bg-slate-100/70 border-r border-slate-200 text-slate-600 text-xs font-semibold select-none">
                  <Phone className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                  +91
                </span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className={`flex-1 px-4 py-3 bg-transparent text-slate-900 text-sm focus:outline-none ${
                    errors.phone ? "bg-rose-50/30" : ""
                  }`}
                />
              </div>
              <AnimatePresence>
                {errors.phone && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-rose-500 mt-1.5 font-medium flex items-center gap-1"
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Password Input */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors w-4 h-4" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 ${
                    errors.password ? "border-rose-400 bg-rose-50/30" : "border-slate-200 hover:border-slate-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password Strength Meter */}
              {form.password && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold text-slate-500">
                      Security Level
                    </span>
                    <span
                      className={`text-[11px] font-bold tracking-wide uppercase ${
                        strength.level === 1
                          ? "text-rose-500"
                          : strength.level === 2
                          ? "text-amber-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {strength.label}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200/80 rounded-full overflow-hidden flex gap-0.5">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${strength.color}`}
                      style={{ width: strength.width }}
                    />
                  </div>
                </motion.div>
              )}
              
              <AnimatePresence>
                {errors.password && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-rose-500 mt-1.5 font-medium flex items-center gap-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Confirm Password Input */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors w-4 h-4" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 ${
                    errors.confirmPassword ? "border-rose-400 bg-rose-50/30" : "border-slate-200 hover:border-slate-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <AnimatePresence>
                {errors.confirmPassword && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-rose-500 mt-1.5 font-medium flex items-center gap-1"
                  >
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Terms Agreement */}
            <motion.div variants={itemVariants} className="pt-1">
              <label className="flex items-start gap-3 text-xs text-slate-600 cursor-pointer select-none group">
                <input
                  name="agreeTerms"
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 border-slate-300 rounded text-amber-500 focus:ring-amber-500/30 focus:ring-offset-0 cursor-pointer transition accent-amber-500"
                />
                <span className="leading-relaxed">
                  I agree to the{" "}
                  <Link to="/terms" className="text-amber-600 font-semibold hover:text-amber-700 underline underline-offset-2">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-amber-600 font-semibold hover:text-amber-700 underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              <AnimatePresence>
                {errors.agreeTerms && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-rose-500 mt-1.5 font-medium flex items-center gap-1"
                  >
                    {errors.agreeTerms}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full relative group overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-70 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 text-sm shadow-md shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/35 mt-4"
            >
              {/* Button Shimmer Effect */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />

              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating account…</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs sm:text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-amber-600 hover:text-amber-700 font-semibold transition-colors inline-flex items-center gap-1 underline-offset-2 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Security Tag */}
        <div className="text-center py-2 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>256-Bit Encrypted & Secure Sign Up</span>
        </div>
      </div>

      {/* ── Right Side: Enhanced Hero Image Panel ── */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden bg-slate-900">
        
        {/* Destination Image with Parallax Scale */}
        <img
          src={PEXELS_IMAGE}
          alt="Travel destination"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
        />

        {/* Layered Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-900/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/50" />

        {/* Top Badges */}
        <div className="absolute top-10 left-10 right-10 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium shadow-2xl">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Curated Stays & Experiences</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/10 text-white/90 text-xs">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-semibold">4.9/5</span>
            <span className="text-slate-400 text-[10px]">(12k+ reviews)</span>
          </div>
        </div>

        {/* Floating Glass Quote Box */}
        <div className="absolute inset-0 flex flex-col justify-end p-12 lg:p-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-slate-950/40 backdrop-blur-xl border border-white/15 p-8 rounded-3xl max-w-lg shadow-2xl"
          >
            {/* Top Badge on Box */}
            <div className="absolute -top-3.5 left-8 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Globe2 className="w-3 h-3" />
              Explore The World
            </div>

            <blockquote>
              <svg
                className="w-8 h-8 text-amber-400/80 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p
                className="text-xl sm:text-2xl font-medium leading-relaxed text-white drop-shadow-sm"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Travel is the only thing you buy that makes you richer.
              </p>
              <footer className="mt-4 text-amber-300/90 text-sm font-semibold tracking-wide flex items-center gap-2">
                <span className="w-6 h-px bg-amber-400/50 inline-block" />
                — Anonymous
              </footer>
            </blockquote>

            {/* Micro Feature Icons inside Quote Box */}
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Zero Booking Fees</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}