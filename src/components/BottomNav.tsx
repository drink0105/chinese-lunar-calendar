import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Home, RefreshCw, Star, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BottomNav = () => {
  const { t } = useTranslation();

  const navItems = [
    { to: '/', icon: Home, label: t('nav.today') },
    { to: '/calendar', icon: Calendar, label: t('nav.calendar') },
    { to: '/converter', icon: RefreshCw, label: t('nav.converter') },
    { to: '/lucky', icon: Star, label: t('nav.lucky') },
    { to: '/settings', icon: Settings, label: t('nav.settings', 'Settings') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-t border-white/20 dark:border-zinc-800/50 flex justify-around items-center h-16 pb-safe z-50 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${
              isActive 
                ? 'text-[#C0392B] dark:text-red-500 scale-110' 
                : 'text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300'
            }`
          }
        >
          <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
          <span className={`text-[10px] mt-1 font-bold tracking-tight ${isActive ? 'opacity-100' : 'opacity-70'}`}>
            {item.label}
          </span>
          {/* Active Indicator Glow */}
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              `absolute bottom-1 w-1 h-1 rounded-full bg-[#C0392B] dark:bg-red-500 transition-all duration-300 ${
                isActive ? 'opacity-100 shadow-[0_0_8px] shadow-red-500' : 'opacity-0'
              }`
            }
          />
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;