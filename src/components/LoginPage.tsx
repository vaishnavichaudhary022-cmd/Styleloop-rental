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
    <div className="min-h-screen relative overflow-hidden bg-[#FAF9F6] text-stone-800 flex flex-col justify-between selection:bg-stone-900 selection:text-white">
      {/* Top Header Bar */}
      <header className="relative z-10 px-6 sm:px-12 py-3.5 border-b border-stone-200/80 bg-white/90 backdrop-blur-md flex items-center justify-between">
        <Logo variant="login" />

        <div className="flex items-center gap-3">
          {/* Nashik Exclusive Service indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-600 font-medium">
            <MapPin className="w-3.5 h-3.5 text-stone-500" />
            <span>Serving Nashik Only</span>
          </div>

          {onExploreAsGuest && (
            <button
              onClick={onExploreAsGuest}
              className="text-xs font-medium text-stone-800 hover:text-stone-950 transition flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 shadow-2xs"
            >
              <span>Explore as Guest</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-500" />
            </button>
          )}
        </div>
      </header>

      {/* Main Luxury Center Card */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-md bg-white border border-stone-200/80 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-1.5">
            <div className="text-[11px] font-medium tracking-wider uppercase text-stone-500">
              Designer Wardrobe & Costume Rentals · Nashik
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
            </h1>
            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              {authMode === 'login'
                ? 'Sign in to access designer bridal lehengas, festive sherwanis & evening gowns delivered across Nashik'
                : 'Rent authentic couture for weddings, festivals & celebratory occasions in Nashik'}
            </p>
          </div>

          {/* Role Selector Tabs (Customer / Boutique Owner / Admin) */}
          <div>
            <label className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block mb-1.5">
              Select Account Portal
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200/70">
              <button
                type="button"
                onClick={() => setSelectedRole('customer')}
                className={`py-1.5 px-2 rounded-md text-xs font-medium transition flex items-center justify-center gap-1.5 ${
                  selectedRole === 'customer'
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Customer</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('shop_owner')}
                className={`py-1.5 px-2 rounded-md text-xs font-medium transition flex items-center justify-center gap-1.5 ${
                  selectedRole === 'shop_owner'
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span className="truncate">Boutique</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`py-1.5 px-2 rounded-md text-xs font-medium transition flex items-center justify-center gap-1.5 ${
                  selectedRole === 'admin'
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
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
                <label className="text-xs font-medium text-stone-700">
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
                    className="w-full text-xs py-2 px-3 bg-stone-50/60 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900 focus:bg-white focus:ring-1 focus:ring-stone-900/10 text-stone-900 transition"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
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
                  className="w-full text-xs py-2 pl-9 pr-3 bg-stone-50/60 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900 focus:bg-white focus:ring-1 focus:ring-stone-900/10 text-stone-900 transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-stone-700">
                  Password
                </label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => handleFillDemo(selectedRole)}
                    className="text-[11px] text-stone-500 hover:text-stone-900 font-medium underline underline-offset-2"
                  >
                    Auto-Fill Demo Pass
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full text-xs py-2 pl-9 pr-9 bg-stone-50/60 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900 focus:bg-white focus:ring-1 focus:ring-stone-900/10 text-stone-900 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* If Registering as Customer: Quick Fit Preference */}
            {authMode === 'register' && selectedRole === 'customer' && (
              <div className="space-y-2 pt-1 border-t border-stone-100">
                <label className="text-xs font-medium text-stone-700 block">
                  Primary Wardrobe Fit
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['women', 'men', 'kids'] as const).map((fit) => (
                    <button
                      key={fit}
                      type="button"
                      onClick={() => setSelectedFit(fit)}
                      className={`py-1.5 rounded-lg text-xs font-medium capitalize transition border ${
                        selectedFit === fit
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
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
              className="w-full py-2.5 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm tracking-wide shadow-xs transition active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
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
          <div className="pt-2 border-t border-stone-100">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block mb-2 text-center">
              Instant 1-Click Demo Accounts
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleFillDemo('customer')}
                className="p-2.5 rounded-lg border border-stone-200 hover:border-stone-400 bg-stone-50/60 hover:bg-white text-left transition group cursor-pointer"
              >
                <span className="text-[11px] font-semibold text-stone-800 group-hover:text-stone-950 block">
                  Customer
                </span>
                <span className="text-[10px] text-stone-500 block truncate">
                  Vaishnavi C.
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleFillDemo('shop_owner')}
                className="p-2.5 rounded-lg border border-stone-200 hover:border-stone-400 bg-stone-50/60 hover:bg-white text-left transition group cursor-pointer"
              >
                <span className="text-[11px] font-semibold text-stone-800 group-hover:text-stone-950 block">
                  Boutique
                </span>
                <span className="text-[10px] text-stone-500 block truncate">
                  Singhania
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleFillDemo('admin')}
                className="p-2.5 rounded-lg border border-stone-200 hover:border-stone-400 bg-stone-50/60 hover:bg-white text-left transition group cursor-pointer"
              >
                <span className="text-[11px] font-semibold text-stone-800 group-hover:text-stone-950 block">
                  Admin
                </span>
                <span className="text-[10px] text-stone-500 block truncate">
                  Operations
                </span>
              </button>
            </div>
          </div>

          {/* Toggle Login / Register */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-xs text-stone-600 hover:text-stone-900 transition"
            >
              {authMode === 'login' ? (
                <>
                  New to REVOGUE?{' '}
                  <strong className="text-stone-900 font-semibold underline underline-offset-2">
                    Create an account
                  </strong>
                </>
              ) : (
                <>
                  Already registered?{' '}
                  <strong className="text-stone-900 font-semibold underline underline-offset-2">
                    Sign in here
                  </strong>
                </>
              )}
            </button>
          </div>

          {/* Nashik Delivery Assurance Strip */}
          <div className="p-3 rounded-lg bg-stone-100/70 border border-stone-200/80 flex items-center justify-center gap-2 text-xs text-stone-700">
            <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
            <span className="text-[11px]">
              Doorstep Delivery in Nashik: College Rd · Gangapur Rd · Indira Nagar · Govind Nagar
            </span>
          </div>
        </div>
      </div>

      {/* Luxury Brand Footer Strip */}
      <footer className="relative z-10 px-6 py-3.5 border-t border-stone-200/80 bg-white/70 backdrop-blur-md text-center text-xs text-stone-500">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-stone-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
              Sanitized & Dry-Cleaned
            </span>
            <span className="text-stone-400">·</span>
            <span className="flex items-center gap-1 text-stone-700 font-medium">
              <ShoppingBag className="w-3.5 h-3.5 text-stone-600" />
              Free Backup Size Included
            </span>
            <span className="text-stone-400">·</span>
            <span className="flex items-center gap-1 text-stone-700 font-medium">
              <RotateCcw className="w-3.5 h-3.5 text-stone-600" />
              Doorstep Reverse Pickup
            </span>
          </div>

          <span className="text-[11px] text-stone-500">
            © {new Date().getFullYear()} REVOGUE Nashik Couture Rentals.
          </span>
        </div>
      </footer>
    </div>
  );
};
