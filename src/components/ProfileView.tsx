import React from 'react';
import { User, Sparkles, Award, Ruler, CreditCard, HelpCircle, Bell, ChevronRight, Gift } from 'lucide-react';

export const ProfileView: React.FC = () => {
  return (
    <div className="p-4 pb-24 space-y-4">
      {/* Profile Card */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/60 p-1 flex items-center justify-center font-bold text-lg">
            VC
          </div>
          <div>
            <h3 className="font-bold text-base font-brand">Vaishnavi C.</h3>
            <p className="text-xs text-rose-100 font-medium">vaishnavichaudhary022@gmail.com</p>
            <div className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold mt-1.5 uppercase tracking-wider">
              <Award className="w-3 h-3 text-amber-300" /> REVOGUE VIP Member
            </div>
          </div>
        </div>

        {/* Member Perks Strip */}
        <div className="mt-4 pt-3 border-t border-white/20 grid grid-cols-2 gap-2 text-center text-xs">
          <div className="bg-black/15 rounded-xl p-2">
            <span className="text-[10px] text-rose-100 block">Wardrobe Credits</span>
            <span className="font-bold text-sm font-brand">₹2,400</span>
          </div>
          <div className="bg-black/15 rounded-xl p-2">
            <span className="text-[10px] text-rose-100 block">Saved Outfits</span>
            <span className="font-bold text-sm font-brand">14 Styles</span>
          </div>
        </div>
      </div>

      {/* Profile Settings & Quick Links */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-2xs divide-y divide-neutral-100 text-xs text-neutral-800">
        <div className="p-3.5 flex items-center justify-between hover:bg-neutral-50 cursor-pointer transition">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold block text-neutral-900">My Sizing & Fit Profile</span>
              <span className="text-[10px] text-neutral-400">Bust, Waist & Height measurements saved</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </div>

        <div className="p-3.5 flex items-center justify-between hover:bg-neutral-50 cursor-pointer transition">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold block text-neutral-900">Refer & Earn ₹500</span>
              <span className="text-[10px] text-neutral-400">Share with friends to get free rentals</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </div>

        <div className="p-3.5 flex items-center justify-between hover:bg-neutral-50 cursor-pointer transition">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold block text-neutral-900">Security Deposit Refunds</span>
              <span className="text-[10px] text-neutral-400">Manage refund bank account / UPI</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </div>

        <div className="p-3.5 flex items-center justify-between hover:bg-neutral-50 cursor-pointer transition">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold block text-neutral-900">Rental FAQ & Hygiene Care</span>
              <span className="text-[10px] text-neutral-400">Dry-clean procedures, stain guarantees</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </div>
      </div>
    </div>
  );
};
