import React, { useState } from 'react';
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  RotateCcw,
  Calendar,
  ShieldCheck,
  FileText,
  Search,
  MapPin,
  Sparkles,
  Phone
} from 'lucide-react';
import { RentalOrder } from '../types/rental';
import { SAMPLE_RENTAL_ORDERS } from '../data/rentalData';
import { RentalInvoiceModal } from './RentalInvoiceModal';
import { DeliveryConfirmationModal } from './DeliveryConfirmationModal';

interface OrdersViewProps {
  orders?: RentalOrder[];
  onRentAgain?: (product: any) => void;
  onTrackOrder?: (order: RentalOrder) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders = SAMPLE_RENTAL_ORDERS,
  onRentAgain,
  onTrackOrder,
}) => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<RentalOrder | null>(null);
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState<RentalOrder | null>(null);

  const filteredOrders = orders.filter((order) => {
    if (selectedTab === 'active') {
      return order.status === 'out_for_delivery' || order.status === 'with_customer' || order.status === 'dispatched';
    }
    if (selectedTab === 'completed') {
      return order.status === 'completed';
    }
    return true;
  });

  return (
    <div className="p-4 sm:p-6 pb-24 space-y-5 max-w-5xl mx-auto">
      {/* Title & Service Region */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-neutral-900 font-brand">
              Customer Rental History
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
              Nashik Fleet 📍
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            Active fitting deliveries, event timelines, and 100% security deposit escrow returns
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-2xl border border-neutral-200">
          {(['all', 'active', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize ${
                selectedTab === tab
                  ? 'bg-white text-rose-600 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {tab === 'all' ? `All (${orders.length})` : tab === 'active' ? 'Active' : 'Completed'}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl p-4 sm:p-5 border border-neutral-200/80 shadow-xs space-y-4"
          >
            {/* Header Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded">
                  {order.bookingId}
                </span>
                <span className="text-neutral-400">·</span>
                <span className="text-xs text-neutral-500">{order.bookingDate}</span>
              </div>

              <div className="flex items-center gap-2">
                {order.status === 'out_for_delivery' && (
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Out for Delivery in Nashik
                  </span>
                )}
                {order.status === 'with_customer' && (
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> In Wardrobe / Event In-Use
                  </span>
                )}
                {order.status === 'completed' && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Deposit Refunded (100%)
                  </span>
                )}
              </div>
            </div>

            {/* Prominent Delivery Arrival Notice Banner (Shopping App style) */}
            {(() => {
              const deliveryDateStr = order.estimatedDeliveryDate
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
                <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-50 border-2 border-amber-300 flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white shadow-xs">
                      <Truck className="w-4 h-4 animate-pulse" />
                    </span>
                    <div>
                      {order.status === 'out_for_delivery' && (
                        <div className="flex items-center gap-2">
                          <span className="font-black text-rose-700 text-sm sm:text-base">
                            Arriving Today by {order.estimatedDeliveryTime || '1:30 PM'}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                            Doorstep Fitting
                          </span>
                        </div>
                      )}
                      {(order.status === 'booked' || order.status === 'dispatched') && (
                        <div className="flex items-center gap-2">
                          <span className="font-black text-amber-950 text-sm sm:text-base">
                            Delivery Expected: {deliveryDateStr} by {order.estimatedDeliveryTime || '1:30 PM'}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            1 Day Before Event
                          </span>
                        </div>
                      )}
                      {order.status === 'with_customer' && (
                        <div className="flex items-center gap-2">
                          <span className="font-black text-blue-900 text-sm sm:text-base">
                            Delivered to Wardrobe · Reverse Pickup: {order.endDate} by 11:00 AM
                          </span>
                        </div>
                      )}
                      {order.status === 'completed' && (
                        <div className="flex items-center gap-2">
                          <span className="font-black text-emerald-900 text-sm sm:text-base">
                            Delivered & Returned · 100% Security Deposit Refunded
                          </span>
                        </div>
                      )}
                      <p className="text-[11px] text-neutral-600 mt-0.5">
                        Free backup size included · Dispatched from Nashik Central Hub (College Rd)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-amber-900 bg-white px-2.5 py-1 rounded-xl border border-amber-300 shadow-2xs">
                      📍 {order.nashikLocality.split(',')[0]}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (onTrackOrder) onTrackOrder(order);
                        else setSelectedTrackingOrder(order);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] shadow-xs flex items-center gap-1.5 transition active:scale-95"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Delivery</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Product & Address Info */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-7 flex gap-3.5">
                <img
                  src={order.product.image}
                  alt={order.product.name}
                  className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-2xl shrink-0 border border-neutral-100 shadow-2xs"
                />
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] font-extrabold uppercase text-rose-600">
                    {order.product.brand}
                  </span>
                  <h4 className="font-bold text-sm text-neutral-900 truncate">
                    {order.product.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-neutral-600">
                    <span className="bg-neutral-100 px-2 py-0.5 rounded font-bold">
                      Size: {order.selectedSize}
                    </span>
                    <span className="bg-neutral-100 px-2 py-0.5 rounded">
                      {order.rentalDuration}-Day Rental
                    </span>
                  </div>
                  {order.backupSize && (
                    <p className="text-[11px] text-emerald-600 font-semibold">
                      ✓ {order.backupSize}
                    </p>
                  )}
                  <p className="text-[11px] text-neutral-500">
                    Rental Window: <strong>{order.startDate}</strong> to <strong>{order.endDate}</strong>
                  </p>
                </div>
              </div>

              {/* Delivery Address & Deposit */}
              <div className="md:col-span-5 space-y-2 text-xs bg-neutral-50 p-3 rounded-2xl border border-neutral-100">
                <div className="flex items-center gap-1 font-bold text-neutral-800">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Nashik Destination: {order.nashikLocality}</span>
                </div>
                <p className="text-neutral-600 text-[11px]">
                  {order.deliveryAddress.street}, Nashik - {order.deliveryAddress.pincode}
                </p>
                <div className="pt-1.5 border-t border-neutral-200/60 flex items-center justify-between text-[11px]">
                  <span>Total Rental + Security Deposit:</span>
                  <strong className="font-mono text-sm text-rose-600">₹{order.totalPaid}</strong>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="pt-2 border-t border-neutral-100">
              <span className="text-xs font-bold text-neutral-800 flex items-center gap-1 mb-2">
                <Clock className="w-3.5 h-3.5 text-rose-500" /> Rental Journey
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-1.5 text-xs">
                {order.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-xl ${
                      step.done
                        ? 'bg-emerald-50 text-neutral-800 border border-emerald-200'
                        : step.current
                        ? 'bg-amber-50 text-amber-900 border border-amber-300'
                        : 'bg-neutral-50 text-neutral-400'
                    }`}
                  >
                    <span className="font-bold text-[10px] block truncate">{step.title}</span>
                    <span className="text-[9px] text-neutral-500 block truncate">{step.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedInvoiceOrder(order)}
                className="px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-100 flex items-center gap-1.5 transition"
              >
                <FileText className="w-3.5 h-3.5 text-rose-500" />
                <span>Invoice / Agreement</span>
              </button>

              {order.status === 'completed' && onRentAgain && (
                <button
                  onClick={() => onRentAgain(order.product)}
                  className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Rent Again</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedInvoiceOrder && (
        <RentalInvoiceModal
          order={selectedInvoiceOrder}
          isOpen={!!selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}

      {selectedTrackingOrder && (
        <DeliveryConfirmationModal
          order={selectedTrackingOrder}
          isOpen={!!selectedTrackingOrder}
          onClose={() => setSelectedTrackingOrder(null)}
          onOpenInvoice={(ord) => {
            setSelectedTrackingOrder(null);
            setSelectedInvoiceOrder(ord);
          }}
        />
      )}
    </div>
  );
};
