import React, { useState, useRef } from 'react';
import { FESTIVAL_CATEGORIES, OCCASION_CATEGORIES, CATEGORIES } from '../data/rentalData';
import { CategoryId, Category } from '../types/rental';
import { Sparkles, Calendar, PartyPopper, Check, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5 pb-2.5 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
              Categories
            </h2>
            <span className="text-xs text-stone-500 font-medium">
              13 Curated Collections
            </span>
          </div>
          <p className="text-xs text-stone-600 mt-0.5 hidden sm:block">
            Find designer outfits for festivals, weddings, engagements & celebrations
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {/* Segmented Filter Toggle */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>All</span>
              <span className="text-[10px] text-stone-400 ml-1">({CATEGORIES.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('festivals')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                activeTab === 'festivals'
                  ? 'bg-stone-900 text-white shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <PartyPopper className="w-3 h-3" />
              <span>Festivals</span>
              <span className={`text-[10px] ml-0.5 ${activeTab === 'festivals' ? 'text-stone-300' : 'text-stone-400'}`}>
                (4)
              </span>
            </button>
            <button
              onClick={() => setActiveTab('occasions')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                activeTab === 'occasions'
                  ? 'bg-stone-900 text-white shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Calendar className="w-3 h-3" />
              <span>Occasions</span>
              <span className={`text-[10px] ml-0.5 ${activeTab === 'occasions' ? 'text-stone-300' : 'text-stone-400'}`}>
                (9)
              </span>
            </button>
          </div>

          {/* View All Categories Button */}
          {onViewAllCategories && (
            <button
              onClick={onViewAllCategories}
              className="hidden md:flex items-center gap-1 text-xs font-medium text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200 transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

          {/* Desktop Carousel Arrow Navigation */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => handleScroll('left')}
              className="p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition-colors shadow-2xs active:scale-95 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition-colors shadow-2xs active:scale-95 cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Category Indicator Banner */}
      {selectedCategory !== 'all' && selectedCategoryObj && (
        <div className="mb-3 px-3.5 py-2 bg-[#F5F4EE] border border-stone-200 rounded-xl flex items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2 truncate">
            <span className="text-base">{selectedCategoryObj.iconEmoji || '✨'}</span>
            <div className="text-xs text-stone-700">
              <span>Active Category: </span>
              <strong className="text-stone-900 font-semibold uppercase tracking-wide">
                {selectedCategoryObj.name}
              </strong>
              <span className="text-stone-500 text-[11px] ml-1.5 hidden sm:inline">
                ({selectedCategoryObj.itemCount}+ outfits available in Nashik)
              </span>
            </div>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className="flex items-center gap-1 text-xs font-medium text-stone-800 hover:text-stone-950 bg-white px-2.5 py-1 rounded-md border border-stone-200 shadow-2xs transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3 h-3" /> Clear Filter
          </button>
        </div>
      )}

      {/* Horizontal Scrollable Row of Category Avatars */}
      <div
        ref={scrollContainerRef}
        className="flex items-start gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 scroll-smooth"
      >
        {/* All Fits Option */}
        <button
          onClick={() => onSelectCategory('all')}
          className="flex flex-col items-center shrink-0 group focus:outline-none transition active:scale-95 cursor-pointer"
        >
          <div className="relative">
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'ring-2 ring-stone-900 ring-offset-2 scale-102 shadow-xs'
                  : 'ring-1 ring-stone-200 group-hover:ring-stone-400'
              }`}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-stone-900 flex flex-col items-center justify-center text-white">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-stone-300 mb-0.5" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-stone-200">
                  All
                </span>
              </div>
            </div>
            {selectedCategory === 'all' && (
              <span className="absolute -top-0.5 -right-0.5 bg-stone-900 text-white rounded-full p-0.5 ring-2 ring-white">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            )}
          </div>
          <span
            className={`mt-2 text-xs sm:text-sm text-center font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'text-stone-900 font-semibold'
                : 'text-stone-700 group-hover:text-stone-900'
            }`}
          >
            All Outfits
          </span>
          <span className="text-[10px] text-stone-400">All Collections</span>
        </button>

        {displayedCategories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
              className="flex flex-col items-center shrink-0 group focus:outline-none transition active:scale-95 cursor-pointer"
            >
              {/* Circular Avatar Container */}
              <div className="relative">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] transition-all duration-200 ${
                    isSelected
                      ? 'ring-2 ring-stone-900 ring-offset-2 scale-102 shadow-xs'
                      : 'ring-1 ring-stone-200 group-hover:ring-stone-400'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-stone-100">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                  <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[8px] font-medium px-1.5 py-0.5 rounded shadow-xs uppercase tracking-wider">
                    {cat.badge}
                  </span>
                )}

                {/* Selected Check Icon */}
                {isSelected && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-stone-900 text-white rounded-full p-0.5 ring-2 ring-white">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>

              {/* Label below circle */}
              <span
                className={`mt-2 text-xs sm:text-sm text-center transition-colors font-medium ${
                  isSelected
                    ? 'text-stone-900 font-semibold'
                    : 'text-stone-700 group-hover:text-stone-900'
                }`}
              >
                {cat.name}
              </span>

              {/* Subtitle / item count */}
              <span className="text-[10px] text-stone-400 group-hover:text-stone-500">
                {cat.itemCount} fits
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
