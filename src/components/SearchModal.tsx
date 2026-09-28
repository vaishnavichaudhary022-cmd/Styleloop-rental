import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Star, Flame } from 'lucide-react';
import { DressProduct } from '../types/rental';
import { POPULAR_SEARCH_TAGS } from '../data/rentalData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: DressProduct[];
  onSelectProduct: (product: DressProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [searchQuery, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-0 sm:p-6">
      <div className="w-full max-w-xl bg-white sm:rounded-3xl h-full sm:h-[80vh] flex flex-col shadow-2xl animate-in slide-in-from-top-4 duration-200 border border-neutral-100">
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-neutral-100 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-neutral-100 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-neutral-400" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by designer, event, color..."
              className="w-full bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-neutral-400 hover:text-neutral-700">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 px-1 py-1"
          >
            Cancel
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
          {searchQuery ? (
            /* Results List */
            <div>
              <div className="flex items-center justify-between mb-3 text-xs text-neutral-500 font-medium">
                <span>Search results ({filteredProducts.length})</span>
              </div>

              <div className="space-y-2.5">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-rose-50/50 border border-neutral-100 cursor-pointer transition group"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-16 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                        {p.brand}
                      </div>
                      <h4 className="text-xs font-semibold text-neutral-900 truncate group-hover:text-rose-600 transition">
                        {p.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-neutral-950 font-brand">
                          ₹{p.rentalPrice}
                        </span>
                        <span className="text-[10px] text-neutral-400 line-through">
                          ₹{p.retailPrice}
                        </span>
                        <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1 rounded">
                          {p.discountPercentage}% OFF
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-rose-500 transition" />
                  </div>
                ))}

                {filteredProducts.length === 0 && (
                  <div className="py-12 text-center text-neutral-400 text-xs">
                    No dresses found matching "{searchQuery}". Try searching "Velvet", "Gown", or "Festive".
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Popular Trending Searches */
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 mb-2.5 font-brand uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                Trending Searches on REVOGUE
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCH_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 border border-transparent rounded-lg text-xs font-medium text-neutral-700 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Quick Suggestions */}
              <div className="mt-6 border-t border-neutral-100 pt-4">
                <h4 className="text-xs font-bold text-neutral-900 mb-2 font-brand uppercase tracking-wider">
                  Popular Designers
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600">
                  <button
                    onClick={() => setSearchQuery('Marchesi')}
                    className="p-2 text-left bg-neutral-50 rounded-lg hover:bg-neutral-100"
                  >
                    Marchesi Atelier
                  </button>
                  <button
                    onClick={() => setSearchQuery('Vera Monroe')}
                    className="p-2 text-left bg-neutral-50 rounded-lg hover:bg-neutral-100"
                  >
                    Vera Monroe
                  </button>
                  <button
                    onClick={() => setSearchQuery('Savana')}
                    className="p-2 text-left bg-neutral-50 rounded-lg hover:bg-neutral-100"
                  >
                    Savana Luxe
                  </button>
                  <button
                    onClick={() => setSearchQuery('Aurelia')}
                    className="p-2 text-left bg-neutral-50 rounded-lg hover:bg-neutral-100"
                  >
                    Aurelia Couture
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
