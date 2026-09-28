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
  Crown,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ShoppingBag
} from 'lucide-react';
import { Role, User } from '../types/rental';
import { DEMO_USERS, INITIAL_ADDRESSES } from '../data/rentalData';

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

  // Fits preferences (Women / Men / Kids, age calibration) - No address required here!
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
      setShopName(demo.shopName || 'Singhania Boutiques');
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
        phone: '+91 98765 43210',
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
    <div className="min-h-screen relative overflow-hidden bg-[#0a050d] text-neutral-100 flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      {/* Dynamic Ambient Luxury Lighting Effects */}
      <div className="absolute -top-40 -left-40 w-[550px] h-[550px] bg-rose-900/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-amber-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Simple Brand Bar */}
      <header className="relative z-10 px-6 sm:px-10 py-4 border-b border-rose-950/40 bg-black/40 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-600 to-amber-400 flex items-center justify-center font-black text-white text-base shadow-lg shadow-rose-900/50 ring-1 ring-white/20">
            R
          </div>
          <div>
            <span className="font-brand font-black text-2xl tracking-tight bg-gradient-to-r from-white via-rose-100 to-amber-200 bg-clip-text text-transparent block leading-none">
              REVOGUE
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-amber-300/90 block mt-0.5">
              Haute Couture Rentals
            </span>
          </div>
        </div>

        {onExploreAsGuest && (
          <button
            onClick={onExploreAsGuest}
            className="text-xs font-bold text-neutral-200 hover:text-white transition flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-500/30 hover:border-rose-400 bg-white/5 hover:bg-white/10 backdrop-blur-md shadow-sm"
          >
            <span>Explore as Guest</span>
            <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
          </button>
        )}
      </header>

      {/* Main Luxury Center Card */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-md bg-neutral-950/80 border border-white/10 rounded-3xl shadow-[0_25px_60px_-15px_rgba(244,63,94,0.18)] p-6 sm:p-8 backdrop-blur-2xl space-y-6 animate-in fade-in zoom-in-95 duration-300 ring-1 ring-white/10">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-300 text-[10px] font-extrabold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>India’s Premier Wardrobe Access</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-brand">
              {authMode === 'login' ? 'Welcome to REVOGUE' : 'Join REVOGUE Elite'}
            </h1>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              {authMode === 'login'
                ? 'Sign in to access designer bridal lehengas, royal sherwanis & festive couture'
                : 'Rent authentic couture for weddings, festivals & celebratory occasions'}
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div>
            <label className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
              <span>Account Type</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-neutral-900/90 rounded-2xl border border-neutral-800">
              <button
                type="button"
                onClick={() => setSelectedRole('customer')}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  selectedRole === 'customer'
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-950/50'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Customer</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('shop_owner')}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  selectedRole === 'shop_owner'
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-950/50'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Boutique</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  selectedRole === 'admin'
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-950/50'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Quick 1-Click Demo Fill */}
          <div className="flex items-center justify-between text-[11px] text-neutral-300 bg-rose-950/30 px-3.5 py-2.5 rounded-xl border border-rose-500/20">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>1-Click Test Credentials:</span>
            </span>
            <button
              type="button"
              onClick={() => handleFillDemo(selectedRole)}
              className="text-amber-300 hover:text-amber-200 font-bold underline underline-offset-2 transition"
            >
              Fill {selectedRole === 'customer' ? 'Customer' : selectedRole === 'shop_owner' ? 'Shop' : 'Admin'}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field if register or shop owner */}
            {(authMode === 'register' || selectedRole === 'shop_owner') && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300 block">
                  {selectedRole === 'shop_owner' ? 'Boutique Name / Owner' : 'Your Full Name'}
                </label>
                <input
                  type="text"
                  placeholder={selectedRole === 'shop_owner' ? 'Singhania Luxury Boutiques' : 'e.g. Vaishnavi Chaudhary'}
                  value={selectedRole === 'shop_owner' ? (shopName || name) : name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (selectedRole === 'shop_owner') setShopName(e.target.value);
                  }}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-500 text-xs focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:outline-none transition"
                />
              </div>
            )}

            {/* Email / Mobile */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300 block">
                Email or Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="name@example.com or +91..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-500 text-xs focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-300 block">Password</label>
                {authMode === 'login' && (
                  <span className="text-[11px] text-amber-300/90 hover:underline cursor-pointer">
                    Forgot?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-500 text-xs focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-neutral-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Fits Calibration (Only for Customers - NO address requested) */}
            {selectedRole === 'customer' && (
              <div className="pt-2 pb-1 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Personalized Fits & Department</span>
                  </span>
                  <span className="text-[10px] text-neutral-400 font-medium">
                    (Curates your feed)
                  </span>
                </div>

                {/* Fits Pills: Women, Men, Kids */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'women' as const, label: 'Women', icon: '👗', desc: 'Bridal & Gowns' },
                    { id: 'men' as const, label: 'Men', icon: '👔', desc: 'Sherwani & Tux' },
                    { id: 'kids' as const, label: 'Kids', icon: '✨', desc: 'Fancy & Costumes' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFit(f.id)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition ${
                        selectedFit === f.id
                          ? 'border-rose-500 bg-rose-500/15 text-white ring-2 ring-rose-500/30'
                          : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                      }`}
                    >
                      <span className="text-lg">{f.icon}</span>
                      <span className="text-xs font-bold mt-0.5 text-white">{f.label}</span>
                      <span className="text-[9px] text-neutral-400 leading-tight truncate max-w-full">
                        {f.desc}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Age Calibration */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                  <span className="text-[11px] text-neutral-400">
                    Age Calibration for Fit:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="5"
                      max="100"
                      value={selectedAge}
                      onChange={(e) => setSelectedAge(Number(e.target.value))}
                      className="w-14 px-2 py-1 bg-neutral-900 border border-neutral-700 rounded-lg text-center text-xs font-bold text-white focus:outline-none focus:border-rose-500"
                    />
                    <span className="text-[11px] text-neutral-400">yrs</span>
                  </div>
                </div>
              </div>
            )}

            {/* Login / Register Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 active:scale-[0.99] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 transition"
            >
              <span>{authMode === 'login' ? 'Sign In & Enter Wardrobe' : 'Create Account & Enter'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle Login / Register */}
          <div className="pt-2 text-center border-t border-neutral-800/80">
            <p className="text-xs text-neutral-400">
              {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
              <button
                type="button"
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="ml-1 text-rose-400 hover:text-rose-300 font-bold underline underline-offset-2"
              >
                {authMode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-4 border-t border-white/10 bg-black/40 backdrop-blur-md text-center text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>REVOGUE Luxury Wardrobe Rentals · 256-Bit SSL Encrypted</span>
        </div>
        <div className="flex items-center gap-4 text-neutral-400 text-[11px]">
          <span>Free Sanitized Dry Cleaning</span>
          <span>•</span>
          <span>100% Refundable Deposits</span>
          <span>•</span>
          <span>Pan-India Delivery</span>
        </div>
      </footer>
    </div>
  );
};
