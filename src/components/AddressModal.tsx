import React, { useState } from 'react';
import { X, MapPin, Plus, Check, Home, Briefcase, Calendar, ShieldCheck, Sparkles, Navigation } from 'lucide-react';
import { Address } from '../types/rental';
import { NASHIK_LOCALITIES } from '../data/rentalData';

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
  const [selectedNashikLocalityId, setSelectedNashikLocalityId] = useState<string>('nsk-collegerd');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    street: '',
    apartment: 'College Road',
    city: 'Nashik',
    state: 'Maharashtra',
    pincode: '422005',
    type: 'Home' as 'Home' | 'Work' | 'Event Venue',
    deliveryInstructions: '',
  });

  if (!isOpen) return null;

  const handleSelectNashikLocality = (localityId: string) => {
    const loc = NASHIK_LOCALITIES.find((l) => l.id === localityId);
    if (!loc) return;
    setSelectedNashikLocalityId(localityId);
    setFormData((prev) => ({
      ...prev,
      apartment: loc.name,
      city: 'Nashik',
      state: 'Maharashtra',
      pincode: loc.pincode,
    }));
  };

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.street || !formData.pincode) return;

    onAddAddress({
      ...formData,
      city: 'Nashik',
      state: 'Maharashtra',
    });

    setIsAddingNew(false);
    setFormData({
      fullName: '',
      phone: '',
      street: '',
      apartment: 'College Road',
      city: 'Nashik',
      state: 'Maharashtra',
      pincode: '422005',
      type: 'Home',
      deliveryInstructions: '',
    });
  };

  const selectedLocalityObj = NASHIK_LOCALITIES.find((l) => l.id === selectedNashikLocalityId);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 border border-rose-100">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between bg-gradient-to-r from-rose-50/70 via-amber-50/40 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-sm">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-neutral-900 font-brand">
                  Delivery Location in Nashik
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  Nashik Only 📍
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Doorstep trial, sanitized delivery & reverse pickup across Nashik
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200/60 text-neutral-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nashik Exclusive Service Banner */}
        <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-200/60 flex items-center gap-2 text-xs text-amber-900">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Dedicated Nashik Fleet:</strong> 2-3 hour delivery across College Rd, Gangapur Rd, Indira Nagar, Govind Nagar, Panchavati & beyond.
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 no-scrollbar">
          {!isAddingNew ? (
            <>
              {/* Existing Nashik Addresses List */}
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
                      <div className="mt-0.5 p-2 rounded-xl bg-neutral-100 text-neutral-700 shrink-0">
                        {addr.type === 'Home' && <Home className="w-4 h-4" />}
                        {addr.type === 'Work' && <Briefcase className="w-4 h-4" />}
                        {addr.type === 'Event Venue' && <Calendar className="w-4 h-4 text-purple-600" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
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
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 ml-auto">
                            Nashik
                          </span>
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
                <Plus className="w-4 h-4" /> Add Another Nashik Address
              </button>
            </>
          ) : (
            /* Add New Nashik Address Form */
            <form onSubmit={handleSubmitNew} className="space-y-3.5">
              <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
                <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-rose-500" />
                  New Nashik Address
                </span>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="text-xs text-neutral-500 hover:text-neutral-900 font-medium"
                >
                  Back to List
                </button>
              </div>

              {/* Nashik Locality Quick Selector */}
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1.5">
                  Select Nashik Area / Locality *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto p-1 border border-neutral-200 rounded-xl bg-neutral-50/60 no-scrollbar">
                  {NASHIK_LOCALITIES.map((loc) => {
                    const isLocSelected = loc.id === selectedNashikLocalityId;
                    return (
                      <button
                        type="button"
                        key={loc.id}
                        onClick={() => handleSelectNashikLocality(loc.id)}
                        className={`p-2 rounded-lg text-left text-xs transition border ${
                          isLocSelected
                            ? 'bg-rose-500 text-white font-bold border-rose-600 shadow-2xs'
                            : 'bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                        }`}
                      >
                        <div className="truncate font-semibold">{loc.name}</div>
                        <div className={`text-[10px] ${isLocSelected ? 'text-rose-100' : 'text-neutral-400'}`}>
                          {loc.pincode}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {selectedLocalityObj && (
                  <p className="text-[10px] text-neutral-500 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Hub: <strong>{selectedLocalityObj.hub}</strong> · {selectedLocalityObj.deliveryTime}
                  </p>
                )}
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
                    className="w-full text-xs p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white"
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
                    placeholder="+91 94239 88120"
                    className="w-full text-xs p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                  Flat No / Bungalow / Street / Road *
                </label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  placeholder="e.g. Flat 402, Samraat Tropicano, Near BYK College"
                  className="w-full text-xs p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    City (Locked)
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Nashik"
                    className="w-full text-xs p-2.5 bg-neutral-100 border border-neutral-200 rounded-xl text-neutral-700 font-bold cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    State (Locked)
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Maharashtra"
                    className="w-full text-xs p-2.5 bg-neutral-100 border border-neutral-200 rounded-xl text-neutral-700 font-bold cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    Nashik Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="422005"
                    className="w-full text-xs p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white font-mono font-bold"
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
                          ? 'border-rose-500 bg-rose-50 text-rose-600 font-bold'
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
                  Nashik Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={formData.deliveryInstructions}
                  onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
                  placeholder="e.g. Wedding at Taj Gateway, deliver to Banquet Hall Suite"
                  className="w-full text-xs p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-xs"
                >
                  Save Nashik Address
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Guarantee */}
        <div className="p-3 border-t border-neutral-100 bg-neutral-50 flex items-center justify-center gap-2 text-xs text-neutral-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Nashik city-wide free reverse pickup & 100% security deposit safety guarantee</span>
        </div>
      </div>
    </div>
  );
};
