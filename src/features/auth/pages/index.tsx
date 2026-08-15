import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Inline SVG Icons for self-containment without external icon library dependencies
const EyeIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 013.682-.763c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
  </svg>
);

const ArrowRightIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const LockIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const MailIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const UserIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const PhoneIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const ShieldCheckIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const CheckCircleIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SparklesIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const GoogleIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.987 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
  </svg>
);

const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState<'customer' | 'seller'>('customer');
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    rememberMe: true,
    agreeTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0c] text-white flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans relative overflow-hidden selection:bg-white selection:text-black">
      {/* Background Decorative Gradients & Glass Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-900/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Glass Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden bg-neutral-950/70 border border-white/10 backdrop-blur-2xl shadow-[0_32px_64px_rgba(0,0,0,0.8)] relative z-10"
      >
        {/* Left Side: Brand Experience / Editorial Banner (Hidden on mobile/tablet stack, visible on LG+) */}
        <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-neutral-900/90 via-neutral-950 to-black border-r border-white/5 overflow-hidden">
          {/* Subtle Ambient Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

          {/* Top Brand Logo */}
          <div className="relative z-10 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl tracking-tighter shadow-lg shadow-white/10">
              K
            </div>
            <span className="text-2xl font-semibold tracking-widest text-white uppercase font-serif">
              KAIVOR
            </span>
          </div>

          {/* Center Showcase Content */}
          <div className="relative z-10 my-auto py-12">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 uppercase tracking-widest mb-6">
                <SparklesIcon className="w-3.5 h-3.5 text-amber-300" />
                Quiet Luxury & Fashion
              </div>
              <h2 className="text-3xl xl:text-4xl font-light tracking-tight text-white leading-tight font-serif">
                {mode === 'signin' ? (
                  <>
                    Refined elegance, <br />
                    <span className="italic font-normal text-neutral-300">tailored for you.</span>
                  </>
                ) : (
                  <>
                    Begin your journey <br />
                    <span className="italic font-normal text-neutral-300">into exclusivity.</span>
                  </>
                )}
              </h2>
              <p className="mt-4 text-sm text-neutral-400 leading-relaxed font-sans">
                Experience an unprecedented standard in luxury e-commerce. Curated fashion collections with seamless access.
              </p>
            </motion.div>

            {/* Feature Highlights */}
            <div className="mt-8 space-y-3">
              {[
                'Verified Authentic Global Designers',
                'Priority Express Worldwide Shipping',
                'Bespoke Concierge & Personal Styling',
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs text-neutral-300">
                  <CheckCircleIcon className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Footer Quote */}
          <div className="relative z-10 border-t border-white/10 pt-6">
            <p className="text-xs italic text-neutral-500 font-serif">
              "Elegance is not standing out, but being remembered."
            </p>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-center bg-neutral-900/40 backdrop-blur-xl">
          {/* Header Mobile Brand & Mode Switch */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center space-x-3 lg:hidden">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg">
                K
              </div>
              <span className="text-xl font-semibold tracking-widest text-white uppercase font-serif">
                KAIVOR
              </span>
            </div>

            {/* Mode Switcher Pill */}
            <div className="self-start sm:self-auto bg-black/40 p-1 rounded-full border border-white/10 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                  mode === 'signin'
                    ? 'bg-white text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                  mode === 'signup'
                    ? 'bg-white text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white font-serif">
              {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {mode === 'signin'
                ? 'Enter your credential details to access your account'
                : 'Fill in your details to create your bespoke Kaivor profile'}
            </p>
          </div>

          {/* Account Role Selector for Sign Up */}
          {mode === 'signup' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <label className="text-xs font-mono uppercase text-neutral-400 tracking-wider block mb-2">
                I want to join as:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    role === 'customer'
                      ? 'border-white bg-white/10 text-white'
                      : 'border-white/10 bg-black/20 text-neutral-400 hover:border-white/20'
                  }`}
                >
                  <div className="text-xs font-semibold uppercase tracking-wider">Customer</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">Explore & purchase luxury products</div>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('seller')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    role === 'seller'
                      ? 'border-white bg-white/10 text-white'
                      : 'border-white/10 bg-black/20 text-neutral-400 hover:border-white/20'
                  }`}
                >
                  <div className="text-xs font-semibold uppercase tracking-wider">Boutique / Partner</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">Showcase & sell luxury collections</div>
                </button>
              </div>
            </motion.div>
          )}

          {/* Social Authentication Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-medium text-white transition-all duration-200 active:scale-[0.98]"
            >
              <GoogleIcon className="w-4 h-4 text-neutral-300" />
              <span>Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-medium text-white transition-all duration-200 active:scale-[0.98]"
            >
              <GithubIcon className="w-4 h-4 text-neutral-300" />
              <span>GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-[#121215] px-3 text-[10px] uppercase font-mono tracking-widest text-neutral-500 absolute">
              Or continue with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  key="signup-fields"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Full Name */}
                  <div>
                    <label className="text-xs font-mono uppercase text-neutral-400 tracking-wider block mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Julian Vance"
                        required
                        className="w-full bg-black/30 border border-white/10 rounded-full py-3 pl-11 pr-4 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="text-xs font-mono uppercase text-neutral-400 tracking-wider block mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <PhoneIcon className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-black/30 border border-white/10 rounded-full py-3 pl-11 pr-4 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Address */}
            <div>
              <label className="text-xs font-mono uppercase text-neutral-400 tracking-wider block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <MailIcon className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@domain.com"
                  required
                  className="w-full bg-black/30 border border-white/10 rounded-full py-3 pl-11 pr-4 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                  Password
                </label>
                {mode === 'signin' && (
                  <a
                    href="#forgot"
                    className="text-xs text-neutral-400 hover:text-white transition-colors"
                  >
                    Forgot Password?
                  </a>
                )}
              </div>
              <div className="relative">
                <LockIcon className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-black/30 border border-white/10 rounded-full py-3 pl-11 pr-11 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up Only) */}
            {mode === 'signup' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <label className="text-xs font-mono uppercase text-neutral-400 tracking-wider block mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <ShieldCheckIcon className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••••••"
                    required
                    className="w-full bg-black/30 border border-white/10 rounded-full py-3 pl-11 pr-11 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Terms / Remember Me Checkboxes */}
            <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
              {mode === 'signin' ? (
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="rounded border-white/20 bg-black/40 text-white focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span>Keep me signed in</span>
                </label>
              ) : (
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    required
                    className="rounded border-white/20 bg-black/40 text-white focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span>
                    I agree to the{' '}
                    <a href="#terms" className="underline text-white">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#privacy" className="underline text-white">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-3.5 px-6 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-white/10 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Text Switcher */}
          <p className="text-center text-xs text-neutral-400 mt-8">
            {mode === 'signin' ? (
              <>
                Don't have a Kaivor account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-white font-medium underline underline-offset-4 hover:text-neutral-300 transition-colors"
                >
                  Register Now
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-white font-medium underline underline-offset-4 hover:text-neutral-300 transition-colors"
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
