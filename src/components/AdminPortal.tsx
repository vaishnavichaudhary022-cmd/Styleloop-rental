import React, { useState } from 'react';
import { Shield, Users, Store, DollarSign, PackageCheck, AlertCircle, CheckCircle, TrendingUp, Search, Eye } from 'lucide-react';
import { User, DressProduct } from '../types/rental';

interface AdminPortalProps {
  currentUser: User;
  products: DressProduct[];
  onSwitchToCustomerView: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  currentUser,
  products,
  onSwitchToCustomerView,
}) => {
  const [vendorList, setVendorList] = useState([
    {
      id: 'v-1',
      name: 'Singhania Heritage Couturiers',
      owner: 'Rajesh Singhania',
      city: 'Mumbai',
      items: 24,
      status: 'Verified Partner',
      grossRentals: '₹3,42,000',
    },
    {
      id: 'v-2',
      name: 'Gujarat Heritage Garba Rentals',
      owner: 'Kirit Patel',
      city: 'Ahmedabad & Mumbai',
      items: 48,
      status: 'Verified Partner',
      grossRentals: '₹4,12,000',
    },
    {
      id: 'v-3',
      name: 'Bollywood & Period Costume Vault',
      owner: 'Neha Malhotra',
      city: 'Mumbai',
      items: 32,
      status: 'Verified Partner',
      grossRentals: '₹2,10,000',
    },
    {
      id: 'v-4',
      name: 'Little Royalty Kids Rentals',
      owner: 'Sonal Gupta',
      city: 'Delhi & Mumbai',
      items: 18,
      status: 'Verified Partner',
      grossRentals: '₹1,45,000',
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-neutral-800">
        <div>
          <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-rose-500/30">
            <Shield className="w-3.5 h-3.5" />
            Executive Admin Console
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-brand">
            REVOGUE Master Platform Administration
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Supervising {products.length} rental garments across 4 vendor networks · Mumbai, Delhi & Bangalore
          </p>
        </div>

        <button
          onClick={onSwitchToCustomerView}
          className="py-2.5 px-5 bg-white text-neutral-950 hover:bg-neutral-100 rounded-xl text-xs sm:text-sm font-bold shadow-md transition active:scale-95"
        >
          View Customer Storefront
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Rental GMV</span>
            <DollarSign className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-neutral-900 font-brand">
            ₹11,09,000
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            +38% Navratri & Festival Surge
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Platform Take (20%)</span>
            <TrendingUp className="w-5 h-5 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-600 font-brand">
            ₹2,21,800
          </div>
          <span className="text-[11px] text-neutral-500 mt-1 block">
            Net platform commission
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Outfits</span>
            <PackageCheck className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-neutral-900 font-brand">
            {products.length} Garments
          </div>
          <span className="text-[11px] text-neutral-500 mt-1 block">
            Across Women, Men & Kids
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Security Deposits Held</span>
            <Shield className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-neutral-900 font-brand">
            ₹1,84,500
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            100% automated refund on return
          </span>
        </div>
      </div>

      {/* Verified Boutiques & Shop Owners Table */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 font-brand">
              Registered Boutique Partners & Vendors
            </h2>
            <p className="text-xs text-neutral-500">
              Boutique shops that supply designer wedding, party, festival and kids costumes
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            All 4 Boutiques Compliant
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Boutique Name</th>
                <th className="pb-3">Owner Contact</th>
                <th className="pb-3">City Hub</th>
                <th className="pb-3">Outfits</th>
                <th className="pb-3">Gross Rentals</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {vendorList.map((v) => (
                <tr key={v.id} className="hover:bg-neutral-50 transition">
                  <td className="py-3.5 font-bold text-neutral-900">{v.name}</td>
                  <td className="py-3.5 text-neutral-600">{v.owner}</td>
                  <td className="py-3.5 text-neutral-600">{v.city}</td>
                  <td className="py-3.5 text-neutral-900 font-semibold">{v.items}</td>
                  <td className="py-3.5 font-bold text-emerald-600 font-brand">{v.grossRentals}</td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" /> {v.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button className="text-xs font-bold text-rose-600 hover:text-rose-700">
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
