import React, { useState, useEffect } from 'react';
import { Copy, Check, Clock, Sparkles, ArrowRight, ShieldCheck, Sparkle } from 'lucide-react';
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5">
      {/* Bold Luxury Rose Gold & Ruby Hero Banner */}
      <div
        onClick={onBannerClick}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[linear-gradient(125deg,#9f1239_0%,#be123c_25%,#e11d48_55%,#db2777_85%,#b45309_100%)] text-white shadow-2xl shadow-rose-950/20 cursor-pointer group transition-all duration-300 hover:shadow-rose-900/30 border border-white/20"
      >
        {/* Soft luxury background glow & shapes */}
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-5 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Text & Callouts */}
          <div className="flex-1 max-w-2xl text-left">
            {/* Top Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-black/25 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-rose-100 uppercase mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>GRAND FESTIVAL & DESIGNER RENTAL CARNIVAL</span>
            </div>

            {/* Bold Promotional Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-sm font-brand text-white">
              Flat 40% off on rental wear
            </h1>

            <p className="mt-2 text-sm sm:text-base text-rose-50/95 font-normal leading-relaxed max-w-xl">
              Rent luxury designer lehengas, bridal gowns, royal sherwanis, tuxedos & kids fancy festival costumes without paying the retail tag.
            </p>

            {/* Live Countdown & Code Box */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {/* Promo code pill */}
              <div
                onClick={handleCopyCode}
                className="inline-flex items-center gap-2 bg-white text-rose-600 px-3.5 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-bold shadow-md hover:bg-rose-50 transition active:scale-95 cursor-pointer group/btn"
                title="Tap to copy code"
              >
                <span className="tracking-wider">CODE: {PROMO_BANNER_DATA.code}</span>
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                ) : (
                  <Copy className="w-4 h-4 text-rose-500 group-hover/btn:scale-110 transition" />
                )}
              </div>

              {/* Countdown timer */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold bg-black/25 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white border border-white/10">
                <Clock className="w-4 h-4 text-amber-200 shrink-0" />
                <span className="font-mono tabular-nums">
                  Offer Ends: {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>

            {/* Micro value proposition */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-rose-100/90">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Professional Sanitization & Dry Cleaning Free</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkle className="w-3.5 h-3.5 text-amber-300" />
                <span>Free Backup Size Included</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Doorstep Reverse Pickup</span>
              </span>
            </div>
          </div>

          {/* Right Fashion Model Image */}
          <div className="relative shrink-0 w-44 sm:w-56 md:w-64 lg:w-72 h-52 sm:h-64 md:h-76 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/30">
            <img
              src={PROMO_BANNER_DATA.bannerImage}
              alt="Designer rental wear showcase"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            {/* Discount tag badge over image */}
            <div className="absolute top-2.5 right-2.5 bg-rose-600/95 backdrop-blur-xs text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md uppercase tracking-wider">
              40% OFF
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-white tracking-widest uppercase block">
                  Couture Edit
                </span>
                <span className="text-[10px] text-rose-200">Starting ₹649</span>
              </div>
              <span className="text-xs font-bold text-white tracking-wider uppercase flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                Rent Now <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
