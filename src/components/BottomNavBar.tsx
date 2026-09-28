import React from 'react';
import { Home, Grid3X3, Package, Heart, User } from 'lucide-react';
import { ActiveTab } from '../types/rental';

interface BottomNavBarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  wishlistCount: number;
  activeOrdersCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onSelectTab,
  wishlistCount,
  activeOrdersCount,
}) => {
  const tabs = [
    {
      id: 'home' as ActiveTab,
      label: 'Home',
      icon: Home,
    },
    {
      id: 'categories' as ActiveTab,
      label: 'Categories',
      icon: Grid3X3,
    },
    {
      id: 'orders' as ActiveTab,
      label: 'Orders',
      icon: Package,
      badge: activeOrdersCount > 0 ? activeOrdersCount : undefined,
    },
    {
      id: 'wishlist' as ActiveTab,
      label: 'Wishlist',
      icon: Heart,
      badge: wishlistCount > 0 ? wishlistCount : undefined,
    },
    {
      id: 'profile' as ActiveTab,
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-neutral-200/80 px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className="flex flex-col items-center justify-center py-1 relative group focus:outline-none transition-transform active:scale-90"
              aria-label={tab.label}
            >
              {/* Icon Container with Badge */}
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-all duration-200 ${
                    isActive
                      ? 'text-rose-600 stroke-[2.4] scale-110'
                      : 'text-neutral-500 group-hover:text-neutral-800 stroke-[1.8]'
                  }`}
                />

                {/* Badge indicator */}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[15px] h-[15px] px-0.5 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] mt-1 tracking-tight font-medium transition-colors ${
                  isActive
                    ? 'text-rose-600 font-bold'
                    : 'text-neutral-500 group-hover:text-neutral-800'
                }`}
              >
                {tab.label}
              </span>

              {/* Active Dot */}
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-rose-600 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
