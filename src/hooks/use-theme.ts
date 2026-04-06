import { useState, useEffect } from 'react';

export type ThemeType = 'classic' | 'spring' | 'dragonboat' | 'midautumn' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('lunar-theme') as ThemeType) || 'classic';
    }
    return 'classic';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    // Remove all possible theme classes/attributes
    root.removeAttribute('data-theme');
    root.classList.remove('dark');
    
    // Apply new theme
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
    }
    
    localStorage.setItem('lunar-theme', theme);
  }, [theme]);

  return { theme, setTheme };
}