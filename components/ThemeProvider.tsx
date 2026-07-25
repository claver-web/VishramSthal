'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export default function ThemeProvider() {
  const { isDarkMode } = useStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return null;
}
