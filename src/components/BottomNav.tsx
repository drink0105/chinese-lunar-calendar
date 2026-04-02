import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Home, RefreshCw, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BottomNav = () => {
  const { t } = useTranslation();

  const navItems = [
    { to: '/', icon: Home, label: t('nav.today') },
    { to: '/calendar', icon: Calendar, label: t('nav.calendar') },
    { to: '/converter', icon: RefreshCw, label: t('nav.converter') },
    { to: '/lucky', icon: Star, label: t('nav.lucky') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 pb-safe z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full transition-colors ${
              isActive ? 'text-[#C0392B]' : 'text-gray-500'
            }`
          }
        >
          <item.icon size={20} />
          <span className="text-[10px] mt-1 font-medium">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;