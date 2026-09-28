import React from 'react';
import { CATEGORIES } from '../data/rentalData';
import { CategoryId } from '../types/rental';
import { Sparkles } from 'lucide-react';

interface CategoryRowProps {
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

export const CategoryRow: React.FC<CategoryRowProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Category Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-neutral-900 font-brand">
            Shop by Occasion & Festivals
          </h2>
          <span className="text-[10px] text-rose-600 font-bold bg-rose-50 border border-rose-200/60 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> Festivals & Fancy Themes
          </span>
        </div>

        {selectedCategory !== 'all' && (
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 transition"
          >
            Show All Outfits
          </button>
        )}
      </div>

      {/* Horizontal Scrollable Row of Circular Icons */}
      <div className="flex items-start gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 scroll-smooth">
        {CATEGORIES.map((cat) => {
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
                    />
                  </div>
                </div>

                {/* Badge on circle (e.g. Festival, Couture, Hot) */}
                {cat.badge && (
                  <span
                    className={`absolute -top-1 -right-1 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-tighter shadow-xs ${
                      cat.festivalType
                        ? 'bg-gradient-to-r from-purple-600 to-rose-600'
                        : 'bg-gradient-to-r from-rose-600 to-pink-600'
                    }`}
                  >
                    {cat.badge}
                  </span>
                )}
              </div>

              {/* Label below circle */}
              <span
                className={`mt-2 text-xs sm:text-sm text-center transition-colors font-bold tracking-tight ${
                  isSelected
                    ? 'text-rose-600'
                    : 'text-neutral-700 group-hover:text-neutral-950'
                }`}
              >
                {cat.name}
              </span>

              {/* Subtitle / item count */}
              <span className="text-[10px] text-neutral-400 group-hover:text-neutral-500">
                {cat.itemCount} fits
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
