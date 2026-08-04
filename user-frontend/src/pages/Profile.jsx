import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Heart,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Camera,
  Loader2,
  CheckCircle,
  AlertCircle,
  Bell,
  Globe,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth.js";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useChangePasswordMutation,
} from "../store/api/authApi.js";

const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, to: "/dashboard" },
  { label: "My Bookings", icon: Calendar, to: "/dashboard/bookings" },
  { label: "Wishlist", icon: Heart, to: "/dashboard/wishlist" },
  { label: "Profile Settings", icon: Settings, to: "/dashboard/profile" },
];

const PROFILE_TABS = [
  { key: "personal", label: "Personal Info" },
  { key: "password", label: "Change Password" },
  { key: "preferences", label: "Preferences" },
];

const TRIP_TYPES = [
  "Trekking",
  "Beach",
  "Adventure",
  "Cultural",
  "Wildlife",
  "Backpacking",
  "Luxury",
  "Family",
];

const GENDERS = ["Male", "Female", "Non-binary", "Prefer not to say"];

function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
}

function getPasswordStrength(password) {
  if (!password) return { label: "", color: "", width: "0%", level: 0 };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1)
    return { label: "Weak", color: "bg-red-400", width: "33%", level: 1 };
  if (score <= 2)
    return { label: "Medium", color: "bg-yellow-400", width: "66%", level: 2 };
  return { label: "Strong", color: "bg-green-500", width: "100%", level: 3 };
}

