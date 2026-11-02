import React, { useState } from 'react';
import { Search, ShieldCheck, Truck, Shirt, ArrowRight } from 'lucide-react';

// Authentic photography of Indian luxury couture & celebration
const realLifeHeroImg = 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85';

interface HeroMomentBannerProps {
  onSearchClick?: () => void;
  onExploreClick?: () => void;
  onSelectAudience?: (audience: 'men' | 'women' | 'kids') => void;
}

export const HeroMomentBanner: React.FC<HeroMomentBannerProps> = ({
  onSearchClick,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchClick) onSearchClick();
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-2">
      {/* Light Editorial Hero Card */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200/80 bg-[#F6F5EE] shadow-xs group">
        
        {/* Background Visual Layer with soft warm scrim for flawless contrast */}
        <div className="absolute inset-0 z-0">
          <img
            src={realLifeHeroImg}
            alt="Haute Couture Festive & Occasion Rentals"
            className="w-full h-full object-cover object-center sm:object-right-top transition-transform duration-1000 ease-out group-hover:scale-102"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.endsWith('/assets/fallback-dress.svg')) {
                target.src = '/assets/fallback-dress.svg';
              }
            }}
          />
          {/* Natural warm paper gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F6F5EE] via-[#F6F5EE]/95 to-[#F6F5EE]/30 sm:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F6F5EE]/90 via-transparent to-transparent sm:hidden" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 px-5 sm:px-10 md:px-12 py-8 sm:py-12 md:py-14 max-w-2xl">
          
          {/* Eyebrow and pricing */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-semibold tracking-wider text-stone-500 uppercase">
              Designer Wardrobe Archive · Nashik
            </span>
            <span className="text-stone-300">|</span>
            <span className="text-[11px] font-medium text-stone-700">
              From <strong className="text-stone-900 font-semibold">₹999</strong>/rental
            </span>
          </div>

          {/* Catchphrase / Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-stone-900 leading-[1.15]">
            Dress for the Moment,{' '}
            <span className="block italic text-stone-700 font-normal">
              Not Forever.
            </span>
          </h1>

          {/* Subtext describing high-end rental value proposition */}
          <p className="mt-3 text-xs sm:text-sm md:text-base text-stone-600 font-normal max-w-xl leading-relaxed">
            Rent India's finest designer lehengas, bridal couture, royal sherwanis & tuxedos for your big day. Dry-cleaned, custom fitted & delivered across Nashik.
          </p>

          {/* Embedded Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-6 flex items-center max-w-xl bg-white rounded-xl p-1.5 shadow-xs border border-stone-300/80 focus-within:border-stone-900 transition-colors"
          >
            <div className="flex items-center pl-3 text-stone-400">
              <Search className="w-4 h-4 text-stone-500 shrink-0" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onClick={onSearchClick}
              placeholder="Search designer lehenga, sherwani, party gown..."
              className="w-full bg-transparent border-none text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 px-3 py-2 focus:outline-hidden font-normal cursor-pointer"
              readOnly
            />
            <button
              type="button"
              onClick={onSearchClick}
              className="shrink-0 px-4 sm:px-5 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Trust Guarantees */}
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-stone-600 font-normal">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
              <span>Dry Cleaned & Sanitized</span>
            </span>
            <span className="text-stone-300 hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <Shirt className="w-3.5 h-3.5 text-stone-700" />
              <span>Free Custom Fitting</span>
            </span>
            <span className="text-stone-300 hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-stone-700" />
              <span>Doorstep Delivery & Pickup</span>
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
