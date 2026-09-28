import React from 'react';
import { Search, Heart, ShoppingBag, MapPin, Sparkles, User as UserIcon, Store, Shield, ChevronDown, LogOut } from 'lucide-react';
import { TargetGender, User, Address, CategoryId } from '../types/rental';

interface TopNavBarProps {
  currentUser: User | null;
  currentAddress?: Address;
  selectedGender: TargetGender;
  onSelectGender: (gender: TargetGender) => void;
  wishlistCount: number;
  cartCount: number;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
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
  onOpenSearch,
  onOpenWishlist,
  onOpenCart,
  onOpenAddressModal,
  onOpenAuthModal,
  onLogoClick,
  onSelectCategory,
  onNavigatePortal,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs">
      {/* Micro delivery & announcement banner */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 text-white text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <Sparkles className="w-3.5 h-3.5 text-amber-200 shrink-0" />
          <span className="truncate text-[11px] sm:text-xs">
            Flat 40% Off on Rental Wear · Use Code: <strong className="font-mono bg-white/20 px-1.5 py-0.2 rounded font-bold">RENT40</strong> · Free Professional Dry Cleaning & Backup Size
          </span>
        </div>

        {/* Quick Portal Switcher */}
        <div className="hidden md:flex items-center gap-3 text-[11px] font-semibold shrink-0">
          <button
            onClick={() => onNavigatePortal('shop')}
            className="hover:text-rose-100 flex items-center gap-1 transition"
          >
            <Store className="w-3.5 h-3.5" /> Boutique Owner Portal
          </button>
          <span>|</span>
          <button
            onClick={() => onNavigatePortal('admin')}
            className="hover:text-rose-100 flex items-center gap-1 transition"
          >
            <Shield className="w-3.5 h-3.5" /> Admin Console
          </button>
        </div>
      </div>

      {/* Main Website Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Location */}
        <div className="flex items-center gap-6">
          <button
            onClick={onLogoClick}
            className="flex flex-col items-start group text-left focus:outline-none"
            title="REVOGUE Rentals"
          >
            <div className="flex items-center gap-1">
              <span className="font-brand font-black text-2xl sm:text-3xl tracking-tight bg-gradient-to-r from-neutral-950 via-rose-950 to-rose-600 bg-clip-text text-transparent">
                REVOGUE
              </span>
              <span className="w-2 h-2 rounded-full bg-rose-500 mb-2.5"></span>
            </div>
            <span className="text-[9px] font-extrabold uppercase tracking-[0.26em] text-rose-500 -mt-1">
              Luxury Designer Rentals
            </span>
          </button>

          {/* Deliver To Address Chip */}
          <button
            onClick={onOpenAddressModal}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-neutral-50 hover:bg-rose-50/60 border border-neutral-200/80 rounded-xl text-left transition group text-xs"
            title="Click to change delivery location"
          >
            <MapPin className="w-4 h-4 text-rose-500 shrink-0 group-hover:scale-110 transition" />
            <div className="max-w-[170px] truncate">
              <span className="text-[10px] text-neutral-400 font-bold block uppercase tracking-wider">
                Deliver to
              </span>
              <span className="font-bold text-neutral-900 truncate block text-[11px]">
                {currentAddress ? `${currentAddress.city} - ${currentAddress.pincode}` : 'Select Address'}
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-neutral-400 ml-1" />
          </button>
        </div>

        {/* Primary Department Tabs: WOMEN, MEN, KIDS, FESTIVAL & FANCY DRESS */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {[
            { id: 'all' as TargetGender, label: 'All Fits' },
            { id: 'women' as TargetGender, label: 'Women' },
            { id: 'men' as TargetGender, label: 'Men' },
            { id: 'kids' as TargetGender, label: 'Kids' },
          ].map((tab) => {
            const isActive = selectedGender === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectGender(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}

          <button
            onClick={() => onSelectCategory('diwali')}
            className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight text-amber-700 bg-amber-50 hover:bg-amber-100 transition flex items-center gap-1 border border-amber-200/60"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Diwali & Puja
          </button>

          <button
            onClick={() => onSelectCategory('fancydress')}
            className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight text-purple-700 bg-purple-50 hover:bg-purple-100 transition flex items-center gap-1 border border-purple-200/60"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            Fancy Dress
          </button>

          <button
            onClick={() => onSelectCategory('navratri')}
            className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight text-rose-700 bg-rose-50 hover:bg-rose-100 transition flex items-center gap-1 border border-rose-200/60"
          >
            Navratri Garba
          </button>
        </nav>

        {/* Right Actions: Search bar, Wishlist, Cart & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-2 bg-neutral-100 hover:bg-neutral-200/80 rounded-xl text-xs text-neutral-500 transition w-36 sm:w-56"
          >
            <Search className="w-4 h-4 text-neutral-400" />
            <span className="truncate hidden sm:inline">Search lehengas, sherwanis...</span>
            <span className="sm:hidden">Search</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="p-2 rounded-xl text-neutral-700 hover:text-rose-600 hover:bg-rose-50 transition relative"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[2]" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[17px] h-[17px] px-1 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart / Bag */}
          <button
            onClick={onOpenCart}
            className="p-2 rounded-xl text-neutral-700 hover:text-neutral-950 hover:bg-rose-50 transition relative"
            aria-label="Rental Bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[17px] h-[17px] px-1 bg-neutral-950 text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account / Role Switcher */}
          {currentUser ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-neutral-800 transition"
                title="Click to switch role or account"
              >
                <div className="w-6 h-6 rounded-lg bg-rose-500 text-white flex items-center justify-center text-xs font-black">
                  {currentUser.name[0] || 'U'}
                </div>
                <div className="hidden sm:block text-left">
                  <span className="block text-[11px] truncate max-w-[90px]">{currentUser.name.split(' ')[0]}</span>
                  <span className="block text-[9px] text-rose-600 font-semibold uppercase">
                    {currentUser.role === 'customer' ? 'Customer' : currentUser.role === 'shop_owner' ? 'Shop Owner' : 'Admin'}
                  </span>
                </div>
              </button>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="p-2 rounded-xl text-neutral-500 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Log out and return to login page"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Department Tabs Bar */}
      <div className="md:hidden px-4 py-2 border-t border-neutral-100 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
        {[
          { id: 'all' as TargetGender, label: 'All' },
          { id: 'women' as TargetGender, label: 'Women' },
          { id: 'men' as TargetGender, label: 'Men' },
          { id: 'kids' as TargetGender, label: 'Kids' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelectGender(tab.id)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition shrink-0 ${
              selectedGender === tab.id
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            {tab.label}
          </button>
        ))}

        {/* Address Chip on mobile */}
        <button
          onClick={onOpenAddressModal}
          className="flex items-center gap-1 text-[11px] text-rose-600 font-semibold shrink-0 ml-auto bg-rose-50 px-2 py-1 rounded-lg"
        >
          <MapPin className="w-3 h-3" />
          <span>{currentAddress?.city || 'Address'}</span>
        </button>
      </div>
    </header>
  );
};
