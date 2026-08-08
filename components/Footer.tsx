'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useModeStore } from '@/store/modeStore';

export default function Footer() {
  const pathname = usePathname();

  const { mode, setMode } = useModeStore();
  const router = useRouter();
  const isHotel = mode === 'hotel';

  if (pathname?.startsWith('/admin')) return null;

  const handleModeSwitch = () => {
    const newMode = isHotel ? 'wedding' : 'hotel';
    setMode(newMode);
    setTimeout(() => {
      if (newMode === 'wedding') {
        router.push('/wedding');
      } else {
        router.push('/');
      }
    }, 100);
  };

  return (
    <footer className={`relative ${isHotel ? 'bg-[var(--color-maroon)] text-[#fef3c7] border-[var(--color-gold)]' : 'bg-rose-950 text-rose-100 border-amber-500'} pt-16 pb-8 overflow-hidden transition-colors duration-300 mt-auto border-t-[8px]`}>
      {/* Decorative Top Border (Temple Arch Pattern) */}
      <div className="absolute top-0 left-0 w-full h-8 flex overflow-hidden opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="w-16 h-8 border-t-[6px] border-l-[6px] border-r-[6px] border-[var(--color-gold)] temple-arch flex-shrink-0" />
        ))}
      </div>

      {/* Subtle background mandala watermark */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffd700\\' fill-opacity=\\'0.05\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/\\'%3E%3C/g\\'%3E%3C/g\\'%3E%3C/svg\\'%3E')] opacity-30 mix-blend-overlay pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Vishram Sthal */}
          <div>
            <Link href="/" className="inline-block mb-6 relative w-48 h-16">
              <Image src="/logoKrishna.png" alt="Vishram Sthal Logo" fill className="object-contain object-left" />
            </Link>
            <p className="text-white/80 font-sans text-sm leading-relaxed mb-6">
              A premium spiritual retreat inspired by the divine love of Radha Krishna, offering luxurious stays and serene ambiance.
            </p>
            <div className="flex items-start gap-3 text-white/90">
              <span className="text-[var(--color-gold)] mt-1">📍</span>
              <p className="text-sm">Word No. 6,<br />Dehra Gopipur,<br />Himachal Pradesh</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className={`text-xl font-serif ${isHotel ? 'text-[var(--color-gold)] border-[var(--color-gold)]/30' : 'text-amber-400 border-amber-400/30'} mb-6 border-b pb-2 inline-block`}>Quick Links</h3>
            <ul className="space-y-3 font-sans text-sm">
              {isHotel ? (
                ['Home', 'Rooms', 'About', 'Contact', 'Gallery', 'Bookings'].map((link) => (
                  <li key={link}>
                    <Link href={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="flex items-center gap-2 hover:text-[var(--color-gold)] transition-colors group">
                      <span className="text-[var(--color-saffron)] text-[10px] group-hover:scale-125 transition-transform">🪷</span>
                      {link}
                    </Link>
                  </li>
                ))
              ) : (
                ['Home', 'Venues', 'Services', 'Gallery', 'Contact'].map((link) => (
                  <li key={link}>
                    <Link href={link === 'Home' ? '/wedding' : `/wedding/${link.toLowerCase()}`} className="flex items-center gap-2 hover:text-amber-400 transition-colors group">
                      <span className="text-rose-400 text-[10px] group-hover:scale-125 transition-transform">💍</span>
                      {link}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Column 3: Cross Promo */}
          <div>
            <h3 className={`text-xl font-serif ${isHotel ? 'text-[var(--color-gold)] border-[var(--color-gold)]/30' : 'text-amber-400 border-amber-400/30'} mb-6 border-b pb-2 inline-block`}>Explore More</h3>
            
            <div className={`p-4 rounded-xl border ${isHotel ? 'bg-black/20 border-white/10' : 'bg-rose-900/40 border-rose-800'}`}>
              <h4 className="font-bold text-white mb-2">{isHotel ? "Planning a Wedding?" : "Need Hotel Rooms?"}</h4>
              <p className="text-xs mb-4 text-white/70">
                {isHotel ? "Discover our luxurious wedding venues and packages." : "Book premium rooms for a comfortable stay."}
              </p>
              <button onClick={handleModeSwitch} className={`text-xs font-bold px-4 py-2 rounded-lg transition-colors w-full ${isHotel ? 'bg-[var(--color-saffron)] text-white hover:bg-[var(--color-gold)] hover:text-black' : 'bg-rose-600 text-white hover:bg-rose-500'}`}>
                {isHotel ? "Switch to Wedding Mode" : "Switch to Hotel Mode"}
              </button>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className={`text-xl font-serif ${isHotel ? 'text-[var(--color-gold)] border-[var(--color-gold)]/30' : 'text-amber-400 border-amber-400/30'} mb-6 border-b pb-2 inline-block`}>Contact Us</h3>
            <ul className="space-y-4 font-sans text-sm text-white/90">
              <li className="flex items-center gap-3">
                <span className={isHotel ? "text-[var(--color-gold)]" : "text-amber-400"}>📞</span>
                +91 9805271636 {isHotel ? "" : "(Wedding Enquiries)"}
              </li>
              <li className="flex items-center gap-3">
                <span className={isHotel ? "text-[var(--color-gold)]" : "text-amber-400"}>💬</span>
                <a href="https://wa.me/919805271636" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isHotel ? 'hover:text-[var(--color-gold)]' : 'hover:text-amber-400'}`}>WhatsApp: +91 9805271636</a>
              </li>
              <li className="flex items-center gap-3">
                <span className={isHotel ? "text-[var(--color-gold)]" : "text-amber-400"}>✉️</span>
                {isHotel ? "reservations@vishramsthal.com" : "weddings@vishramsthal.com"}
              </li>
            </ul>
            
            <div className="mt-8">
              <div className="flex gap-4">
                {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                  <a key={social} href="#" className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all transform hover:-translate-y-1 border ${isHotel ? 'hover:bg-[var(--color-gold)] hover:text-[var(--color-midnight)] border-[var(--color-gold)]/30' : 'hover:bg-amber-400 hover:text-rose-950 border-amber-400/30'}`} title={social}>
                    {isHotel ? '🪔' : '💍'}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-gold)]/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-sm text-white/60 font-sans">
              © {new Date().getFullYear()} Vishram Sthal. All rights reserved.
            </p>
            <span className="hidden sm:inline text-white/30">•</span>
            <Link href="/terms" className="text-xs text-white/70 hover:text-[var(--color-gold)] transition-colors underline">
              Terms & Conditions
            </Link>
            <span className="hidden sm:inline text-white/30">•</span>
            <Link href="/privacy" className="text-xs text-white/70 hover:text-[var(--color-gold)] transition-colors underline">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline text-white/30">•</span>
            <Link href="/cancellation" className="text-xs text-white/70 hover:text-[var(--color-gold)] transition-colors underline">
              Cancellation Policy
            </Link>
          </div>
          <p className="text-2xl font-decorative text-[var(--color-gold)] drop-shadow-sm tracking-wider">
            Jai Shri Krishna
          </p>
        </div>
      </div>
    </footer>
  );
}
