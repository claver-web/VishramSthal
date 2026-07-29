'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) return null;
  return (
    <footer className="relative bg-[var(--color-maroon)] text-[#fef3c7] pt-16 pb-8 overflow-hidden transition-colors duration-300 mt-auto border-t-[8px] border-[var(--color-gold)]">
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
            <h3 className="text-xl font-serif text-[var(--color-gold)] mb-6 border-b border-[var(--color-gold)]/30 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3 font-sans text-sm">
              {['Home', 'Rooms', 'About', 'Contact', 'Gallery', 'Bookings'].map((link) => (
                <li key={link}>
                  <Link href={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="flex items-center gap-2 hover:text-[var(--color-gold)] transition-colors group">
                    <span className="text-[var(--color-saffron)] text-[10px] group-hover:scale-125 transition-transform">🪷</span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Divine Services */}
          <div>
            <h3 className="text-xl font-serif text-[var(--color-gold)] mb-6 border-b border-[var(--color-gold)]/30 pb-2 inline-block">Divine Services</h3>
            <ul className="space-y-3 font-sans text-sm text-white/80">
              {['24/7 Room Service', 'Spiritual Activities', 'Temple Visits', 'Satvik Dining', 'Meditation Sessions'].map((service) => (
                <li key={service} className="flex items-center gap-2">
                  <span className="text-[var(--color-gold)] text-[10px]">✨</span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl font-serif text-[var(--color-gold)] mb-6 border-b border-[var(--color-gold)]/30 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-4 font-sans text-sm text-white/90">
              <li className="flex items-center gap-3">
                <span className="text-[var(--color-gold)]">📞</span>
                +91 9815271636
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[var(--color-gold)]">💬</span>
                <a href="https://wa.me/918988478367" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors">WhatsApp: +91 8988478367</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[var(--color-gold)]">✉️</span>
                reservations@vishramsthal.com
              </li>
            </ul>
            
            <div className="mt-8">
              <h4 className="text-sm font-serif text-[var(--color-gold)] mb-3">Connect With Us</h4>
              <div className="flex gap-4">
                {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-[var(--color-midnight)] transition-all transform hover:-translate-y-1 border border-[var(--color-gold)]/30" title={social}>
                    🪔
                  </a>
                ))}
              </div>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-gold)]/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60 font-sans">
            © {new Date().getFullYear()} Vishram Sthal. All rights reserved.
          </p>
          <p className="text-2xl font-decorative text-[var(--color-gold)] drop-shadow-sm tracking-wider">
            Jai Shri Krishna
          </p>
        </div>
      </div>
    </footer>
  );
}
