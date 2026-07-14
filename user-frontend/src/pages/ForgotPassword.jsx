import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForgotPasswordMutation } from '../store/api/authApi.js';

export default function ForgotPassword() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [sent, setSent] = useState(false);

  const validate = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await forgotPassword({ email }).unwrap();
      setSent(true);
    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong. Please try again.');
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
            {!sent ? (
              /* ── Request form ── */
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-7 h-7 text-amber-600" />
                  </div>
                  <h1
                    className="text-2xl font-bold text-gray-900 mb-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Forgot Password?
                  </h1>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    No worries! Enter the email address associated with your account and we&apos;ll
                    send you a link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError('');
                        }}
                        placeholder="you@example.com"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${
                          emailError ? 'border-red-400 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold py-3 rounded-lg transition-colors text-sm shadow-sm"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />Sending…</>
                    ) : (
                      'Send Reset Link'
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
                {/* Animated envelope */}
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
                  Email Sent!
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-2">
                  We&apos;ve sent a password reset link to
                </p>
                <p className="text-amber-600 font-semibold text-sm mb-5 break-all">{email}</p>
                <p className="text-gray-400 text-xs leading-relaxed mb-8">
                  Didn&apos;t receive the email? Check your spam folder, or{' '}
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="text-amber-600 hover:underline font-medium"
                  >
                    try again with a different email
                  </button>
                  . The link expires in 30 minutes.
                </p>

                <Link
                  to="/auth/login"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-amber-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
