/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { TopNavBar } from './components/TopNavBar';
import { PromoBanner } from './components/PromoBanner';
import { CategoryRow } from './components/CategoryRow';
import { TrendingRentalsGrid } from './components/TrendingRentalsGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CartDrawer } from './components/CartDrawer';
import { AddressModal } from './components/AddressModal';
import { AuthModal } from './components/AuthModal';
import { ShopOwnerPortal } from './components/ShopOwnerPortal';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';
import { LoginPage } from './components/LoginPage';
import { RentalHistoryModal } from './components/RentalHistoryModal';
import { JavaBackendModal } from './components/JavaBackendModal';
import { OrdersView } from './components/OrdersView';
import { CategoriesView } from './components/CategoriesView';
import { ProfileView } from './components/ProfileView';
import { BottomNavBar } from './components/BottomNavBar';
import { DeliveryConfirmationModal } from './components/DeliveryConfirmationModal';

import { DRESS_PRODUCTS, DEMO_USERS, INITIAL_ADDRESSES, SAMPLE_RENTAL_ORDERS } from './data/rentalData';
import { CategoryId, DressProduct, CartItem, TargetGender, User, Address, RentalDuration, Role, RentalOrder, ActiveTab } from './types/rental';
import { Check, Sparkles, Heart, Store, Shield, User as UserIcon, LogOut, Package } from 'lucide-react';

