import React from 'react';
import { Award, Ruler, CreditCard, HelpCircle, ChevronRight, Gift } from 'lucide-react';

export const ProfileView: React.FC = () => {
  return (
    <div className="p-4 pb-24 space-y-4 max-w-xl mx-auto">
      {/* Light Luxury Profile Card */}
      <div className="bg-white rounded-2xl p-5 text-stone-900 border border-stone-200 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-lg font-serif">
            VC
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-stone-900">Vaishnavi C.</h3>
            <p className="text-xs text-stone-500 font-normal">vaishnavichaudhary022@gmail.com</p>
            <div className="inline-flex items-center gap-1.5 bg-stone-100 px-2 py-0.5 rounded-md text-[10px] font-medium mt-1 text-stone-700 border border-stone-200 uppercase tracking-wider">
              <Award className="w-3 h-3 text-amber-600" /> REVOGUE VIP Patron
            </div>
          </div>
        </div>

        {/* Member Perks Strip */}
        <div className="mt-4 pt-3.5 border-t border-stone-200 grid grid-cols-2 gap-2 text-center text-xs">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-2.5">
            <span className="text-[10px] text-stone-500 block font-normal">Wardrobe Credits</span>
            <span className="font-bold text-sm text-stone-900 font-sans">₹2,400</span>
          </div>
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-2.5">
            <span className="text-[10px] text-stone-500 block font-normal">Saved Outfits</span>
            <span className="font-bold text-sm text-stone-900 font-sans">14 Styles</span>
          </div>
        </div>
      </div>

      {/* Profile Settings & Quick Links */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs divide-y divide-stone-100 text-xs text-stone-800">
        <div className="p-3.5 flex items-center justify-between hover:bg-stone-50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-stone-100 text-stone-800">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <span className="font-medium block text-stone-900">My Sizing & Fit Profile</span>
              <span className="text-[10px] text-stone-500">Bust, Waist & Height measurements saved</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </div>

        <div className="p-3.5 flex items-center justify-between hover:bg-stone-50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-stone-100 text-stone-800">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <span className="font-medium block text-stone-900">Refer & Earn ₹500</span>
              <span className="text-[10px] text-stone-500">Share with friends to get free rentals</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </div>

        <div className="p-3.5 flex items-center justify-between hover:bg-stone-50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-stone-100 text-stone-800">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <span className="font-medium block text-stone-900">Security Deposit Refunds</span>
              <span className="text-[10px] text-stone-500">Manage refund bank account / UPI</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </div>

        <div className="p-3.5 flex items-center justify-between hover:bg-stone-50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-stone-100 text-stone-800">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="font-medium block text-stone-900">Rental FAQ & Hygiene Care</span>
              <span className="text-[10px] text-stone-500">Dry-clean procedures, stain guarantees</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </div>
      </div>
    </div>
  );
};
