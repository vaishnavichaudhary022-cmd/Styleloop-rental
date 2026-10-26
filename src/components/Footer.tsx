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
    <footer className="bg-neutral-950 text-neutral-300 py-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-neutral-800/80">
          {/* Brand & Location */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <Logo variant="footer" />
            <span className="hidden sm:inline text-neutral-700">|</span>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Designer Wardrobe & Costume Rentals · Nashik</span>
            </div>
          </div>

          {/* Quick Category Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-neutral-400">
            <button
              onClick={() => onSelectGender('women')}
              className="hover:text-white transition"
            >
              Women
            </button>
            <button
              onClick={() => onSelectGender('men')}
              className="hover:text-white transition"
            >
              Men
            </button>
            <button
              onClick={() => onSelectGender('kids')}
              className="hover:text-white transition"
            >
              Kids
            </button>
            <button
              onClick={() => onSelectCategory('fancydress')}
              className="hover:text-white transition text-rose-400 font-semibold"
            >
              Costumes
            </button>
            <button
              onClick={() => onSelectCategory('wedding')}
              className="hover:text-white transition"
            >
              Weddings
            </button>
          </div>

          {/* Boutique & Admin Portals */}
          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => onOpenPortal('shop')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-rose-400 hover:text-rose-300 font-medium border border-neutral-800 transition"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Shop Portal</span>
            </button>
            <button
              onClick={() => onOpenPortal('admin')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white font-medium border border-neutral-800 transition"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Minimal Copyright & Guarantees */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-3">
          <p>© 2026 REVOGUE Rentals Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-3 text-neutral-400">
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
