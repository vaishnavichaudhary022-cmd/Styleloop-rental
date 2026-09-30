import React, { useState } from 'react';
import brandLogoImg from '../assets/brand-logo.png';

interface LogoProps {
  variant?: 'header' | 'login' | 'footer' | 'compact' | 'invoice';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'header',
  className = '',
  onClick,
}) => {
  const isCompact = variant === 'compact';
  const isLogin = variant === 'login';
  const isFooter = variant === 'footer';
  const isInvoice = variant === 'invoice';
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`group inline-flex items-center gap-2.5 sm:gap-3.5 cursor-pointer select-none transition-all duration-300 active:scale-[0.98] ${className}`}
      title="REVOGUE - Haute Couture Rentals Nashik"
    >
      {/* Luxury Circular Medallion with Lotus Logo */}
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-full overflow-hidden transition-all duration-300 shadow-md ${
          isLogin
            ? 'w-14 h-14 bg-[#4A081A] ring-2 ring-amber-400/90 shadow-rose-200'
            : isFooter
            ? 'w-11 h-11 bg-[#3A0614] ring-2 ring-amber-400/70 shadow-black/40'
            : isInvoice
            ? 'w-11 h-11 bg-[#4A081A] ring-2 ring-amber-400/80'
            : 'w-10 h-10 sm:w-11 sm:h-11 bg-[#4A081A] ring-2 ring-amber-400/80 group-hover:ring-amber-300 group-hover:scale-105 shadow-rose-900/20'
        }`}
      >
        {!imageError ? (
          <img
            src={brandLogoImg}
            alt="REVOGUE Lotus Logo"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-full"
          />
        ) : (
          /* High-End Precision Lotus Vector Emblem */
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1"
          >
            <defs>
              <linearGradient id="lotusGoldGrad" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFF2D6" />
                <stop offset="0.3" stopColor="#E9C175" />
                <stop offset="0.7" stopColor="#CF9B42" />
                <stop offset="1" stopColor="#AA7523" />
              </linearGradient>
              <linearGradient id="lotusRoseGrad" x1="40" y1="50" x2="60" y2="80" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F5A396" />
                <stop offset="0.5" stopColor="#DE6B6B" />
                <stop offset="1" stopColor="#BA3B54" />
              </linearGradient>
              <radialGradient id="lotusBgGrad" cx="50" cy="50" r="50">
                <stop stopColor="#630E24" />
                <stop offset="0.8" stopColor="#430816" />
                <stop offset="1" stopColor="#2D040E" />
              </radialGradient>
            </defs>

            {/* Circular Medallion Background */}
            <circle cx="50" cy="50" r="47" fill="url(#lotusBgGrad)" stroke="url(#lotusGoldGrad)" strokeWidth="2.5" />

            {/* Top 4-Pointed Star Accent */}
            <path
              d="M50 20 L52.5 28 L60 30.5 L52.5 33 L50 41 L47.5 33 L40 30.5 L47.5 28 Z"
              fill="url(#lotusGoldGrad)"
            />

            {/* Central Upright Lotus Petal */}
            <path
              d="M50 36 C55 45 56 60 50 72 C44 60 45 45 50 36 Z"
              stroke="url(#lotusGoldGrad)"
              strokeWidth="2.2"
              fill="url(#lotusRoseGrad)"
              fillOpacity="0.85"
            />

            {/* Left & Right Inner Rose-Gold Petals */}
            <path
              d="M49 53 C41 57 37 66 43 73 C48 72 49 63 49 53 Z"
              stroke="url(#lotusGoldGrad)"
              strokeWidth="1.8"
              fill="url(#lotusRoseGrad)"
              fillOpacity="0.9"
            />
            <path
              d="M51 53 C59 57 63 66 57 73 C52 72 51 63 51 53 Z"
              stroke="url(#lotusGoldGrad)"
              strokeWidth="1.8"
              fill="url(#lotusRoseGrad)"
              fillOpacity="0.9"
            />

            {/* Middle Sweeping Petals */}
            <path
              d="M50 41 C64 52 73 66 52 75 C49 75 60 62 50 41 Z"
              stroke="url(#lotusGoldGrad)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M50 41 C36 52 27 66 48 75 C51 75 40 62 50 41 Z"
              stroke="url(#lotusGoldGrad)"
              strokeWidth="2"
              fill="none"
            />

            {/* Outermost Wings */}
            <path
              d="M50 56 C74 53 82 56 70 72 C60 74 58 67 50 56 Z"
              stroke="url(#lotusGoldGrad)"
              strokeWidth="1.8"
              fill="none"
            />
            <path
              d="M50 56 C26 53 18 56 30 72 C40 74 42 67 50 56 Z"
              stroke="url(#lotusGoldGrad)"
              strokeWidth="1.8"
              fill="none"
            />

            {/* Base Supporting Arc */}
            <path
              d="M26 62 C38 77 62 77 74 62"
              stroke="url(#lotusGoldGrad)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}

        {/* Subtle Animated Shimmer Ray Effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        </div>

        {/* Floating Faceted Gold Star Dot */}
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-tr from-amber-300 to-yellow-100 rounded-full border border-white shadow-xs flex items-center justify-center z-10 pointer-events-none">
          <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-ping opacity-75"></span>
        </span>
      </div>

      {/* Typography Brand Block */}
      <div className="flex flex-col text-left justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-serif tracking-[0.14em] font-black transition-all ${
              isLogin
                ? 'text-2xl sm:text-3xl text-neutral-900 drop-shadow-2xs'
                : isFooter
                ? 'text-2xl text-white'
                : isInvoice
                ? 'text-2xl text-neutral-900'
                : 'text-xl sm:text-[23px] text-neutral-950 group-hover:text-rose-600'
            }`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            REVOGUE
          </span>

          {/* Ruby Diamond Gem Separator */}
          <span className="w-1.5 h-1.5 rotate-45 bg-gradient-to-tr from-rose-600 to-amber-500 ring-2 ring-rose-200 shrink-0 self-center"></span>
        </div>

        {/* Subtitle Badge with Nashik Fleet Indicator */}
        {!isCompact && (
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`text-[8.5px] font-black uppercase tracking-[0.24em] ${
                isFooter
                  ? 'text-amber-300'
                  : isLogin
                  ? 'text-rose-700 font-extrabold'
                  : 'text-rose-600 font-extrabold'
              }`}
            >
              Haute Couture Rentals
            </span>
            <span className="text-[7.5px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-gradient-to-r from-amber-500/15 to-rose-500/15 text-amber-900 border border-amber-300/50 shadow-2xs">
              Nashik ✦
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
