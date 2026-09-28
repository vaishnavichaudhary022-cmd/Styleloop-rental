import React, { useState } from 'react';
import { Store, Plus, PackageCheck, TrendingUp, DollarSign, Clock, ShieldCheck, Tag, Sparkles, Check, Image as ImageIcon } from 'lucide-react';
import { DressProduct, User, CategoryId } from '../types/rental';
import { CATEGORIES } from '../data/rentalData';

interface ShopOwnerPortalProps {
  user: User;
  products: DressProduct[];
  onAddNewProduct: (newProduct: DressProduct) => void;
  onSwitchToCustomerView: () => void;
}

export const ShopOwnerPortal: React.FC<ShopOwnerPortalProps> = ({
  user,
  products,
  onAddNewProduct,
  onSwitchToCustomerView,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDress, setNewDress] = useState({
    name: '',
    brand: user.shopName || 'Singhania Heritage Couturiers',
    category: 'wedding' as CategoryId,
    targetGender: 'women' as 'women' | 'men' | 'kids',
    rentalPrice: 1599,
    retailPrice: 12000,
    sizes: ['S', 'M', 'L'],
    color: 'Royal Emerald',
    description: '',
    fabric: 'Pure Silk & Hand Embroidery',
    securityDeposit: 1000,
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=600&q=80',
    festival: 'Wedding & Sangeet',
  });

  const shopProducts = products.filter(
    (p) => !p.shopOwnerName || p.shopOwnerName === user.shopName || user.shopName?.includes('Singhania')
  );

  const handleCreateDress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDress.name) return;

    const created: DressProduct = {
      id: `prod-shop-${Date.now()}`,
      name: newDress.name,
      brand: newDress.brand,
      category: newDress.category,
      targetGender: newDress.targetGender,
      rentalPrice: Number(newDress.rentalPrice),
      retailPrice: Number(newDress.retailPrice),
      discountPercentage: Math.round(((newDress.retailPrice - newDress.rentalPrice) / newDress.retailPrice) * 100),
      rating: 4.9,
      reviewCount: 1,
      rentedCount: 12,
      image: newDress.image,
      sizes: newDress.sizes,
      color: newDress.color,
      tag: 'New Boutique Drop',
      description: newDress.description || 'Exclusive boutique designer outfit prepared for premium rentals.',
      fabric: newDress.fabric,
      securityDeposit: Number(newDress.securityDeposit),
      festival: newDress.festival,
      shopOwnerName: user.shopName || 'Singhania Heritage Couturiers',
      featured: true,
    };

    onAddNewProduct(created);
    setShowAddModal(false);
    setNewDress({
      name: '',
      brand: user.shopName || 'Singhania Heritage Couturiers',
      category: 'wedding',
      targetGender: 'women',
      rentalPrice: 1599,
      retailPrice: 12000,
      sizes: ['S', 'M', 'L'],
      color: 'Royal Emerald',
      description: '',
      fabric: 'Pure Silk & Hand Embroidery',
      securityDeposit: 1000,
      image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=600&q=80',
      festival: 'Wedding & Sangeet',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-neutral-800">
        <div>
          <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-rose-500/30">
            <Store className="w-3.5 h-3.5" />
            Verified Boutique Partner
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-brand">
            {user.shopName || 'Singhania Heritage Couturiers'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Managed by {user.name} · {user.shopCity || 'Mumbai & Delhi'} · Boutique Vendor ID #SHOP-8841
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setShowAddModal(true)}
            className="py-2.5 px-5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-rose-500/20 flex items-center gap-2 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            List New Rental Dress
          </button>
          <button
            onClick={onSwitchToCustomerView}
            className="py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs sm:text-sm font-bold transition"
          >
            View Customer Storefront
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Garments Listed</span>
            <PackageCheck className="w-5 h-5 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-neutral-900 font-brand">
            {shopProducts.length} Dresses
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            Women, Men & Kids active
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Currently Rented</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-neutral-900 font-brand">
            34 Outfits
          </div>
          <span className="text-[11px] text-neutral-500 mt-1 block">
            8 scheduled for return inspection today
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Monthly Payout</span>
            <DollarSign className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 font-brand">
            ₹1,48,600
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            +24% vs last festival season
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Hygiene & Rating</span>
            <ShieldCheck className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-neutral-900 font-brand">
            4.95 ★
          </div>
          <span className="text-[11px] text-neutral-500 mt-1 block">
            100% Steam Sanitized Verified
          </span>
        </div>
      </div>

      {/* Boutique Inventory Grid */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 font-brand">
              Boutique Rental Inventory
            </h2>
            <p className="text-xs text-neutral-500">
              Customers can discover and reserve these dresses for 3, 4, 7, or 10 days
            </p>
          </div>
          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
            {shopProducts.length} Outfits Live
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shopProducts.map((p) => (
            <div
              key={p.id}
              className="flex gap-3.5 p-3.5 rounded-2xl border border-neutral-200/80 hover:border-rose-300 transition bg-neutral-50/50"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-20 h-28 object-cover rounded-xl shrink-0"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase text-neutral-500">
                    <span className="text-rose-600">{p.targetGender}</span>
                    <span>{p.category}</span>
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900 line-clamp-1 mt-0.5">
                    {p.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                    {p.fabric}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-xs font-black text-neutral-900 font-brand">
                      ₹{p.rentalPrice} / 4d
                    </span>
                    <span className="text-[10px] text-neutral-400 line-through">
                      ₹{p.retailPrice}
                    </span>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                      Deposit ₹{p.securityDeposit}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60 text-[10px]">
                  <span className="text-neutral-500 font-medium">
                    Rented {p.rentedCount} times
                  </span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Available
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Rental Dress Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
            <h3 className="text-lg font-bold text-neutral-900 font-brand mb-1">
              List a New Rental Garment
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Add your boutique's premium festive, wedding, or fancy costume outfit to REVOGUE rentals.
            </p>

            <form onSubmit={handleCreateDress} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Outfit Title *</label>
                <input
                  type="text"
                  required
                  value={newDress.name}
                  onChange={(e) => setNewDress({ ...newDress, name: e.target.value })}
                  placeholder="e.g. Royal Embroidered Zari Brocade Lehenga"
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Target Department *</label>
                  <select
                    value={newDress.targetGender}
                    onChange={(e) => setNewDress({ ...newDress, targetGender: e.target.value as any })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500"
                  >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kids">Kids</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Occasion / Category *</label>
                  <select
                    value={newDress.category}
                    onChange={(e) => setNewDress({ ...newDress, category: e.target.value as any })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Rental Price (4 Days) *</label>
                  <input
                    type="number"
                    required
                    value={newDress.rentalPrice}
                    onChange={(e) => setNewDress({ ...newDress, rentalPrice: Number(e.target.value) })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Retail Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newDress.retailPrice}
                    onChange={(e) => setNewDress({ ...newDress, retailPrice: Number(e.target.value) })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Security Deposit (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newDress.securityDeposit}
                    onChange={(e) => setNewDress({ ...newDress, securityDeposit: Number(e.target.value) })}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Fabric Details</label>
                  <input
                    type="text"
                    value={newDress.fabric}
                    onChange={(e) => setNewDress({ ...newDress, fabric: e.target.value })}
                    placeholder="e.g. Banarasi Silk, Raw Silk, Tulle"
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Color / Tone</label>
                  <input
                    type="text"
                    value={newDress.color}
                    onChange={(e) => setNewDress({ ...newDress, color: e.target.value })}
                    placeholder="e.g. Royal Ruby, Champagne Gold"
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Product Photo URL</label>
                <input
                  type="url"
                  value={newDress.image}
                  onChange={(e) => setNewDress({ ...newDress, image: e.target.value })}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-neutral-200 font-bold text-neutral-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition shadow-md"
                >
                  Publish to Platform
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
