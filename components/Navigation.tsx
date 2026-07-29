'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { UserButton, SignInButton, useUser } from '@clerk/nextjs';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Divine Abodes', href: '/rooms' },
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Transparent at top (scrollY < 100)
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide navbar when scrolling down (after 300px), show when scrolling up
    if (latest > 300 && latest > previous && !isMobileMenuOpen) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  // Lock body scroll when mobile menu is open
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

  const activeNavLinks = [...NAV_LINKS];
  if (isSignedIn) {
    activeNavLinks.push({ name: 'My Bookings', href: '/bookings' });
  }

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
            ? 'bg-[#1a1a2e]/85 backdrop-blur-xl border-b border-amber-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="group flex items-center gap-3 transition-transform hover:scale-105">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 10px rgba(245,158,11,0.2)',
                  '0 0 20px rgba(245,158,11,0.6)',
                  '0 0 10px rgba(245,158,11,0.2)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-14 h-14 flex items-center justify-center shrink-0 relative rounded-full overflow-hidden"
            >
              <Image src="/logoKrishna.png" alt="Vishram Sthal Logo" fill className="object-cover" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                Vishram Sthal
              </span>
              <span className="text-xs text-amber-500/80 uppercase tracking-widest font-medium">
                Dehra Gopipur
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {activeNavLinks.map((link) => {
              const isActive = pathname === link.href || (pathname === '/' && link.href === '/');
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative font-medium transition-colors text-sm uppercase tracking-wider group py-1 ${
                    isActive ? 'text-amber-400' : 'text-gray-300 hover:text-amber-400'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-400 to-orange-500 transition-transform origin-left duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
              );
            })}
          </div>

          {/* CTA & User */}
          <div className="hidden lg:flex items-center gap-6">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            )}
            

          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-50 p-2 text-amber-500 focus:outline-none"
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
              className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-[#1a1a2e]/95 backdrop-blur-xl border-l border-amber-500/20 shadow-2xl p-6 flex flex-col"
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
                          isActive ? 'text-amber-400' : 'text-gray-300 hover:text-amber-400'
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
                className="mt-auto flex flex-col gap-6 border-t border-amber-500/20 pt-6 pb-8"
              >
                {isSignedIn ? (
                  <div className="flex items-center gap-4">
                    <UserButton />
                    <span className="text-gray-300 font-medium">My Account</span>
                  </div>
                ) : (
                  <SignInButton mode="modal">
                    <button className="text-left text-lg font-medium text-gray-300 hover:text-amber-400">
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
