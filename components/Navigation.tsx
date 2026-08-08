'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { UserButton, SignInButton, useUser } from '@clerk/nextjs';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useModeStore } from '@/store/modeStore';
import { modeConfigs } from '@/config/modeConfig';
import ModeSwitcher from './ModeSwitcher';
import { Heart } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { mode } = useModeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (latest > 300 && latest > previous && !isMobileMenuOpen) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  if (pathname?.startsWith('/admin')) return null;

  // Render a minimal invisible nav while mounting to prevent hydration mismatch layout shifts
  if (!mounted) {
    return <div className="fixed top-0 left-0 w-full h-20 bg-transparent z-50 pointer-events-none" />;
  }

  const config = modeConfigs[mode];
  const isHotel = mode === 'hotel';

  const hotelLinks = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];
  
  const weddingLinks = [
    { name: 'Home', href: '/wedding' },
    { name: 'Venues', href: '/wedding/venues' },
    { name: 'Services', href: '/wedding/services' },
    { name: 'Gallery', href: '/wedding/gallery' },
    { name: 'Contact', href: '/wedding/contact' },
  ];

  const activeNavLinks = isHotel ? [...hotelLinks] : [...weddingLinks];
  
  if (isSignedIn) {
    activeNavLinks.push({ name: 'My Bookings', href: '/bookings' });
  }

  const textPrimary = isHotel ? 'text-orange-500' : 'text-rose-600';
  const textActive = isHotel ? 'text-orange-400' : 'text-rose-400';
  const hoverText = isHotel ? 'hover:text-orange-400' : 'hover:text-rose-400';
  const bgPrimary = isHotel ? 'bg-orange-500' : 'bg-rose-600';
  const hoverBg = isHotel ? 'hover:bg-orange-500' : 'hover:bg-rose-600';
  const fromGradient = isHotel ? 'from-orange-400' : 'from-rose-500';
  const toGradient = isHotel ? 'to-orange-500' : 'to-rose-600';
  const borderPrimary = isHotel ? 'border-orange-500/50' : 'border-rose-500/50';
  const borderNav = isHotel ? 'border-orange-500/20' : 'border-rose-500/20';
  const shadowHoverBtn = isHotel ? 'hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'hover:shadow-[0_0_15px_rgba(225,29,72,0.3)]';
  const shadowLogo = isHotel ? 'rgba(249,115,22,0.6)' : 'rgba(225,29,72,0.6)';
  const shadowLogoDim = isHotel ? 'rgba(249,115,22,0.2)' : 'rgba(225,29,72,0.2)';
  const bgNavScrolled = isHotel ? 'bg-[#0f0f1a]/85' : 'bg-[#1a0a0a]/85';
  const bgMobilePanel = isHotel ? 'bg-[#0f0f1a]/95' : 'bg-[#1a0a0a]/95';

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          isScrolled
            ? `${bgNavScrolled} backdrop-blur-xl border-b ${borderNav} shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-3`
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href={isHotel ? "/" : "/wedding"} className="group flex items-center gap-3 transition-transform hover:scale-105">
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 10px ${shadowLogoDim}`,
                  `0 0 20px ${shadowLogo}`,
                  `0 0 10px ${shadowLogoDim}`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-14 h-14 flex items-center justify-center shrink-0 relative rounded-full overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10"
            >
              {isHotel ? (
                <Image src="/logoKrishna.png" alt="Vishram Sthal Logo" fill className="object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full text-rose-500">
                  <Heart size={24} className="fill-rose-500/20" />
                  <span className="text-[10px] font-bold absolute">SMP</span>
                </div>
              )}
            </motion.div>
            <div className="flex flex-col hidden sm:flex">
              <span className={`font-serif text-xl font-bold bg-gradient-to-r ${fromGradient} ${toGradient} bg-clip-text text-transparent whitespace-nowrap`}>
                {config.name}
              </span>
              <span className={`text-xs ${isHotel ? 'text-orange-500/80' : 'text-rose-500/80'} uppercase tracking-widest font-medium`}>
                Dehra Gopipur
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {activeNavLinks.map((link) => {
              const isActive = pathname === link.href || (pathname === '/' && link.href === '/') || (pathname === '/wedding' && link.href === '/wedding');
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative font-medium transition-colors text-sm uppercase tracking-wider group py-1 ${
                    isActive ? textActive : `text-gray-300 ${hoverText}`
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r ${fromGradient} ${toGradient} transition-transform origin-left duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
              );
            })}
          </div>

          {/* CTA & User & Switcher */}
          <div className="hidden lg:flex items-center gap-4">
            <ModeSwitcher />
            
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className={`px-5 py-2 border ${borderPrimary} rounded-full text-sm font-medium ${textPrimary} hover:text-white ${hoverBg} transition-all shadow-sm ${shadowHoverBtn}`}>
                  Sign In
                </button>
              </SignInButton>
            )}

          </div>

          {/* Mobile Toggle & Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <ModeSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`relative z-50 p-2 ${textPrimary} focus:outline-none`}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isMobileMenuOpen ? 'open' : 'closed'}
                className="w-6 h-5 flex flex-col justify-between"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 9 },
                  }}
                  className="w-full h-0.5 bg-current origin-left transition-all"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  className="w-full h-0.5 bg-current transition-all"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -9 },
                  }}
                  className="w-full h-0.5 bg-current origin-left transition-all"
                />
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`absolute right-0 top-0 bottom-0 w-3/4 max-w-sm ${bgMobilePanel} backdrop-blur-xl border-l ${borderNav} shadow-2xl p-6 flex flex-col`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col mt-24 gap-6">
                {activeNavLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-xl font-medium block ${
                          isActive ? textActive : `text-gray-300 ${hoverText}`
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className={`mt-auto flex flex-col gap-6 border-t ${borderNav} pt-6 pb-8`}
              >
                {isSignedIn ? (
                  <div className="flex items-center gap-4">
                    <UserButton />
                    <span className="text-gray-300 font-medium">My Account</span>
                  </div>
                ) : (
                  <SignInButton mode="modal">
                    <button className={`w-full py-2 border ${borderPrimary} rounded-full text-center text-lg font-medium ${textPrimary} hover:text-white ${hoverBg} transition-all shadow-sm ${shadowHoverBtn}`}>
                      Sign In
                    </button>
                  </SignInButton>
                )}

              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
