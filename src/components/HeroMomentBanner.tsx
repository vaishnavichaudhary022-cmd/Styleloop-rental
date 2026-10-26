import React, { useState } from 'react';
import { Sparkles, Search, ChevronRight, ShieldCheck, HeartHandshake, Truck, Shirt, ArrowRight } from 'lucide-react';
// Authentic real-life photography of Indian luxury couture & wedding celebration
const realLifeHeroImg = 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85';

interface HeroMomentBannerProps {
  onSearchClick?: () => void;
  onExploreClick?: () => void;
  onSelectAudience?: (audience: 'men' | 'women' | 'kids') => void;
}

export const HeroMomentBanner: React.FC<HeroMomentBannerProps> = ({
  onSearchClick,
  onExploreClick,
  onSelectAudience,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchClick) onSearchClick();
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5 pb-2">
      {/* Outer Banner Card with Rich Burgundy & Warm Gold Border Aura */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-rose-950/25 border border-rose-900/30 bg-neutral-950 group">
        
        {/* Background Visual Layer with Vignette & Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={realLifeHeroImg}
            alt="Haute Couture Festive & Occasion Rentals"
            className="w-full h-full object-cover object-center sm:object-right-top transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.78] contrast-[1.08]"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.endsWith('/assets/fallback-dress.svg')) {
                target.src = '/assets/fallback-dress.svg';
              }
            }}
          />
          {/* Deep royal gradient tint overlays for ultra-high contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-transparent sm:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/40" />
          <div className="absolute inset-0 bg-radial-at-tl from-rose-950/50 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Banner Content Container */}
        <div className="relative z-10 px-5 sm:px-8 md:px-12 py-7 sm:py-10 md:py-12 max-w-3xl">
          
          {/* Top Pricing & Audience Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-amber-300/40 text-amber-200 shadow-md mb-3 sm:mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] sm:text-xs font-bold tracking-wide text-neutral-100">
              Men & Women: <strong className="text-amber-300 font-extrabold">₹999</strong>/rental
              <span className="mx-1.5 text-neutral-400">•</span>
              Kids: <strong className="text-amber-300 font-extrabold">₹599</strong>/rental
            </span>
          </div>

          {/* Catchphrase / Headline matching image: "Dress for the Moment, Not Forever." */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-black tracking-tight text-white leading-[1.12] drop-shadow-md">
            Dress for the Moment,{' '}
            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-amber-200 to-rose-300">
              Not Forever.
            </span>
          </h1>

          {/* Subtext describing high-end rental value proposition */}
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-neutral-200/90 font-light max-w-xl leading-relaxed">
            Rent India's finest designer lehengas, bridal couture, royal sherwanis & tuxedos for your big day. Dry-cleaned, custom fitted & delivered in Nashik.
          </p>

          {/* Embedded Interactive Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-5 sm:mt-6 flex items-center max-w-xl bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-xl ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-rose-500 transition-all"
          >
            <div className="flex items-center pl-2.5 sm:pl-3 text-neutral-400">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500 shrink-0" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onClick={onSearchClick}
              placeholder="Search designer lehenga, sherwani, party gown..."
              className="w-full bg-transparent border-none text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 px-3 py-1.5 sm:py-2 focus:outline-hidden font-medium cursor-pointer"
              readOnly
            />
            <button
              type="button"
              onClick={onSearchClick}
              className="shrink-0 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center gap-1.5"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Trust Guarantees Chips */}
          <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] sm:text-xs text-neutral-300 font-medium">
            <span className="flex items-center gap-1 text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" /> Dry Cleaned & Sanitized
            </span>
            <span className="text-neutral-500 hidden sm:inline">•</span>
            <span className="flex items-center gap-1 text-amber-200">
              <Shirt className="w-3.5 h-3.5" /> Free Custom Alterations
            </span>
            <span className="text-neutral-500 hidden sm:inline">•</span>
            <span className="flex items-center gap-1 text-sky-300">
              <Truck className="w-3.5 h-3.5" /> Doorstep Delivery & Pickup
            </span>
          </div>

        </div>

        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-rose-500/20 to-transparent blur-2xl pointer-events-none" />
      </div>
    </section>
  );
};
