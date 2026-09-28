import React, { useState } from 'react';
import { X, MapPin, Plus, Check, Home, Briefcase, Calendar, ShieldCheck } from 'lucide-react';
import { Address } from '../types/rental';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: Address[];
  currentAddressId?: string;
  onSelectAddress: (addressId: string) => void;
  onAddAddress: (newAddr: Omit<Address, 'id'>) => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  addresses,
  currentAddressId,
  onSelectAddress,
  onAddAddress,
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    street: '',
    apartment: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '',
    type: 'Home' as 'Home' | 'Work' | 'Event Venue',
    deliveryInstructions: '',
  });

  if (!isOpen) return null;

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.street || !formData.pincode) return;
    onAddAddress(formData);
    setIsAddingNew(false);
    setFormData({
      fullName: '',
      phone: '',
      street: '',
      apartment: '',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '',
      type: 'Home',
      deliveryInstructions: '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900 font-brand">
                Select Delivery Location
              </h3>
              <p className="text-xs text-neutral-500">
                Garments will be sanitized & delivered to this address
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200/60 text-neutral-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 no-scrollbar">
          {!isAddingNew ? (
            <>
              {/* Existing Addresses List */}
              <div className="space-y-3">
                {addresses.map((addr) => {
                  const isSelected = addr.id === currentAddressId;

                  return (
                    <div
                      key={addr.id}
                      onClick={() => {
                        onSelectAddress(addr.id);
                        onClose();
                      }}
                      className={`p-4 rounded-2xl border-2 transition cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50/40 shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <div className="mt-0.5 p-2 rounded-lg bg-neutral-100 text-neutral-700">
                        {addr.type === 'Home' && <Home className="w-4 h-4" />}
                        {addr.type === 'Work' && <Briefcase className="w-4 h-4" />}
                        {addr.type === 'Event Venue' && <Calendar className="w-4 h-4 text-purple-600" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-neutral-900">
                            {addr.fullName}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 uppercase">
                            {addr.type}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-700">
                              Default
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                          {addr.apartment ? `${addr.apartment}, ` : ''}{addr.street}
                        </p>
                        <p className="text-xs text-neutral-600 font-medium">
                          {addr.city}, {addr.state} - <strong className="font-bold text-neutral-900">{addr.pincode}</strong>
                        </p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          Phone: {addr.phone}
                        </p>
                        {addr.deliveryInstructions && (
                          <p className="text-[11px] text-neutral-500 italic mt-1 bg-white/80 p-1.5 rounded border border-neutral-100">
                            Note: {addr.deliveryInstructions}
                          </p>
                        )}
                      </div>

                      <div className="shrink-0 mt-1">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition ${
                            isSelected
                              ? 'border-rose-500 bg-rose-500 text-white'
                              : 'border-neutral-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add New Address Button */}
              <button
                onClick={() => setIsAddingNew(true)}
                className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-rose-300 hover:border-rose-500 bg-rose-50/50 hover:bg-rose-50 text-rose-600 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add New Delivery Address
              </button>
            </>
          ) : (
            /* Add New Address Form */
            <form onSubmit={handleSubmitNew} className="space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
                <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                  New Delivery Address
                </span>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="text-xs text-neutral-500 hover:text-neutral-900"
                >
                  Back to List
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    Receiver Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Vaishnavi Chaudhary"
                    className="w-full text-xs p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                  Street Address / House No / Road *
                </label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  placeholder="e.g. Flat 402, Signature Heights, Carter Road"
                  className="w-full text-xs p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full text-xs p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full text-xs p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="400050"
                    className="w-full text-xs p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                  Address Type
                </label>
                <div className="flex gap-2">
                  {(['Home', 'Work', 'Event Venue'] as const).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setFormData({ ...formData, type: t })}
                      className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition ${
                        formData.type === t
                          ? 'border-rose-500 bg-rose-50 text-rose-600'
                          : 'border-neutral-200 bg-white text-neutral-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                  Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={formData.deliveryInstructions}
                  onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
                  placeholder="e.g. Event is on Saturday, deliver by Friday afternoon"
                  className="w-full text-xs p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition"
                >
                  Save & Use Address
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Guarantee */}
        <div className="p-3 border-t border-neutral-100 bg-neutral-50 flex items-center justify-center gap-2 text-xs text-neutral-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Contactless sanitized delivery & free reverse pickup at this address</span>
        </div>
      </div>
    </div>
  );
};
