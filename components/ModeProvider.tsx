"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useModeStore } from '@/store/modeStore';
import { modeConfigs } from '@/config/modeConfig';

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const { mode, setMode } = useModeStore();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // 17.3 URL-based mode switching
  useEffect(() => {
    if (!pathname || !mounted) return;
    
    if (pathname.startsWith('/wedding') && mode !== 'wedding') {
      setMode('wedding');
    } else if ((pathname.startsWith('/rooms') || pathname.startsWith('/bookings')) && mode !== 'hotel') {
      setMode('hotel');
    }
  }, [pathname, mode, setMode, mounted]);

  useEffect(() => {
    if (!mounted) return;

    // Set data attribute on body for CSS selectors
    document.body.setAttribute('data-mode', mode);
    
    // Set CSS variables based on current mode configuration
    const config = modeConfigs[mode];
    const root = document.documentElement;
    
    root.style.setProperty('--primary-color', config.colors.primary);
    root.style.setProperty('--secondary-color', config.colors.secondary);
    root.style.setProperty('--background-color', config.colors.background);
    
  }, [mode, mounted]);

  // Optionally avoid rendering children until mounted if strict consistency is needed,
  // but to avoid layout shift, we can just render it.

  return <>{children}</>;
}