function Sidebar({ user, onLogout, onClose, mobile }) {
  const navigate = useNavigate();
  return (
    <aside
      className={`flex flex-col h-full bg-white border-r border-gray-100 ${mobile ? "w-72" : "w-64"}`}
    >
      {mobile && (
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      )}
      <div className="px-5 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-200"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-base">
              {getInitials(user?.name)}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => {
          const active =
            to === "/dashboard"
              ? window.location.pathname === "/dashboard"
              : window.location.pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              onClick={mobile ? onClose : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? "bg-amber-50 text-amber-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${active ? "text-amber-600" : "text-gray-400"}`}
              />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={() => {
            if (typeof onLogout === "function") {
              onLogout();
            }
            navigate("/auth/login", { replace: true });
          }}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}

/* ─────────────────────── Tab 1: Personal Info ─────────────────────── */
function PersonalInfoTab({ profile }) {
  const fileRef = useRef(null);
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();
  const [uploadAvatar, { isLoading: uploading }] = useUploadAvatarMutation();

  const [form, setForm] = useState({
    name: profile?.name || "",
    phone: profile?.phone?.replace("+91", "") || "",
    dob: profile?.dob || "",
    gender: profile?.gender || "",
    city: profile?.city || "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        phone: profile.phone?.replace("+91", "") || "",
        dob: profile.dob || "",
        gender: profile.gender || "",
        city: profile.city || "",
      });
    }
  }, [profile]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.name = "Name must be at least 2 characters.";
    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone))
      errs.phone = "Enter a valid 10-digit Indian number.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      await updateProfile({
        name: form.name.trim(),
        phone: form.phone ? `+91${form.phone}` : "",
        dob: form.dob,
        gender: form.gender,
        city: form.city,
      }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed. Please try again.");
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      await uploadAvatar(formData).unwrap();
      toast.success("Avatar updated!");
    } catch {
      toast.error("Failed to upload avatar.");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Avatar */}
      <div className="flex items-center gap-5 mb-8 pb-8 border-b border-gray-100">
        <div className="relative group">
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-amber-100"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-2xl ring-4 ring-amber-100">
              {getInitials(profile?.name)}
            </div>
          )}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="absolute bottom-0 right-0 w-7 h-7 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow transition-colors"
            aria-label="Upload avatar"
          >
            {uploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Camera className="w-3.5 h-3.5" />
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
        <div>
          <p className="font-semibold text-gray-900">{profile?.name}</p>
          <p className="text-sm text-gray-400 mt-0.5">JPG or PNG, max 5MB</p>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-2 text-xs text-amber-600 hover:underline font-medium"
          >
            Change photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${errors.name ? "border-red-400 bg-red-50" : "border-gray-300"}`}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email (read-only) */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
            <span className="ml-2 inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-normal">
              <CheckCircle className="w-3 h-3 text-green-500" /> Verified
            </span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="email"
              value={profile?.email || ""}
              readOnly
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <div className="relative flex">
            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm select-none">
              <Phone className="w-3.5 h-3.5 mr-1" />
              +91
            </span>
            <input
              name="phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className={`flex-1 px-4 py-2.5 rounded-r-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-300"}`}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition bg-white"
          >
            <option value="">Select gender</option>
            {GENDERS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            name="city"
            type="text"
            value={form.city}
            onChange={handleChange}
            placeholder="Your city"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={updating}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
        >
          {updating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving…
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
}

/* ─────────────────────── Tab 2: Change Password ─────────────────────── */
function ChangePasswordTab() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [show, setShow] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({});
  const strength = getPasswordStrength(form.newPass);

  const validate = () => {
    const errs = {};
    if (!form.current) errs.current = "Current password is required.";
    if (form.newPass.length < 6)
      errs.newPass = "New password must be at least 6 characters.";
    if (form.newPass !== form.confirm) errs.confirm = "Passwords do not match.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      await changePassword({
        currentPassword: form.current,
        newPassword: form.newPass,
      }).unwrap();
      toast.success("Password changed successfully!");
      setForm({ current: "", newPass: "", confirm: "" });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to change password.");
    }
  };

  const toggleShow = (field) =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const fields = [
    {
      name: "current",
      label: "Current Password",
      showKey: "current",
      placeholder: "Enter current password",
    },
    {
      name: "newPass",
      label: "New Password",
      showKey: "newPass",
      placeholder: "Min 6 characters",
    },
    {
      name: "confirm",
      label: "Confirm New Password",
      showKey: "confirm",
      placeholder: "Repeat new password",
    },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-md space-y-5">
      {fields.map(({ name, label, showKey, placeholder }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              name={name}
              type={show[showKey] ? "text" : "password"}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className={`w-full pl-10 pr-10 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${errors[name] ? "border-red-400 bg-red-50" : "border-gray-300"}`}
            />
            <button
              type="button"
              onClick={() => toggleShow(showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={show[showKey] ? "Hide" : "Show"}
            >
              {show[showKey] ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {name === "newPass" && form.newPass && (
            <div className="mt-2">
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${strength.color}`}
                  style={{ width: strength.width }}
                />
              </div>
              <p
                className={`text-xs mt-1 font-medium ${strength.level === 1 ? "text-red-500" : strength.level === 2 ? "text-yellow-600" : "text-green-600"}`}
              >
                {strength.label}
              </p>
            </div>
          )}
          {errors[name] && (
            <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
          )}
        </div>
      ))}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving…
            </>
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </form>
  );
}

/* ─────────────────────── Tab 3: Preferences ─────────────────────── */
function PreferencesTab({ profile }) {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [prefs, setPrefs] = useState({
    newsletter: profile?.preferences?.newsletter ?? true,
    tripTypes: profile?.preferences?.tripTypes || [],
    currency: profile?.preferences?.currency || "INR",
  });

  useEffect(() => {
    if (profile?.preferences) {
      setPrefs({
        newsletter: profile.preferences.newsletter ?? true,
        tripTypes: profile.preferences.tripTypes || [],
        currency: profile.preferences.currency || "INR",
      });
    }
  }, [profile]);

  const toggleTripType = (type) => {
    setPrefs((prev) => ({
      ...prev,
      tripTypes: prev.tripTypes.includes(type)
        ? prev.tripTypes.filter((t) => t !== type)
        : [...prev.tripTypes, type],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ preferences: prefs }).unwrap();
      toast.success("Preferences saved!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save preferences.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-lg">
      {/* Newsletter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4 text-amber-500" /> Notifications
        </h3>
        <label className="flex items-center justify-between gap-4 bg-gray-50 rounded-xl px-4 py-3 cursor-pointer">
          <div>
            <p className="text-sm font-medium text-gray-800">
              Newsletter & Deals
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Receive the best travel deals and trip updates
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={prefs.newsletter}
            onClick={() =>
              setPrefs((p) => ({ ...p, newsletter: !p.newsletter }))
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${prefs.newsletter ? "bg-amber-500" : "bg-gray-300"}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${prefs.newsletter ? "translate-x-6" : "translate-x-1"}`}
            />
          </button>
        </label>
      </div>

      {/* Trip type preferences */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4 text-amber-500" /> Trip Type Preferences
        </h3>
        <p className="text-xs text-gray-400 mb-3">
          Select the types of trips you enjoy
        </p>
        <div className="flex flex-wrap gap-2">
          {TRIP_TYPES.map((type) => {
            const selected = prefs.tripTypes.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleTripType(type)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  selected
                    ? "bg-amber-500 text-white border-amber-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-amber-300 hover:text-amber-600"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Currency */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Currency</h3>
        <select
          value={prefs.currency}
          onChange={(e) =>
            setPrefs((p) => ({ ...p, currency: e.target.value }))
          }
          className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
        >
          <option value="INR">INR — Indian Rupee (₹)</option>
        </select>
        <p className="text-xs text-gray-400 mt-1">
          More currencies coming soon.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving…
          </>
        ) : (
          "Save Preferences"
        )}
      </button>
    </form>
  );
}

/* ─────────────────────── Main Profile Component ─────────────────────── */
export default function Profile() {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const {
    data,
    isLoading: profileLoading,
    isError: profileError,
  } = useGetProfileQuery();

  const profile = data?.data

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-full flex-shrink-0 sticky top-0">
        <Sidebar user={user} onLogout={logout} />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 z-50 md:hidden shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Sidebar
                user={user}
                onLogout={logout}
                mobile
                onClose={() => setDrawerOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile header */}
        <div className="md:hidden flex items-center gap-3 px-4 py-4 bg-white border-b border-gray-100 sticky top-0 z-30">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <span
            className="font-bold text-gray-900"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Profile Settings
          </span>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Heading */}
          <div className="mb-8">
            <h1
              className="text-2xl sm:text-3xl font-bold text-gray-900"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Profile Settings
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage your personal information and preferences.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-8 w-fit">
            {PROFILE_TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === key
                    ? "bg-white text-amber-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            {profileLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-12 bg-gray-100 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : profileError ? (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-600 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                Failed to load profile. Please try refreshing.
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "personal" && (
                    <PersonalInfoTab profile={profile} />
                  )}
                  {activeTab === "password" && <ChangePasswordTab />}
                  {activeTab === "preferences" && (
                    <PreferencesTab profile={profile} />
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
