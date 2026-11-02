import React, { useState, useEffect } from 'react';
import { Copy, Check, Clock, ShieldCheck, Sparkle, ArrowRight } from 'lucide-react';
import { PROMO_BANNER_DATA } from '../data/rentalData';

interface PromoBannerProps {
  onBannerClick: () => void;
  onCodeCopiedToast?: (code: string) => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  onBannerClick,
  onCodeCopiedToast,
}) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(PROMO_BANNER_DATA.code);
    setCopied(true);
    if (onCodeCopiedToast) {
      onCodeCopiedToast(PROMO_BANNER_DATA.code);
    }
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Light Luxury Editorial Campaign Card */}
      <div
        onClick={onBannerClick}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#F5F4EE] text-stone-900 shadow-xs cursor-pointer group transition-all duration-300 hover:shadow-md border border-stone-200"
      >
        <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Text & Callouts */}
          <div className="flex-1 max-w-2xl text-left">
            {/* Top Tagline */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-stone-500 uppercase mb-2">
              <Sparkle className="w-3.5 h-3.5 text-stone-700" />
              <span>Special Festive Privilege · Limited Slots</span>
            </div>

            {/* Promotional Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight leading-tight text-stone-900">
              Flat 40% off on rental wear
            </h2>

            <p className="mt-2 text-xs sm:text-sm md:text-base text-stone-600 font-normal leading-relaxed max-w-xl">
              Rent luxury designer lehengas, bridal gowns, royal sherwanis, tuxedos & kids festival costumes without paying the retail tag.
            </p>

            {/* Live Countdown & Code Box */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {/* Promo code button */}
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-2 bg-white text-stone-900 border border-stone-300 px-3.5 py-1.5 rounded-lg font-mono text-xs sm:text-sm font-semibold shadow-2xs hover:bg-stone-50 transition-colors cursor-pointer"
                title="Tap to copy code"
              >
                <span className="tracking-wider">CODE: {PROMO_BANNER_DATA.code}</span>
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                ) : (
                  <Copy className="w-4 h-4 text-stone-500" />
                )}
              </button>

              {/* Countdown timer */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium bg-white border border-stone-200 px-3.5 py-1.5 rounded-lg text-stone-700 shadow-2xs">
                <Clock className="w-4 h-4 text-stone-500 shrink-0" />
                <span className="font-mono tabular-nums">
                  Offer Ends: {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>

            {/* Guarantees */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-normal text-stone-600">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                <span>Sanitization & Dry Cleaning Free</span>
              </span>
              <span className="text-stone-300 hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <Sparkle className="w-3.5 h-3.5 text-stone-700" />
                <span>Free Backup Size Included</span>
              </span>
              <span className="text-stone-300 hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                <span>Doorstep Reverse Pickup</span>
              </span>
            </div>
          </div>

          {/* Right Fashion Model Image */}
          <div className="relative shrink-0 w-44 sm:w-56 md:w-64 lg:w-72 h-52 sm:h-64 md:h-76 rounded-xl overflow-hidden shadow-sm border border-stone-200">
            <img
              src={PROMO_BANNER_DATA.bannerImage}
              alt="Designer rental wear showcase"
              className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-700"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('/assets/fallback-dress.svg')) {
                  target.src = '/assets/fallback-dress.svg';
                }
              }}
            />
            {/* Clean discount tag */}
            <div className="absolute top-2.5 right-2.5 bg-stone-900 text-white text-xs font-medium px-2.5 py-1 rounded shadow-xs uppercase tracking-wider">
              40% OFF
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent p-3 flex items-center justify-between text-white">
              <div>
                <span className="text-[11px] font-medium tracking-widest uppercase block text-stone-200">
                  Couture Edit
                </span>
                <span className="text-xs font-semibold text-white">Starting ₹649</span>
              </div>
              <span className="text-xs flex items-center gap-1 text-stone-200 group-hover:translate-x-0.5 transition-transform">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
