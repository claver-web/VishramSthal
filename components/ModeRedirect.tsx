"use client";

import { useModeStore } from '@/store/modeStore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ModeRedirect() {
  const { mode } = useModeStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Redirect if on root and mode is wedding
    if (pathname === '/' && mode === 'wedding') {
      router.push('/wedding');
    }
  }, [mode, router, pathname, mounted]);

  // If we are redirecting, we might want to return a white screen or spinner,
  // but since we want it seamless, returning null is fine. 
  // It will just momentarily show hotel before redirecting.
  if (mounted && pathname === '/' && mode === 'wedding') {
    return (
      <div className="fixed inset-0 z-[100] bg-[#1a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return null;
}
