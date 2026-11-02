import React from 'react';
import { Star, Heart, Flame, Sparkles, SlidersHorizontal, ArrowRight, X, ShoppingBag } from 'lucide-react';
import { DressProduct, CategoryId, TargetGender } from '../types/rental';
import { CATEGORIES } from '../data/rentalData';

interface TrendingRentalsGridProps {
  products: DressProduct[];
  wishlistIds: Set<string>;
  onToggleWishlist: (product: DressProduct, e: React.MouseEvent) => void;
  onSelectProduct: (product: DressProduct) => void;
  selectedCategory: CategoryId;
  onSelectCategory?: (id: CategoryId) => void;
  selectedGender: TargetGender;
  sortOption: string;
  onSortChange: (sort: string) => void;
  filterUnder1500: boolean;
  onToggleFilterUnder1500: () => void;
  filterFestivalOnly: boolean;
  onToggleFilterFestivalOnly: () => void;
}

export const TrendingRentalsGrid: React.FC<TrendingRentalsGridProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  selectedCategory,
  onSelectCategory,
  sortOption,
  onSortChange,
  filterUnder1500,
  onToggleFilterUnder1500,
  filterFestivalOnly,
  onToggleFilterFestivalOnly,
}) => {
  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <section id="trending-rentals-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
              Curated Rentals
            </h2>
            <span className="text-xs text-stone-500 font-medium">
              Popular in Nashik
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Top rented designer dresses, wedding sherwanis, festive lehengas & kids fancy costumes
          </p>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Active Category Filter Tag */}
          {selectedCategory !== 'all' && activeCategoryObj && (
            <button
              onClick={() => onSelectCategory && onSelectCategory('all')}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-900 text-white flex items-center gap-1.5 transition-colors hover:bg-stone-800 cursor-pointer shadow-xs"
              title="Click to clear category filter"
            >
              <span>{activeCategoryObj.iconEmoji || '✨'}</span>
              <span>{activeCategoryObj.name}</span>
              <X className="w-3.5 h-3.5 ml-0.5" />
            </button>
          )}

          {/* Under ₹1500 filter */}
          <button
            onClick={onToggleFilterUnder1500}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
              filterUnder1500
                ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400'
            }`}
          >
            Under ₹1,500
          </button>

          {/* Festival & Themes filter */}
          <button
            onClick={onToggleFilterFestivalOnly}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
              filterFestivalOnly
                ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-stone-500" />
            <span>Festival & Costumes</span>
          </button>

          {/* Sort Selector */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-white border border-stone-200 text-stone-700 text-xs font-medium rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:border-stone-900 hover:border-stone-400 transition-colors cursor-pointer"
            >
              <option value="popularity">Trending / Popular</option>
              <option value="rating">Top Rated (4.8+)</option>
              <option value="price-asc">Rental: Low to High</option>
              <option value="price-desc">Rental: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          <span className="text-xs text-stone-400 hidden sm:inline">
            ({products.length} outfits)
          </span>
        </div>
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
        {products.map((product) => {
          const isWishlisted = wishlistIds.has(product.id);

          return (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group bg-white rounded-xl overflow-hidden border border-stone-200/80 shadow-xs hover:border-stone-300 hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer relative"
            >
              {/* Product Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/assets/fallback-dress.svg')) {
                      target.src = '/assets/fallback-dress.svg';
                    }
                  }}
                />

                {/* Soft natural gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none opacity-50" />

                {/* Top Row: Discount Tag & Wishlist Heart */}
                <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
                  <span className="bg-stone-900/90 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-xs tracking-wider uppercase">
                    {product.discountPercentage}% OFF
                  </span>

                  <button
                    onClick={(e) => onToggleWishlist(product, e)}
                    className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-xs transition active:scale-90 cursor-pointer"
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isWishlisted
                          ? 'fill-stone-900 text-stone-900'
                          : 'stroke-[2]'
                      }`}
                    />
                  </button>
                </div>

                {/* Bottom of Image: Rating & Rented Tag */}
                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-[11px] z-10">
                  <div className="flex items-center gap-1 bg-white/95 backdrop-blur-xs text-stone-900 font-semibold px-2 py-0.5 rounded shadow-xs">
                    <span className="text-stone-900 font-bold">{product.rating}</span>
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span className="text-[10px] text-stone-400 font-normal">
                      ({product.reviewCount})
                    </span>
                  </div>

                  <div className="bg-stone-900/80 backdrop-blur-xs text-stone-100 text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-300 shrink-0" />
                    <span>{product.rentedCount}+ rents</span>
                  </div>
                </div>
              </div>

              {/* Product Info Body */}
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between bg-white">
                <div>
                  {/* Department & Brand */}
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-stone-500 font-medium tracking-wider uppercase truncate">
                    <span className="font-semibold text-stone-700">{product.targetGender}</span>
                    <span>·</span>
                    <span className="truncate">{product.brand}</span>
                  </div>

                  {/* Product Title */}
                  <h3 className="mt-1 text-xs sm:text-sm font-semibold text-stone-900 line-clamp-1 group-hover:text-stone-700 transition">
                    {product.name}
                  </h3>

                  {/* Festival or Occasion Tag */}
                  {product.festival && (
                    <div className="mt-0.5 text-[10px] font-medium text-stone-600 truncate flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-stone-400 shrink-0" />
                      <span>{product.festival}</span>
                    </div>
                  )}

                  {/* Pricing Block */}
                  <div className="mt-2 pt-2 border-t border-stone-100 flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-base sm:text-lg font-bold text-stone-900 font-sans">
                          ₹{product.rentalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-stone-400 line-through">
                          ₹{product.retailPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          {product.discountPercentage}% OFF
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-500 block font-normal mt-0.5">
                        4 Days Rental Fee
                      </span>
                    </div>
                  </div>

                  {/* Clean Size Availability */}
                  <div className="mt-2 flex items-center justify-between text-[11px] text-stone-600 pt-2 border-t border-stone-100">
                    <span className="font-normal text-stone-600">
                      {product.targetGender === 'kids' && product.ageGroup ? (
                        <span>Age: <strong className="text-stone-800 font-medium">{product.ageGroup}</strong></span>
                      ) : (
                        <span>Sizes: <strong className="text-stone-800 font-medium">{product.sizes.slice(0, 4).join(', ')}</strong></span>
                      )}
                    </span>
                    <span className="text-[10px] font-medium text-emerald-700">
                      ✓ Available
                    </span>
                  </div>
                </div>

                {/* Tactile Boutique Rent Button (Replaces multi-gradient button) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(product);
                  }}
                  className="w-full mt-3 py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded-lg text-xs tracking-wider uppercase transition-colors shadow-xs active:scale-[0.99] flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Rent Now</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5 opacity-70 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {products.length === 0 && (
        <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-stone-200 mt-6">
          <Sparkles className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-stone-800">No rental outfits found</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Try resetting your filters or selecting "All Outfits" in the navigation.
          </p>
        </div>
      )}
    </section>
  );
};
