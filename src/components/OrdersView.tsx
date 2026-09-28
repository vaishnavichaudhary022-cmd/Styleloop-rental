import React from 'react';
import { Package, Clock, CheckCircle2, Truck, RotateCcw, Calendar, ShieldCheck } from 'lucide-react';
import velvetEmeraldImg from '../assets/images/velvet_emerald_gown_1790153002729.jpg';

export const OrdersView: React.FC = () => {
  return (
    <div className="p-4 pb-24 space-y-4">
      <div>
        <h2 className="text-lg font-bold text-neutral-900 font-brand">
          Active Rentals & Bookings
        </h2>
        <p className="text-xs text-neutral-500">
          Track upcoming fittings, deliveries, and reverse pickup schedules
        </p>
      </div>

      {/* Active Order Card */}
      <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
          <div>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
              Booking #RVG-94812
            </span>
            <span className="text-xs font-bold text-rose-600">
              Delivery this Friday by 2:00 PM
            </span>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Steam Sanitized
          </span>
        </div>

        {/* Product Details */}
        <div className="flex gap-3 items-center">
          <img
            src={velvetEmeraldImg}
            alt="Emerald Velvet Gown"
            className="w-16 h-20 object-cover rounded-xl shrink-0"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-neutral-400 uppercase">MARCHESI ATELIER</span>
            <h4 className="text-xs font-bold text-neutral-900 truncate">
              Emerald Slit Velvet Evening Gown
            </h4>
            <div className="text-[11px] text-neutral-600 mt-1 flex items-center gap-2">
              <span className="bg-neutral-100 px-1.5 py-0.5 rounded text-[10px] font-semibold">Size: M</span>
              <span className="bg-neutral-100 px-1.5 py-0.5 rounded text-[10px] font-semibold">4-Day Rental</span>
            </div>
            <div className="text-[10px] text-rose-600 font-semibold mt-1">
              Event Date: Sat, Oct 12 · Return: Mon, Oct 14
            </div>
          </div>
        </div>

        {/* Rental Timeline Tracker */}
        <div className="pt-2 border-t border-neutral-100">
          <div className="text-[11px] font-bold text-neutral-800 mb-2 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-rose-500" />
            Rental Status Timeline
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-neutral-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold text-neutral-900">Dry-Cleaned & Inspected</span>
              <span className="text-[10px] text-neutral-400 ml-auto">Wed, 10:30 AM</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <Truck className="w-4 h-4 text-rose-500 shrink-0 animate-pulse" />
              <span className="font-semibold text-rose-600">Dispatched with Courier</span>
              <span className="text-[10px] text-neutral-400 ml-auto">In Transit</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Event Day Fitting</span>
              <span className="text-[10px] ml-auto">Sat, Oct 12</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-400">
              <RotateCcw className="w-4 h-4 shrink-0" />
              <span>Doorstep Reverse Pickup</span>
              <span className="text-[10px] ml-auto">Mon, Oct 14</span>
            </div>
          </div>
        </div>

        {/* Security deposit status */}
        <div className="bg-neutral-50 p-2.5 rounded-xl text-[11px] text-neutral-600 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Deposit of ₹999 on hold
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold">Auto-refund on return</span>
        </div>
      </div>
    </div>
  );
};
