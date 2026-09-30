import React, { useState } from 'react';
import {
  X,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Sparkles,
  Calendar,
  MapPin,
  Plus,
  CreditCard,
  Building,
  CheckCircle2,
  ChevronLeft,
  Truck,
  RotateCcw,
  Sparkle,
  QrCode,
  Lock
} from 'lucide-react';
import { CartItem, Address } from '../types/rental';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (index: number) => void;
  onCheckout: (deliveryAddress: Address, paymentInfo?: { method: string; transactionId: string }) => void;
  addresses: Address[];
  currentAddressId: string;
  onSelectAddress: (addressId: string) => void;
  onAddAddress: (newAddr: Omit<Address, 'id'>) => void;
  onViewRentalHistory?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onCheckout,
  addresses,
  currentAddressId,
  onSelectAddress,
  onAddAddress,
  onViewRentalHistory,
}) => {
  // Steps in checkout:
  // 'cart' -> review items & calculate total
  // 'address' -> select or enter delivery address at time of booking
  // 'payment' -> payment step with UPI / Cards / NetBanking / COD deposit to complete delivery
  // 'success' -> confirmation with delivery timeline & receipt
  const [currentStep, setCurrentStep] = useState<'cart' | 'address' | 'payment' | 'success'>('cart');

  const [couponCode, setCouponCode] = useState('RENT40');
  const [couponApplied, setCouponApplied] = useState(true);

  // Address selection & inline creation mode
  const [selectedAddressId, setSelectedAddressId] = useState<string>(currentAddressId);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

  // Form for new address
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newApartment, setNewApartment] = useState('College Road');
  const [newCity, setNewCity] = useState('Nashik');
  const [newState, setNewState] = useState('Maharashtra');
  const [newPincode, setNewPincode] = useState('422005');
  const [newType, setNewType] = useState<'Home' | 'Work' | 'Event Venue'>('Home');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('vaishnavi@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('781');
  const [cardHolder, setCardHolder] = useState('Vaishnavi Chaudhary');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState<{
    bookingId: string;
    address: Address;
    totalAmount: number;
    securityDeposit: number;
    estimatedDeliveryDate: string;
    estimatedDeliveryTime: string;
    eventDate: string;
    returnDate: string;
    firstItemName: string;
    firstItemBrand: string;
    firstItemImage?: string;
    firstItemSize: string;
    firstItemDuration: number;
  } | null>(null);

  if (!isOpen) return null;

  // Rental duration price multipliers:
  // 3 days = 85% of base price
  // 4 days = 100% of base price
  // 7 days = 150% of base price
  // 10 days = 200% of base price
  const durationMultiplier: Record<number, number> = {
    3: 0.85,
    4: 1.0,
    7: 1.5,
    10: 2.0,
  };

  // 1. Correct calculation of item subtotals
  const itemSubtotals = cartItems.map((item) => {
    const multiplier = durationMultiplier[item.rentalDuration] || 1;
    const unitRental = Math.round(item.product.rentalPrice * multiplier);
    const itemTotalRental = unitRental * item.quantity;
    const itemTotalDeposit = item.product.securityDeposit * item.quantity;
    return {
      item,
      unitRental,
      itemTotalRental,
      itemTotalDeposit,
    };
  });

  // Accurate Rental Subtotal: sum of all item rental fees
  const rentalSubtotal = itemSubtotals.reduce((sum, i) => sum + i.itemTotalRental, 0);

  // Accurate Total Refundable Security Deposit: sum of all deposits
  const securityDeposit = itemSubtotals.reduce((sum, i) => sum + i.itemTotalDeposit, 0);

  // Promo Discount: 40% off on Rental Subtotal ONLY (security deposit is NEVER discounted, as it is 100% refundable)
  const discountAmount = couponApplied ? Math.round(rentalSubtotal * 0.40) : 0;

  // Net Rental Fee after discount
  const netRentalFee = rentalSubtotal - discountAmount;

  // Delivery & Return Fee (FREE promotion)
  const deliveryFee = 0;

  // Dry Cleaning & Sanitization Service (FREE promotion)
  const dryCleaningFee = 0;

  // Exact Grand Total Calculation:
  // Grand Total = (Rental Subtotal - Promo Discount) + Refundable Security Deposit + Delivery Fee + Dry Cleaning Fee
  const grandTotal = netRentalFee + securityDeposit + deliveryFee + dryCleaningFee;

  // Active chosen address
  const activeAddress = addresses.find((a) => a.id === (selectedAddressId || currentAddressId)) || addresses[0];

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim() || !newCity.trim() || !newPincode.trim()) return;

    const newAddr = {
      fullName: newFullName.trim() || 'Valued Customer',
      phone: newPhone.trim() || '+91 98765 43210',
      street: newStreet.trim(),
      apartment: newApartment.trim(),
      city: newCity.trim(),
      state: newState.trim(),
      pincode: newPincode.trim(),
      type: newType,
      isDefault: true,
    };

    onAddAddress(newAddr);
    setIsAddingNewAddress(false);
  };

  // Complete Payment and trigger reservation
  const handleCompletePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const firstItem = cartItems[0];
      const itemStartDate = new Date(firstItem?.startDate || Date.now());
      const itemDeliveryDate = new Date(itemStartDate.getTime() - 1 * 24 * 3600 * 1000);
      const itemReturnDate = new Date(itemStartDate.getTime() + (firstItem?.rentalDuration || 4) * 24 * 3600 * 1000);

      const bookingData = {
        bookingId: `RVG-NSK-2024-${Math.floor(1000 + Math.random() * 9000)}`,
        address: activeAddress,
        totalAmount: grandTotal,
        securityDeposit: securityDeposit,
        estimatedDeliveryDate: itemDeliveryDate.toLocaleDateString('en-IN', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        estimatedDeliveryTime: '1:30 PM',
        eventDate: itemStartDate.toLocaleDateString('en-IN', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
        returnDate: itemReturnDate.toLocaleDateString('en-IN', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        }),
        firstItemName: firstItem?.product.name || 'Designer Couture Dress',
        firstItemBrand: firstItem?.product.brand || 'REVOGUE Couture',
        firstItemImage: firstItem?.product.image,
        firstItemSize: firstItem?.selectedSize || 'M',
        firstItemDuration: firstItem?.rentalDuration || 4,
      };
      setConfirmedBookingData(bookingData);
      setCurrentStep('success');
      onCheckout(activeAddress, {
        method: paymentMethod.toUpperCase(),
        transactionId: `TXN-${Date.now()}`,
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header with Step Breadcrumbs */}
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/60">
          <div className="flex items-center gap-2">
            {currentStep !== 'cart' && currentStep !== 'success' && (
              <button
                onClick={() => {
                  if (currentStep === 'payment') setCurrentStep('address');
                  else if (currentStep === 'address') setCurrentStep('cart');
                }}
                className="p-1 rounded-lg hover:bg-neutral-200 text-neutral-600 mr-1"
                title="Go back"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h3 className="font-bold text-base text-neutral-900 font-brand">
                {currentStep === 'cart' && `Rental Bag (${cartItems.length})`}
                {currentStep === 'address' && 'Select Delivery Address'}
                {currentStep === 'payment' && 'Payment & Deposit Authorization'}
                {currentStep === 'success' && 'Booking Confirmed!'}
              </h3>
              <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-semibold">
                <span className={currentStep === 'cart' ? 'text-rose-600 font-bold' : ''}>1. Bag</span>
                <span>›</span>
                <span className={currentStep === 'address' ? 'text-rose-600 font-bold' : ''}>2. Delivery Address</span>
                <span>›</span>
                <span className={currentStep === 'payment' ? 'text-rose-600 font-bold' : ''}>3. Payment</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-600"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area according to Step */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">

          {/* ================= STEP 1: CART ITEMS & CLEAR BILL BREAKDOWN ================= */}
          {currentStep === 'cart' && (
            <>
              {/* Sanitization Badge */}
              <div className="bg-emerald-50 text-emerald-800 text-xs px-3 py-2 rounded-xl border border-emerald-200/80 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hospital-grade steam sanitation & customized altered backup sizes included.</span>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {itemSubtotals.map(({ item, unitRental, itemTotalRental, itemTotalDeposit }, index) => (
                  <div
                    key={`${item.product.id}-${index}`}
                    className="flex gap-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-100"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-26 object-cover rounded-xl shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                            {item.product.brand}
                          </span>
                          <button
                            onClick={() => onRemoveItem(index)}
                            className="text-neutral-400 hover:text-rose-600 p-0.5"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h4 className="text-xs font-semibold text-neutral-900 line-clamp-1 mt-0.5">
                          {item.product.name}
                        </h4>

                        {/* Rental parameters */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[10px] text-neutral-600">
                          <span className="bg-white px-2 py-0.5 rounded border border-neutral-200 font-semibold">
                            Size: {item.selectedSize}
                          </span>
                          <span className="bg-white px-2 py-0.5 rounded border border-neutral-200 font-semibold">
                            {item.rentalDuration} Days Rental
                          </span>
                          {item.quantity > 1 && (
                            <span className="bg-white px-2 py-0.5 rounded border border-neutral-200 font-semibold">
                              Qty: {item.quantity}
                            </span>
                          )}
                        </div>

                        <div className="mt-1 flex items-center gap-1 text-[10px] text-neutral-500">
                          <Calendar className="w-3 h-3 text-rose-500" />
                          <span>Event Date: <strong>{item.startDate}</strong></span>
                        </div>

                        {/* Delivery Arrival Estimation */}
                        {(() => {
                          const sDate = new Date(item.startDate || Date.now());
                          const dDate = new Date(sDate.getTime() - 1 * 24 * 3600 * 1000);
                          const rDate = new Date(sDate.getTime() + item.rentalDuration * 24 * 3600 * 1000);
                          const fmtDelivery = dDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
                          const fmtReturn = rDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
                          return (
                            <div className="mt-1.5 p-2 rounded-xl bg-amber-50/90 border border-amber-200/80 text-[10px] space-y-0.5">
                              <div className="flex items-center gap-1.5 font-bold text-amber-950">
                                <Truck className="w-3 h-3 text-rose-600 shrink-0" />
                                <span>Delivered by: {fmtDelivery} by 1:30 PM</span>
                              </div>
                              <p className="text-[9.5px] text-neutral-600">
                                Arrives 1 day before event for trial fitting · Pickup on {fmtReturn}
                              </p>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Explicit Item Price Math */}
                      <div className="mt-2 pt-1 border-t border-neutral-200/60 flex items-baseline justify-between text-xs">
                        <div>
                          <span className="text-neutral-500 text-[11px]">Rental Fee: </span>
                          <span className="font-bold text-neutral-900">
                            ₹{itemTotalRental.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="text-[10px] text-neutral-500">
                          Deposit: <strong className="text-neutral-700 font-mono">₹{itemTotalDeposit.toLocaleString('en-IN')}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {cartItems.length === 0 && (
                  <div className="py-20 text-center">
                    <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <h4 className="font-bold text-sm text-neutral-800">Your rental bag is empty</h4>
                    <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                      Explore lehengas, gowns, tuxedos, and fancy dress costumes to book for your event.
                    </p>
                  </div>
                )}
              </div>

              {/* Coupon Code Section */}
              {cartItems.length > 0 && (
                <div className="bg-rose-50/60 border border-rose-200/80 rounded-2xl p-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 mb-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    Apply Coupon
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="ENTER CODE"
                      className="flex-1 bg-white border border-rose-200 rounded-xl px-3 py-2 text-xs font-mono font-bold uppercase focus:outline-none focus:border-rose-500"
                    />
                    <button
                      onClick={() => setCouponApplied(couponCode === 'RENT40')}
                      className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition"
                    >
                      {couponApplied ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                  {couponApplied && (
                    <div className="mt-1.5 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      Code 'RENT40' applied (Flat 40% Off rental fee)
                    </div>
                  )}
                </div>
              )}

              {/* ACCURATE BILL BREAKDOWN WITH EXACT MATH */}
              {cartItems.length > 0 && (
                <div className="bg-neutral-50 rounded-2xl p-4 space-y-2 text-xs border border-neutral-200">
                  <div className="font-bold text-neutral-900 border-b border-neutral-200 pb-2 flex items-center justify-between">
                    <span>Payment Summary</span>
                    <span className="text-[10px] text-neutral-500 font-normal">All taxes included</span>
                  </div>

                  {/* 1. Rental Subtotal */}
                  <div className="flex justify-between text-neutral-700">
                    <span>Rental Subtotal ({cartItems.length} outfit{cartItems.length > 1 ? 's' : ''})</span>
                    <span className="font-semibold">₹{rentalSubtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {/* 2. Promo discount */}
                  {couponApplied && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Promo Discount (RENT40 - 40% Off Rental)</span>
                      <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {/* 3. Net Rental Subtotal */}
                  <div className="flex justify-between text-neutral-800 font-semibold pt-1 border-t border-dashed border-neutral-200">
                    <span>Net Rental Charge</span>
                    <span>₹{netRentalFee.toLocaleString('en-IN')}</span>
                  </div>

                  {/* 4. Security deposit */}
                  <div className="flex justify-between text-neutral-700 items-center">
                    <div>
                      <span>Refundable Security Deposit</span>
                      <span className="block text-[10px] text-emerald-600 font-semibold">
                        (100% refunded to original payment method within 24h of return)
                      </span>
                    </div>
                    <span className="font-semibold text-neutral-900">
                      ₹{securityDeposit.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* 5. Doorstep Delivery & Return */}
                  <div className="flex justify-between text-neutral-700">
                    <span>Doorstep Express Delivery & Reverse Pickup</span>
                    <span className="text-emerald-600 font-bold uppercase text-[11px]">FREE</span>
                  </div>

                  {/* 6. Sanitization */}
                  <div className="flex justify-between text-neutral-700">
                    <span>Steam Pressing & Sanitization</span>
                    <span className="text-emerald-600 font-bold uppercase text-[11px]">FREE</span>
                  </div>

                  {/* 7. GRAND TOTAL (Formula: Net Rental + Security Deposit) */}
                  <div className="border-t-2 border-neutral-300 pt-2.5 flex justify-between items-baseline font-bold text-neutral-950">
                    <div>
                      <span className="text-sm">Grand Total Amount</span>
                      <span className="block text-[10px] text-neutral-500 font-normal">
                        (₹{netRentalFee.toLocaleString('en-IN')} Rental + ₹{securityDeposit.toLocaleString('en-IN')} Deposit)
                      </span>
                    </div>
                    <span className="text-lg text-rose-600 font-brand">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ================= STEP 2: ADDRESS AT TIME OF BOOKING ================= */}
          {currentStep === 'address' && (
            <div className="space-y-4">
              <div className="bg-rose-50/70 p-3 rounded-2xl border border-rose-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-neutral-900 block">Deliver Rental Outfit To:</span>
                  <span className="text-[11px] text-neutral-600">
                    Select your delivery destination or provide a new venue/home address.
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-neutral-500 block">Total to Pay</span>
                  <span className="text-sm font-bold text-rose-600 font-brand">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {!isAddingNewAddress ? (
                <>
                  <div className="space-y-2.5">
                    {addresses.map((addr) => {
                      const isSel = addr.id === activeAddress?.id;
                      return (
                        <div
                          key={addr.id}
                          onClick={() => {
                            setSelectedAddressId(addr.id);
                            onSelectAddress(addr.id);
                          }}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                            isSel
                              ? 'bg-rose-50/60 border-rose-500 shadow-xs ring-2 ring-rose-500/20'
                              : 'bg-white border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSel ? 'border-rose-600 bg-rose-600' : 'border-neutral-300'
                          }`}>
                            {isSel && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>

                          <div className="flex-1 text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-neutral-900 text-sm">{addr.fullName}</span>
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700">
                                {addr.type}
                              </span>
                            </div>
                            <p className="text-neutral-700 leading-snug">
                              {addr.street}
                              {addr.apartment && `, ${addr.apartment}`}, {addr.city}, {addr.state} -{' '}
                              <strong className="font-mono text-neutral-900">{addr.pincode}</strong>
                            </p>
                            <p className="text-[11px] text-neutral-500 mt-1.5 flex items-center gap-1 font-medium">
                              <span>📞 Mobile: {addr.phone}</span>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAddingNewAddress(true)}
                    className="w-full py-3 px-4 bg-white hover:bg-neutral-50 border-2 border-dashed border-rose-300 rounded-2xl text-xs font-bold text-rose-600 flex items-center justify-center gap-2 transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Delivery Address / Venue</span>
                  </button>
                </>
              ) : (
                /* Inline Add Address Form */
                <form onSubmit={handleSaveNewAddress} className="bg-white p-4 rounded-2xl border border-neutral-200 space-y-3 text-xs shadow-xs">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-bold text-sm text-neutral-900">Add New Delivery Address</span>
                    <button
                      type="button"
                      onClick={() => setIsAddingNewAddress(false)}
                      className="text-xs text-neutral-400 hover:text-neutral-700 font-semibold"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] font-bold text-neutral-700 block mb-1">Recipient Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Vaishnavi Chaudhary"
                        value={newFullName}
                        onChange={(e) => setNewFullName(e.target.value)}
                        required
                        className="w-full p-2.5 border rounded-xl bg-neutral-50 text-xs focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-neutral-700 block mb-1">Mobile Number *</label>
                      <input
                        type="text"
                        placeholder="+91 98765 43210"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        required
                        className="w-full p-2.5 border rounded-xl bg-neutral-50 text-xs focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                      Flat / House No. / Building Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Flat 402, Signature Heights"
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      required
                      className="w-full p-2.5 border rounded-xl bg-neutral-50 text-xs focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                      Street / Area / Landmark
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. College Road / Gangapur Road"
                      value={newApartment}
                      onChange={(e) => setNewApartment(e.target.value)}
                      className="w-full p-2.5 border rounded-xl bg-neutral-50 text-xs focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-neutral-700 block mb-1">City *</label>
                      <input
                        type="text"
                        placeholder="Nashik"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        required
                        className="w-full p-2 border rounded-xl bg-neutral-50 text-xs focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-neutral-700 block mb-1">State *</label>
                      <input
                        type="text"
                        placeholder="Maharashtra"
                        value={newState}
                        onChange={(e) => setNewState(e.target.value)}
                        required
                        className="w-full p-2 border rounded-xl bg-neutral-50 text-xs focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-neutral-700 block mb-1">Pincode *</label>
                      <input
                        type="text"
                        placeholder="400050"
                        value={newPincode}
                        onChange={(e) => setNewPincode(e.target.value)}
                        required
                        className="w-full p-2 border rounded-xl bg-neutral-50 text-xs font-mono focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-1.5">
                      {(['Home', 'Work', 'Event Venue'] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setNewType(t)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                            newType === t ? 'bg-rose-600 text-white' : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ================= STEP 3: PAYMENT & DEPOSIT STEP ================= */}
          {currentStep === 'payment' && (
            <div className="space-y-4">
              {/* Order Amount Highlight */}
              <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white p-4 rounded-2xl space-y-2">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                      Payable Amount to Dispatch Delivery
                    </span>
                    <span className="text-2xl font-black font-brand text-rose-400">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-right text-[11px] text-neutral-300">
                    <div>Rental: ₹{netRentalFee.toLocaleString('en-IN')}</div>
                    <div>Deposit: ₹{securityDeposit.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <div className="text-[10px] text-neutral-400 pt-1 border-t border-neutral-700 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>256-bit Bank Grade Security · Deposit auto-refunded upon garment return.</span>
                </div>
              </div>

              {/* Delivery destination preview */}
              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                  <div className="truncate max-w-[240px]">
                    <span className="font-bold text-neutral-900 block truncate">{activeAddress.fullName}</span>
                    <span className="text-[11px] text-neutral-500 block truncate">{activeAddress.street}, {activeAddress.city}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep('address')}
                  className="text-xs font-bold text-rose-600 underline"
                >
                  Change
                </button>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block">
                  Select Payment Option
                </label>

                {/* Option 1: Instant UPI */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border cursor-pointer transition ${
                    paymentMethod === 'upi'
                      ? 'bg-rose-50/60 border-rose-500 ring-2 ring-rose-500/20'
                      : 'bg-white border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                        UPI
                      </div>
                      <div>
                        <span className="font-bold text-xs text-neutral-900 block">UPI / QR (GPay, PhonePe, Paytm)</span>
                        <span className="text-[10px] text-neutral-500">Fastest confirmation & zero convenience fees</span>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'upi' ? 'border-rose-600 bg-rose-600' : 'border-neutral-300'
                    }`}>
                      {paymentMethod === 'upi' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-3 pt-2.5 border-t border-rose-200/60 space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@upi"
                          className="flex-1 p-2 bg-white border border-neutral-300 rounded-xl text-xs font-mono"
                        />
                        <button
                          type="button"
                          className="px-3 py-1.5 bg-neutral-900 text-white rounded-xl text-xs font-bold"
                        >
                          Verify
                        </button>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-semibold block">
                        ✓ Instant authorization enabled for Vaishnavi Chaudhary
                      </span>
                    </div>
                  )}
                </div>

                {/* Option 2: Credit / Debit Card */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border cursor-pointer transition ${
                    paymentMethod === 'card'
                      ? 'bg-rose-50/60 border-rose-500 ring-2 ring-rose-500/20'
                      : 'bg-white border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-neutral-900 block">Credit or Debit Card</span>
                        <span className="text-[10px] text-neutral-500">Visa, Mastercard, RuPay, Amex</span>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'card' ? 'border-rose-600 bg-rose-600' : 'border-neutral-300'
                    }`}>
                      {paymentMethod === 'card' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-3 pt-2.5 border-t border-rose-200/60 space-y-2 text-xs">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Card Number"
                        className="w-full p-2 bg-white border border-neutral-300 rounded-xl font-mono text-xs"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="p-2 bg-white border border-neutral-300 rounded-xl font-mono text-xs"
                        />
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="CVV"
                          maxLength={4}
                          className="p-2 bg-white border border-neutral-300 rounded-xl font-mono text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Option 3: NetBanking */}
                <div
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-2xl border cursor-pointer transition ${
                    paymentMethod === 'netbanking'
                      ? 'bg-rose-50/60 border-rose-500 ring-2 ring-rose-500/20'
                      : 'bg-white border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                        <Building className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-neutral-900 block">Net Banking</span>
                        <span className="text-[10px] text-neutral-500">HDFC, ICICI, SBI, Axis, Kotak</span>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'netbanking' ? 'border-rose-600 bg-rose-600' : 'border-neutral-300'
                    }`}>
                      {paymentMethod === 'netbanking' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                  </div>
                </div>

                {/* Option 4: Pay on Delivery (Card/UPI on arrival) */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border cursor-pointer transition ${
                    paymentMethod === 'cod'
                      ? 'bg-rose-50/60 border-rose-500 ring-2 ring-rose-500/20'
                      : 'bg-white border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-neutral-900 block">Pay at Doorstep Fitting</span>
                        <span className="text-[10px] text-neutral-500">Pay via UPI or Card upon courier arrival</span>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'cod' ? 'border-rose-600 bg-rose-600' : 'border-neutral-300'
                    }`}>
                      {paymentMethod === 'cod' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 4: SUCCESS CONFIRMATION & ORDER RECEIPT ================= */}
          {currentStep === 'success' && confirmedBookingData && (
            <div className="space-y-4 py-2">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-black text-neutral-900 font-brand">
                  Rental Booking Confirmed!
                </h3>
                <p className="text-xs text-neutral-500">
                  Your outfit has been reserved from our designer inventory.
                </p>
                <div className="inline-block px-3 py-1 bg-neutral-100 rounded-full font-mono text-xs font-bold text-neutral-700">
                  Booking ID: {confirmedBookingData.bookingId}
                </div>
              </div>

              {/* HIGHLIGHTED DELIVERY ARRIVAL SCHEDULE CARD */}
              <div className="bg-gradient-to-br from-amber-500/15 via-rose-500/10 to-amber-50 rounded-3xl p-4 sm:p-5 border-2 border-amber-300 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-rose-600 text-white shadow-xs">
                      <Truck className="w-5 h-5 animate-pulse" />
                    </span>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 block">
                        Estimated Delivery Arrival
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-neutral-900 font-brand">
                        {confirmedBookingData.estimatedDeliveryDate}
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 shadow-2xs">
                    By {confirmedBookingData.estimatedDeliveryTime}
                  </span>
                </div>

                <div className="p-3 bg-white/90 rounded-2xl border border-amber-200/80 text-xs space-y-1.5">
                  <p className="text-neutral-800 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Ready 1 Day Prior to Event ({confirmedBookingData.eventDate})</span>
                  </p>
                  <p className="text-neutral-600 text-[11px] leading-relaxed">
                    Our courier rider will deliver your sterilized outfit with a <strong>complimentary backup size</strong> directly to:
                  </p>
                  <p className="font-semibold text-neutral-900 text-[11px] bg-neutral-50 p-2 rounded-xl border border-neutral-200">
                    📍 {confirmedBookingData.address.street}, {confirmedBookingData.address.apartment || 'Nashik'}, {confirmedBookingData.address.city} - {confirmedBookingData.address.pincode}
                  </p>
                </div>

                {/* 5-Step Progress Timeline */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                    Live Courier Status
                  </span>
                  <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                    <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                      ✓ Booked
                    </div>
                    <div className="p-1.5 rounded-lg bg-amber-100 text-amber-900 font-bold border border-amber-300 animate-pulse">
                      Tailor Press
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/80 text-neutral-600 font-medium border border-neutral-200">
                      Delivery ({confirmedBookingData.estimatedDeliveryDate.split(',')[0]})
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/80 text-neutral-600 font-medium border border-neutral-200">
                      Pickup ({confirmedBookingData.returnDate.split(',')[0]})
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Destination Card */}
              <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px] text-neutral-500">
                  <span className="font-bold text-neutral-800 uppercase">Contact & Courier Info</span>
                  <span className="text-rose-600 font-bold">Nashik Central Hub</span>
                </div>
                <div>
                  <strong className="text-neutral-900 block">{confirmedBookingData.address.fullName} ({confirmedBookingData.address.phone})</strong>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Rider Akash Deshmukh (+91 94239 88120) assigned for doorstep trial & fitting.
                  </p>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 space-y-1.5 text-xs text-emerald-900">
                <div className="flex justify-between font-bold">
                  <span>Total Paid (Rental + Deposit)</span>
                  <span className="font-brand text-sm">₹{confirmedBookingData.totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[11px] text-emerald-700">
                  <span>Refundable Security Deposit</span>
                  <span>₹{confirmedBookingData.securityDeposit.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-[10px] text-emerald-600 pt-1 border-t border-emerald-200">
                  Deposit of ₹{confirmedBookingData.securityDeposit} will be automatically refunded to your UPI account within 2 hours of reverse pickup on {confirmedBookingData.returnDate}.
                </div>
              </div>

              {/* Action Buttons: Track in My Rentals or Continue */}
              <div className="space-y-2 pt-1">
                {onViewRentalHistory && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onViewRentalHistory();
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 transition active:scale-95"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Track Delivery Live in My Rentals</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-2xl text-xs font-bold transition"
                >
                  Done & Return to Storefront
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= STEP ACTION FOOTERS ================= */}
        {cartItems.length > 0 && currentStep !== 'success' && (
          <div className="p-4 border-t border-neutral-200 bg-white space-y-2">
            
            {/* Step 1 CTA: Go to Delivery Address Selection */}
            {currentStep === 'cart' && (
              <>
                <button
                  onClick={() => setCurrentStep('address')}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-rose-500/25 transition active:scale-95"
                >
                  <span>Select Delivery Address</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-between text-[10px] text-neutral-500 px-1">
                  <span>Grand Total: <strong className="text-neutral-800 font-brand">₹{grandTotal.toLocaleString('en-IN')}</strong></span>
                  <span>Refundable Deposit: <strong className="text-neutral-700">₹{securityDeposit.toLocaleString('en-IN')}</strong></span>
                </div>
              </>
            )}

            {/* Step 2 CTA: Confirm and Reserve Delivery (Takes to Payment) */}
            {currentStep === 'address' && (
              <>
                <button
                  onClick={() => {
                    if (!activeAddress) {
                      setIsAddingNewAddress(true);
                      return;
                    }
                    setCurrentStep('payment');
                  }}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-rose-500/25 transition active:scale-95"
                >
                  <span>Confirm & Reserve Delivery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-neutral-500">
                  Delivering to: <strong className="text-neutral-800">{activeAddress ? `${activeAddress.street}, ${activeAddress.city}` : 'Choose address above'}</strong>
                </p>
              </>
            )}

            {/* Step 3 CTA: Make Payment & Complete Delivery */}
            {currentStep === 'payment' && (
              <>
                <button
                  onClick={handleCompletePayment}
                  disabled={isProcessingPayment}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 transition active:scale-95 disabled:opacity-75"
                >
                  {isProcessingPayment ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Authorizing Booking...
                    </span>
                  ) : (
                    <>
                      <span>Pay ₹{grandTotal.toLocaleString('en-IN')} & Get Delivery</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>100% Escrow Protected · Free Cancellation up to 48 hrs before rental date</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
