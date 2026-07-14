import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useResetPasswordMutation } from '../store/api/authApi.js';

function getPasswordStrength(password) {
  if (!password) return { label: '', color: '', width: '0%', level: 0 };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { label: 'Weak', color: 'bg-red-400', width: '33%', level: 1 };
  if (score <= 2) return { label: 'Medium', color: 'bg-yellow-400', width: '66%', level: 2 };
  return { label: 'Strong', color: 'bg-green-500', width: '100%', level: 3 };
}

const COUNTDOWN_SECONDS = 3;

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  const strength = getPasswordStrength(form.password);

  // Countdown + redirect after success
  useEffect(() => {
    if (!success) return;
    if (countdown === 0) {
      navigate('/auth/login', { replace: true });
      return;
    }
    const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [success, countdown, navigate]);

  const validate = () => {
    const errs = {};
    if (form.password.length < 6)
      errs.password = 'Password must be at least 6 characters.';
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = 'Passwords do not match.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    try {
      await resetPassword({ token, password: form.password }).unwrap();
      setSuccess(true);
    } catch (err) {
      toast.error(err?.data?.message || 'Reset failed. The link may have expired.');
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center px-4 py-12"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Treno
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-7 h-7 text-amber-600" />
                  </div>
                  <h1
                    className="text-2xl font-bold text-gray-900 mb-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Set New Password
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Choose a strong password to secure your account.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* New Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        id="password" name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        value={form.password} onChange={handleChange}
                        placeholder="Min 6 characters"
                        className={`w-full pl-10 pr-10 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                      />
                      <button
                        type="button" onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Strength meter */}
                    {form.password && (
                      <div className="mt-2">
                        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                            style={{ width: strength.width }}
                          />
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <p className={`text-xs font-medium ${strength.level === 1 ? 'text-red-500' : strength.level === 2 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {strength.label}
                          </p>
                          <p className="text-xs text-gray-400">
                            {strength.level < 3 ? 'Use uppercase, numbers & symbols for stronger password' : 'Great password!'}
                          </p>
                        </div>
                      </div>
                    )}
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        id="confirmPassword" name="confirmPassword"
                        type={showConfirm ? 'text' : 'password'}
                        autoComplete="new-password"
                        value={form.confirmPassword} onChange={handleChange}
                        placeholder="Repeat new password"
                        className={`w-full pl-10 pr-10 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                      />
                      <button
                        type="button" onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label={showConfirm ? 'Hide password' : 'Show password'}
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <button
                    type="submit" disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold py-3 rounded-lg transition-colors text-sm shadow-sm"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />Resetting…</>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    to="/auth/login"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-amber-600 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                  </Link>
                </div>
              </motion.div>
            ) : (
              /* ── Success state ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 18 }}
                className="text-center py-4"
              >
                <motion.div
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </motion.div>

                <h2
                  className="text-2xl font-bold text-gray-900 mb-3"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Password Reset!
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Your password has been successfully updated. You can now log in with your new password.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-xl py-3 px-4 mb-6">
                  <p className="text-sm text-amber-700">
                    Redirecting to login in{' '}
                    <span className="font-bold text-amber-600">{countdown}</span>{' '}
                    second{countdown !== 1 ? 's' : ''}…
                  </p>
                </div>

                <Link
                  to="/auth/login"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                >
                  Go to Login now
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
