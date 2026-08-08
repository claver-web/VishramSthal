"use client";

import { useModeStore } from '@/store/modeStore';
import { Bed, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ModeSwitcher() {
  const { mode, setMode } = useModeStore();
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const handleToggle = (newMode: 'hotel' | 'wedding') => {
    if (mode === newMode || isAnimating) return;
    
    setIsAnimating(true);
    
    // After overlay fades in, switch mode
    setTimeout(() => {
      setMode(newMode);
      // Optional: push to the mode's root to avoid 404s if staying on a mode-specific page
      if (newMode === 'wedding') {
        router.push('/wedding');
      } else {
        router.push('/');
      }
    }, 250);
    
    // Remove overlay
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  return (
    <>
      <div className="relative inline-flex items-center bg-black/40 backdrop-blur-sm rounded-full p-1 border border-white/10 overflow-hidden">
        <div 
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300"
          style={{ 
            left: mode === 'hotel' ? '4px' : 'calc(50%)',
            backgroundColor: mode === 'hotel' ? '#f97316' : '#e11d48' // orange-500 : rose-600
          }} 
        />
        
        <button
          onClick={() => handleToggle('hotel')}
          className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
            mode === 'hotel' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Bed size={14} />
          <span className="hidden sm:inline">Hotel</span>
        </button>
        
        <button
          onClick={() => handleToggle('wedding')}
          className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
            mode === 'wedding' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Heart size={14} />
          <span className="hidden sm:inline">Wedding</span>
        </button>
      </div>

      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] pointer-events-none"
            style={{ 
              backgroundColor: mode === 'hotel' ? '#e11d48' : '#f97316' // Target mode color
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
