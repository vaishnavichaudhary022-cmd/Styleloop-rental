export type Role = 'customer' | 'shop_owner' | 'admin';

export type TargetGender = 'women' | 'men' | 'kids' | 'all';

export type CategoryId =
  | 'all'
  | 'party'
  | 'wedding'
  | 'festive'
  | 'formal'
  | 'navratri'
  | 'diwali'
  | 'eid'
  | 'christmas'
  | 'haldi'
  | 'fancydress';

export interface Category {
  id: CategoryId;
  name: string;
  image: string;
  itemCount: number;
  highlightColor?: string;
  badge?: string;
  description?: string;
  festivalType?: boolean;
}

export type RentalDuration = 3 | 4 | 7 | 10;

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  type: 'Home' | 'Work' | 'Event Venue';
  isDefault?: boolean;
  deliveryInstructions?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  gender?: 'women' | 'men' | 'kids' | 'unisex';
  age?: number;
  phone?: string;
  shopName?: string;
  shopCity?: string;
  verified?: boolean;
  addresses: Address[];
  currentAddressId?: string;
}

export interface DressProduct {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  targetGender: 'women' | 'men' | 'kids';
  rentalPrice: number; // for default duration (4 days)
  retailPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  rentedCount: number;
  image: string;
  secondaryImage?: string;
  sizes: string[];
  color: string;
  tag: string;
  description: string;
  fabric: string;
  securityDeposit: number;
  festival?: string;
  featured?: boolean;
  shopOwnerName?: string;
}

export interface CartItem {
  product: DressProduct;
  selectedSize: string;
  rentalDuration: RentalDuration;
  startDate: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface NashikLocality {
  id: string;
  name: string;
  pincode: string;
  hub: string;
  deliveryTime: string;
  popularLandmarks: string[];
}

export type RentalOrderStatus =
  | 'booked'
  | 'dry_cleaned'
  | 'dispatched'
  | 'out_for_delivery'
  | 'with_customer'
  | 'pickup_scheduled'
  | 'returned_inspected'
  | 'completed'
  | 'cancelled';

export interface RentalOrderTimelineStep {
  title: string;
  desc: string;
  date: string;
  time?: string;
  done: boolean;
  current?: boolean;
}

export interface RentalOrder {
  id: string;
  bookingId: string;
  product: DressProduct;
  selectedSize: string;
  backupSize?: string;
  rentalDuration: RentalDuration;
  startDate: string;
  endDate: string;
  bookingDate: string;
  estimatedDeliveryDate?: string;
  estimatedDeliveryTime?: string;
  deliveryAddress: Address;
  nashikLocality: string;
  rentalFee: number;
  securityDeposit: number;
  deliveryFee: number;
  discountApplied: number;
  totalPaid: number;
  depositStatus: 'held' | 'refund_initiated' | 'refunded' | 'adjusted';
  depositRefundUpi?: string;
  depositRefundTxn?: string;
  refundDate?: string;
  status: RentalOrderStatus;
  statusLabel: string;
  currentStep: number;
  steps: RentalOrderTimelineStep[];
  courierName: string;
  courierTrackingNo: string;
  courierContact?: string;
  riderName?: string;
  occasion?: string;
  canExtend?: boolean;
  canCancel?: boolean;
  canReview?: boolean;
  invoiceNumber: string;
}

export type ActiveTab = 'home' | 'categories' | 'orders' | 'wishlist' | 'profile' | 'shop_portal' | 'admin_portal';

