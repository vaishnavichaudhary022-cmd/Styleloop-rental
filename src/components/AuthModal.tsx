import React, { useState } from 'react';
import { User as UserIcon, Store, Shield, ArrowRight, X, Sparkles } from 'lucide-react';
import { Role, User } from '../types/rental';
import { DEMO_USERS, INITIAL_ADDRESSES } from '../data/rentalData';

interface AuthModalProps {
  isOpen: boolean;
  onClose?: () => void;
  currentUser: User | null;
  onLoginSuccess: (user: User) => void;
  initialRole?: Role;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  initialRole = 'customer',
}) => {
  const [selectedRole, setSelectedRole] = useState<Role>(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fits preferences in AuthModal
  const [selectedFit, setSelectedFit] = useState<'women' | 'men' | 'kids'>('women');
  const [selectedAge, setSelectedAge] = useState<number>(24);

  if (!isOpen) return null;

  // 1-Click Demo Login
  const handleQuickDemoLogin = (role: Role) => {
    const demo = DEMO_USERS[role];
    onLoginSuccess(demo);
    if (onClose) onClose();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'customer') {
      const userToAuth: User = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0] || 'Customer',
        email: email || 'vaishnavichaudhary022@gmail.com',
        role: 'customer',
        gender: selectedFit,
        age: Number(selectedAge) || 24,
        addresses: INITIAL_ADDRESSES,
        currentAddressId: INITIAL_ADDRESSES[0]?.id || 'addr-1',
      };
      onLoginSuccess(userToAuth);
    } else if (selectedRole === 'shop_owner') {
      const userToAuth: User = {
        ...DEMO_USERS.shop_owner,
        email: email || DEMO_USERS.shop_owner.email,
      };
      onLoginSuccess(userToAuth);
    } else {
      const userToAuth: User = {
        ...DEMO_USERS.admin,
        email: email || DEMO_USERS.admin.email,
      };
      onLoginSuccess(userToAuth);
    }
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-neutral-100 my-8">
        {/* Header */}
        <div className="bg-neutral-950 p-5 text-white text-center relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <h2 className="text-xl font-black font-brand">Sign In / Switch Role</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Access your customer, boutique or admin account
          </p>
        </div>

        {/* Role Tabs */}
        <div className="p-5 pb-0">
          <div className="grid grid-cols-3 gap-2">
            {[
              { role: 'customer' as Role, label: 'Customer', icon: UserIcon },
              { role: 'shop_owner' as Role, label: 'Shop Owner', icon: Store },
              { role: 'admin' as Role, label: 'Admin', icon: Shield },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = selectedRole === item.role;

              return (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => setSelectedRole(item.role)}
                  className={`p-2.5 rounded-2xl border-2 text-center transition flex flex-col items-center justify-center ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/60 shadow-xs'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 mb-1 ${
                      isSelected ? 'text-rose-600' : 'text-neutral-500'
                    }`}
                  />
                  <span
                    className={`text-xs font-bold ${
                      isSelected ? 'text-rose-600' : 'text-neutral-800'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Demo */}
          <div className="mt-3 p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between text-xs">
            <span className="text-neutral-600 font-medium">Quick 1-Click Access:</span>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin(selectedRole)}
              className="px-3 py-1 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-bold text-xs flex items-center gap-1 transition"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Login as {selectedRole === 'customer' ? 'Customer' : selectedRole === 'shop_owner' ? 'Shop' : 'Admin'}</span>
            </button>
          </div>
        </div>

        {/* Standard Login Form */}
        <form onSubmit={handleFormSubmit} className="p-5 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Email or Mobile
            </label>
            <input
              type="text"
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
              className="w-full text-xs p-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full text-xs p-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Fits Preferences for customer in AuthModal */}
          {selectedRole === 'customer' && (
            <div className="p-3 bg-rose-50/50 rounded-2xl border border-rose-100 space-y-2">
              <span className="text-xs font-bold text-neutral-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" /> Fits Preference
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'women' as const, label: 'Women' },
                  { id: 'men' as const, label: 'Men' },
                  { id: 'kids' as const, label: 'Kids' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFit(f.id)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold transition border ${
                      selectedFit === f.id
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-white text-neutral-700 border-neutral-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/20 transition active:scale-95"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
