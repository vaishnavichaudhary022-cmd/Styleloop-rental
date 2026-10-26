import React, { useRef } from 'react';
import { CategoryId } from '../types/rental';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface CategoryNameNavProps {
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  onViewAll?: () => void;
}

// Ordered category names covering All, Festivals, Weddings, and Occasions
export const CATEGORY_NAMES_LIST: { id: CategoryId; name: string; icon?: string }[] = [
  { id: 'all', name: 'All Outfits', icon: '✦' },
  { id: 'diwali', name: 'Diwali', icon: '🪔' },
  { id: 'navratri', name: 'Navratri', icon: '💃' },
  { id: 'eid', name: 'Eid', icon: '🌙' },
  { id: 'christmas', name: 'Christmas', icon: '🎄' },
  { id: 'wedding', name: 'Wedding', icon: '👰' },
  { id: 'engagement', name: 'Engagement', icon: '💍' },
  { id: 'reception', name: 'Reception', icon: '✨' },
  { id: 'haldi', name: 'Haldi', icon: '🌼' },
  { id: 'mehendi', name: 'Mehendi', icon: '🌿' },
  { id: 'sangeet', name: 'Sangeet', icon: '🎶' },
  { id: 'party', name: 'Party Wear', icon: '🍸' },
  { id: 'fancydress', name: 'Costumes', icon: '🎭' },
  { id: 'casual', name: 'Casual Wear', icon: '👗' },
];

export const CategoryNameNav: React.FC<CategoryNameNavProps> = ({
  selectedCategory,
  onSelectCategory,
  onViewAll,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = 240;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -offset : offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5">
      <div className="relative flex items-center bg-white border-y border-neutral-200/80 shadow-2xs">
        
        {/* Left Scroll Button (Desktop) */}
        <button
          onClick={() => scroll('left')}
          className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 shadow-xs border border-neutral-200 shrink-0 mx-1 z-10 transition"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Category Names Horizontal Row */}
        <div
          ref={scrollRef}
          className="flex-1 flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2 px-1 sm:px-2 no-scrollbar scroll-smooth"
        >
          {CATEGORY_NAMES_LIST.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-200 shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white shadow-xs font-bold scale-[1.02]'
                    : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/90'
                }`}
              >
                {cat.icon && <span className="text-xs">{cat.icon}</span>}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right Scroll Button (Desktop) */}
        <button
          onClick={() => scroll('right')}
          className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 shadow-xs border border-neutral-200 shrink-0 mx-1 z-10 transition"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Optional View All Pill */}
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="hidden md:flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100/80 shrink-0 mr-2 border border-rose-200/60 transition"
          >
            <Sparkles className="w-3 h-3" />
            <span>All Categories</span>
          </button>
        )}
      </div>
    </div>
  );
};
