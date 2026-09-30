import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, MapPin, Calendar, Clock, Sparkles } from 'lucide-react';
import { RentalOrder } from '../types/rental';
import { Logo } from './Logo';

interface RentalInvoiceModalProps {
  order: RentalOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RentalInvoiceModal: React.FC<RentalInvoiceModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] border border-neutral-200 animate-in zoom-in-95 duration-200">
        {/* Top Control Bar */}
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
              Rental Invoice & Agreement
            </span>
            <span className="text-[10px] font-mono font-bold bg-neutral-200 px-2 py-0.5 rounded text-neutral-700">
              {order.invoiceNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-100 text-xs font-bold text-neutral-700 flex items-center gap-1.5 transition shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-500 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-neutral-800 text-xs font-sans no-scrollbar">
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
            <Logo variant="invoice" />

            <div className="text-right sm:text-right space-y-1">
              <span className="text-base font-extrabold text-neutral-900 block font-brand">
                TAX INVOICE / RENTAL CONTRACT
              </span>
              <p className="text-[11px] text-neutral-500">
                GSTIN: <strong>27AAACR9214P1ZM</strong>
              </p>
              <p className="text-[11px] text-neutral-500">
                Hub: Gangapur Road & Thatte Nagar, Nashik - 422005
              </p>
              <p className="text-[11px] text-neutral-500">
                Date: {order.bookingDate}
              </p>
            </div>
          </div>

          {/* Billing & Nashik Delivery Destination */}
          <div className="grid grid-cols-2 gap-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <div>
              <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider block mb-1">
                Customer Details
              </span>
              <p className="font-bold text-neutral-900 text-sm">{order.deliveryAddress.fullName}</p>
              <p className="text-neutral-600 mt-0.5">Phone: {order.deliveryAddress.phone}</p>
              <p className="text-neutral-600">Email: vaishnavichaudhary022@gmail.com</p>
            </div>

            <div>
              <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                Nashik Delivery Destination
              </span>
              <p className="font-bold text-neutral-900">{order.deliveryAddress.apartment || order.nashikLocality}</p>
              <p className="text-neutral-600">{order.deliveryAddress.street}</p>
              <p className="text-neutral-600 font-medium">Nashik, Maharashtra - {order.deliveryAddress.pincode}</p>
            </div>
          </div>

          {/* Rental Order Items Table */}
          <div className="border border-neutral-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-100 text-[11px] font-bold text-neutral-600 uppercase border-b border-neutral-200">
                  <th className="p-3">Item Description</th>
                  <th className="p-3 text-center">Rental Period</th>
                  <th className="p-3 text-center">Size</th>
                  <th className="p-3 text-right">Fee (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-xs">
                <tr>
                  <td className="p-3">
                    <p className="font-bold text-neutral-900">{order.product.name}</p>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wide">
                      Brand: {order.product.brand} · Tag: {order.product.tag}
                    </p>
                    {order.backupSize && (
                      <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                        ✓ {order.backupSize}
                      </p>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <p className="font-bold">{order.rentalDuration} Days</p>
                    <p className="text-[10px] text-neutral-500">{order.startDate} to {order.endDate}</p>
                  </td>
                  <td className="p-3 text-center font-bold">
                    {order.selectedSize}
                  </td>
                  <td className="p-3 text-right font-mono font-bold">
                    ₹{order.rentalFee.toLocaleString('en-IN')}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="p-2.5 text-neutral-600">
                    Promotional Discount (RENT40 Nashik Fest)
                  </td>
                  <td className="p-2.5 text-right font-mono text-emerald-600 font-bold">
                    -₹{order.discountApplied.toLocaleString('en-IN')}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="p-2.5 text-neutral-600">
                    Sanitization, Professional Steam Dry-Clean & Garment Bag
                  </td>
                  <td className="p-2.5 text-right font-mono text-neutral-800 font-bold">
                    FREE (₹0)
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="p-2.5 text-neutral-600">
                    Doorstep Delivery & Reverse Pickup (Nashik City)
                  </td>
                  <td className="p-2.5 text-right font-mono text-neutral-800 font-bold">
                    FREE (₹0)
                  </td>
                </tr>
                <tr className="bg-rose-50/50">
                  <td colSpan={3} className="p-2.5 text-neutral-800 font-semibold">
                    Refundable Security Deposit (Held in Escrow)
                  </td>
                  <td className="p-2.5 text-right font-mono text-neutral-900 font-bold">
                    ₹{order.securityDeposit.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-neutral-900 text-white font-bold">
                  <td colSpan={3} className="p-3 text-xs uppercase tracking-wider">
                    Total Amount Paid (Including Security Deposit)
                  </td>
                  <td className="p-3 text-right font-mono text-sm text-amber-300">
                    ₹{order.totalPaid.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Escrow & Security Deposit Policy Terms */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Security Deposit & Reverse Pickup Agreement</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-amber-900 leading-relaxed">
              <li>
                <strong>Security Deposit of ₹{order.securityDeposit}:</strong> Held in secure escrow. 100% refunded to your UPI account within 2 hours after reverse pickup inspection.
              </li>
              <li>
                <strong>Complimentary Backup Size:</strong> Free secondary size provided to guarantee a flawless fit for your event.
              </li>
              <li>
                <strong>Zero Cleaning Obligation:</strong> Do not wash or dry-clean the garment. Our specialized Nashik cleaning facility takes care of 100% steam dry-cleaning.
              </li>
              <li>
                <strong>Reverse Pickup:</strong> Courier partner will arrive at your Nashik address on {order.endDate} between 10:00 AM – 2:00 PM.
              </li>
            </ul>
          </div>

          {/* Signoff Strip */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200 text-[11px] text-neutral-500">
            <div>
              <p className="font-bold text-neutral-800">REVOGUE Nashik Luxury Apparel LLP</p>
              <p>Authorized E-Sign Verification Verified</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                Payment Status: PAID
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-end gap-2 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Download Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
};
