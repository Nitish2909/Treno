import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Lock,
  Bell,
  Camera,
  Loader2,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import {
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useChangeAdminPasswordMutation,
} from "../store/api/adminApi";
import { updateAdminProfile } from "../store/slices/adminAuthSlice";
import PageHeader from "../components/common/PageHeader";
import clsx from "clsx";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "password", label: "Change Password", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function Settings() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.adminAuth);
  const [tab, setTab] = useState("profile");

  /* Profile */
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [updateProfile, { isLoading: profileLoading }] =
    useUpdateAdminProfileMutation();

  /* Password */
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pwErrors, setPwErrors] = useState({});
  const [changePassword, { isLoading: pwLoading }] =
    useChangeAdminPasswordMutation();

  /* Notifications */
  const [notifs, setNotifs] = useState({
    newBooking: user?.notifications?.newBooking ?? true,
    newUser: user?.notifications?.newUser ?? false,
    cancellation: user?.notifications?.cancellation ?? true,
    reviews: user?.notifications?.reviews ?? true,
  });

  async function handleProfileSave() {
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    try {
      const result = await updateProfile({ name, email, phone }).unwrap();
      dispatch(updateAdminProfile(result.admin || { name, email, phone }));
      toast.success("Profile updated!");
    } catch (e) {
      toast.error(e?.data?.message || "Failed");
    }
  }

  function validatePassword() {
    const e = {};
    if (!currentPw) e.currentPw = "Current password is required";
    if (!newPw) e.newPw = "New password is required";
    else if (newPw.length < 8) e.newPw = "At least 8 characters";
    if (newPw !== confirmPw) e.confirmPw = "Passwords do not match";
    setPwErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handlePasswordChange() {
    if (!validatePassword()) return;
    try {
      await changePassword({
        currentPassword: currentPw,
        newPassword: newPw,
      }).unwrap();
      toast.success("Password changed!");
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
    } catch (e) {
      toast.error(e?.data?.message || "Failed to change password");
    }
  }

  async function handleSaveNotifications() {
    try {
      await updateProfile({ notifications: notifs }).unwrap();
      toast.success("Notification preferences saved!");
    } catch (e) {
      toast.error(e?.data?.message || "Failed");
    }
  }

  return (
    <>
      <Helmet>
        <title>Settings — Treno Admin</title>
      </Helmet>
      <PageHeader
        title="Settings"
        breadcrumbs={[{ label: "System" }, { label: "Settings" }]}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tab nav */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="card p-2 space-y-1">
            {TABS.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={clsx(
                    "w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                    tab === t.id
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-50",
                  )}
                >
                  <Icon size={16} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* ── Profile ─────────────────────────── */}
          {tab === "profile" && (
            <div className="card card-body space-y-5 max-w-xl">
              <h2 className="text-base font-semibold text-gray-900">
                Profile Settings
              </h2>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-primary-100 border-2 border-primary-200 flex items-center justify-center text-primary-600 font-bold text-2xl">
                    {name?.charAt(0)?.toUpperCase() || "A"}
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center shadow">
                    <Camera size={11} className="text-white" />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name</label>
                  <input
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="form-label">Phone</label>
                  <input
                    className="form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Email Address</label>
                <input
                  className="form-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@Treno.in"
                />
              </div>

              <div className="flex justify-end">
                <button
                  className="btn btn-primary"
                  onClick={handleProfileSave}
                  disabled={profileLoading}
                >
                  {profileLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Check size={14} />
                  )}
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* ── Password ────────────────────────── */}
          {tab === "password" && (
            <div className="card card-body space-y-5 max-w-md">
              <h2 className="text-base font-semibold text-gray-900">
                Change Password
              </h2>

              <div>
                <label className="form-label">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    className={clsx(
                      "form-input pr-10",
                      pwErrors.currentPw && "error",
                    )}
                    value={currentPw}
                    onChange={(e) => {
                      setCurrentPw(e.target.value);
                      setPwErrors((p) => ({ ...p, currentPw: "" }));
                    }}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowCurrent((v) => !v)}
                  >
                    {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {pwErrors.currentPw && (
                  <p className="form-error">{pwErrors.currentPw}</p>
                )}
              </div>

              <div>
                <label className="form-label">New Password</label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    className={clsx(
                      "form-input pr-10",
                      pwErrors.newPw && "error",
                    )}
                    value={newPw}
                    onChange={(e) => {
                      setNewPw(e.target.value);
                      setPwErrors((p) => ({ ...p, newPw: "" }));
                    }}
                    placeholder="Min. 8 characters"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowNew((v) => !v)}
                  >
                    {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {pwErrors.newPw && (
                  <p className="form-error">{pwErrors.newPw}</p>
                )}
              </div>

              <div>
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className={clsx("form-input", pwErrors.confirmPw && "error")}
                  value={confirmPw}
                  onChange={(e) => {
                    setConfirmPw(e.target.value);
                    setPwErrors((p) => ({ ...p, confirmPw: "" }));
                  }}
                  placeholder="Re-enter new password"
                />
                {pwErrors.confirmPw && (
                  <p className="form-error">{pwErrors.confirmPw}</p>
                )}
              </div>

              {/* Password strength */}
              {newPw && (
                <div>
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((s) => (
                      <div
                        key={s}
                        className={clsx(
                          "h-1.5 flex-1 rounded-full transition-colors",
                          {
                            "bg-danger-500":
                              newPw.length >= s * 2 && newPw.length < 8,
                            "bg-warning-500":
                              newPw.length >= 8 && newPw.length < 12,
                            "bg-success-500": newPw.length >= 12,
                            "bg-gray-200": newPw.length < s * 2,
                          },
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">
                    {newPw.length < 8
                      ? "Too short"
                      : newPw.length < 12
                        ? "Good"
                        : "Strong"}
                  </p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  className="btn btn-primary"
                  onClick={handlePasswordChange}
                  disabled={pwLoading}
                >
                  {pwLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Lock size={14} />
                  )}
                  Update Password
                </button>
              </div>
            </div>
          )}

          {/* ── Notifications ───────────────────── */}
          {tab === "notifications" && (
            <div className="card card-body space-y-5 max-w-lg">
              <h2 className="text-base font-semibold text-gray-900">
                Notification Preferences
              </h2>
              <p className="text-sm text-gray-500">
                Choose which events you want to be notified about.
              </p>

              <div className="space-y-4">
                {[
                  {
                    key: "newBooking",
                    label: "New Booking",
                    desc: "When a new booking is made",
                  },
                  {
                    key: "newUser",
                    label: "New User",
                    desc: "When a new user registers",
                  },
                  {
                    key: "cancellation",
                    label: "Cancellation",
                    desc: "When a booking is cancelled",
                  },
                  {
                    key: "reviews",
                    label: "New Review",
                    desc: "When a new review is submitted",
                  },
                ].map((n) => (
                  <label
                    key={n.key}
                    className="flex items-start gap-4 cursor-pointer group"
                  >
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={notifs[n.key]}
                        onChange={(e) =>
                          setNotifs((p) => ({
                            ...p,
                            [n.key]: e.target.checked,
                          }))
                        }
                      />
                      <div
                        className={clsx(
                          "w-10 h-5 rounded-full transition-colors duration-200",
                          notifs[n.key] ? "bg-primary-500" : "bg-gray-200",
                        )}
                      />
                      <div
                        className={clsx(
                          "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200",
                          notifs[n.key] ? "translate-x-5" : "translate-x-0",
                        )}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {n.label}
                      </p>
                      <p className="text-xs text-gray-400">{n.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  className="btn btn-primary"
                  onClick={handleSaveNotifications}
                  disabled={profileLoading}
                >
                  {profileLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Check size={14} />
                  )}
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
