import React from 'react';
import { ShieldCheck, Sparkles, Truck, RotateCcw, Heart, Store, Shield } from 'lucide-react';
import { CategoryId, TargetGender } from '../types/rental';

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
    <footer className="bg-neutral-900 text-neutral-300 pt-12 pb-8 border-t border-neutral-800">
      {/* Value Props Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-neutral-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-neutral-800 text-rose-500 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Professional Dry Cleaning</h4>
            <p className="text-neutral-400 mt-1">Every garment is medical-grade steam sanitized and sealed before doorstep delivery.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-neutral-800 text-rose-500 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">100% Refundable Deposit</h4>
            <p className="text-neutral-400 mt-1">Security deposits are held safely in escrow and automatically returned within 24 hours.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-neutral-800 text-rose-500 shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Free Delivery & Reverse Pickup</h4>
            <p className="text-neutral-400 mt-1">Hassle-free doorstep drop off 1 day before your event and scheduled courier pickup.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-neutral-800 text-rose-500 shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Free Backup Size Included</h4>
            <p className="text-neutral-400 mt-1">Select a second size for free on selected wedding and cocktail outfits for perfect fit.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-5 gap-8 text-xs">
        {/* Brand Column */}
        <div className="col-span-2 space-y-3">
          <div className="flex items-center gap-1">
            <span className="font-brand font-black text-2xl text-white tracking-tight">
              REVOGUE
            </span>
            <span className="w-2 h-2 rounded-full bg-rose-500 mb-2"></span>
          </div>
          <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
            India's foremost designer wardrobe and festival costume rental platform. Wear luxury labels for weddings, Navratri garba, Diwali parties, black-tie events and kids annual day functions.
          </p>
          <div className="flex items-center gap-3 pt-2 text-neutral-400 text-xs">
            <span>Express Delivery in:</span>
            <span className="font-semibold text-white">Mumbai · Delhi NCR · Bangalore · Ahmedabad · Pune</span>
          </div>
        </div>

        {/* Women's & Men's */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
            Departments
          </h4>
          <ul className="space-y-2 text-neutral-400">
            <li>
              <button onClick={() => onSelectGender('women')} className="hover:text-white transition">
                Women's Lehengas & Gowns
              </button>
            </li>
            <li>
              <button onClick={() => onSelectGender('men')} className="hover:text-white transition">
                Men's Sherwanis & Tuxedos
              </button>
            </li>
            <li>
              <button onClick={() => onSelectGender('kids')} className="hover:text-white transition">
                Kids Party & Costumes
              </button>
            </li>
            <li>
              <button onClick={() => onSelectGender('all')} className="hover:text-white transition">
                Trending 40% Off Drops
              </button>
            </li>
          </ul>
        </div>

        {/* Festivals & Fancy Themes */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
            Festivals & Themes
          </h4>
          <ul className="space-y-2 text-neutral-400">
            <li>
              <button onClick={() => onSelectCategory('navratri')} className="hover:text-white transition">
                Navratri Garba Chaniya Choli
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('diwali')} className="hover:text-white transition">
                Diwali Silk & Zari Sets
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('haldi')} className="hover:text-white transition">
                Haldi & Mehendi Yellows
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('fancydress')} className="hover:text-white transition">
                Fancy Dress & Cosplay Themes
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('wedding')} className="hover:text-white transition">
                Bridal & Groom Couture
              </button>
            </li>
          </ul>
        </div>

        {/* Partner Portals */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
            Boutique Network
          </h4>
          <ul className="space-y-2 text-neutral-400">
            <li>
              <button
                onClick={() => onOpenPortal('shop')}
                className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 transition"
              >
                <Store className="w-3.5 h-3.5" /> Shop Owner Portal
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenPortal('admin')}
                className="text-neutral-400 hover:text-white font-semibold flex items-center gap-1.5 transition"
              >
                <Shield className="w-3.5 h-3.5" /> Admin Console
              </button>
            </li>
            <li className="pt-2 text-[11px] text-neutral-500">
              Own a designer boutique? List your catalog and earn recurring monthly rental revenue.
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-3">
        <p>© 2026 REVOGUE Rentals Pvt. Ltd. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span>Privacy Policy</span>
          <span>·</span>
          <span>Rental Agreement</span>
          <span>·</span>
          <span>Hygiene Standards</span>
          <span>·</span>
          <span>Security Escrow</span>
        </div>
      </div>
    </footer>
  );
};
