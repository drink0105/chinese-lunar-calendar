import { useState, useEffect } from 'react';

export type ThemeType = 'classic' | 'spring' | 'dragonboat' | 'midautumn';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('lunar-theme') as ThemeType) || 'classic';
    }
    return 'classic';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lunar-dark-mode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Apply theme
    root.setAttribute('data-theme', theme);
    localStorage.setItem('lunar-theme', theme);

    // Apply dark mode
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('lunar-dark-mode', String(isDarkMode));
  }, [theme, isDarkMode]);

  return { 
    theme, 
    setTheme, 
    isDarkMode, 
    toggleDarkMode: () => setIsDarkMode(!isDarkMode) 
  };
}