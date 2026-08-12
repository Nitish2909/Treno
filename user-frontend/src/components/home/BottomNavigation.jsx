import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Package, MapPin, MessageCircle, LogIn, Home } from 'lucide-react';

const BottomNavigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide when scrolling down past 50px, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/packages', label: 'Package', icon: Package },
    { path: '/destinations', label: 'Destination', icon: MapPin },
    { path: '/contact', label: 'Contact', icon: MessageCircle },
    { path: '/auth/login', label: 'Login', icon: LogIn },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-[9999] bg-[#0B0F19] border-t border-gray-800 text-gray-400 md:hidden pb-[env(safe-area-inset-bottom)] transform-gpu transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
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