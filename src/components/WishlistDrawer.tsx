import React from 'react';
import { X, Heart, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
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
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="font-bold text-base text-neutral-900 font-brand">
              My Wishlist ({wishlistProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-100 text-neutral-600"
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
              className="flex gap-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-100 relative group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-24 object-cover rounded-xl shrink-0"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                    {product.brand}
                  </div>
                  <h4 className="text-xs font-semibold text-neutral-900 line-clamp-1">
                    {product.name}
                  </h4>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-sm font-bold text-neutral-950 font-brand">
                      ₹{product.rentalPrice}
                    </span>
                    <span className="text-[10px] text-neutral-400 line-through">
                      ₹{product.retailPrice}
                    </span>
                    <span className="text-[9px] font-bold text-rose-600">
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
                    className="flex-1 py-1.5 px-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 shadow-2xs active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Rent Now
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-neutral-200/60 transition"
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
              <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-sm text-neutral-800">Your wishlist is empty</h4>
              <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                Tap the heart on any dress card in the Trending Rentals grid to save it for upcoming events.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
