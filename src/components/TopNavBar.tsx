import React from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  MapPin,
  Sparkles,
  User as UserIcon,
  Store,
  Shield,
  ChevronDown,
  LogOut,
  Package,
  Server,
  Code2
} from 'lucide-react';
import { TargetGender, User, Address, CategoryId } from '../types/rental';
import { Logo } from './Logo';

interface TopNavBarProps {
  currentUser: User | null;
  currentAddress?: Address;
  selectedGender: TargetGender;
  onSelectGender: (gender: TargetGender) => void;
  wishlistCount: number;
  cartCount: number;
  activeRentalsCount?: number;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenRentalHistory?: () => void;
  onOpenJavaBackend?: () => void;
  onOpenAddressModal: () => void;
  onOpenAuthModal: () => void;
  onLogoClick: () => void;
  onSelectCategory: (cat: CategoryId) => void;
  onNavigatePortal: (portal: 'customer' | 'shop' | 'admin') => void;
  onLogout?: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  currentUser,
  currentAddress,
  selectedGender,
  onSelectGender,
  wishlistCount,
  cartCount,
  activeRentalsCount = 2,
  onOpenSearch,
  onOpenWishlist,
  onOpenCart,
  onOpenRentalHistory,
  onOpenJavaBackend,
  onOpenAddressModal,
  onOpenAuthModal,
  onLogoClick,
  onSelectCategory,
  onNavigatePortal,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-2xs">
      {/* Refined delivery & announcement banner */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span className="truncate text-[11px] sm:text-xs text-stone-300">
            Flat 40% Off on Rental Wear · Use Code: <strong className="font-mono bg-stone-800 text-stone-100 px-1.5 py-0.5 rounded font-bold">RENT40</strong> · Exclusively Serving Nashik, Maharashtra 📍
          </span>
        </div>

        {/* Quick Portal Switcher */}
        <div className="hidden md:flex items-center gap-3 text-[11px] font-medium text-stone-300 shrink-0">
          <button
            onClick={() => onNavigatePortal('shop')}
            className="hover:text-white flex items-center gap-1 transition"
          >
            <Store className="w-3.5 h-3.5" /> Boutique Portal
          </button>
          <span className="text-stone-600">|</span>
          <button
            onClick={() => onNavigatePortal('admin')}
            className="hover:text-white flex items-center gap-1 transition"
          >
            <Shield className="w-3.5 h-3.5" /> Admin Console
          </button>
        </div>
      </div>

      {/* Main Website Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Location */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Logo variant="header" onClick={onLogoClick} />

          {/* Deliver To Address Chip - Nashik Only */}
          <button
            onClick={onOpenAddressModal}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-stone-100/70 hover:bg-stone-100 border border-stone-200 rounded-lg text-left transition group text-xs"
            title="Click to change Nashik delivery area"
          >
            <MapPin className="w-4 h-4 text-stone-700 shrink-0 group-hover:scale-105 transition" />
            <div className="max-w-[170px] truncate">
              <span className="text-[9px] text-stone-500 font-semibold block uppercase tracking-wider">
                Delivering in Nashik 📍
              </span>
              <span className="font-semibold text-stone-900 truncate block text-[11px]">
                {currentAddress
                  ? `${currentAddress.apartment || currentAddress.street.slice(0, 16)} - ${currentAddress.pincode}`
                  : 'College Rd, Nashik'}
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-stone-400 ml-1" />
          </button>
        </div>

        {/* Right Actions: Search bar, Rental History, Wishlist, Cart & Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-2 bg-stone-100 hover:bg-stone-200/70 border border-stone-200/60 rounded-lg text-xs text-stone-500 transition w-32 sm:w-48 lg:w-56 cursor-pointer"
          >
            <Search className="w-4 h-4 text-stone-400 shrink-0" />
            <span className="truncate hidden sm:inline">Search lehengas, sherwanis...</span>
            <span className="sm:hidden">Search</span>
          </button>

          {/* Customer Rental History Button */}
          {onOpenRentalHistory && (
            <button
              onClick={onOpenRentalHistory}
              className="p-2 sm:px-3 sm:py-2 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition relative flex items-center gap-1.5 border border-stone-200"
              aria-label="Rental History"
              title="View Customer Rental History & Return Tracking"
            >
              <Package className="w-4 h-4 text-stone-700" />
              <span className="hidden sm:inline text-xs font-semibold text-stone-800">
                My Rentals
              </span>
              {activeRentalsCount > 0 && (
                <span className="min-w-[17px] h-[17px] px-1 bg-stone-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {activeRentalsCount}
                </span>
              )}
            </button>
          )}

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="p-2 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition relative cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.8]" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[17px] h-[17px] px-1 bg-stone-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart / Bag */}
          <button
            onClick={onOpenCart}
            className="p-2 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition relative cursor-pointer"
            aria-label="Rental Bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[17px] h-[17px] px-1 bg-stone-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account / Role Switcher */}
          {currentUser ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200/80 border border-stone-200 text-xs font-semibold text-stone-800 transition cursor-pointer"
                title="Click to switch role or account"
              >
                <div className="w-6 h-6 rounded-md bg-stone-900 text-white flex items-center justify-center text-xs font-bold">
                  {currentUser.name[0] || 'U'}
                </div>
                <div className="hidden sm:block text-left">
                  <span className="block text-[11px] truncate max-w-[85px]">{currentUser.name.split(' ')[0]}</span>
                  <span className="block text-[9px] text-stone-500 font-semibold uppercase">
                    {currentUser.role === 'customer' ? 'Customer' : currentUser.role === 'shop_owner' ? 'Shop Owner' : 'Admin'}
                  </span>
                </div>
              </button>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
                  title="Log out and return to login page"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium transition shadow-2xs cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Department Tabs Bar & Nashik Location */}
      <div className="md:hidden px-4 py-2 border-t border-stone-200 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
        {[
          { id: 'all' as TargetGender, label: 'All' },
          { id: 'women' as TargetGender, label: 'Women' },
          { id: 'men' as TargetGender, label: 'Men' },
          { id: 'kids' as TargetGender, label: 'Kids' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelectGender(tab.id)}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition shrink-0 ${
              selectedGender === tab.id
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            {tab.label}
          </button>
        ))}

        {/* Address Chip on mobile */}
        <button
          onClick={onOpenAddressModal}
          className="flex items-center gap-1 text-[11px] text-stone-700 font-semibold shrink-0 ml-auto bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200"
        >
          <MapPin className="w-3 h-3 text-stone-500" />
          <span>{currentAddress?.apartment || 'Nashik 📍'}</span>
        </button>
      </div>
    </header>
  );
};
