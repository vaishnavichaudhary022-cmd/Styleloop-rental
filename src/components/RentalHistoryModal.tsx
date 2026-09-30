import React, { useState } from 'react';
import {
  X,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  RotateCcw,
  Calendar,
  ShieldCheck,
  Search,
  Filter,
  FileText,
  ChevronRight,
  Sparkles,
  MapPin,
  Phone,
  RefreshCw,
  AlertCircle,
  HelpCircle,
  TrendingDown,
  Award
} from 'lucide-react';
import { RentalOrder, RentalOrderStatus } from '../types/rental';
import { RentalInvoiceModal } from './RentalInvoiceModal';

interface RentalHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: RentalOrder[];
  onExtendOrder?: (orderId: string, additionalDays: number) => void;
  onRentAgain?: (product: any) => void;
  onTrackDelivery?: (order: RentalOrder) => void;
}

export const RentalHistoryModal: React.FC<RentalHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onExtendOrder,
  onRentAgain,
}) => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'in_wardrobe' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<RentalOrder | null>(null);
  const [extendedOrderIds, setExtendedOrderIds] = useState<Set<string>>(new Set());
  const [trackingOrder, setTrackingOrder] = useState<RentalOrder | null>(null);
  const [extensionNotice, setExtensionNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filter orders based on tab & search
  const filteredOrders = orders.filter((order) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = order.product.name.toLowerCase().includes(q);
      const matchBrand = order.product.brand.toLowerCase().includes(q);
      const matchId = order.bookingId.toLowerCase().includes(q);
      const matchLoc = order.nashikLocality.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchId && !matchLoc) return false;
    }

    if (selectedTab === 'active') {
      return order.status === 'out_for_delivery' || order.status === 'dispatched' || order.status === 'booked';
    }
    if (selectedTab === 'in_wardrobe') {
      return order.status === 'with_customer';
    }
    if (selectedTab === 'completed') {
      return order.status === 'completed' || order.status === 'returned_inspected';
    }

    return true;
  });

  const handleExtend = (orderId: string) => {
    setExtendedOrderIds((prev) => new Set(prev).add(orderId));
    if (onExtendOrder) {
      onExtendOrder(orderId, 2);
    }
    setExtensionNotice(`Rental extended by +2 days! Updated return schedule confirmed.`);
    setTimeout(() => setExtensionNotice(null), 3500);
  };

  // Metrics
  const totalRented = orders.length;
  const activeCount = orders.filter(
    (o) => o.status === 'out_for_delivery' || o.status === 'with_customer' || o.status === 'dispatched'
  ).length;
  const totalRefundedDeposit = orders
    .filter((o) => o.depositStatus === 'refunded')
    .reduce((acc, o) => acc + o.securityDeposit, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] border border-rose-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between bg-gradient-to-r from-rose-50/70 via-amber-50/40 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-sm">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg text-neutral-900 font-brand">
                  My Rental History & Wardrobe
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  {orders.length} Bookings
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Track fittings in Nashik, event dates, and security deposit escrow refunds
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-200 text-neutral-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Extension Toast / Alert */}
        {extensionNotice && (
          <div className="bg-emerald-600 text-white text-xs py-2 px-4 flex items-center justify-between animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{extensionNotice}</span>
            </div>
            <button onClick={() => setExtensionNotice(null)}>
              <X className="w-3.5 h-3.5 text-white/80 hover:text-white" />
            </button>
          </div>
        )}

        {/* Customer Wardrobe Stats Strip (Shopping App style) */}
        <div className="bg-neutral-900 text-white p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/10">
            <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">
              Outfits Rented
            </span>
            <span className="text-base sm:text-lg font-black font-brand text-white">
              {totalRented} Outfits
            </span>
          </div>

          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/10">
            <span className="text-[10px] text-rose-300 block uppercase tracking-wider">
              Active in Nashik
            </span>
            <span className="text-base sm:text-lg font-black font-brand text-rose-400">
              {activeCount} Fitting Active
            </span>
          </div>

          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/10">
            <span className="text-[10px] text-amber-300 block uppercase tracking-wider">
              Saved vs Retail
            </span>
            <span className="text-base sm:text-lg font-black font-brand text-amber-300">
              ₹1,42,000+ (92%)
            </span>
          </div>

          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/10">
            <span className="text-[10px] text-emerald-300 block uppercase tracking-wider">
              Deposits Refunded
            </span>
            <span className="text-base sm:text-lg font-black font-brand text-emerald-400">
              ₹{totalRefundedDeposit.toLocaleString('en-IN')} (100%)
            </span>
          </div>
        </div>

        {/* Search & Shopping App Filter Tabs */}
        <div className="p-3 sm:p-4 border-b border-neutral-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
            {[
              { id: 'all', label: `All (${orders.length})` },
              {
                id: 'active',
                label: `Out for Delivery (${orders.filter((o) => o.status === 'out_for_delivery' || o.status === 'dispatched').length})`,
              },
              {
                id: 'in_wardrobe',
                label: `In Wardrobe (${orders.filter((o) => o.status === 'with_customer').length})`,
              },
              {
                id: 'completed',
                label: `Completed & Refunded (${orders.filter((o) => o.status === 'completed').length})`,
              },
            ].map((tab) => {
              const isActive = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by outfit, booking ID..."
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-rose-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Orders List Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 no-scrollbar bg-neutral-50/50">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 space-y-3 bg-white rounded-3xl p-6 border border-neutral-200/70">
              <Package className="w-12 h-12 text-neutral-300 mx-auto" />
              <h3 className="font-bold text-neutral-800 text-base">No rentals found</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                No orders match your filter criteria. Explore the rental catalog to book designer couture for your next Nashik event!
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const isExtended = extendedOrderIds.has(order.id);
              const duration = isExtended ? order.rentalDuration + 2 : order.rentalDuration;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs hover:shadow-md transition overflow-hidden"
                >
                  {/* Order Card Top Bar */}
                  <div className="p-3.5 sm:p-4 bg-neutral-50/70 border-b border-neutral-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono font-bold text-neutral-800 bg-white px-2 py-0.5 rounded-md border border-neutral-200 shadow-2xs">
                        {order.bookingId}
                      </span>
                      <span className="text-neutral-400 text-xs">·</span>
                      <span className="text-xs text-neutral-500">
                        Booked on {order.bookingDate}
                      </span>
                      {order.occasion && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/60">
                          {order.occasion}
                        </span>
                      )}
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-1.5">
                      {order.status === 'out_for_delivery' && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
                          <Truck className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                          <span>Out for Delivery in Nashik</span>
                        </span>
                      )}
                      {order.status === 'with_customer' && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>In Wardrobe / Active Rental</span>
                        </span>
                      )}
                      {order.status === 'completed' && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>100% Deposit Refunded</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* PROMINENT WHEN IT WILL GET DELIVERED BANNER */}
                  {(() => {
                    const deliveryDateDisplay = order.estimatedDeliveryDate
                      ? new Date(order.estimatedDeliveryDate).toLocaleDateString('en-IN', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })
                      : new Date(new Date(order.startDate).getTime() - 24 * 3600 * 1000).toLocaleDateString('en-IN', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        });

                    return (
                      <div className="px-4 py-2.5 bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-50/50 border-b border-amber-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="p-1.5 rounded-lg bg-rose-600 text-white shadow-2xs">
                            <Truck className="w-3.5 h-3.5 animate-pulse" />
                          </span>
                          <div>
                            {order.status === 'out_for_delivery' && (
                              <div className="flex items-center gap-1.5">
                                <span className="text-rose-700 font-extrabold text-xs sm:text-sm">
                                  Arriving Today by {order.estimatedDeliveryTime || '1:30 PM'}
                                </span>
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                                <span className="text-[10px] text-neutral-500 hidden sm:inline">
                                  · Out for doorstep trial & fitting in Nashik
                                </span>
                              </div>
                            )}
                            {(order.status === 'booked' || order.status === 'dispatched') && (
                              <div className="flex items-center gap-1.5">
                                <span className="text-amber-950 font-extrabold text-xs sm:text-sm">
                                  Delivery Expected: {deliveryDateDisplay} by {order.estimatedDeliveryTime || '1:30 PM'}
                                </span>
                                <span className="text-[10px] text-neutral-500 hidden sm:inline">
                                  · Arrives 1 day before your event with backup size
                                </span>
                              </div>
                            )}
                            {order.status === 'with_customer' && (
                              <div className="flex items-center gap-1.5">
                                <span className="text-blue-900 font-extrabold text-xs sm:text-sm">
                                  Delivered to Wardrobe · In-Use
                                </span>
                                <span className="text-[10px] text-neutral-500 hidden sm:inline">
                                  · Reverse pickup scheduled for {order.endDate} by 11:00 AM
                                </span>
                              </div>
                            )}
                            {order.status === 'completed' && (
                              <div className="flex items-center gap-1.5">
                                <span className="text-emerald-900 font-extrabold text-xs sm:text-sm">
                                  Delivered & Returned · Deposit Refunded
                                </span>
                                <span className="text-[10px] text-neutral-500 hidden sm:inline">
                                  · 100% security deposit returned to UPI
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-amber-900 bg-white px-2 py-0.5 rounded-full border border-amber-300">
                            📍 {order.nashikLocality.split(',')[0]}
                          </span>
                          <button
                            type="button"
                            onClick={() => setTrackingOrder(order)}
                            className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] flex items-center gap-1 transition active:scale-95"
                          >
                            <Truck className="w-3 h-3" />
                            <span>Track</span>
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Main Product Info & Details Grid */}
                  <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    {/* Left: Product Thumbnail & Title */}
                    <div className="md:col-span-6 flex gap-3.5">
                      <img
                        src={order.product.image}
                        alt={order.product.name}
                        className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-2xl border border-neutral-100 shrink-0 shadow-2xs"
                      />
                      <div className="space-y-1 min-w-0">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 block">
                          {order.product.brand}
                        </span>
                        <h4 className="font-extrabold text-neutral-900 text-sm leading-snug line-clamp-2">
                          {order.product.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-[11px] text-neutral-600">
                          <span className="bg-neutral-100 px-2 py-0.5 rounded-md font-bold text-neutral-800">
                            Size: {order.selectedSize}
                          </span>
                          <span className="bg-neutral-100 px-2 py-0.5 rounded-md font-semibold text-neutral-700">
                            {duration}-Day Rental
                          </span>
                        </div>
                        {order.backupSize && (
                          <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 pt-0.5">
                            <Sparkles className="w-3 h-3 text-emerald-500" />
                            {order.backupSize}
                          </p>
                        )}
                        <p className="text-[11px] text-neutral-500 pt-0.5 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Dates: <strong>{order.startDate}</strong> to <strong>{order.endDate}</strong></span>
                        </p>
                      </div>
                    </div>

                    {/* Middle: Nashik Delivery Address */}
                    <div className="md:col-span-3 space-y-1.5 p-3 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs">
                      <div className="flex items-center gap-1 text-neutral-400 font-extrabold uppercase text-[10px] tracking-wider">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span>Nashik Destination</span>
                      </div>
                      <p className="font-bold text-neutral-900 text-[11px]">
                        {order.deliveryAddress.fullName}
                      </p>
                      <p className="text-neutral-600 text-[11px] leading-relaxed line-clamp-2">
                        {order.deliveryAddress.street}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
                      </p>
                      <span className="inline-block text-[9.5px] font-bold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded">
                        📍 {order.nashikLocality}
                      </span>
                    </div>

                    {/* Right: Payment & Security Deposit breakdown */}
                    <div className="md:col-span-3 space-y-2 p-3 rounded-2xl bg-rose-50/40 border border-rose-100 text-xs">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-neutral-500">Rental Fee:</span>
                        <span className="font-bold font-mono text-neutral-900">₹{order.rentalFee}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-neutral-500">Security Deposit:</span>
                        <span className="font-bold font-mono text-neutral-900">₹{order.securityDeposit}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-rose-200/50">
                        <span className="font-bold text-neutral-900">Total Paid:</span>
                        <span className="font-extrabold font-mono text-sm text-rose-600">₹{order.totalPaid}</span>
                      </div>

                      {/* Deposit Escrow Status Banner */}
                      <div className="mt-1 p-2 rounded-xl bg-white border border-rose-200/60 text-[10.5px]">
                        {order.depositStatus === 'refunded' ? (
                          <div className="space-y-0.5 text-emerald-700">
                            <div className="flex items-center gap-1 font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>₹{order.securityDeposit} Refunded</span>
                            </div>
                            <p className="text-[9.5px] text-neutral-500">
                              UPI: {order.depositRefundUpi}
                            </p>
                            <p className="text-[9px] text-neutral-400 font-mono">
                              UTR: {order.depositRefundTxn}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-0.5 text-amber-800">
                            <div className="flex items-center gap-1 font-bold">
                              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                              <span>₹{order.securityDeposit} in Escrow</span>
                            </div>
                            <p className="text-[9.5px] text-neutral-500">
                              Auto-refunded to UPI within 2 hrs of reverse pickup.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step-by-Step Live Tracking Timeline */}
                  <div className="px-4 sm:px-6 py-4 border-t border-neutral-100 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-rose-500" />
                        <span>Rental & Nashik Courier Timeline</span>
                      </span>
                      {order.riderName && (
                        <span className="text-[11px] text-neutral-600 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-rose-500" />
                          <span>Nashik Rider: <strong>{order.riderName}</strong></span>
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-1 text-xs">
                      {order.steps.map((step, idx) => (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl transition ${
                            step.done
                              ? 'bg-emerald-50/70 border border-emerald-200 text-neutral-800'
                              : step.current
                              ? 'bg-amber-50 border border-amber-300 text-amber-950 shadow-2xs'
                              : 'bg-neutral-50 border border-neutral-100 text-neutral-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            {step.done ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            ) : step.current ? (
                              <Truck className="w-3.5 h-3.5 text-amber-600 animate-pulse shrink-0" />
                            ) : (
                              <span className="w-3.5 h-3.5 rounded-full border border-neutral-300 shrink-0 inline-block"></span>
                            )}
                            <span className="font-bold text-[11px] truncate">{step.title}</span>
                          </div>
                          <p className="text-[10px] leading-tight line-clamp-2">
                            {step.desc}
                          </p>
                          <span className="text-[9px] text-neutral-400 mt-1 block">
                            {step.date} {step.time ? `· ${step.time}` : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Quick Action Buttons Bar */}
                  <div className="p-3 sm:px-6 sm:py-3.5 border-t border-neutral-100 bg-neutral-50/70 flex flex-wrap items-center justify-between gap-2 text-xs">
                    {/* Invoice Download Action */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedInvoiceOrder(order)}
                        className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 font-bold text-xs flex items-center gap-1.5 transition shadow-2xs"
                      >
                        <FileText className="w-3.5 h-3.5 text-rose-500" />
                        <span>Rental Invoice</span>
                      </button>

                      {order.status === 'out_for_delivery' && (
                        <button
                          onClick={() => setTrackingOrder(order)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-2xs"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Track Live Courier</span>
                        </button>
                      )}
                    </div>

                    {/* Modification / Extension / Rebooking Actions */}
                    <div className="flex items-center gap-2">
                      {order.canExtend && !isExtended && (
                        <button
                          onClick={() => handleExtend(order.id)}
                          className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1 transition"
                        >
                          <Calendar className="w-3.5 h-3.5 text-rose-500" />
                          <span>Extend +2 Days</span>
                        </button>
                      )}

                      {isExtended && (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-xl border border-emerald-200">
                          ✓ +2 Days Extension Added
                        </span>
                      )}

                      {order.status === 'completed' && onRentAgain && (
                        <button
                          onClick={() => onRentAgain(order.product)}
                          className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1 transition shadow-2xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Rent Again</span>
                        </button>
                      )}

                      <a
                        href="https://wa.me/919423988120?text=Hi%20REVOGUE%20Nashik%2C%20I%20need%20assistance%20with%20my%20rental"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 font-semibold text-xs flex items-center gap-1 transition"
                      >
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <span>Nashik Support</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-neutral-100 bg-white flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Doorstep sanitized fitting & reverse pickup active across Nashik</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition"
          >
            Back to Shopping
          </button>
        </div>
      </div>

      {/* Embedded Invoice Modal */}
      {selectedInvoiceOrder && (
        <RentalInvoiceModal
          order={selectedInvoiceOrder}
          isOpen={!!selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}

      {/* Live Nashik Courier Tracking Modal */}
      {trackingOrder && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 space-y-4 border border-rose-100 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-base text-neutral-900 font-brand">
                  Nashik Courier Tracking
                </h3>
              </div>
              <button
                onClick={() => setTrackingOrder(null)}
                className="p-1 rounded-full hover:bg-neutral-100"
              >
                <X className="w-4 h-4 text-neutral-500" />
              </button>
            </div>

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Rider on the way: 15 mins away
              </p>
              <p className="text-[11px] text-amber-800">
                Delivery Rider: <strong>{trackingOrder.riderName || 'Akash Deshmukh'}</strong>
              </p>
              <p className="text-[11px] text-amber-800">
                Contact: <strong className="font-mono">{trackingOrder.courierContact || '+91 94239 88120'}</strong>
              </p>
              <p className="text-[11px] text-amber-800">
                Destination: <strong>{trackingOrder.deliveryAddress.street}, {trackingOrder.nashikLocality}</strong>
              </p>
            </div>

            <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs space-y-1">
              <span className="text-[10px] text-neutral-400 font-bold uppercase">Package Contents</span>
              <p className="font-bold text-neutral-900">{trackingOrder.product.name}</p>
              <p className="text-neutral-600 text-[11px]">Primary Size: {trackingOrder.selectedSize} + Complimentary Backup Size Included</p>
              <p className="text-neutral-500 text-[10px]">Steam Sanitized Garment Bag with Return Seals</p>
            </div>

            <button
              onClick={() => setTrackingOrder(null)}
              className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs"
            >
              Done Tracking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
