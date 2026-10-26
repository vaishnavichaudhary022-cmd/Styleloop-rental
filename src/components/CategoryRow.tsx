import React, { useState, useRef } from 'react';
import { FESTIVAL_CATEGORIES, OCCASION_CATEGORIES, CATEGORIES } from '../data/rentalData';
import { CategoryId, Category } from '../types/rental';
import { Sparkles, Calendar, PartyPopper, Check, X, Filter, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface CategoryRowProps {
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  onViewAllCategories?: () => void;
}

type CategoryTab = 'all' | 'festivals' | 'occasions';

export const CategoryRow: React.FC<CategoryRowProps> = ({
  selectedCategory,
  onSelectCategory,
  onViewAllCategories,
}) => {
  const [activeTab, setActiveTab] = useState<CategoryTab>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const selectedCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  const displayedCategories: Category[] =
    activeTab === 'festivals'
      ? FESTIVAL_CATEGORIES
      : activeTab === 'occasions'
      ? OCCASION_CATEGORIES
      : CATEGORIES;

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
      {/* Categories Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5 pb-2.5 border-b border-neutral-100">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 font-brand tracking-tight">
              Categories
            </h2>
            <span className="text-[10px] text-rose-600 font-extrabold bg-rose-50 border border-rose-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> 13 Curated Styles
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5 hidden sm:block">
            Find designer outfits for festivals, weddings, engagements & celebrations
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          {/* Segmented Filter Toggle: All vs Festivals vs Occasions */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl border border-neutral-200/60">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                activeTab === 'all'
                  ? 'bg-white text-neutral-900 shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              <span>All</span>
              <span className="text-[10px] text-neutral-400">({CATEGORIES.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('festivals')}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                activeTab === 'festivals'
                  ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              <PartyPopper className="w-3 h-3" />
              <span>Festivals</span>
              <span className={activeTab === 'festivals' ? 'text-rose-100 text-[10px]' : 'text-neutral-400 text-[10px]'}>
                (4)
              </span>
            </button>
            <button
              onClick={() => setActiveTab('occasions')}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                activeTab === 'occasions'
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              <Calendar className="w-3 h-3" />
              <span>Occasions</span>
              <span className={activeTab === 'occasions' ? 'text-neutral-300 text-[10px]' : 'text-neutral-400 text-[10px]'}>
                (9)
              </span>
            </button>
          </div>

          {/* View All Categories Button */}
          {onViewAllCategories && (
            <button
              onClick={onViewAllCategories}
              className="hidden md:flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50/70 hover:bg-rose-100/70 px-2.5 py-1.5 rounded-xl border border-rose-200/70 transition"
              title="Browse all category collections in full page view"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

          {/* Desktop Carousel Arrow Navigation */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => handleScroll('left')}
              className="p-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 transition shadow-2xs active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 transition shadow-2xs active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Category Banner Indicator if a filter is chosen */}
      {selectedCategory !== 'all' && selectedCategoryObj && (
        <div className="mb-3 px-3 py-2 bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 border border-rose-200/90 rounded-2xl flex items-center justify-between gap-2 shadow-2xs animate-fadeIn">
          <div className="flex items-center gap-2 truncate">
            <span className="text-base">{selectedCategoryObj.iconEmoji || '✨'}</span>
            <div className="text-xs">
              <span className="font-semibold text-neutral-600">Active Category: </span>
              <strong className="text-rose-700 font-extrabold uppercase tracking-wide">
                {selectedCategoryObj.name}
              </strong>
              <span className="text-neutral-400 text-[11px] ml-1.5 hidden sm:inline">
                ({selectedCategoryObj.itemCount}+ outfits available in Nashik)
              </span>
            </div>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className="flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-800 bg-white px-2.5 py-1 rounded-lg border border-rose-200 shadow-2xs transition active:scale-95 shrink-0"
          >
            <X className="w-3 h-3" /> Clear Filter
          </button>
        </div>
      )}

      {/* Horizontal Scrollable Row of Circular Category Avatars */}
      <div
        ref={scrollContainerRef}
        className="flex items-start gap-3.5 sm:gap-5 overflow-x-auto no-scrollbar py-2 scroll-smooth"
      >
        {/* All Fits Option */}
        <button
          onClick={() => onSelectCategory('all')}
          className="flex flex-col items-center shrink-0 group focus:outline-none transition transform active:scale-95"
        >
          <div className="relative">
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 ring-4 ring-rose-400/30 scale-105 shadow-md'
                  : 'bg-gradient-to-tr from-neutral-200 via-neutral-300 to-neutral-200 group-hover:from-rose-400 group-hover:to-pink-500 group-hover:scale-105'
              }`}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-neutral-900 ring-2 ring-white flex flex-col items-center justify-center text-white">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 mb-0.5" />
                <span className="text-[9px] font-black uppercase tracking-wider text-neutral-200">
                  All
                </span>
              </div>
            </div>
            {selectedCategory === 'all' && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 ring-2 ring-white">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            )}
          </div>
          <span
            className={`mt-2 text-xs sm:text-sm text-center font-bold tracking-tight transition-colors ${
              selectedCategory === 'all'
                ? 'text-rose-600'
                : 'text-neutral-700 group-hover:text-neutral-950'
            }`}
          >
            All Fits
          </span>
          <span className="text-[10px] text-neutral-400">All Outfits</span>
        </button>

        {displayedCategories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
              className="flex flex-col items-center shrink-0 group focus:outline-none transition transform active:scale-95"
            >
              {/* Circular Avatar Container with Gradient Border */}
              <div className="relative">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 ring-4 ring-rose-400/30 scale-105 shadow-md'
                      : 'bg-gradient-to-tr from-neutral-200 via-rose-200 to-pink-200 group-hover:from-rose-400 group-hover:to-pink-500 group-hover:scale-105'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-neutral-100 ring-2 ring-white">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.endsWith('/assets/fallback-dress.svg')) {
                          target.src = '/assets/fallback-dress.svg';
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Badge on circle */}
                {cat.badge && (
                  <span
                    className={`absolute -top-1 -right-1 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-tighter shadow-xs ${
                      cat.group === 'festival'
                        ? 'bg-gradient-to-r from-purple-600 to-rose-600'
                        : 'bg-gradient-to-r from-rose-600 to-amber-500'
                    }`}
                  >
                    {cat.badge}
                  </span>
                )}

                {/* Selected Check Icon */}
                {isSelected && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-rose-600 text-white rounded-full p-0.5 ring-2 ring-white">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>

              {/* Label below circle */}
              <span
                className={`mt-2 text-xs sm:text-sm text-center transition-colors font-bold tracking-tight flex items-center gap-1 ${
                  isSelected
                    ? 'text-rose-600'
                    : 'text-neutral-700 group-hover:text-neutral-950'
                }`}
              >
                <span>{cat.name}</span>
              </span>

              {/* Subtitle / item count */}
              <span className="text-[10px] text-neutral-400 group-hover:text-neutral-500">
                {cat.itemCount} fits
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Category Chips for 1-click Filter Navigation */}
      <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] uppercase font-extrabold text-neutral-400 shrink-0 flex items-center gap-1">
          <Filter className="w-2.5 h-2.5" /> Quick Filter:
        </span>
        {[
          { id: 'all' as CategoryId, label: 'All Fits', icon: '✨' },
          { id: 'diwali' as CategoryId, label: 'Diwali', icon: '🪔' },
          { id: 'navratri' as CategoryId, label: 'Navratri', icon: '💃' },
          { id: 'eid' as CategoryId, label: 'Eid', icon: '🌙' },
          { id: 'christmas' as CategoryId, label: 'Christmas', icon: '🎄' },
          { id: 'wedding' as CategoryId, label: 'Wedding', icon: '👰' },
          { id: 'engagement' as CategoryId, label: 'Engagement', icon: '💍' },
          { id: 'reception' as CategoryId, label: 'Reception', icon: '✨' },
          { id: 'haldi' as CategoryId, label: 'Haldi', icon: '🌼' },
          { id: 'mehendi' as CategoryId, label: 'Mehendi', icon: '🌿' },
          { id: 'sangeet' as CategoryId, label: 'Sangeet', icon: '🎶' },
          { id: 'party' as CategoryId, label: 'Party Wear', icon: '🍸' },
          { id: 'birthday' as CategoryId, label: 'Birthday', icon: '🎂' },
          { id: 'casual' as CategoryId, label: 'Casual Wear', icon: '👗' },
        ].map((item) => {
          const isSelected = selectedCategory === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectCategory(isSelected && item.id !== 'all' ? 'all' : item.id)}
              className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 transition flex items-center gap-1 border ${
                isSelected
                  ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-rose-300 hover:text-rose-600'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
