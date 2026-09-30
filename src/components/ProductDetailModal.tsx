import React, { useState } from 'react';
import { X, Star, Heart, Calendar, ShieldCheck, Sparkles, Check, Info, ArrowRight, Truck } from 'lucide-react';
import { DressProduct, RentalDuration } from '../types/rental';

interface ProductDetailModalProps {
  product: DressProduct | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: DressProduct) => void;
  onAddToCart: (product: DressProduct, size: string, duration: RentalDuration, startDate: string) => void;
  onRentNow?: (product: DressProduct, size: string, duration: RentalDuration, startDate: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onRentNow,
}) => {
  if (!isOpen || !product) return null;

  const [selectedDuration, setSelectedDuration] = useState<RentalDuration>(4);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [startDate, setStartDate] = useState<string>(
    new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString().split('T')[0]
  );
  const [addedToast, setAddedToast] = useState(false);

  // Dynamic rental pricing calculation
  const durationMultiplier: Record<RentalDuration, number> = {
    3: 0.85,
    4: 1.0,
    7: 1.5,
    10: 2.0,
  };
  const activeRentalPrice = Math.round(product.rentalPrice * durationMultiplier[selectedDuration]);
  const savings = product.retailPrice - activeRentalPrice;

  // Delivery date calculations (arrives 1 day before selected event startDate for trial fitting)
  const eventDateObj = new Date(startDate || Date.now());
  const deliveryDateObj = new Date(eventDateObj.getTime() - 1 * 24 * 3600 * 1000);
  const returnDateObj = new Date(eventDateObj.getTime() + selectedDuration * 24 * 3600 * 1000);

  const formattedDeliveryDate = deliveryDateObj.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const formattedEventDate = eventDateObj.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const formattedReturnDate = returnDateObj.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const handleAddToCartOnly = () => {
    onAddToCart(product, selectedSize, selectedDuration, startDate);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 1200);
  };

  const handleInstantRent = () => {
    if (onRentNow) {
      onRentNow(product, selectedSize, selectedDuration, startDate);
      onClose();
    } else {
      handleAddToCartOnly();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto no-scrollbar shadow-2xl flex flex-col animate-in slide-in-from-bottom-6 duration-300 border border-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close & Wishlist */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-neutral-100">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
              Rental Overview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist(product)}
              className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-600 transition"
              aria-label="Wishlist"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? 'fill-rose-500 text-rose-500' : 'stroke-[2]'
                }`}
              />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-600 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Image Preview */}
        <div className="relative aspect-[3/4] max-h-72 w-full overflow-hidden bg-neutral-100">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
            {product.discountPercentage}% OFF
          </div>
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating} ({product.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Details & Selectors */}
        <div className="p-4 space-y-4">
          {/* Brand & Title */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-rose-600">
              <span>{product.brand}</span>
              <span className="text-neutral-400 font-normal">Rented {product.rentedCount}+ times</span>
            </div>
            <h2 className="text-base font-bold text-neutral-900 mt-0.5 font-brand">
              {product.name}
            </h2>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing Highlight */}
          <div className="bg-rose-50/70 border border-rose-100 rounded-xl p-3 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wide">
                Rental Fee ({selectedDuration} Days)
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xl font-black text-rose-600 font-brand">
                  ₹{activeRentalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-neutral-400 line-through">
                  ₹{product.retailPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                You save ₹{savings.toLocaleString('en-IN')}
              </span>
              <span className="block text-[9px] text-neutral-400 mt-0.5">
                + ₹{product.securityDeposit} refundable deposit
              </span>
            </div>
          </div>

          {/* Rental Duration Selector */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-neutral-800 mb-1.5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-rose-500" />
                Select Rental Duration
              </span>
              <span className="text-[10px] font-semibold text-rose-600">Free extensions on request</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {([3, 4, 7, 10] as RentalDuration[]).map((dur) => (
                <button
                  key={dur}
                  onClick={() => setSelectedDuration(dur)}
                  className={`py-2 px-1 text-center rounded-xl border text-xs font-bold transition flex flex-col items-center ${
                    selectedDuration === dur
                      ? 'border-rose-500 bg-rose-500 text-white shadow-xs'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-rose-300'
                  }`}
                >
                  <span>{dur} Days</span>
                  <span className={`text-[9px] font-normal ${selectedDuration === dur ? 'text-rose-100' : 'text-neutral-400'}`}>
                    ₹{Math.round(product.rentalPrice * durationMultiplier[dur])}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Date Picker */}
          <div>
            <label className="block text-xs font-bold text-neutral-800 mb-1">
              Select Event / Function Date
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:border-rose-500"
              />
            </div>
            <p className="text-[10px] text-neutral-400 mt-1">
              Select the day of your event. We deliver 1 day prior for your doorstep trial.
            </p>
          </div>

          {/* Prominent Estimated Delivery Date & Time Box */}
          <div className="bg-amber-50/90 border border-amber-300/80 rounded-2xl p-3.5 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-rose-600" />
                <span>Estimated Doorstep Delivery</span>
              </span>
              <span className="text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                Nashik Fleet 📍
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-amber-200/80 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase block">
                  Arrives By Courier
                </span>
                <span className="text-sm font-black text-neutral-900 block font-brand">
                  {formattedDeliveryDate} by 1:30 PM
                </span>
                <span className="text-[10.5px] text-emerald-700 font-semibold block mt-0.5">
                  ✓ Ready for fitting 1 day before event ({formattedEventDate})
                </span>
              </div>
              <div className="text-right shrink-0 border-l border-neutral-100 pl-3">
                <span className="text-[10px] text-neutral-400 font-bold uppercase block">
                  Reverse Pickup
                </span>
                <span className="text-xs font-bold text-neutral-800 block">
                  {formattedReturnDate}
                </span>
                <span className="text-[10px] text-neutral-400 block">
                  by 11:00 AM
                </span>
              </div>
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-neutral-800 mb-1.5">
              <span>Select Size</span>
              <span className="text-[10px] text-neutral-500 font-normal">
                Includes Free Backup Size option
              </span>
            </div>
            <div className="flex items-center gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center border transition ${
                    selectedSize === sz
                      ? 'border-rose-600 bg-rose-600 text-white shadow-xs'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Why Rent with REVOGUE Perks */}
          <div className="border-t border-neutral-100 pt-3 space-y-2">
            <h4 className="text-xs font-bold text-neutral-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              REVOGUE Rental Guarantee
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-neutral-600">
              <div className="flex items-center gap-1.5 bg-neutral-50 p-2 rounded-lg">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Professional Dry Cleaning</span>
              </div>
              <div className="flex items-center gap-1.5 bg-neutral-50 p-2 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% Refundable Deposit</span>
              </div>
              <div className="flex items-center gap-1.5 bg-neutral-50 p-2 rounded-lg">
                <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Doorstep Reverse Pickup</span>
              </div>
              <div className="flex items-center gap-1.5 bg-neutral-50 p-2 rounded-lg">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Custom Hem Pinning</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="sticky bottom-0 z-20 bg-white border-t border-neutral-200 p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="flex items-center justify-between sm:block sm:w-auto">
            <div>
              <span className="text-[10px] text-neutral-400 block font-medium">Rental Total</span>
              <span className="text-lg sm:text-xl font-black text-neutral-900 font-brand">
                ₹{activeRentalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300 sm:hidden">
              🚚 Arrives {formattedDeliveryDate}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={handleAddToCartOnly}
              className="flex-1 py-3 px-3 rounded-xl border border-neutral-300 hover:border-neutral-400 text-neutral-800 text-xs font-bold uppercase tracking-wider transition hover:bg-neutral-50 flex items-center justify-center gap-1.5"
            >
              {addedToast ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> Added to Bag
                </>
              ) : (
                'Add to Bag'
              )}
            </button>

            <button
              onClick={handleInstantRent}
              className="flex-1 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/25 transition active:scale-95"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Rent Now · Delivers {formattedDeliveryDate}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
