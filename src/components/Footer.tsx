import React from 'react';
import { MapPin, Store, Shield } from 'lucide-react';
import { CategoryId, TargetGender } from '../types/rental';
import { Logo } from './Logo';

interface FooterProps {
  onSelectGender: (g: TargetGender) => void;
  onSelectCategory: (c: CategoryId) => void;
  onOpenPortal: (p: 'shop' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectGender,
  onSelectCategory,
  onOpenPortal,
}) => {
  return (
    <footer className="bg-[#F5F4EE] text-stone-700 py-10 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-stone-200">
          {/* Brand & Location */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <Logo variant="footer" />
            <span className="hidden sm:inline text-stone-300">|</span>
            <div className="flex items-center gap-1.5 text-xs text-stone-600">
              <MapPin className="w-3.5 h-3.5 text-stone-700 shrink-0" />
              <span>Designer Wardrobe & Costume Rentals · Nashik</span>
            </div>
          </div>

          {/* Quick Category Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-stone-600">
            <button
              onClick={() => onSelectGender('women')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Women
            </button>
            <button
              onClick={() => onSelectGender('men')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Men
            </button>
            <button
              onClick={() => onSelectGender('kids')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Kids
            </button>
            <button
              onClick={() => onSelectCategory('fancydress')}
              className="hover:text-stone-900 transition-colors font-semibold text-stone-900 cursor-pointer"
            >
              Costumes
            </button>
            <button
              onClick={() => onSelectCategory('wedding')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Weddings
            </button>
          </div>

          {/* Boutique & Admin Portals */}
          <div className="flex items-center gap-2.5 text-xs">
            <button
              onClick={() => onOpenPortal('shop')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-800 font-medium border border-stone-300 transition-colors shadow-2xs cursor-pointer"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Shop Portal</span>
            </button>
            <button
              onClick={() => onOpenPortal('admin')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-600 hover:text-stone-900 font-medium border border-stone-300 transition-colors shadow-2xs cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Minimal Copyright & Guarantees */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© 2026 REVOGUE Rentals Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-3 text-stone-500">
            <span>Sanitized Guarantee</span>
            <span>·</span>
            <span>Refundable Deposit</span>
            <span>·</span>
            <span>Rental Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