export default function App() {
  // Authentication & Role state
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS.customer);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activePortal, setActivePortal] = useState<'customer' | 'shop' | 'admin'>('customer');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authInitialRole, setAuthInitialRole] = useState<Role>('customer');

  // Address state
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [currentAddressId, setCurrentAddressId] = useState<string>('addr-1');
  const [addressModalOpen, setAddressModalOpen] = useState<boolean>(false);

  // Customer Rental Orders & History state
  const [rentalOrders, setRentalOrders] = useState<RentalOrder[]>(SAMPLE_RENTAL_ORDERS);
  const [rentalHistoryOpen, setRentalHistoryOpen] = useState<boolean>(false);
  const [confirmedDeliveryOrder, setConfirmedDeliveryOrder] = useState<RentalOrder | null>(null);
  const [deliveryConfirmationOpen, setDeliveryConfirmationOpen] = useState<boolean>(false);
  const [javaBackendOpen, setJavaBackendOpen] = useState<boolean>(false);

  // Products state (can be added to by Shop Owners)
  const [productsList, setProductsList] = useState<DressProduct[]>(DRESS_PRODUCTS);

  // Filter & Navigation state
  const [selectedGender, setSelectedGender] = useState<TargetGender>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [sortOption, setSortOption] = useState<string>('popularity');
  const [filterUnder1500, setFilterUnder1500] = useState<boolean>(false);
  const [filterFestivalOnly, setFilterFestivalOnly] = useState<boolean>(false);

  // Modals and Drawers
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DressProduct | null>(null);

  // Wishlist & Cart state with realistic seed data
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(
    new Set(['prod-w1', 'prod-w4', 'prod-m1'])
  );

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: DRESS_PRODUCTS[3], // Navratri chaniya choli
      selectedSize: 'M',
      rentalDuration: 4,
      startDate: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString().split('T')[0],
      quantity: 1,
    },
  ]);

  // Toast notification system
  const [toast, setToast] = useState<{ message: string; icon?: 'check' | 'heart' | 'sparkles' } | null>(null);

  const showToast = (message: string, icon: 'check' | 'heart' | 'sparkles' = 'check') => {
    setToast({ message, icon });
    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  // Get current active address object
  const currentAddress = useMemo(() => {
    return addresses.find((a) => a.id === currentAddressId) || addresses[0];
  }, [addresses, currentAddressId]);

  // Handle address addition
  const handleAddAddress = (newAddr: Omit<Address, 'id'>) => {
    const created: Address = {
      ...newAddr,
      id: `addr-${Date.now()}`,
    };
    setAddresses((prev) => [created, ...prev]);
    setCurrentAddressId(created.id);
    showToast(`Delivery location set to ${created.city} (${created.pincode})`, 'check');
  };

  // Handle Wishlist toggle
  const handleToggleWishlist = (product: DressProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Removed "${product.name.slice(0, 24)}..." from Wishlist`);
      } else {
        next.add(product.id);
        showToast(`Saved to Wishlist! Tap ❤️ to view`, 'heart');
      }
      return next;
    });
  };

  // Handle Add to Cart
  const handleAddToCart = (
    product: DressProduct,
    size: string,
    duration: RentalDuration,
    startDate: string
  ) => {
    setCartItems((prev) => [
      ...prev,
      {
        product,
        selectedSize: size,
        rentalDuration: duration,
        startDate,
        quantity: 1,
      },
    ]);
    showToast(`Added ${product.name.slice(0, 22)}... to Rental Bag!`, 'sparkles');
  };

  // Remove from cart
  const handleRemoveFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removed from Rental Bag');
  };

  // Filtered & Sorted products
  const displayedProducts = useMemo(() => {
    let list = [...productsList];

    // Filter by Gender
    if (selectedGender !== 'all') {
      list = list.filter((p) => p.targetGender === selectedGender);
    }

    // Filter by Category (Occasion / Festival)
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by Price Under ₹1500
    if (filterUnder1500) {
      list = list.filter((p) => p.rentalPrice <= 1500);
    }

    // Filter by Festival & Fancy Only
    if (filterFestivalOnly) {
      list = list.filter(
        (p) =>
          p.festival ||
          p.category === 'navratri' ||
          p.category === 'diwali' ||
          p.category === 'eid' ||
          p.category === 'haldi' ||
          p.category === 'fancydress'
      );
    }

    // Sort
    if (sortOption === 'price-asc') {
      list.sort((a, b) => a.rentalPrice - b.rentalPrice);
    } else if (sortOption === 'price-desc') {
      list.sort((a, b) => b.rentalPrice - a.rentalPrice);
    } else if (sortOption === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'discount') {
      list.sort((a, b) => b.discountPercentage - a.discountPercentage);
    } else {
      // Popularity (rentedCount)
      list.sort((a, b) => b.rentedCount - a.rentedCount);
    }

    return list;
  }, [productsList, selectedGender, selectedCategory, filterUnder1500, filterFestivalOnly, sortOption]);

  const wishlistProducts = useMemo(() => {
    return productsList.filter((p) => wishlistIds.has(p.id));
  }, [productsList, wishlistIds]);

  // Handle Login Success
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    if (user.role === 'shop_owner') {
      setActivePortal('shop');
      showToast(`Logged in as Shop Owner (${user.shopName || user.name})`, 'check');
    } else if (user.role === 'admin') {
      setActivePortal('admin');
      showToast('Logged in to Admin Console', 'check');
    } else {
      setActivePortal('customer');
      if (user.gender) {
        setSelectedGender(user.gender === 'unisex' ? 'all' : user.gender);
      }
      if (user.addresses && user.addresses.length > 0) {
        setAddresses(user.addresses);
        setCurrentAddressId(user.currentAddressId || user.addresses[0].id);
      }
      showToast(`Welcome ${user.name}! Personalized for ${user.gender || 'you'}`, 'sparkles');
    }
  };

  // FIRST PAGE: Login Page if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-neutral-950 font-sans selection:bg-rose-500 selection:text-white">
        <LoginPage
          onLoginSuccess={(user) => {
            handleLoginSuccess(user);
          }}
          onExploreAsGuest={() => {
            setIsLoggedIn(true);
            setActivePortal('customer');
            showToast('Browsing collection as Guest. Sign in anytime to complete rentals.', 'sparkles');
          }}
        />
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 flex pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="bg-neutral-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-white/15 flex items-center gap-2.5 backdrop-blur-md max-w-md">
              {toast.icon === 'heart' && <Heart className="w-4 h-4 text-rose-400 fill-rose-400 shrink-0" />}
              {toast.icon === 'sparkles' && <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />}
              {toast.icon === 'check' && <Check className="w-4 h-4 text-emerald-400 stroke-[3] shrink-0" />}
              <span>{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Role Switcher Notification Bar */}
      <div className="bg-neutral-900 text-neutral-300 text-xs py-2 px-4 sm:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-semibold">Active Mode:</span>
            <span className="bg-neutral-800 px-2.5 py-0.5 rounded-md font-bold text-rose-400 capitalize">
              {activePortal === 'customer'
                ? 'Customer Storefront (Rent Dresses)'
                : activePortal === 'shop'
                ? 'Shop Owner / Boutique Portal'
                : 'Master Admin Console'}
            </span>
            <span className="hidden md:inline text-neutral-400">
              · Logged in as <strong className="text-white">{currentUser.name}</strong>
            </span>
          </div>

          {/* 1-Click Role Switcher Quick Links */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-neutral-400 hidden sm:inline">Switch Portal:</span>
            <button
              onClick={() => {
                setActivePortal('customer');
                showToast('Switched to Customer Storefront', 'sparkles');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                activePortal === 'customer'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              <UserIcon className="w-3 h-3" /> Customer
            </button>
            <button
              onClick={() => {
                setActivePortal('shop');
                showToast('Switched to Shop Owner Portal', 'check');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                activePortal === 'shop'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              <Store className="w-3 h-3" /> Shop Owner
            </button>
            <button
              onClick={() => {
                setActivePortal('admin');
                showToast('Switched to Admin Console', 'check');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                activePortal === 'admin'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              <Shield className="w-3 h-3" /> Admin
            </button>
            <button
              onClick={() => {
                setAuthInitialRole('customer');
                setAuthModalOpen(true);
              }}
              className="ml-1 text-rose-400 hover:text-rose-300 text-xs font-semibold underline underline-offset-2"
            >
              Change Account
            </button>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                showToast('Logged out to login page');
              }}
              className="ml-2 px-2 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition"
              title="Return to Login Page"
            >
              <LogOut className="w-3 h-3 text-rose-400" /> Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Website Header */}
      <TopNavBar
        currentUser={currentUser}
        currentAddress={currentAddress}
        selectedGender={selectedGender}
        onSelectGender={(gender) => {
          setSelectedGender(gender);
          setActivePortal('customer');
        }}
        wishlistCount={wishlistIds.size}
        cartCount={cartItems.length}
        activeRentalsCount={
          rentalOrders.filter(
            (o) =>
              o.status === 'out_for_delivery' ||
              o.status === 'with_customer' ||
              o.status === 'dispatched'
          ).length
        }
        onOpenSearch={() => setSearchOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenRentalHistory={() => {
          setActivePortal('customer');
          setActiveTab('orders');
          setRentalHistoryOpen(true);
        }}
        onOpenJavaBackend={() => setJavaBackendOpen(true)}
        onOpenAddressModal={() => setAddressModalOpen(true)}
        onOpenAuthModal={() => {
          setAuthInitialRole(currentUser.role);
          setAuthModalOpen(true);
        }}
        onLogoClick={() => {
          setActivePortal('customer');
          setActiveTab('home');
          setSelectedCategory('all');
          setSelectedGender('all');
        }}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActivePortal('customer');
          setActiveTab('home');
        }}
        onNavigatePortal={(p) => setActivePortal(p)}
        onLogout={() => {
          setIsLoggedIn(false);
          showToast('Logged out to login page');
        }}
      />

      {/* Main Body Content according to active portal and tabs */}
      <main className="flex-1 pb-16 md:pb-0">
        {activePortal === 'customer' && (
          <>
            {activeTab === 'home' && (
              <>
                {/* Bold Promotional Hero Banner */}
                <PromoBanner
                  onBannerClick={() => {
                    showToast('Coupon code RENT40 active! Flat 40% off applied.', 'sparkles');
                  }}
                  onCodeCopiedToast={(code) => {
                    showToast(`Coupon code ${code} copied to clipboard!`, 'check');
                  }}
                />

                {/* Circular Category Row: Party, Wedding, Festive, Formal, Navratri, Diwali, Haldi, Fancy Dress */}
                <CategoryRow
                  selectedCategory={selectedCategory}
                  onSelectCategory={(catId) => setSelectedCategory(catId)}
                />

                {/* Trending Rentals: Responsive Grid of Product Cards for Women, Men, Kids & Festivals */}
                <TrendingRentalsGrid
                  products={displayedProducts}
                  wishlistIds={wishlistIds}
                  onToggleWishlist={handleToggleWishlist}
                  onSelectProduct={(product) => setSelectedProduct(product)}
                  selectedCategory={selectedCategory}
                  selectedGender={selectedGender}
                  sortOption={sortOption}
                  onSortChange={setSortOption}
                  filterUnder1500={filterUnder1500}
                  onToggleFilterUnder1500={() => setFilterUnder1500((prev) => !prev)}
                  filterFestivalOnly={filterFestivalOnly}
                  onToggleFilterFestivalOnly={() => setFilterFestivalOnly((prev) => !prev)}
                />
              </>
            )}

            {activeTab === 'orders' && (
              <OrdersView
                orders={rentalOrders}
                onRentAgain={(p) => setSelectedProduct(p)}
                onTrackOrder={(ord) => {
                  setConfirmedDeliveryOrder(ord);
                  setDeliveryConfirmationOpen(true);
                }}
              />
            )}

            {activeTab === 'categories' && (
              <CategoriesView
                onSelectCategory={(catId) => {
                  setSelectedCategory(catId);
                  setActiveTab('home');
                }}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileView />
            )}
          </>
        )}

        {activePortal === 'shop' && (
          <ShopOwnerPortal
            user={currentUser}
            products={productsList}
            onAddNewProduct={(newProduct) => {
              setProductsList((prev) => [newProduct, ...prev]);
              showToast(`"${newProduct.name}" published to live rental catalog!`, 'sparkles');
            }}
            onSwitchToCustomerView={() => setActivePortal('customer')}
          />
        )}

        {activePortal === 'admin' && (
          <AdminPortal
            currentUser={currentUser}
            products={productsList}
            onSwitchToCustomerView={() => setActivePortal('customer')}
          />
        )}
      </main>

      {/* Website Footer */}
      <Footer
        onSelectGender={(g) => {
          setSelectedGender(g);
          setActivePortal('customer');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(c) => {
          setSelectedCategory(c);
          setActivePortal('customer');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPortal={(p) => setActivePortal(p)}
      />

      {/* Address Picker & Management Modal */}
      <AddressModal
        isOpen={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        addresses={addresses}
        currentAddressId={currentAddressId}
        onSelectAddress={(id) => {
          setCurrentAddressId(id);
          const sel = addresses.find((a) => a.id === id);
          if (sel) {
            showToast(`Delivery location set to ${sel.city} (${sel.pincode})`, 'check');
          }
        }}
        onAddAddress={handleAddAddress}
      />

      {/* Auth Modal (Admin, Shop Owner, Customer login + Gender & Age onboarding) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
        initialRole={authInitialRole}
      />

      {/* Product Detail / Rental Date Selector Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
        onToggleWishlist={(p) => handleToggleWishlist(p)}
        onAddToCart={handleAddToCart}
        onRentNow={(p, size, dur, start) => {
          handleAddToCart(p, size, dur, start);
          setCartOpen(true);
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={productsList}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={(id) => {
          setWishlistIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        }}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Cart Drawer with Address Selector at Booking Time */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        addresses={addresses}
        currentAddressId={currentAddressId}
        onSelectAddress={(id) => {
          setCurrentAddressId(id);
          const sel = addresses.find((a) => a.id === id);
          if (sel) {
            showToast(`Delivery location set to ${sel.city} (${sel.pincode})`, 'check');
          }
        }}
        onAddAddress={handleAddAddress}
        onViewRentalHistory={() => {
          setCartOpen(false);
          setActivePortal('customer');
          setActiveTab('orders');
          setRentalHistoryOpen(true);
        }}
        onCheckout={(deliveryAddress) => {
          // Keep CartDrawer open at currentStep === 'success' so the customer can view when it will be delivered
          if (cartItems.length > 0) {
            const firstItem = cartItems[0];
            const startDateStr = firstItem.startDate || new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString().split('T')[0];
            const eventDateObj = new Date(startDateStr);
            const deliveryDateObj = new Date(eventDateObj.getTime() - 1 * 24 * 3600 * 1000);
            const deliveryDateStr = deliveryDateObj.toISOString().split('T')[0];
            const endDateStr = new Date(eventDateObj.getTime() + firstItem.rentalDuration * 24 * 3600 * 1000).toISOString().split('T')[0];

            const formattedDeliveryText = deliveryDateObj.toLocaleDateString('en-IN', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            });

            const newOrder: RentalOrder = {
              id: `ord-nsk-${Date.now()}`,
              bookingId: `RVG-NSK-2024-${Math.floor(1000 + Math.random() * 9000)}`,
              product: firstItem.product,
              selectedSize: firstItem.selectedSize,
              backupSize: 'Free Backup Size Included',
              rentalDuration: firstItem.rentalDuration,
              startDate: startDateStr,
              endDate: endDateStr,
              bookingDate: new Date().toISOString().split('T')[0],
              estimatedDeliveryDate: deliveryDateStr,
              estimatedDeliveryTime: '1:30 PM',
              deliveryAddress: deliveryAddress,
              nashikLocality: `${deliveryAddress.apartment || deliveryAddress.street}, Nashik (${deliveryAddress.pincode})`,
              rentalFee: firstItem.product.rentalPrice,
              securityDeposit: firstItem.product.securityDeposit,
              deliveryFee: 0,
              discountApplied: Math.round(firstItem.product.rentalPrice * 0.40),
              totalPaid: Math.round(firstItem.product.rentalPrice * 0.60) + firstItem.product.securityDeposit,
              depositStatus: 'held',
              status: 'booked',
              statusLabel: 'Order Confirmed · Scheduled for Delivery',
              currentStep: 1,
              steps: [
                {
                  title: 'Order Confirmed in Nashik',
                  desc: 'Booking verified with Central Logistics Center.',
                  date: 'Today',
                  time: 'Just now',
                  done: true,
                },
                {
                  title: 'Steam Sanitization & Dry Cleaning',
                  desc: 'Medical-grade steam sterilization and inspection.',
                  date: 'Upcoming',
                  done: false,
                  current: true,
                },
                {
                  title: 'Out for Doorstep Fitting',
                  desc: `Dispatched to ${deliveryAddress.apartment || 'Nashik destination'}.`,
                  date: `${deliveryDateStr} by 1:30 PM`,
                  done: false,
                },
                {
                  title: 'Event Celebration Window',
                  desc: 'Wear and enjoy your celebration without worry.',
                  date: `${startDateStr} to ${endDateStr}`,
                  done: false,
                },
                {
                  title: 'Reverse Pickup & Deposit Refund',
                  desc: 'Doorstep return. 100% deposit refunded to UPI within 2 hrs.',
                  date: endDateStr,
                  done: false,
                },
              ],
              courierName: 'REVOGUE Nashik Express Courier',
              courierTrackingNo: `NSK-EXP-${Math.floor(10000 + Math.random() * 90000)}`,
              invoiceNumber: `INV-NSK-2024-${Math.floor(1000 + Math.random() * 9000)}`,
              canExtend: true,
            };

            setRentalOrders((prev) => [newOrder, ...prev]);
            setConfirmedDeliveryOrder(newOrder);
            setCartItems([]);
            showToast(`Rental booked! Arrives ${formattedDeliveryText} by 1:30 PM in Nashik 🚚`, 'sparkles');
          }
        }}
      />

      {/* Customer Rental History Modal (Shopping App style) */}
      <RentalHistoryModal
        isOpen={rentalHistoryOpen}
        onClose={() => setRentalHistoryOpen(false)}
        orders={rentalOrders}
        onExtendOrder={(orderId, days) => {
          setRentalOrders((prev) =>
            prev.map((o) =>
              o.id === orderId
                ? {
                    ...o,
                    rentalDuration: (o.rentalDuration + days) as any,
                    endDate: new Date(new Date(o.endDate).getTime() + days * 24 * 3600 * 1000).toISOString().split('T')[0],
                  }
                : o
            )
          );
          showToast(`Rental extended by +${days} days with updated return date!`, 'check');
        }}
        onRentAgain={(prod) => {
          setSelectedProduct(prod);
          setRentalHistoryOpen(false);
        }}
        onTrackDelivery={(order) => {
          setConfirmedDeliveryOrder(order);
          setDeliveryConfirmationOpen(true);
        }}
      />

      {/* Delivery Confirmation & Live Tracking Modal */}
      <DeliveryConfirmationModal
        order={confirmedDeliveryOrder}
        isOpen={deliveryConfirmationOpen}
        onClose={() => setDeliveryConfirmationOpen(false)}
        onViewAllRentals={() => {
          setDeliveryConfirmationOpen(false);
          setActivePortal('customer');
          setActiveTab('orders');
          setRentalHistoryOpen(true);
        }}
      />

      {/* Bottom Nav Bar for Mobile / Tablet Shopping */}
      {activePortal === 'customer' && (
        <div className="md:hidden">
          <BottomNavBar
            activeTab={activeTab}
            onSelectTab={(tab) => {
              if (tab === 'wishlist') {
                setWishlistOpen(true);
              } else {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            wishlistCount={wishlistIds.size}
            activeOrdersCount={
              rentalOrders.filter(
                (o) =>
                  o.status === 'out_for_delivery' ||
                  o.status === 'with_customer' ||
                  o.status === 'dispatched'
              ).length
            }
          />
        </div>
      )}

      {/* Java Spring Boot Backend Architecture & REST API Explorer */}
      <JavaBackendModal
        isOpen={javaBackendOpen}
        onClose={() => setJavaBackendOpen(false)}
      />

      {/* In-App Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-neutral-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-white/15 flex items-center gap-2.5 backdrop-blur-md max-w-md">
            {toast.icon === 'heart' && <Heart className="w-4 h-4 text-rose-400 fill-rose-400 shrink-0" />}
            {toast.icon === 'sparkles' && <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />}
            {toast.icon === 'check' && <Check className="w-4 h-4 text-emerald-400 stroke-[3] shrink-0" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
