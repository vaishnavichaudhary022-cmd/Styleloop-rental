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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="relative flex items-center bg-white border-y border-stone-200/80 shadow-2xs">
        
        {/* Left Scroll Button (Desktop) */}
        <button
          onClick={() => scroll('left')}
          className="hidden sm:flex items-center justify-center w-7 h-7 rounded-lg bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 shadow-2xs border border-stone-200 shrink-0 mx-1 z-10 transition-colors cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Category Names Horizontal Row */}
        <div
          ref={scrollRef}
          className="flex-1 flex items-center gap-1.5 overflow-x-auto py-2 px-1 sm:px-2 no-scrollbar scroll-smooth"
        >
          {CATEGORY_NAMES_LIST.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
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
          className="hidden sm:flex items-center justify-center w-7 h-7 rounded-lg bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 shadow-2xs border border-stone-200 shrink-0 mx-1 z-10 transition-colors cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* View All */}
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="hidden md:flex items-center gap-1 text-xs font-medium text-stone-700 hover:text-stone-900 px-3 py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 shrink-0 mr-2 border border-stone-200 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-stone-500" />
            <span>All Categories</span>
          </button>
        )}
      </div>
    </div>
  );
};
