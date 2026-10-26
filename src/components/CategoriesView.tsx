import React, { useState } from 'react';
import { FESTIVAL_CATEGORIES, OCCASION_CATEGORIES, CATEGORIES } from '../data/rentalData';
import { CategoryId } from '../types/rental';
import { Sparkles, ArrowRight, PartyPopper, Calendar } from 'lucide-react';

interface CategoriesViewProps {
  onSelectCategory: (id: CategoryId) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ onSelectCategory }) => {
  const [filterMode, setFilterMode] = useState<'all' | 'festivals' | 'occasions'>('all');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-neutral-900 font-brand">
              Categories
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Nashik Wardrobe Edit
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Organized couture for Diwali, Navratri, Eid, Christmas, Weddings, Engagements, and celebrations
          </p>
        </div>

        {/* Tab Filter Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl self-start sm:self-auto border border-neutral-200/70">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filterMode === 'all'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            All ({CATEGORIES.length})
          </button>
          <button
            onClick={() => setFilterMode('festivals')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
              filterMode === 'festivals'
                ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <PartyPopper className="w-3.5 h-3.5" />
            <span>Festivals (4)</span>
          </button>
          <button
            onClick={() => setFilterMode('occasions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
              filterMode === 'occasions'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Occasions (9)</span>
          </button>
        </div>
      </div>

      {/* 1. FESTIVAL-WISE CATEGORIES */}
      {(filterMode === 'all' || filterMode === 'festivals') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                🎉
              </div>
              <div>
                <h2 className="text-lg font-black text-neutral-900 font-brand">
                  Festival-Wise Collections
                </h2>
                <p className="text-xs text-neutral-500">
                  Specialized ethnic wear for major Indian and global festivals
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
              4 Grand Festivals
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
            {FESTIVAL_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/5] bg-neutral-900 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 border border-neutral-200/80"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/assets/fallback-dress.svg')) {
                      target.src = '/assets/fallback-dress.svg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 flex flex-col justify-between p-3.5 sm:p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg">{cat.iconEmoji}</span>
                    {cat.badge && (
                      <span className="text-[9px] font-extrabold text-white bg-gradient-to-r from-purple-600 to-rose-600 px-2 py-0.5 rounded-full uppercase tracking-tight shadow-xs">
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-extrabold text-base sm:text-lg font-brand leading-tight group-hover:text-rose-200 transition">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-neutral-200 line-clamp-1 mt-0.5 opacity-90">
                      {cat.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-amber-300">
                      <span>{cat.itemCount}+ Outfits</span>
                      <span className="flex items-center gap-0.5 text-white group-hover:translate-x-1 transition-transform">
                        Explore <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. OCCASION-WISE CATEGORIES */}
      {(filterMode === 'all' || filterMode === 'occasions') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
                💍
              </div>
              <div>
                <h2 className="text-lg font-black text-neutral-900 font-brand">
                  Occasion-Wise Collections
                </h2>
                <p className="text-xs text-neutral-500">
                  From wedding day pheras to cocktail parties and birthdays
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
              9 Occasions
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {OCCASION_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[4/4.5] bg-neutral-900 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 border border-neutral-200/80"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/assets/fallback-dress.svg')) {
                      target.src = '/assets/fallback-dress.svg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 flex flex-col justify-between p-3.5 sm:p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg">{cat.iconEmoji}</span>
                    {cat.badge && (
                      <span className="text-[9px] font-extrabold text-white bg-gradient-to-r from-rose-600 to-amber-500 px-2 py-0.5 rounded-full uppercase tracking-tight shadow-xs">
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-extrabold text-base sm:text-lg font-brand leading-tight group-hover:text-rose-200 transition">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-neutral-200 line-clamp-2 mt-0.5 opacity-90">
                      {cat.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-amber-300">
                      <span>{cat.itemCount}+ Designer Fits</span>
                      <span className="flex items-center gap-0.5 text-white group-hover:translate-x-1 transition-transform">
                        Rent <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick Silhouettes & Styling Guide */}
      <div className="mt-6 pt-6 border-t border-neutral-200">
        <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider font-brand mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" /> Popular Silhouette Rentals in Nashik
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
          {[
            { label: 'Bridal Lehengas', cat: 'wedding' as CategoryId },
            { label: 'Sangeet Outfits', cat: 'sangeet' as CategoryId },
            { label: 'Haldi Outfits', cat: 'haldi' as CategoryId },
            { label: 'Cocktail Gowns', cat: 'party' as CategoryId },
            { label: 'Sherwanis', cat: 'wedding' as CategoryId },
            { label: 'Casual Co-Ords', cat: 'casual' as CategoryId },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => onSelectCategory(item.cat)}
              className="p-2.5 bg-white border border-neutral-200 rounded-xl text-left font-bold text-neutral-800 hover:border-rose-400 hover:text-rose-600 flex items-center justify-between transition shadow-2xs group"
            >
              <span>{item.label}</span>
              <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 transition" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

