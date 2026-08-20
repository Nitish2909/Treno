// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { toast } from "react-hot-toast";
// import { Helmet } from "react-helmet-async";
// import {
//   Mountain,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   Loader2,
//   AlertCircle,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { setCredentials } from "../store/slices/adminAuthSlice";
// import { useAdminLoginMutation } from "../store/api/adminApi";
// import TrenoLogo from "../assets/TrenoLogo.webp";
// import clsx from "clsx";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPw, setShowPw] = useState(false);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [adminLogin, { isLoading }] = useAdminLoginMutation();

//   function validate() {
//     const e = {};
//     if (!email.trim()) e.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
//     if (!password.trim()) e.password = "Password is required";
//     else if (password.length < 6) e.password = "At least 6 characters";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!validate()) return;
//     try {
//       const { data: result } = await adminLogin({ email, password }).unwrap();
//       console.log(result);
//       dispatch(setCredentials({ admin: result.admin, token: result.token }));
//       toast.success(`Welcome back, ${result.admin?.name || "Admin"}!`);
//       navigate("/admin/dashboard", { replace: true });
//     } catch (err) {
//       console.log(err);
//       const msg = err?.data?.message || "Invalid email or password";
//       toast.error(msg);
//       if (msg.toLowerCase().includes("email")) {
//         setErrors({ email: msg });
//       } else {
//         setErrors({ password: msg });
//       }
//     }
//   }

//   return (
//     <>
//       <Helmet>
//         <title>Admin Login — Treno</title>
//       </Helmet>
//       <div className="min-h-screen bg-gradient-to-br from-sidebar-bg via-slate-800 to-slate-900 flex items-center justify-center p-4">
//         {/* Background pattern */}
//         <div
//           className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage: `radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 40%), radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 40%)
//               url:('https://images.pexels.com/photos/35126703/pexels-photo-35126703.jpeg')
//               `,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//           }}
//         />

//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="w-full max-w-md relative"
//         >
//           {/* Card */}
//           <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
//             {/* Top accent */}
//             <div className="h-1 bg-gradient-to-r from-primary-500 via-blue-400 to-indigo-500" />

//             <div className="p-8">
//               {/* Logo */}
//               <div className="flex flex-col items-center mb-8">
//                 {/* <div className="w-14 h-14 rounded-2xl bg-primary-600 flex items-center justify-center mb-3 shadow-lg shadow-primary-600/30">
//                   <Mountain size={26} className="text-white" />
//                 </div> */}
//                 <div className="flex items-center justify-center flex-shrink-0 group relative">
//                   {/* Soft background glow adjusted for the larger logo profile */}
//                   <div
//                     className={clsx(
//                       "absolute -inset-4 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-lg",
//                     )}
//                   />

//                   {/* Significantly larger logo profile (w-16 h-16/ 96px) */}
//                   <img
//                     src={TrenoLogo}
//                     alt="Treno Logo"
//                     className="w-20 h-20 transform group-hover:scale-105 transition-all duration-300 ease-out relative z-10 drop-shadow-md group-hover:drop-shadow-lg"
//                   />
//                 </div>
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   Treno Admin
//                 </h1>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Sign in to manage your platform
//                 </p>
//               </div>

//               {/* Form */}
//               <form onSubmit={handleSubmit} noValidate className="space-y-5">
//                 {/* Email */}
//                 <div>
//                   <label className="form-label" htmlFor="email">
//                     Email address
//                   </label>
//                   <div className="relative">
//                     <Mail
//                       size={16}
//                       className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
//                     />
//                     <input
//                       id="email"
//                       type="email"
//                       className={`form-input pl-10 ${errors.email ? "error" : ""}`}
//                       placeholder="      admin@treno.in"
//                       value={email}
//                       onChange={(e) => {
//                         setEmail(e.target.value);
//                         setErrors((v) => ({ ...v, email: "" }));
//                       }}
//                       autoComplete="email"
//                     />
//                   </div>
//                   {errors.email && (
//                     <p className="form-error flex items-center gap-1 mt-1">
//                       <AlertCircle size={12} />
//                       {errors.email}
//                     </p>
//                   )}
//                 </div>

