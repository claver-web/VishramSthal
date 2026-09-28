import Link from 'next/link';
import Image from 'next/image';
import nextDynamic from 'next/dynamic';
import ModePromoBanner from '@/components/ModePromoBanner';
import { Camera, Music, Utensils, Brush, HeartHandshake, BedDouble } from 'lucide-react';

export const metadata = {
  title: "Shani Marriage Palace - Luxury Wedding Venues in Dehra Gopipur",
  description: "Experience your dream wedding at Shani Marriage Palace. Luxurious venues and flawless arrangements in Dehra Gopipur."
};

const Reveal = nextDynamic(() => import('@/components/Reveal'));

export const dynamic = 'force-dynamic';

export default function WeddingHome() {
  const venues = [
    { name: "Grand Banquet Hall", capacity: "500+ guests", desc: "Luxurious indoor setup with crystal chandeliers.", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800" },
    { name: "Garden Lawns", capacity: "300+ guests", desc: "Spacious outdoor lawns surrounded by greenery.", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800" },
    { name: "Terrace Venue", capacity: "200+ guests", desc: "Stunning semi-open area with sunset views.", img: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800" },
    { name: "Intimate Hall", capacity: "100 guests", desc: "Cozy space for pre-wedding ceremonies.", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800" },
  ];

  const services = [
    { title: "Catering & Food", desc: "Multi-cuisine, live counters, and bespoke menus.", icon: Utensils },
    { title: "Decoration", desc: "Themed, floral, and luxury stage setups.", icon: Brush },
    { title: "Photography", desc: "Capturing your memories with cinematic grace.", icon: Camera },
    { title: "Bridal Makeup", desc: "Professional artists for your perfect look.", icon: HeartHandshake },
    { title: "Entertainment", desc: "Live band, DJ, and folk dance performances.", icon: Music },
    { title: "Guest Rooms", desc: "Premium accommodation for your loved ones.", icon: BedDouble },
  ];

  const packages = [
    { name: "Silver Package", price: "₹2,50,000", desc: "Perfect for intimate gatherings.", highlighted: false },
    { name: "Gold Package", price: "₹5,00,000", desc: "Our most popular comprehensive offering.", highlighted: true },
    { name: "Diamond Package", price: "₹10,00,000", desc: "The ultimate luxury wedding experience.", highlighted: false },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#1a0a0a]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a] via-rose-950/80 to-[#1a0a0a] z-10" />
        
        <Image 
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000"
          alt="Wedding Hero"
          fill
          priority
          className="object-cover object-center z-0 opacity-40"
        />

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-20 flex flex-col items-center">
          <Reveal delay={100}>
            <p className="text-xl md:text-2xl text-rose-300 font-serif mb-4 italic tracking-wider drop-shadow-md">
              Celebrate Eternal Love
            </p>
          </Reveal>
          
          <Reveal delay={200}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Celebrate Your Eternal Bond at <span className="text-rose-500 italic font-serif">Shani Marriage Palace</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl font-light">
                Luxurious venues & flawless arrangements at Shani Marriage Palace, Dehra Gopipur
              </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/wedding/venues" className="px-10 py-4 bg-rose-600 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(225,29,72,0.6)] hover:shadow-[0_0_30px_rgba(225,29,72,0.8)] hover:-translate-y-1">
                Explore Venues
              </Link>
              
              <Link href="/wedding/contact" className="px-10 py-4 bg-transparent border-2 border-rose-400 text-rose-200 rounded-full font-bold text-lg transition-all hover:bg-rose-400 hover:text-[#1a0a0a] hover:-translate-y-1">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EventVenue",
            "name": "Shani Marriage Palace",
            "description": "Luxury Wedding Venues in Dehra Gopipur",
            "image": "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Word No. 6",
              "addressLocality": "Dehra Gopipur",
              "addressRegion": "Himachal Pradesh",
              "postalCode": "177101",
              "addressCountry": "IN"
            },
            "telephone": "+919805271636",
            "url": "https://vishramsthal.com/wedding"
          })
        }}
      />

      {/* 2. VENUE CATEGORIES */}
      <section className="py-24 bg-[#1a0a0a]">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif text-amber-400 mb-4">Our Stunning Venues</h2>
              <div className="flex justify-center items-center gap-4 mb-4">
                <span className="w-24 h-px bg-rose-500"></span>
                <HeartHandshake className="text-rose-500" />
                <span className="w-24 h-px bg-rose-500"></span>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {venues.map((venue, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="group rounded-2xl overflow-hidden shadow-xl bg-gray-900 border border-rose-900/50 hover:border-amber-500/50 transition-all h-full flex flex-col">
                  <div className="h-64 relative overflow-hidden">
                    <Image src={venue.img} alt={venue.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0a] to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-2xl font-serif text-white">{venue.name}</h3>
                      <p className="text-amber-400 text-sm font-semibold">{venue.capacity}</p>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-gray-400 text-sm mb-6 flex-grow">{venue.desc}</p>
                    <Link href="/wedding/venues" className="w-full py-3 text-center border border-rose-600 text-rose-400 rounded-lg hover:bg-rose-600 hover:text-white transition-colors">
                      View Details
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES */}
      <section className="py-24 bg-rose-950/20 border-y border-rose-900/30">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-serif text-center text-amber-400 mb-16">We Take Care of Everything</h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className="p-8 rounded-2xl bg-gray-900/50 border border-rose-900/50 hover:bg-rose-950/50 transition-all group">
                    <div className="w-14 h-14 rounded-full bg-rose-900/50 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-2xl font-serif text-rose-200 mb-3">{svc.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{svc.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PRICING PREVIEW */}
      <section className="py-24 bg-[#1a0a0a]">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-serif text-center text-amber-400 mb-16">Curated Packages</h2>
          </Reveal>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {packages.map((pkg, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className={`p-8 rounded-3xl border ${
                  pkg.highlighted 
                    ? 'bg-rose-900/40 border-rose-500 shadow-[0_0_30px_rgba(225,29,72,0.3)] transform md:-translate-y-4' 
                    : 'bg-gray-900/50 border-gray-800'
                } flex flex-col text-center transition-all hover:border-amber-500/50`}>
                  {pkg.highlighted && <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">Most Popular</span>}
                  <h3 className="text-2xl font-serif text-white mb-2">{pkg.name}</h3>
                  <p className="text-sm text-gray-400 mb-6">{pkg.desc}</p>
                  <div className="text-4xl font-bold text-amber-400 mb-8">{pkg.price}</div>
                  <Link href="/wedding/contact" className={`py-3 rounded-full font-bold transition-colors ${
                    pkg.highlighted ? 'bg-rose-600 text-white hover:bg-rose-500' : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}>
                    Request Quote
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-24 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000')] bg-cover bg-fixed bg-center relative">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Reveal>
            <h2 className="text-5xl font-serif text-amber-400 mb-6">Let's Plan Your Wedding</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Get in touch with our expert wedding planners and start building the day of your dreams.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/wedding/contact" className="px-10 py-4 bg-amber-500 text-gray-900 rounded-full font-bold text-lg hover:bg-amber-400 transition-all shadow-xl">
                Schedule a Visit
              </Link>
              <a href="tel:+919805271636" className="text-2xl font-bold text-white hover:text-amber-400 transition-colors">
                📞 +91 9805271636
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CROSS PROMO */}
      <ModePromoBanner />
    </div>
  );
}
