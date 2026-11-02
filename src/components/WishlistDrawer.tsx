import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { DressProduct } from '../types/rental';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: DressProduct[];
  onRemoveFromWishlist: (productId: string) => void;
  onSelectProduct: (product: DressProduct) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 border-l border-stone-200">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-stone-900 fill-stone-900" />
            <h3 className="font-serif font-bold text-base text-stone-900">
              My Saved Archive ({wishlistProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="flex gap-3 p-3 bg-[#FAF9F6] rounded-xl border border-stone-200 relative group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-24 object-cover rounded-lg shrink-0"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.endsWith('/assets/fallback-dress.svg')) {
                    target.src = '/assets/fallback-dress.svg';
                  }
                }}
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-medium text-stone-500 uppercase tracking-wider">
                    {product.brand}
                  </div>
                  <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                    {product.name}
                  </h4>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-sm font-bold text-stone-900 font-sans">
                      ₹{product.rentalPrice}
                    </span>
                    <span className="text-[10px] text-stone-400 line-through">
                      ₹{product.retailPrice}
                    </span>
                    <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded">
                      {product.discountPercentage}% OFF
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex-1 py-1.5 px-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-1 shadow-2xs active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Rent Now
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {wishlistProducts.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-sm text-stone-900">Your archive is empty</h4>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Tap the heart on any designer piece to curate your wardrobe for upcoming festivities.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
