import React from 'react';
import { NavLink } from 'react-router-dom';
import { Package, MapPin, MessageCircle, LogIn, Home } from 'lucide-react';

const BottomNavigation = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/packages', label: 'Package', icon: Package },
    { path: '/destinations', label: 'Destination', icon: MapPin },
    { path: '/contact', label: 'Contact', icon: MessageCircle },
    { path: '/auth/login', label: 'Login', icon: LogIn },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#0B0F19] border-t border-gray-800 text-gray-400 md:hidden pb-[env(safe-area-inset-bottom)] transform-gpu">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`
              }
            >
              <IconComponent className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;