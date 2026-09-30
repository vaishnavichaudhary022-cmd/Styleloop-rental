import React, { useState } from 'react';
import {
  User as UserIcon,
  Store,
  Shield,
  ArrowRight,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ShoppingBag,
  RotateCcw
} from 'lucide-react';
import { Role, User } from '../types/rental';
import { DEMO_USERS, INITIAL_ADDRESSES } from '../data/rentalData';
import { Logo } from './Logo';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onExploreAsGuest?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onExploreAsGuest,
}) => {
  const [selectedRole, setSelectedRole] = useState<Role>('customer');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shopName, setShopName] = useState('');

  // Fits preferences (Women / Men / Kids, age calibration)
  const [selectedFit, setSelectedFit] = useState<'women' | 'men' | 'kids'>('women');
  const [selectedAge, setSelectedAge] = useState<number>(24);

  // 1-Click Fill Demo Credentials
  const handleFillDemo = (role: Role) => {
    setSelectedRole(role);
    const demo = DEMO_USERS[role];
    setEmail(demo.email);
    setPassword('demopass123');
    if (role === 'customer') {
      setName(demo.name);
      if (demo.gender && demo.gender !== 'unisex') {
        setSelectedFit(demo.gender);
      }
      if (demo.age) {
        setSelectedAge(demo.age);
      }
    } else if (role === 'shop_owner') {
      setName(demo.name);
      setShopName(demo.shopName || 'Singhania Heritage Couturiers, Nashik');
    } else {
      setName(demo.name);
    }
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedRole === 'customer') {
      const user: User = {
        id: `user-cust-${Date.now()}`,
        name: name.trim() || 'Vaishnavi Chaudhary',
        email: email.trim() || 'vaishnavichaudhary022@gmail.com',
        role: 'customer',
        gender: selectedFit,
        age: selectedAge,
        phone: '+91 94239 88120',
        verified: true,
        addresses: INITIAL_ADDRESSES,
        currentAddressId: 'addr-1',
      };
      onLoginSuccess(user);
    } else if (selectedRole === 'shop_owner') {
      const user: User = {
        ...DEMO_USERS.shop_owner,
        name: name.trim() || DEMO_USERS.shop_owner.name,
        email: email.trim() || DEMO_USERS.shop_owner.email,
        shopName: shopName.trim() || DEMO_USERS.shop_owner.shopName,
      };
      onLoginSuccess(user);
    } else {
      const user: User = {
        ...DEMO_USERS.admin,
        name: name.trim() || DEMO_USERS.admin.name,
        email: email.trim() || DEMO_USERS.admin.email,
      };
      onLoginSuccess(user);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-stone-50 via-rose-50/40 to-amber-50/30 text-neutral-800 flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      {/* Sober ambient luxury light accents */}
      <div className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-rose-200/35 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-[450px] h-[450px] bg-rose-100/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 px-6 sm:px-12 py-4 border-b border-neutral-200/70 bg-white/80 backdrop-blur-md flex items-center justify-between shadow-2xs">
        <Logo variant="login" />

        <div className="flex items-center gap-3">
          {/* Nashik Exclusive Service Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200/70 text-rose-700 text-xs font-bold">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span>Serving Nashik Only</span>
          </div>

          {onExploreAsGuest && (
            <button
              onClick={onExploreAsGuest}
              className="text-xs font-bold text-neutral-700 hover:text-rose-600 transition flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 hover:border-rose-300 bg-white hover:bg-rose-50/50 shadow-2xs"
            >
              <span>Explore as Guest</span>
              <ArrowRight className="w-3.5 h-3.5 text-rose-500" />
            </button>
          )}
        </div>
      </header>

      {/* Main Luxury Center Card */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-md bg-white/95 border border-rose-100/80 rounded-3xl shadow-[0_20px_60px_-15px_rgba(225,29,72,0.08)] p-6 sm:p-8 backdrop-blur-xl space-y-6 animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/[0.03]">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold tracking-wide">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Nashik's Premier Wardrobe Rental</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-brand">
              {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
            </h1>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
              {authMode === 'login'
                ? 'Sign in to access designer bridal lehengas, festive sherwanis & evening gowns delivered across Nashik'
                : 'Rent authentic couture for weddings, festivals & celebratory occasions in Nashik'}
            </p>
          </div>

          {/* Role Selector Tabs (Customer / Boutique Owner / Admin) */}
          <div>
            <label className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest block mb-2">
              Select Account Portal
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-100 rounded-2xl border border-neutral-200/80">
              <button
                type="button"
                onClick={() => setSelectedRole('customer')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  selectedRole === 'customer'
                    ? 'bg-white text-rose-600 shadow-sm border border-neutral-200/60'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Customer</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('shop_owner')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  selectedRole === 'shop_owner'
                    ? 'bg-white text-rose-600 shadow-sm border border-neutral-200/60'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span className="truncate">Boutique</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  selectedRole === 'admin'
                    ? 'bg-white text-rose-600 shadow-sm border border-neutral-200/60'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* If Registering or Shop Owner, ask for Name / Shop */}
            {(authMode === 'register' || selectedRole !== 'customer') && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700">
                  {selectedRole === 'shop_owner' ? 'Boutique / Owner Name' : 'Full Name'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={
                      selectedRole === 'shop_owner'
                        ? 'e.g. Singhania Heritage Couturiers'
                        : 'e.g. Vaishnavi Chaudhary'
                    }
                    className="w-full text-xs py-2.5 px-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-100 text-neutral-900 transition"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    selectedRole === 'customer'
                      ? 'vaishnavichaudhary022@gmail.com'
                      : selectedRole === 'shop_owner'
                      ? 'singhania.couture@revogue.com'
                      : 'admin@revogue.com'
                  }
                  className="w-full text-xs py-2.5 pl-10 pr-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-100 text-neutral-900 transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-neutral-700">
                  Password
                </label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => handleFillDemo(selectedRole)}
                    className="text-[11px] text-rose-600 hover:text-rose-700 font-semibold"
                  >
                    Auto-Fill Demo Pass?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full text-xs py-2.5 pl-10 pr-10 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-100 text-neutral-900 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* If Registering as Customer: Quick Fit Preference */}
            {authMode === 'register' && selectedRole === 'customer' && (
              <div className="space-y-2 pt-1 border-t border-neutral-100">
                <label className="text-xs font-semibold text-neutral-700 block">
                  Primary Wardrobe Fit
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['women', 'men', 'kids'] as const).map((fit) => (
                    <button
                      key={fit}
                      type="button"
                      onClick={() => setSelectedFit(fit)}
                      className={`py-2 rounded-xl text-xs font-bold capitalize transition border ${
                        selectedFit === fit
                          ? 'border-rose-500 bg-rose-50 text-rose-700'
                          : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      {fit}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-200 transition transform active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>
                {authMode === 'login'
                  ? `Sign In as ${selectedRole === 'customer' ? 'Customer' : selectedRole === 'shop_owner' ? 'Boutique Owner' : 'Admin'}`
                  : 'Complete Registration'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 1-Click Demo Logins for Quick Testing */}
          <div className="pt-2 border-t border-neutral-100">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-2 text-center">
              Instant 1-Click Demo Accounts
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleFillDemo('customer')}
                className="p-2 rounded-xl border border-neutral-200 hover:border-rose-300 hover:bg-rose-50/50 bg-neutral-50 text-center transition group"
              >
                <span className="text-[11px] font-bold text-neutral-800 group-hover:text-rose-600 block">
                  Customer
                </span>
                <span className="text-[9px] text-neutral-500 block truncate">
                  Vaishnavi C.
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleFillDemo('shop_owner')}
                className="p-2 rounded-xl border border-neutral-200 hover:border-rose-300 hover:bg-rose-50/50 bg-neutral-50 text-center transition group"
              >
                <span className="text-[11px] font-bold text-neutral-800 group-hover:text-rose-600 block">
                  Boutique
                </span>
                <span className="text-[9px] text-neutral-500 block truncate">
                  Singhania
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleFillDemo('admin')}
                className="p-2 rounded-xl border border-neutral-200 hover:border-rose-300 hover:bg-rose-50/50 bg-neutral-50 text-center transition group"
              >
                <span className="text-[11px] font-bold text-neutral-800 group-hover:text-rose-600 block">
                  Admin
                </span>
                <span className="text-[9px] text-neutral-500 block truncate">
                  Platform
                </span>
              </button>
            </div>
          </div>

          {/* Toggle Login / Register */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-xs text-neutral-500 hover:text-neutral-900"
            >
              {authMode === 'login' ? (
                <>
                  New to REVOGUE?{' '}
                  <strong className="text-rose-600 font-bold underline underline-offset-2">
                    Create an account
                  </strong>
                </>
              ) : (
                <>
                  Already registered?{' '}
                  <strong className="text-rose-600 font-bold underline underline-offset-2">
                    Sign in here
                  </strong>
                </>
              )}
            </button>
          </div>

          {/* Nashik Delivery Assurance Strip */}
          <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-center gap-2 text-xs text-amber-900">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="text-[11px] font-medium">
              Doorstep Delivery in Nashik: <strong>College Rd · Gangapur Rd · Indira Nagar · Govind Nagar</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Sober Luxury Brand Footer Strip */}
      <footer className="relative z-10 px-6 py-4 border-t border-neutral-200/70 bg-white/70 backdrop-blur-md text-center text-xs text-neutral-500">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 font-medium text-neutral-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Sanitized & Dry-Cleaned
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5 font-medium text-neutral-700">
              <ShoppingBag className="w-4 h-4 text-rose-600" />
              Free Backup Size Included
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5 font-medium text-neutral-700">
              <RotateCcw className="w-4 h-4 text-purple-600" />
              Doorstep Reverse Pickup
            </span>
          </div>

          <span className="text-[11px] text-neutral-400">
            © {new Date().getFullYear()} REVOGUE Nashik Couture Rentals.
          </span>
        </div>
      </footer>
    </div>
  );
};
