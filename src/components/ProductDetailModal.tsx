import React, { useState } from 'react';
import { X, Star, Heart, Calendar, ShieldCheck, Sparkles, Check, Truck } from 'lucide-react';
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
        className="w-full max-w-xl bg-white rounded-t-2xl sm:rounded-2xl max-h-[92vh] overflow-y-auto no-scrollbar shadow-2xl flex flex-col animate-in slide-in-from-bottom-6 duration-300 border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close & Wishlist */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-stone-200">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium uppercase tracking-wider text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
              Rental Overview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist(product)}
              className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 transition cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? 'fill-stone-900 text-stone-900' : 'stroke-[2]'
                }`}
              />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Image Preview */}
        <div className="relative aspect-[3/4] max-h-72 w-full overflow-hidden bg-stone-100">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.endsWith('/assets/fallback-dress.svg')) {
                target.src = '/assets/fallback-dress.svg';
              }
            }}
          />
          <div className="absolute top-3 left-3 bg-stone-900 text-white text-[10px] font-medium px-2 py-0.5 rounded uppercase tracking-wider shadow-xs">
            {product.discountPercentage}% OFF
          </div>
          <div className="absolute bottom-3 right-3 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2.5 py-1 rounded flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating} ({product.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="p-4 sm:p-5 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-stone-500 uppercase tracking-wider">
              <span>{product.targetGender}</span>
              <span>·</span>
              <span>{product.brand}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 mt-1">
              {product.name}
            </h2>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing Highlight */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-medium text-stone-500 uppercase tracking-wide">
                Rental Fee ({selectedDuration} Days)
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xl font-bold text-stone-900 font-sans">
                  ₹{activeRentalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-stone-400 line-through">
                  ₹{product.retailPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-medium text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Save ₹{savings.toLocaleString('en-IN')}
              </span>
              <span className="block text-[10px] text-stone-500 mt-0.5">
                + ₹{product.securityDeposit} refundable deposit
              </span>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 space-y-2">
            <h4 className="text-[11px] font-medium uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <span>📋</span> Costume & Outfit Specifications
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-stone-200">
                <span className="text-[10px] text-stone-400 font-medium block">Fabric & Material</span>
                <span className="font-medium text-stone-900 block truncate">{product.fabric || 'Pure Silk Blend'}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-stone-200">
                <span className="text-[10px] text-stone-400 font-medium block">Age Group / Fit</span>
                <span className="font-medium text-stone-900 block truncate">
                  {product.ageGroup || (product.targetGender === 'kids' ? `Kids (${product.sizes.join(', ')})` : `Adults (${product.sizes.join(', ')})`)}
                </span>
              </div>
              <div className="col-span-2 bg-white p-2.5 rounded-lg border border-stone-200">
                <span className="text-[10px] text-stone-400 font-medium block">Package Includes</span>
                <span className="font-medium text-stone-900 block">
                  {product.includes || (product.targetGender === 'kids' ? 'Full Costume + Props + Mukut/Headpiece' : 'Complete Outfit + Matching Accessories + Stole')}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-stone-200">
                <span className="text-[10px] text-stone-400 font-medium block">Security Deposit</span>
                <span className="font-medium text-emerald-800 block">₹{product.securityDeposit} (100% Refundable)</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-stone-200">
                <span className="text-[10px] text-stone-400 font-medium block">Hygiene Status</span>
                <span className="font-medium text-emerald-800 block flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  {product.condition || '100% Sanitized & Dry-Cleaned'}
                </span>
              </div>
            </div>
          </div>

          {/* Rental Duration Selector */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-stone-800 mb-1.5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-600" />
                Select Rental Duration
              </span>
              <span className="text-[10px] font-medium text-stone-600">Free extensions on request</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {([3, 4, 7, 10] as RentalDuration[]).map((dur) => (
                <button
                  key={dur}
                  onClick={() => setSelectedDuration(dur)}
                  className={`py-2 px-1 text-center rounded-lg border text-xs font-medium transition flex flex-col items-center cursor-pointer ${
                    selectedDuration === dur
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                  }`}
                >
                  <span>{dur} Days</span>
                  <span className={`text-[10px] ${selectedDuration === dur ? 'text-stone-300' : 'text-stone-400'}`}>
                    ₹{Math.round(product.rentalPrice * durationMultiplier[dur])}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Date Picker */}
          <div>
            <label className="block text-xs font-medium text-stone-800 mb-1">
              Select Event / Function Date
            </label>
            <input
              type="date"
              value={startDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-900 font-medium focus:outline-none focus:border-stone-900 cursor-pointer"
            />
            <div className="mt-1 flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-stone-700" />
                Delivery: <strong className="text-stone-800">{formattedDeliveryDate}</strong> (1 day before)
              </span>
              <span>
                Return: <strong className="text-stone-800">{formattedReturnDate}</strong>
              </span>
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-stone-800 mb-1.5">
              <span>Select Size</span>
              <span className="text-[10px] text-stone-500">
                Includes Free Backup Size option
              </span>
            </div>
            <div className="flex items-center gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`w-10 h-10 rounded-lg font-medium text-xs flex items-center justify-center border transition cursor-pointer ${
                    selectedSize === sz
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* REVOGUE Perks */}
          <div className="border-t border-stone-200 pt-3 space-y-2">
            <h4 className="text-xs font-medium text-stone-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-stone-700" />
              REVOGUE Rental Guarantee
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-stone-600">
              <div className="flex items-center gap-1.5 bg-stone-50 p-2 rounded-lg border border-stone-200">
                <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Professional Dry Cleaning</span>
              </div>
              <div className="flex items-center gap-1.5 bg-stone-50 p-2 rounded-lg border border-stone-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>100% Refundable Deposit</span>
              </div>
              <div className="flex items-center gap-1.5 bg-stone-50 p-2 rounded-lg border border-stone-200">
                <Truck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Doorstep Reverse Pickup</span>
              </div>
              <div className="flex items-center gap-1.5 bg-stone-50 p-2 rounded-lg border border-stone-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Custom Hem Pinning</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="sticky bottom-0 z-20 bg-white border-t border-stone-200 p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="flex items-center justify-between sm:block sm:w-auto">
            <div>
              <span className="text-[10px] text-stone-500 block font-medium">Rental Total</span>
              <span className="text-lg sm:text-xl font-bold text-stone-900 font-sans">
                ₹{activeRentalPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={handleAddToCartOnly}
              className="flex-1 py-2.5 px-3 rounded-lg border border-stone-300 hover:border-stone-900 text-stone-900 text-xs font-medium uppercase tracking-wider transition hover:bg-stone-50 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {addedToast ? (
                <>
                  <Check className="w-4 h-4 text-emerald-700 stroke-[3]" /> Added to Bag
                </>
              ) : (
                'Add to Bag'
              )}
            </button>

            <button
              onClick={handleInstantRent}
              className="flex-1 bg-stone-900 hover:bg-stone-800 text-white py-2.5 px-4 rounded-lg text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition active:scale-95 cursor-pointer"
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
