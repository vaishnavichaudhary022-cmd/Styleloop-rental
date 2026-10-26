import React from 'react';
import { Star, Heart, Flame, Sparkles, SlidersHorizontal, ArrowRight, ShieldCheck, X, ShoppingBag } from 'lucide-react';
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
  selectedGender,
  sortOption,
  onSortChange,
  filterUnder1500,
  onToggleFilterUnder1500,
  filterFestivalOnly,
  onToggleFilterFestivalOnly,
}) => {
  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);
  return (
    <section id="trending-rentals-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 font-brand tracking-tight">
              Trending Rentals
            </h2>
            <span className="flex items-center gap-1 bg-rose-50 text-rose-600 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-rose-200/60">
              <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> Hot Right Now
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Top rented designer dresses, wedding sherwanis, festive lehengas & kids fancy costumes
          </p>
        </div>

        {/* Filter and Sort Bar */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Active Category Filter Pill */}
          {selectedCategory !== 'all' && activeCategoryObj && (
            <button
              onClick={() => onSelectCategory && onSelectCategory('all')}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-600 text-white flex items-center gap-1.5 shadow-xs transition hover:bg-rose-700"
              title="Click to clear category filter"
            >
              <span>{activeCategoryObj.iconEmoji || '✨'}</span>
              <span>{activeCategoryObj.name}</span>
              <X className="w-3 h-3 ml-0.5" />
            </button>
          )}
          {/* Under ₹1500 filter */}
          <button
            onClick={onToggleFilterUnder1500}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition ${
              filterUnder1500
                ? 'bg-rose-500 border-rose-500 text-white shadow-xs'
                : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300'
            }`}
          >
            Under ₹1,500
          </button>

          {/* Festival & Themes filter */}
          <button
            onClick={onToggleFilterFestivalOnly}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition flex items-center gap-1 ${
              filterFestivalOnly
                ? 'bg-purple-600 border-purple-600 text-white shadow-xs'
                : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300'
            }`}
          >
            <Sparkles className="w-3 h-3" /> Festival & Fancy Outfits
          </button>

          {/* Sort Selector */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-white border border-neutral-200 text-neutral-700 text-xs font-bold rounded-xl pl-3 pr-8 py-1.5 focus:outline-none focus:border-rose-400 hover:border-neutral-300 transition cursor-pointer"
            >
              <option value="popularity">Trending / Popular</option>
              <option value="rating">Top Rated (4.8+)</option>
              <option value="price-asc">Rental: Low to High</option>
              <option value="price-desc">Rental: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          <span className="text-xs font-bold text-neutral-400 hidden sm:inline">
            ({products.length} outfits)
          </span>
        </div>
      </div>

      {/* Responsive Grid of Product Cards: 2-col on mobile, 3-col on tablet, 4-col on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
        {products.map((product) => {
          const isWishlisted = wishlistIds.has(product.id);

          return (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer relative"
            >
              {/* Product Image Container with Badges */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/assets/fallback-dress.svg')) {
                      target.src = '/assets/fallback-dress.svg';
                    }
                  }}
                />

                {/* Soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none opacity-60" />

                {/* Top Row: Discount Badge & Wishlist Heart */}
                <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
                  {/* Discount Badge */}
                  <span className="bg-gradient-to-r from-rose-600 to-pink-600 text-white text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-lg shadow-sm uppercase tracking-wider">
                    {product.discountPercentage}% OFF
                  </span>

                  {/* Wishlist Heart Icon */}
                  <button
                    onClick={(e) => onToggleWishlist(product, e)}
                    className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-neutral-700 hover:text-rose-600 hover:bg-white shadow-sm transition active:scale-80"
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isWishlisted
                          ? 'fill-rose-500 text-rose-500 scale-110'
                          : 'stroke-[2.2]'
                      }`}
                    />
                  </button>
                </div>

                {/* Bottom of Image: Star Rating Badge & Rented X Times Badge */}
                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-[11px] z-10">
                  {/* Star Rating Badge */}
                  <div className="flex items-center gap-1 bg-white/95 backdrop-blur-xs text-neutral-900 font-bold px-2 py-0.5 rounded-lg shadow-xs">
                    <span className="text-amber-500 font-bold">{product.rating}</span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] text-neutral-400 font-normal">
                      | {product.reviewCount}
                    </span>
                  </div>

                  {/* Rented X times text badge */}
                  <div className="bg-black/65 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-400 shrink-0" />
                    <span>{product.rentedCount}+ rents</span>
                  </div>
                </div>
              </div>

              {/* Product Info Body */}
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between bg-white">
                <div>
                  {/* Department & Brand */}
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-400 font-bold tracking-wider uppercase truncate">
                    <span className="text-rose-600 font-extrabold">{product.targetGender}</span>
                    <span>·</span>
                    <span className="truncate">{product.brand}</span>
                  </div>

                  {/* Product Title */}
                  <h3 className="mt-1 text-xs sm:text-sm font-bold text-neutral-900 line-clamp-1 group-hover:text-rose-600 transition font-brand">
                    {product.name}
                  </h3>

                  {/* Festival or Occasion Tag */}
                  {product.festival && (
                    <div className="mt-0.5 text-[10px] font-semibold text-purple-700 truncate flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-purple-500 shrink-0" />
                      <span>{product.festival}</span>
                    </div>
                  )}

                  {/* Pricing Block with Strikethrough Original Retail Price & Discount */}
                  <div className="mt-2 pt-2 border-t border-neutral-100 flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-base sm:text-lg font-black text-neutral-950 font-brand">
                          ₹{product.rentalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-neutral-400 line-through">
                          ₹{product.retailPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                          {product.discountPercentage}% OFF
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-500 block font-medium">
                        4 Days Rental Fee
                      </span>
                    </div>
                    <div className="text-right text-[10px] text-neutral-400 hidden sm:block">
                      <span className="text-rose-600 font-semibold">{product.rentedCount}+</span> rents
                    </div>
                  </div>

                  {/* Clean Size Availability - Only needed detail */}
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-neutral-100/80">
                    <span className="font-medium">
                      {product.targetGender === 'kids' && product.ageGroup ? (
                        <span>Age: <strong className="text-neutral-800 font-semibold">{product.ageGroup}</strong></span>
                      ) : (
                        <span>Sizes: <strong className="text-neutral-800 font-semibold">{product.sizes.slice(0, 4).join(', ')}</strong></span>
                      )}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      ✓ Available
                    </span>
                  </div>
                </div>

                {/* Prominent Rent Now Action Button (Replaces 'Contact Supplier' as requested) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(product);
                  }}
                  className="w-full mt-3 py-2.5 px-3 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                  <span>Rent Now</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5 opacity-80 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {products.length === 0 && (
        <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-neutral-200 mt-6">
          <Sparkles className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-neutral-800">No rental outfits found</h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
            Try resetting your filters or selecting "All Fits" in the department navigation.
          </p>
        </div>
      )}
    </section>
  );
};
