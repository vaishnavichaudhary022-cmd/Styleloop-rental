import React from 'react';
import { CATEGORIES } from '../data/rentalData';
import { CategoryId } from '../types/rental';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CategoriesViewProps {
  onSelectCategory: (id: CategoryId) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ onSelectCategory }) => {
  return (
    <div className="p-4 pb-24 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 font-brand">
            Browse by Occasion
          </h2>
          <p className="text-xs text-neutral-500">
            Handpicked designer collections for every special moment
          </p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
          REVOGUE Edit
        </span>
      </div>

      {/* Grid of full category cards */}
      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-neutral-900 cursor-pointer shadow-sm hover:shadow-md transition"
          >
            <img
              src={cat.image}
              alt={cat.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3">
              {cat.badge && (
                <span className="self-start text-[9px] font-extrabold text-white bg-rose-600 px-1.5 py-0.5 rounded uppercase mb-1">
                  {cat.badge}
                </span>
              )}
              <h3 className="text-white font-bold text-sm font-brand leading-tight">
                {cat.name}
              </h3>
              <p className="text-[10px] text-rose-200 mt-0.5">
                {cat.itemCount} designer outfits
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Curated Silhouettes */}
      <div className="mt-4 pt-3 border-t border-neutral-200/80">
        <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wider font-brand mb-2.5">
          Shop by Silhouette
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {['Mermaid Cut Gowns', 'Backless Silk Slips', 'Festive Lehenga Sets', 'Corset Mini Dresses', 'Cape Blazers', 'Embellished Kaftans'].map((item) => (
            <button
              key={item}
              onClick={() => onSelectCategory('party')}
              className="p-2.5 bg-white border border-neutral-200 rounded-xl text-left font-medium text-neutral-700 hover:border-rose-400 hover:text-rose-600 flex items-center justify-between transition"
            >
              <span>{item}</span>
              <ArrowRight className="w-3 h-3 text-neutral-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
