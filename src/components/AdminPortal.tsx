import React, { useState } from 'react';
import {
  Shield,
  Users,
  Store,
  DollarSign,
  PackageCheck,
  CheckCircle,
  TrendingUp,
  Search,
  Plus,
  Trash2,
  X,
  Clock,
  Truck,
  RotateCcw,
  MapPin,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  Eye,
  Sparkles,
  Shirt,
  Filter,
  Check
} from 'lucide-react';
import { User, DressProduct, RentalOrder, CategoryId, RentalOrderStatus } from '../types/rental';
import { CATEGORIES } from '../data/rentalData';

interface AdminPortalProps {
  currentUser: User;
  products: DressProduct[];
  rentalOrders: RentalOrder[];
  onAddNewProduct: (newProduct: DressProduct) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: RentalOrderStatus, depositStatus?: 'held' | 'refunded') => void;
  onSwitchToCustomerView: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  currentUser,
  products,
  rentalOrders,
  onAddNewProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onSwitchToCustomerView,
}) => {
  // Navigation tabs in admin portal
  const [activeTab, setActiveTab] = useState<'rentals' | 'dresses' | 'vendors'>('rentals');

  // Customer Rentals search & filter states
  const [rentalSearch, setRentalSearch] = useState('');
  const [rentalStatusFilter, setRentalStatusFilter] = useState<string>('all');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<RentalOrder | null>(null);

  // Dress Catalog search & filter states
  const [dressSearch, setDressSearch] = useState('');
  const [dressGenderFilter, setDressGenderFilter] = useState<'all' | 'women' | 'men' | 'kids'>('all');
  const [dressCategoryFilter, setDressCategoryFilter] = useState<string>('all');
  const [showAddDressModal, setShowAddDressModal] = useState(false);
  const [deleteConfirmationProduct, setDeleteConfirmationProduct] = useState<DressProduct | null>(null);

  // Form state for adding new dress
  const [newDress, setNewDress] = useState({
    name: '',
    brand: 'REVOGUE Signature Archive',
    category: 'wedding' as CategoryId,
    targetGender: 'women' as 'women' | 'men' | 'kids',
    rentalPrice: 1999,
    retailPrice: 18000,
    securityDeposit: 1200,
    sizes: ['M', 'L'],
    color: 'Royal Emerald & Gold',
    fabric: 'Pure Raw Silk & Zardozi Embroidery',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
    tag: 'Admin Featured Collection',
    description: 'Mastercrafted designer outfit curated for weddings and grand festivities in Nashik.',
    includes: 'Complete Outfit + Matching Dupatta + Protective Garment Bag',
    ageGroup: '',
    festival: 'Wedding & Reception',
  });

  // Preset image suggestions for quick catalog creation
  const imagePresets = [
    {
      label: 'Royal Shivaji Maharaj Costume',
      url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
      name: 'Chhatrapati Shivaji Maharaj Royal Maratha Costume',
      category: 'fancydress' as CategoryId,
      gender: 'men' as const,
      price: 1299,
    },
    {
      label: 'Bridal Crimson Lehenga',
      url: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=85',
      name: 'Crimson Velvet Bridal Choli & Flared Lehenga Set',
      category: 'wedding' as CategoryId,
      gender: 'women' as const,
      price: 3499,
    },
    {
      label: 'Royal Sherwani Set',
      url: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=85',
      name: 'Ivory Raw Silk Royal Groom Sherwani with Stole',
      category: 'wedding' as CategoryId,
      gender: 'men' as const,
      price: 2699,
    },
    {
      label: 'Kids Sparkling Fairy Costume',
      url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=85',
      name: 'Kids Sparkling Princess Fairy Wings & Tiara Gown',
      category: 'fancydress' as CategoryId,
      gender: 'kids' as const,
      price: 799,
    },
    {
      label: 'Santa Claus Velvet Outfit',
      url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=85',
      name: 'Santa Claus Velvet Holiday Costume Set with Beard & Sack',
      category: 'christmas' as CategoryId,
      gender: 'men' as const,
      price: 999,
    },
    {
      label: 'Navratri Mirror Chaniya Choli',
      url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
      name: 'Navratri Multi-Color Real Mirror Flared Chaniya Choli',
      category: 'navratri' as CategoryId,
      gender: 'women' as const,
      price: 1599,
    },
  ];

  // Vendor partners
  const [vendorList] = useState([
    {
      id: 'v-1',
      name: 'Singhania Heritage Couturiers',
      owner: 'Rajesh Singhania',
      city: 'Nashik & Mumbai',
      items: 24,
      status: 'Verified Partner',
      grossRentals: '₹3,42,000',
    },
    {
      id: 'v-2',
      name: 'Gujarat Heritage Garba Rentals',
      owner: 'Kirit Patel',
      city: 'Ahmedabad & Nashik',
      items: 48,
      status: 'Verified Partner',
      grossRentals: '₹4,12,000',
    },
    {
      id: 'v-3',
      name: 'Bollywood & Period Costume Vault',
      owner: 'Neha Malhotra',
      city: 'Nashik Hub',
      items: 32,
      status: 'Verified Partner',
      grossRentals: '₹2,10,000',
    },
    {
      id: 'v-4',
      name: 'Little Royalty Kids Rentals',
      owner: 'Sonal Gupta',
      city: 'Nashik & Pune',
      items: 18,
      status: 'Verified Partner',
      grossRentals: '₹1,45,000',
    },
  ]);

  // Filter customer rentals
  const filteredRentals = rentalOrders.filter((order) => {
    const q = rentalSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      order.bookingId.toLowerCase().includes(q) ||
      order.product.name.toLowerCase().includes(q) ||
      order.deliveryAddress.fullName.toLowerCase().includes(q) ||
      order.deliveryAddress.phone.toLowerCase().includes(q) ||
      order.nashikLocality.toLowerCase().includes(q);

    const matchesStatus =
      rentalStatusFilter === 'all' ||
      order.status === rentalStatusFilter ||
      (rentalStatusFilter === 'returned' && (order.status === 'completed' || order.status === 'returned_inspected')) ||
      (rentalStatusFilter === 'active' && (order.status === 'with_customer' || order.status === 'out_for_delivery'));

    return matchesSearch && matchesStatus;
  });

  // Filter dresses in catalog
  const filteredDresses = products.filter((p) => {
    const q = dressSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);

    const matchesGender = dressGenderFilter === 'all' || p.targetGender === dressGenderFilter;
    const matchesCategory = dressCategoryFilter === 'all' || p.category === dressCategoryFilter;

    return matchesSearch && matchesGender && matchesCategory;
  });

  // Calculate rental status metrics
  const totalRentalsCount = rentalOrders.length;
  const activeWithCustomerCount = rentalOrders.filter((o) => o.status === 'with_customer').length;
  const returnedCompletedCount = rentalOrders.filter((o) => o.status === 'completed').length;
  const outForDeliveryCount = rentalOrders.filter((o) => o.status === 'out_for_delivery').length;
  const totalDepositsHeld = rentalOrders
    .filter((o) => o.depositStatus === 'held')
    .reduce((sum, o) => sum + (o.securityDeposit || 0), 0);

  // Handle add dress submission
  const handleAddDressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDress.name.trim()) return;

    const discount = Math.round(((newDress.retailPrice - newDress.rentalPrice) / newDress.retailPrice) * 100);

    const createdProduct: DressProduct = {
      id: `prod-admin-${Date.now()}`,
      name: newDress.name.trim(),
      brand: newDress.brand.trim() || 'REVOGUE Signature Archive',
      category: newDress.category,
      targetGender: newDress.targetGender,
      rentalPrice: Number(newDress.rentalPrice) || 999,
      retailPrice: Number(newDress.retailPrice) || 8000,
      discountPercentage: discount > 0 ? discount : 40,
      rating: 4.9,
      reviewCount: 1,
      rentedCount: 0,
      image: newDress.image,
      sizes: newDress.sizes.length > 0 ? newDress.sizes : ['M'],
      color: newDress.color || 'Custom Designer Palette',
      tag: newDress.tag || 'New Arrival',
      description: newDress.description || 'Exclusive designer couture prepared for Nashik rentals.',
      fabric: newDress.fabric || 'Luxury Silk Blend',
      securityDeposit: Number(newDress.securityDeposit) || 1000,
      includes: newDress.includes || 'Complete Costume + Matching Accessories',
      ageGroup: newDress.ageGroup || undefined,
      festival: newDress.festival || undefined,
      condition: '100% Sanitized & Dry-Cleaned',
      featured: true,
      shopOwnerName: 'REVOGUE Central Wardrobe Vault, Nashik',
    };

    onAddNewProduct(createdProduct);
    setShowAddDressModal(false);

    // Reset form
    setNewDress({
      name: '',
      brand: 'REVOGUE Signature Archive',
      category: 'wedding',
      targetGender: 'women',
      rentalPrice: 1999,
      retailPrice: 18000,
      securityDeposit: 1200,
      sizes: ['M', 'L'],
      color: 'Royal Emerald & Gold',
      fabric: 'Pure Raw Silk & Zardozi Embroidery',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
      tag: 'Admin Featured Collection',
      description: 'Mastercrafted designer outfit curated for weddings and grand festivities in Nashik.',
      includes: 'Complete Outfit + Matching Dupatta + Protective Garment Bag',
      ageGroup: '',
      festival: 'Wedding & Reception',
    });
  };

  // Status badge helper
  const renderStatusBadge = (status: RentalOrderStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Returned & Deposit Refunded</span>
          </span>
        );
      case 'with_customer':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-900 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>In Customer Wardrobe (Active)</span>
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200">
            <Truck className="w-3.5 h-3.5 text-blue-600" />
            <span>Out for Delivery</span>
          </span>
        );
      case 'returned_inspected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-800 border border-purple-200">
            <RotateCcw className="w-3.5 h-3.5 text-purple-600" />
            <span>Returned · Inspection Passed</span>
          </span>
        );
      case 'booked':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-stone-100 text-stone-800 border border-stone-200">
            <PackageCheck className="w-3.5 h-3.5 text-stone-600" />
            <span>Booked · Preparing Order</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 text-stone-900 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs border border-stone-200">
        <div>
          <div className="inline-flex items-center gap-2 bg-stone-100 text-stone-700 px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wider mb-2 border border-stone-200">
            <Shield className="w-3.5 h-3.5 text-stone-800" />
            Executive Administration & Control
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            REVOGUE Platform Administration
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Supervising {products.length} catalog outfits · {rentalOrders.length} customer rentals · Central Nashik Logistics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveTab('dresses');
              setShowAddDressModal(true);
            }}
            className="py-2.5 px-4 bg-stone-900 text-white hover:bg-stone-800 rounded-lg text-xs sm:text-sm font-medium shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add New Dress
          </button>
          <button
            onClick={onSwitchToCustomerView}
            className="py-2.5 px-4 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer"
          >
            View Customer Storefront
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('rentals')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'rentals'
              ? 'bg-stone-900 text-white shadow-xs font-semibold'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Customer Rentals & Returns</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeTab === 'rentals' ? 'bg-stone-700 text-white' : 'bg-stone-200 text-stone-700'
            }`}
          >
            {rentalOrders.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('dresses')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'dresses'
              ? 'bg-stone-900 text-white shadow-xs font-semibold'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Shirt className="w-4 h-4" />
          <span>Manage Dresses & Catalog</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeTab === 'dresses' ? 'bg-stone-700 text-white' : 'bg-stone-200 text-stone-700'
            }`}
          >
            {products.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('vendors')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'vendors'
              ? 'bg-stone-900 text-white shadow-xs font-semibold'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Boutiques & Partners</span>
        </button>
      </div>

      {/* ================= TAB 1: CUSTOMER RENTALS & RETURN STATUS ================= */}
      {activeTab === 'rentals' && (
        <div className="space-y-6">
          {/* Key Metric Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
              <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wide block">
                Total Bookings
              </span>
              <div className="text-2xl font-serif font-bold text-stone-900 mt-1">
                {totalRentalsCount}
              </div>
              <span className="text-[11px] text-stone-500 mt-0.5 block">Across Nashik Hubs</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
              <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wide block">
                With Customer (Active)
              </span>
              <div className="text-2xl font-serif font-bold text-amber-700 mt-1">
                {activeWithCustomerCount} Outfits
              </div>
              <span className="text-[11px] text-stone-500 mt-0.5 block">Awaiting reverse pickup</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
              <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wide block">
                Returned & Completed
              </span>
              <div className="text-2xl font-serif font-bold text-emerald-800 mt-1">
                {returnedCompletedCount} Orders
              </div>
              <span className="text-[11px] text-emerald-700 mt-0.5 block">100% Deposits Refunded</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
              <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wide block">
                Deposits in Escrow
              </span>
              <div className="text-2xl font-serif font-bold text-stone-900 mt-1">
                ₹{totalDepositsHeld.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-stone-500 mt-0.5 block">Auto-refund on return</span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={rentalSearch}
                onChange={(e) => setRentalSearch(e.target.value)}
                placeholder="Search by Customer Name, Phone, Booking ID, or Dress..."
                className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-9 pr-4 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900"
              />
              {rentalSearch && (
                <button
                  onClick={() => setRentalSearch('')}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setRentalStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                  rentalStatusFilter === 'all'
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                All ({rentalOrders.length})
              </button>
              <button
                onClick={() => setRentalStatusFilter('with_customer')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                  rentalStatusFilter === 'with_customer'
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                With Customer ({activeWithCustomerCount})
              </button>
              <button
                onClick={() => setRentalStatusFilter('completed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                  rentalStatusFilter === 'completed'
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Returned & Refunded ({returnedCompletedCount})
              </button>
              <button
                onClick={() => setRentalStatusFilter('out_for_delivery')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                  rentalStatusFilter === 'out_for_delivery'
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Out for Delivery ({outForDeliveryCount})
              </button>
            </div>
          </div>

          {/* Customer Rentals Table & Cards */}
          <div className="space-y-4">
            {filteredRentals.map((order) => {
              const isReturned = order.status === 'completed' || order.status === 'returned_inspected';

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-xs hover:border-stone-300 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                    {/* Booking ID & Return Status */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-stone-900 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200">
                        {order.bookingId}
                      </span>
                      {renderStatusBadge(order.status)}
                      <span className="text-stone-300 hidden sm:inline">|</span>
                      <span className="text-xs text-stone-500">
                        Booked: <strong className="text-stone-800">{order.bookingDate}</strong>
                      </span>
                    </div>

                    {/* Admin Status Quick Action Bar */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium text-stone-500">Update Return Status:</span>
                      
                      {!isReturned ? (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'completed', 'refunded')}
                          className="px-3 py-1 bg-emerald-800 hover:bg-emerald-700 text-white rounded-md text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                          title="Verify return and mark security deposit as 100% refunded"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark Returned & Refund Deposit</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'with_customer', 'held')}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 rounded-md text-xs font-medium transition-colors cursor-pointer"
                        >
                          Reopen / Move to Active
                        </button>
                      )}

                      {order.status === 'booked' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'out_for_delivery')}
                          className="px-2.5 py-1 bg-blue-800 hover:bg-blue-700 text-white rounded-md text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Truck className="w-3.5 h-3.5" /> Dispatch
                        </button>
                      )}

                      {order.status === 'out_for_delivery' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'with_customer')}
                          className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          Mark Delivered to Customer
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedOrderDetails(order)}
                        className="px-2.5 py-1 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-md text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-stone-500" />
                        <span>View Dossier</span>
                      </button>
                    </div>
                  </div>

                  {/* Body: Split into Customer Details & Dress Details */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4">
                    {/* Left: Dress Thumbnail & Info (5 cols) */}
                    <div className="md:col-span-5 flex items-start gap-3.5">
                      <img
                        src={order.product.image}
                        alt={order.product.name}
                        className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-lg shrink-0 border border-stone-200"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.endsWith('/assets/fallback-dress.svg')) {
                            target.src = '/assets/fallback-dress.svg';
                          }
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-medium text-stone-500 uppercase tracking-wider block">
                          {order.product.brand} · {order.product.targetGender}
                        </span>
                        <h4 className="text-xs sm:text-sm font-semibold text-stone-900 line-clamp-1 mt-0.5">
                          {order.product.name}
                        </h4>

                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-600">
                          <span>Size: <strong className="text-stone-900 font-semibold">{order.selectedSize}</strong></span>
                          <span>·</span>
                          <span>Duration: <strong className="text-stone-900 font-semibold">{order.rentalDuration} Days</strong></span>
                        </div>

                        <div className="mt-1 text-[11px] text-stone-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          <span>Rental: {order.startDate} → {order.endDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Customer Contact & Delivery Address (4 cols) */}
                    <div className="md:col-span-4 bg-stone-50 p-3 rounded-lg border border-stone-200/80 text-xs space-y-1">
                      <div className="font-semibold text-stone-900 flex items-center justify-between">
                        <span>{order.deliveryAddress.fullName}</span>
                        <span className="text-[10px] font-normal text-stone-500 bg-white px-1.5 py-0.5 rounded border border-stone-200">
                          {order.deliveryAddress.type || 'Home'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-600 text-[11px]">
                        <Phone className="w-3 h-3 text-stone-400 shrink-0" />
                        <span>{order.deliveryAddress.phone}</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-stone-600 text-[11px]">
                        <MapPin className="w-3 h-3 text-stone-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">
                          {order.deliveryAddress.street}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
                        </span>
                      </div>
                    </div>

                    {/* Right: Payment & Security Deposit Status (3 cols) */}
                    <div className="md:col-span-3 bg-stone-50 p-3 rounded-lg border border-stone-200/80 text-xs flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-medium text-stone-500 block uppercase tracking-wide">
                          Financial Settlement
                        </span>
                        <div className="flex items-baseline justify-between mt-1">
                          <span className="text-stone-600 text-[11px]">Total Paid:</span>
                          <span className="font-bold text-stone-900 font-sans text-sm">
                            ₹{order.totalPaid.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between mt-0.5">
                          <span className="text-stone-600 text-[11px]">Security Deposit:</span>
                          <span className="font-medium text-stone-900">
                            ₹{order.securityDeposit.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 pt-1.5 border-t border-stone-200 text-[11px]">
                        {order.depositStatus === 'refunded' ? (
                          <span className="text-emerald-800 font-medium flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span>100% Refunded to UPI</span>
                          </span>
                        ) : (
                          <span className="text-amber-800 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>Deposit Held in Escrow</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredRentals.length === 0 && (
              <div className="py-16 text-center bg-white rounded-xl border border-dashed border-stone-200">
                <Users className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-stone-800">No customer rentals match criteria</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Try clearing your search keyword or switching between the status tabs above.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 2: MANAGE DRESSES & CATALOG (ADD & REMOVE) ================= */}
      {activeTab === 'dresses' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={dressSearch}
                onChange={(e) => setDressSearch(e.target.value)}
                placeholder="Search dresses by name, designer brand, category..."
                className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-9 pr-4 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Gender Filter */}
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200">
                {(['all', 'women', 'men', 'kids'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setDressGenderFilter(g)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors cursor-pointer ${
                      dressGenderFilter === g
                        ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              {/* Category Filter */}
              <select
                value={dressCategoryFilter}
                onChange={(e) => setDressCategoryFilter(e.target.value)}
                className="bg-white border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-stone-700 font-medium focus:outline-none focus:border-stone-900 cursor-pointer"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* Add Dress Action Button */}
              <button
                onClick={() => setShowAddDressModal(true)}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Dress to Catalog</span>
              </button>
            </div>
          </div>

          {/* Dress Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDresses.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image & Badges */}
                  <div className="relative aspect-[3/4] w-full bg-stone-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.endsWith('/assets/fallback-dress.svg')) {
                          target.src = '/assets/fallback-dress.svg';
                        }
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-stone-900 text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                      {product.targetGender}
                    </div>

                    <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-xs text-stone-900 text-[10px] font-medium px-2 py-0.5 rounded shadow-xs">
                      {product.category}
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="p-3.5 space-y-1">
                    <span className="text-[10px] font-medium text-stone-500 uppercase tracking-wider block">
                      {product.brand}
                    </span>
                    <h3 className="text-xs font-semibold text-stone-900 line-clamp-1" title={product.name}>
                      {product.name}
                    </h3>

                    {/* Pricing */}
                    <div className="pt-1.5 flex items-baseline justify-between border-t border-stone-100">
                      <div>
                        <span className="text-sm font-bold text-stone-900 font-sans">
                          ₹{product.rentalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-stone-400 line-through ml-1.5">
                          ₹{product.retailPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-500">
                        Dep: ₹{product.securityDeposit}
                      </span>
                    </div>

                    {/* Available Sizes */}
                    <div className="pt-1 text-[11px] text-stone-600 flex items-center justify-between">
                      <span>Sizes: {product.sizes.join(', ')}</span>
                      <span className="text-[10px] text-stone-400">{product.rentedCount}+ rents</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Strip: Remove Button */}
                <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-stone-400 truncate max-w-[120px]">
                    {product.id}
                  </span>

                  <button
                    onClick={() => setDeleteConfirmationProduct(product)}
                    className="px-2.5 py-1 text-xs font-medium text-rose-700 hover:text-rose-900 hover:bg-rose-50 border border-rose-200 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                    title="Remove this dress from rental catalog"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredDresses.length === 0 && (
            <div className="py-16 text-center bg-white rounded-xl border border-dashed border-stone-200">
              <Shirt className="w-10 h-10 text-stone-300 mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-stone-800">No dresses match filters</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Try resetting your search query or gender filter.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 3: REGISTERED BOUTIQUES ================= */}
      {activeTab === 'vendors' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-serif font-bold text-stone-900">
                  Registered Boutique Partners & Vendors
                </h2>
                <p className="text-xs text-stone-500">
                  Boutique partners supplying wedding couture, festive lehengas & kids costumes across Nashik
                </p>
              </div>
              <span className="text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md">
                All 4 Boutiques Compliant
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-400 font-medium uppercase tracking-wider">
                    <th className="pb-3">Boutique Name</th>
                    <th className="pb-3">Owner Contact</th>
                    <th className="pb-3">City Hub</th>
                    <th className="pb-3">Outfits</th>
                    <th className="pb-3">Gross Rentals</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {vendorList.map((v) => (
                    <tr key={v.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3.5 font-semibold text-stone-900">{v.name}</td>
                      <td className="py-3.5 text-stone-600">{v.owner}</td>
                      <td className="py-3.5 text-stone-600">{v.city}</td>
                      <td className="py-3.5 text-stone-900 font-medium">{v.items}</td>
                      <td className="py-3.5 font-bold text-stone-900 font-sans">{v.grossRentals}</td>
                      <td className="py-3.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <CheckCircle className="w-3 h-3 text-emerald-600" /> {v.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD NEW DRESS / COSTUME ================= */}
      {showAddDressModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto no-scrollbar shadow-2xl border border-stone-200 p-5 sm:p-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Add Dress or Costume to Catalog
                </h3>
                <p className="text-xs text-stone-500">
                  Publish a new rental outfit with pricing, deposit, and delivery specifications
                </p>
              </div>
              <button
                onClick={() => setShowAddDressModal(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Inspiration Presets */}
            <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[11px] font-medium text-stone-700 block mb-2">
                ⚡ Quick Preset Ideas (Click to auto-populate):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {imagePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setNewDress((prev) => ({
                        ...prev,
                        name: preset.name,
                        image: preset.url,
                        category: preset.category,
                        targetGender: preset.gender,
                        rentalPrice: preset.price,
                        retailPrice: preset.price * 8,
                        securityDeposit: Math.round(preset.price * 0.6),
                      }));
                    }}
                    className="px-2.5 py-1 text-[11px] font-medium bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 rounded-md transition-colors cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleAddDressSubmit} className="mt-4 space-y-4 text-xs">
              {/* Name & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Outfit Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newDress.name}
                    onChange={(e) => setNewDress({ ...newDress, name: e.target.value })}
                    placeholder="e.g. Royal Maratha Chhatrapati Shivaji Maharaj Costume"
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Designer Brand / Boutique
                  </label>
                  <input
                    type="text"
                    value={newDress.brand}
                    onChange={(e) => setNewDress({ ...newDress, brand: e.target.value })}
                    placeholder="e.g. Sabyasachi, Manyavar, Heritage Vault"
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900 font-medium"
                  />
                </div>
              </div>

              {/* Target Gender & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Target Gender / Audience
                  </label>
                  <select
                    value={newDress.targetGender}
                    onChange={(e) => setNewDress({ ...newDress, targetGender: e.target.value as any })}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900 font-medium cursor-pointer"
                  >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kids">Kids</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Collection / Category
                  </label>
                  <select
                    value={newDress.category}
                    onChange={(e) => setNewDress({ ...newDress, category: e.target.value as CategoryId })}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900 font-medium cursor-pointer"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing & Deposit */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Rental Fee (₹) <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={newDress.rentalPrice}
                    onChange={(e) => setNewDress({ ...newDress, rentalPrice: Number(e.target.value) })}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Retail Value (₹)
                  </label>
                  <input
                    type="number"
                    value={newDress.retailPrice}
                    onChange={(e) => setNewDress({ ...newDress, retailPrice: Number(e.target.value) })}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Security Deposit (₹)
                  </label>
                  <input
                    type="number"
                    value={newDress.securityDeposit}
                    onChange={(e) => setNewDress({ ...newDress, securityDeposit: Number(e.target.value) })}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900 font-semibold"
                  />
                </div>
              </div>

              {/* Image URL & Live Preview */}
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  High-Resolution Photo URL <span className="text-rose-600">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={newDress.image}
                    onChange={(e) => setNewDress({ ...newDress, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-white border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900 font-mono text-xs"
                  />
                  {newDress.image && (
                    <img
                      src={newDress.image}
                      alt="Preview"
                      className="w-10 h-10 object-cover rounded-md border border-stone-300 shrink-0"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.endsWith('/assets/fallback-dress.svg')) {
                          target.src = '/assets/fallback-dress.svg';
                        }
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Sizes Available */}
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size', 'Kids 4-6Y', 'Kids 7-9Y', 'Kids 10-12Y'] as const).map((sz) => {
                    const isSelected = newDress.sizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setNewDress({ ...newDress, sizes: newDress.sizes.filter((s) => s !== sz) });
                          } else {
                            setNewDress({ ...newDress, sizes: [...newDress.sizes, sz] });
                          }
                        }}
                        className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                            : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fabric & Package Includes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Fabric & Material
                  </label>
                  <input
                    type="text"
                    value={newDress.fabric}
                    onChange={(e) => setNewDress({ ...newDress, fabric: e.target.value })}
                    placeholder="e.g. Pure Silk, Velvet, Organza"
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Package Includes
                  </label>
                  <input
                    type="text"
                    value={newDress.includes}
                    onChange={(e) => setNewDress({ ...newDress, includes: e.target.value })}
                    placeholder="e.g. Costume + Sword + Mukut + Dupatta"
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900 font-medium"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newDress.description}
                  onChange={(e) => setNewDress({ ...newDress, description: e.target.value })}
                  placeholder="Describe the silhouette, embroidery, occasion suitability..."
                  className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-stone-900 font-medium"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddDressModal(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium shadow-xs transition-colors cursor-pointer"
                >
                  Publish Dress to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: DELETE CONFIRMATION ================= */}
      {deleteConfirmationProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2 rounded-xl bg-rose-50 border border-rose-200">
                <AlertCircle className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Remove Dress from Catalog?
                </h3>
                <span className="text-xs text-stone-500">This action cannot be undone.</span>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3">
              <img
                src={deleteConfirmationProduct.image}
                alt={deleteConfirmationProduct.name}
                className="w-12 h-14 object-cover rounded-md border border-stone-200 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-medium text-stone-500 uppercase block">
                  {deleteConfirmationProduct.brand}
                </span>
                <h4 className="text-xs font-semibold text-stone-900 truncate">
                  {deleteConfirmationProduct.name}
                </h4>
                <span className="text-[11px] font-bold text-stone-900 mt-0.5 block font-sans">
                  ₹{deleteConfirmationProduct.rentalPrice}/rental
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Removing this item will take it off the live customer storefront and disable new rental bookings for it.
            </p>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteConfirmationProduct(null)}
                className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                Keep in Catalog
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteProduct(deleteConfirmationProduct.id);
                  setDeleteConfirmationProduct(null);
                }}
                className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-medium shadow-xs transition-colors cursor-pointer"
              >
                Confirm & Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: ORDER DOSSIER & CUSTOMER DETAILS ================= */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl border border-stone-200 p-5 sm:p-6 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-stone-500">
                  Rental Booking Dossier
                </span>
                <h3 className="text-base font-serif font-bold text-stone-900 font-mono">
                  {selectedOrderDetails.bookingId}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status indicator */}
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-medium">Current Status</span>
                <span className="font-semibold text-stone-900 mt-0.5 block">{selectedOrderDetails.statusLabel}</span>
              </div>
              {renderStatusBadge(selectedOrderDetails.status)}
            </div>

            {/* Customer Details Section */}
            <div className="space-y-2 text-xs">
              <h4 className="font-medium uppercase tracking-wider text-stone-500 text-[11px]">
                Customer Information
              </h4>
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">Full Name:</span>
                  <strong className="text-stone-900 font-medium">{selectedOrderDetails.deliveryAddress.fullName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Phone Number:</span>
                  <span className="font-mono text-stone-900 font-medium">{selectedOrderDetails.deliveryAddress.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Destination:</span>
                  <span className="text-stone-900 text-right max-w-xs">{selectedOrderDetails.nashikLocality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Street Address:</span>
                  <span className="text-stone-900 text-right max-w-xs">{selectedOrderDetails.deliveryAddress.street}</span>
                </div>
              </div>
            </div>

            {/* Garment Details Section */}
            <div className="space-y-2 text-xs">
              <h4 className="font-medium uppercase tracking-wider text-stone-500 text-[11px]">
                Rented Garment
              </h4>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3">
                <img
                  src={selectedOrderDetails.product.image}
                  alt={selectedOrderDetails.product.name}
                  className="w-14 h-16 object-cover rounded-md border border-stone-200 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-medium text-stone-500 uppercase block">
                    {selectedOrderDetails.product.brand} · {selectedOrderDetails.product.targetGender}
                  </span>
                  <h5 className="font-semibold text-stone-900 truncate">
                    {selectedOrderDetails.product.name}
                  </h5>
                  <div className="flex items-center gap-3 text-stone-600 mt-1">
                    <span>Size: {selectedOrderDetails.selectedSize}</span>
                    <span>Duration: {selectedOrderDetails.rentalDuration} Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Financials & Escrow */}
            <div className="space-y-2 text-xs">
              <h4 className="font-medium uppercase tracking-wider text-stone-500 text-[11px]">
                Billing & Security Deposit Escrow
              </h4>
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1.5">
                <div className="flex justify-between text-stone-600">
                  <span>Rental Charge:</span>
                  <span>₹{selectedOrderDetails.rentalFee}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Refundable Security Deposit:</span>
                  <span>₹{selectedOrderDetails.securityDeposit}</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 pt-1 border-t border-stone-200">
                  <span>Total Paid:</span>
                  <span className="font-sans">₹{selectedOrderDetails.totalPaid}</span>
                </div>
                <div className="flex justify-between text-[11px] pt-1">
                  <span className="text-stone-500">Deposit Status:</span>
                  <span className={selectedOrderDetails.depositStatus === 'refunded' ? 'text-emerald-700 font-semibold' : 'text-amber-800 font-semibold'}>
                    {selectedOrderDetails.depositStatus === 'refunded' ? '✓ 100% Refunded' : '⏱ Held in Escrow'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex items-center justify-between">
              {selectedOrderDetails.status !== 'completed' && (
                <button
                  onClick={() => {
                    onUpdateOrderStatus(selectedOrderDetails.id, 'completed', 'refunded');
                    setSelectedOrderDetails({
                      ...selectedOrderDetails,
                      status: 'completed',
                      statusLabel: 'Completed · 100% Deposit Refunded',
                      depositStatus: 'refunded',
                    });
                  }}
                  className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Check className="w-4 h-4" />
                  <span>Mark Returned & Refund Deposit</span>
                </button>
              )}

              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="ml-auto px-4 py-2 bg-stone-900 text-white hover:bg-stone-800 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
