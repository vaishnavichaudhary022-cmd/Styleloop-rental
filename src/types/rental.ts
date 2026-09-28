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

export type ActiveTab = 'home' | 'categories' | 'orders' | 'wishlist' | 'profile' | 'shop_portal' | 'admin_portal';