//                 {/* Password */}
//                 <div>
//                   <label className="form-label" htmlFor="password">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <Lock
//                       size={16}
//                       className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
//                     />
//                     <input
//                       id="password"
//                       type={showPw ? "text" : "password"}
//                       className={`form-input pl-10 pr-11 ${errors.password ? "error" : ""}`}
//                       placeholder="     ••••••••"
//                       value={password}
//                       onChange={(e) => {
//                         setPassword(e.target.value);
//                         setErrors((v) => ({ ...v, password: "" }));
//                       }}
//                       autoComplete="current-password"
//                     />
//                     <button
//                       type="button"
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                       onClick={() => setShowPw((v) => !v)}
//                     >
//                       {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
//                     </button>
//                   </div>
//                   {errors.password && (
//                     <p className="form-error flex items-center gap-1 mt-1">
//                       <AlertCircle size={12} />
//                       {errors.password}
//                     </p>
//                   )}
//                 </div>

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   className="btn btn-primary w-full py-3 text-base"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 size={18} className="animate-spin" />
//                       Signing in…
//                     </>
//                   ) : (
//                     "Sign in"
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>

//           <p className="text-center text-xs text-slate-500 mt-6">
//             Treno Admin Panel · Travel Booking Platform
//           </p>
//         </motion.div>
//       </div>
//     </>
//   );
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import {
  Mountain,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { setCredentials } from "../store/slices/adminAuthSlice";
import { useAdminLoginMutation } from "../store/api/adminApi";
import TrenoLogo from "../assets/TrenoLogo.webp";
import clsx from "clsx";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  function validate() {
    const e = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password.trim()) e.password = "Password is required";
    else if (password.length < 6) e.password = "At least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      const { data: result } = await adminLogin({ email, password }).unwrap();
      console.log(result);
      dispatch(setCredentials({ admin: result.admin, token: result.token }));
      toast.success(`Welcome back, ${result.admin?.name || "Admin"}!`);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      console.log(err);
      const msg = err?.data?.message || "Invalid email or password";
      toast.error(msg);
      if (msg.toLowerCase().includes("email")) {
        setErrors({ email: msg });
      } else {
        setErrors({ password: msg });
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Login — Treno</title>
      </Helmet>
      
      {/* Container with background image and gradient overlay */}
      <div 
        className="relative min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat text-slate-100"
        style={{
          backgroundImage: ` url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')`,
        }}
      >
        {/* Soft Ambient Radial Glows */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md relative z-10"
        >
          {/* Glassmorphic Card Container */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden text-gray-800 transition-all duration-300">
            {/* Top Gradient Accent */}
            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400" />

            <div className="p-8 sm:p-10">
              {/* Logo & Header Header */}
              <div className="flex flex-col items-center mb-8">
                <div className="flex items-center justify-center flex-shrink-0 group relative mb-3">
                  <div
                    className={clsx(
                      "absolute -inset-2 rounded-full bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                    )}
                  />

                  <img
                    src={TrenoLogo}
                    alt="Treno Logo"
                    className="w-20 h-20 transform group-hover:scale-105 transition-all duration-300 ease-out relative z-10 drop-shadow-md"
                  />
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  Treno Admin
                </h1>
                <p className="text-sm text-slate-500 mt-1.5 font-medium">
                  Sign in to manage your platform
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors duration-200"
                    />
                    <input
                      id="email"
                      type="email"
                      className={clsx(
                        "w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl text-sm font-medium transition-all duration-200 outline-none text-slate-900 placeholder:text-slate-400",
                        errors.email 
                          ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/30" 
                          : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-slate-300"
                      )}
                      placeholder="admin@treno.in"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((v) => ({ ...v, email: "" }));
                      }}
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs font-medium text-red-500 flex items-center gap-1 mt-1.5">
                      <AlertCircle size={13} />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2" htmlFor="password">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors duration-200"
                    />
                    <input
                      id="password"
                      type={showPw ? "text" : "password"}
                      className={clsx(
                        "w-full pl-11 pr-11 py-3 bg-slate-50 border rounded-xl text-sm font-medium transition-all duration-200 outline-none text-slate-900 placeholder:text-slate-400",
                        errors.password 
                          ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/30" 
                          : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-slate-300"
                      )}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((v) => ({ ...v, password: "" }));
                      }}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                      onClick={() => setShowPw((v) => !v)}
                    >
                      {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs font-medium text-red-500 flex items-center gap-1 mt-1.5">
                      <AlertCircle size={13} />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 hover:opacity-95 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Signing in…</span>
                    </>
                  ) : (
                    <span>Sign in</span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Subtext Footer */}
          <p className="text-center text-xs font-medium text-slate-300/80 mt-6 drop-shadow">
            Treno Admin Panel · Travel Booking Platform
          </p>
        </motion.div>
      </div>
    </>
  );
}