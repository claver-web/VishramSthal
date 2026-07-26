'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UserButton, SignInButton, useUser } from '@clerk/nextjs';
import { useStore } from '@/store/useStore';

export default function Navigation() {
  const { isSignedIn } = useUser();
  const { isDarkMode, toggleDarkMode, isMenuOpen, toggleMenu, setMenuOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-12 h-12 relative group-hover:scale-105 transition-transform">
            <Image src="/logoKrishna.png" alt="Vishram Sthal Logo" fill className="object-contain" priority />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block text-gray-900 dark:text-white">Vishram Sthal</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors">Home</Link>
          <Link href="/rooms" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors">Rooms</Link>
          <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors">About</Link>
          <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Toggle Dark Mode">
            {isDarkMode ? (
              <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
          
          <div className="hidden md:block">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>

          <button onClick={toggleMenu} className="md:hidden p-2 text-gray-700 dark:text-gray-300">
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-xl transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 border-t dark:border-gray-800' : 'max-h-0'}`}>
        <div className="flex flex-col p-4 gap-4">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-gray-700 dark:text-gray-300 font-medium p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Home</Link>
          <Link href="/rooms" onClick={() => setMenuOpen(false)} className="text-gray-700 dark:text-gray-300 font-medium p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Rooms</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="text-gray-700 dark:text-gray-300 font-medium p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">About</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="text-gray-700 dark:text-gray-300 font-medium p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Contact</Link>
          <div className="p-2 pt-4 border-t dark:border-gray-800">
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500">Account</span>
                <UserButton />
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-medium transition-colors">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
