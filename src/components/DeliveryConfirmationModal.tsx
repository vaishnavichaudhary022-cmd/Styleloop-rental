import React from 'react';
import {
  X,
  Truck,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Package,
  Sparkles,
  ArrowRight,
  Share2,
  AlertCircle
} from 'lucide-react';
import { RentalOrder } from '../types/rental';
import { Logo } from './Logo';

interface DeliveryConfirmationModalProps {
  order: RentalOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onViewAllRentals?: () => void;
  onOpenInvoice?: (order: RentalOrder) => void;
}

export const DeliveryConfirmationModal: React.FC<DeliveryConfirmationModalProps> = ({
  order,
  isOpen,
  onClose,
  onViewAllRentals,
  onOpenInvoice,
}) => {
  if (!isOpen || !order) return null;

  const eventDate = new Date(order.startDate);
  const deliveryDate = new Date(eventDate.getTime() - 1 * 24 * 3600 * 1000);
  const formattedDeliveryDay = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedEventDay = eventDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const formattedReturnDay = new Date(order.endDate).toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] border border-amber-200/60 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Celebration Bar with Brand Logo & Close */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
              <CheckCircle2 className="w-5 h-5 text-white stroke-[2.5]" />
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-200 block">
                Rental Order Confirmed
              </span>
              <h3 className="font-extrabold text-base sm:text-lg leading-tight font-brand">
                Delivery Scheduled!
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 no-scrollbar bg-neutral-50/50">
          
          {/* ============ HERO: WHEN IT WILL GET DELIVERED (SHOPPING APP STYLE) ============ */}
          <div className="bg-gradient-to-br from-amber-50 via-white to-rose-50 rounded-3xl p-4 sm:p-5 border-2 border-amber-300 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center shadow-md shrink-0">
                  <Truck className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10.5px] font-black uppercase tracking-wider text-rose-700 block">
                    Estimated Doorstep Delivery
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-neutral-900 font-brand">
                    {formattedDeliveryDay}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-xs font-bold text-amber-800">
                      Guaranteed Delivery by 1:30 PM
                    </span>
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                On Schedule ⚡
              </span>
            </div>

            {/* Why 1 day prior notice */}
            <div className="bg-white/90 p-3 rounded-2xl border border-amber-200/80 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-neutral-900 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Arrives 1 Day Before Your Event ({formattedEventDay})</span>
              </div>
              <p className="text-neutral-600 text-[11px] leading-relaxed">
                Like premium rental services, we deliver a day in advance so you can try on your outfit with shoes and jewelry at home. A <strong>free backup size</strong> is included in this package!
              </p>
            </div>

            {/* Live Progress Stepper (Amazon / Myntra style) */}
            <div className="space-y-2 pt-1 border-t border-amber-200/60">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-extrabold uppercase tracking-wider text-neutral-500">
                  Live Dispatch Timeline
                </span>
                <span className="text-rose-600 font-bold">
                  Tracking: {order.courierTrackingNo}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
                  <div className="text-[12px] mb-0.5">✓</div>
                  <div>Booked</div>
                  <div className="text-[8.5px] font-normal text-emerald-700">Just Now</div>
                </div>

                <div className="p-2 rounded-xl bg-amber-100 text-amber-950 font-bold border border-amber-300 animate-pulse">
                  <div className="text-[12px] mb-0.5">♨</div>
                  <div>Steam Press</div>
                  <div className="text-[8.5px] font-normal text-amber-800">Sterilization</div>
                </div>

                <div className="p-2 rounded-xl bg-white text-neutral-700 font-bold border border-neutral-200">
                  <div className="text-[12px] mb-0.5">🚚</div>
                  <div>Delivery</div>
                  <div className="text-[8.5px] font-normal text-neutral-500">by 1:30 PM</div>
                </div>

                <div className="p-2 rounded-xl bg-white text-neutral-700 font-bold border border-neutral-200">
                  <div className="text-[12px] mb-0.5">🔄</div>
                  <div>Return Pickup</div>
                  <div className="text-[8.5px] font-normal text-neutral-500">{formattedReturnDay}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Summary Card */}
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-neutral-200 flex gap-3.5 items-center">
            <img
              src={order.product.image}
              alt={order.product.name}
              className="w-16 h-20 object-cover object-top rounded-xl border border-neutral-100 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                {order.product.brand}
              </span>
              <h5 className="font-bold text-xs sm:text-sm text-neutral-900 truncate font-brand">
                {order.product.name}
              </h5>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-neutral-600">
                <span className="bg-neutral-100 px-2 py-0.5 rounded font-semibold text-neutral-800">
                  Primary: Size {order.selectedSize}
                </span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                  + Free Backup Size Included
                </span>
                <span className="text-neutral-500">
                  {order.rentalDuration} Days Rental
                </span>
              </div>
            </div>
          </div>

          {/* Doorstep Delivery Address & Rider Info */}
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-neutral-200 space-y-2.5">
            <div className="flex items-center justify-between text-xs border-b border-neutral-100 pb-2">
              <span className="font-bold text-neutral-800 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Delivery Address (Nashik Only)</span>
              </span>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                Nashik Fleet Dispatch 📍
              </span>
            </div>

            <div className="text-xs space-y-1 text-neutral-700">
              <p className="font-bold text-neutral-900">
                {order.deliveryAddress.fullName} · {order.deliveryAddress.phone}
              </p>
              <p className="text-neutral-600 text-[11px]">
                {order.deliveryAddress.street}, {order.deliveryAddress.apartment || 'Nashik'}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
              </p>
            </div>

            {/* Assigned Rider Contact */}
            <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200/70 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                  AD
                </div>
                <div>
                  <span className="font-bold text-neutral-900 block text-[11px]">
                    Akash Deshmukh (Doorstep Fitting Rider)
                  </span>
                  <span className="text-[10px] text-neutral-500">
                    Nashik West Hub · On-time delivery guarantee
                  </span>
                </div>
              </div>
              <a
                href="tel:+919423988120"
                className="px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] flex items-center gap-1 transition"
              >
                <Phone className="w-3 h-3" /> Call Rider
              </a>
            </div>
          </div>

          {/* 100% Security Deposit Escrow Guarantee */}
          <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold block text-[11px]">
                  ₹{order.securityDeposit.toLocaleString('en-IN')} Escrow Protected
                </span>
                <span className="text-[10px] text-emerald-700">
                  Automatically refunded to your UPI within 2 hours of reverse pickup
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 border-t border-neutral-200 bg-white space-y-2">
          {onViewAllRentals && (
            <button
              onClick={() => {
                onClose();
                onViewAllRentals();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-rose-500/25 transition active:scale-95"
            >
              <Truck className="w-4 h-4" />
              <span>Track Live Delivery in My Rentals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="flex items-center gap-2">
            {onOpenInvoice && (
              <button
                onClick={() => onOpenInvoice(order)}
                className="flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <span>Download Invoice</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold transition"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
