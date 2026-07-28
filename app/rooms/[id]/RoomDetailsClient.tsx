'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, ChevronRight, X, MapPin, Star, Play, PlayCircle, 
  Check, CheckCircle2, Navigation, Map, Info, HelpCircle, ChevronDown
} from 'lucide-react';

export default function RoomDetailsClient({ room }: { room: any }) {
  const [activeImage, setActiveImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const images = room.images && room.images.length > 0 
    ? room.images 
    : ['https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=800'];

  const handleNext = () => setActiveImage((prev) => (prev + 1) % images.length);
  const handlePrev = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  // Scroll spy effect for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'amenities', 'gallery', 'reviews', 'location', 'policies'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-200 font-sans pb-24">
      {/* 2.1 Hero Section Redesign */}
      <section className="relative w-full h-[50vh] md:h-[70vh] bg-black overflow-hidden group">
        <Image 
          src={images[activeImage]} 
          alt={room.name || `Room ${room.number}`} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent"></div>

        <div className="absolute bottom-24 left-4 md:left-12 z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs md:text-sm text-amber-500 uppercase tracking-widest font-bold mb-4 bg-black/40 w-max px-3 py-1 rounded-full backdrop-blur-sm border border-amber-500/20">
            <Link href="/" className="hover:text-amber-400">Home</Link>
            <span>→</span>
            <Link href="/rooms" className="hover:text-amber-400">Divine Abodes</Link>
            <span>→</span>
            <span className="text-white">{room.name || `Room ${room.number}`}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 mb-2 drop-shadow-lg">
            {room.name || `Room ${room.number}`}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-md text-sm font-bold tracking-wider uppercase">
              {room.type}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-5 h-5 fill-amber-500" />
              <Star className="w-5 h-5 fill-amber-500" />
              <Star className="w-5 h-5 fill-amber-500" />
              <Star className="w-5 h-5 fill-amber-500" />
              <Star className="w-5 h-5 fill-amber-500" />
              <span className="text-white ml-1 text-sm font-medium">(128 Reviews)</span>
            </div>
          </div>
          
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-sm text-neutral-400">From</span>
            <span className="text-4xl font-black text-white drop-shadow-md">₹{room.price}</span>
            <span className="text-neutral-400">/ night</span>
          </div>
          
          <div className="flex gap-4">
            <Link href={`/booking/${room.id}`} className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 px-8 py-3 rounded-full font-bold shadow-lg shadow-amber-500/20 transition-all hover:scale-105">
              Book This Sanctuary
            </Link>
            {room.videoTour && (
              <button className="flex items-center gap-2 border border-amber-500/50 bg-black/50 backdrop-blur-md text-amber-400 px-6 py-3 rounded-full font-bold hover:bg-amber-500/10 transition-all">
                <PlayCircle className="w-5 h-5" /> Play Video
              </button>
            )}
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="absolute bottom-4 right-4 md:right-12 left-4 md:left-auto flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide z-10">
          {images.slice(0, 5).map((img: string, idx: number) => (
            <button 
              key={idx} 
              onClick={() => setActiveImage(idx)}
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${activeImage === idx ? 'border-amber-500 scale-105 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'border-transparent opacity-60 hover:opacity-100'}`}
            >
              <Image src={img} alt="Thumbnail" fill className="object-cover" />
            </button>
          ))}
          {images.length > 5 && (
            <button 
              onClick={() => setIsGalleryOpen(true)}
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shrink-0 bg-neutral-900 border-2 border-neutral-700 flex flex-col items-center justify-center hover:border-amber-500 hover:bg-neutral-800 transition-all group"
            >
              <span className="text-amber-500 font-bold group-hover:scale-110 transition-transform">+{images.length - 5}</span>
              <span className="text-[10px] text-neutral-400">Photos</span>
            </button>
          )}
        </div>
      </section>

      {/* 2.2 Sticky Navigation Bar */}
      <div className="sticky top-0 z-40 bg-[#1a1a2e]/90 backdrop-blur-xl border-b border-amber-500/30 shadow-lg hidden md:block">
        <div className="container mx-auto px-8 max-w-7xl h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm font-bold text-neutral-400">
            {['Overview', 'Amenities', 'Gallery', 'Reviews', 'Location', 'Policies'].map((item) => {
              const id = item.toLowerCase();
              return (
                <button 
                  key={id} 
                  onClick={() => scrollTo(id)}
                  className={`px-4 py-5 border-b-2 transition-all ${activeSection === id ? 'border-amber-500 text-amber-500' : 'border-transparent hover:text-white'}`}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="block text-xs text-neutral-400">Starting from</span>
              <span className="text-lg font-black text-white">₹{room.price}</span>
            </div>
            <Link href={`/booking/${room.id}`} className="bg-amber-500 hover:bg-amber-400 text-neutral-950 px-6 py-2 rounded-full font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all">
              Book Now
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-12 flex flex-col lg:flex-row gap-12 relative">
        {/* Main Content Column */}
        <div className="lg:w-[65%] space-y-16">
          
          {/* Section 1: Overview */}
          <section id="overview" className="scroll-mt-24">
            <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-amber-500 rounded-full"></span> The Divine Experience
            </h2>
            <p className="text-neutral-300 text-lg leading-relaxed mb-8">
              {room.description || "Immerse yourself in complete spiritual tranquility. This luxurious abode features handcrafted wooden furnishings, expansive views of the sacred gardens, and all modern amenities designed to facilitate deep rest and meditation."}
            </p>
            
            <div className="bg-[#1a1a2e] rounded-2xl border border-neutral-800 p-6 overflow-hidden relative">
              <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl"></div>
              <h3 className="text-xl font-bold text-amber-500 mb-4">Room Specifications</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div className="border-b border-neutral-800 pb-2">
                  <span className="block text-xs text-neutral-500 uppercase font-bold mb-1">Max Occupancy</span>
                  <span className="text-white font-medium">{room.capacity} Guests</span>
                </div>
                <div className="border-b border-neutral-800 pb-2">
                  <span className="block text-xs text-neutral-500 uppercase font-bold mb-1">Room Size</span>
                  <span className="text-white font-medium">{room.size ? `${room.size} sq. ft.` : '350 sq. ft.'}</span>
                </div>
                <div className="border-b border-neutral-800 pb-2">
                  <span className="block text-xs text-neutral-500 uppercase font-bold mb-1">Bed Type</span>
                  <span className="text-white font-medium">King Size Premium</span>
                </div>
                <div className="border-b border-neutral-800 pb-2">
                  <span className="block text-xs text-neutral-500 uppercase font-bold mb-1">View</span>
                  <span className="text-white font-medium">Sacred Garden View</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Amenities */}
          <section id="amenities" className="scroll-mt-24">
            <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-amber-500 rounded-full"></span> Divine Amenities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {room.amenities.map((amenity: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-amber-500/30 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-neutral-200">{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Gallery */}
          <section id="gallery" className="scroll-mt-24">
            <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-amber-500 rounded-full"></span> Photo Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {images.map((img: string, idx: number) => (
                <div 
                  key={idx} 
                  onClick={() => { setActiveImage(idx); setIsGalleryOpen(true); }}
                  className={`relative cursor-pointer rounded-xl overflow-hidden group ${idx === 0 ? 'col-span-2 row-span-2 h-[300px]' : 'h-[144px]'}`}
                >
                  <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Section 5: Reviews */}
          <section id="reviews" className="scroll-mt-24">
            <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-amber-500 rounded-full"></span> Guest Experiences
            </h2>
            <div className="bg-[#1a1a2e] p-8 rounded-3xl border border-neutral-800 mb-8 flex items-center gap-8">
              <div className="text-center">
                <span className="text-6xl font-black text-white">4.8</span>
                <div className="flex items-center justify-center gap-1 my-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                </div>
                <span className="text-sm text-neutral-400">128 Reviews</span>
              </div>
              <div className="flex-1 space-y-2 border-l border-neutral-800 pl-8">
                {[
                  { stars: 5, pct: 85 },
                  { stars: 4, pct: 10 },
                  { stars: 3, pct: 3 },
                  { stars: 2, pct: 1 },
                  { stars: 1, pct: 1 },
                ].map(row => (
                  <div key={row.stars} className="flex items-center gap-3 text-sm">
                    <span className="w-12 text-neutral-400 flex items-center gap-1">{row.stars} <Star className="w-3 h-3 fill-current" /></span>
                    <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${row.pct}%` }}></div>
                    </div>
                    <span className="w-8 text-right text-neutral-500">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              {[1, 2].map(i => (
                <div key={i} className="p-6 bg-neutral-900 rounded-2xl border border-neutral-800">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center font-bold text-lg">
                        {i === 1 ? 'R' : 'S'}
                      </div>
                      <div>
                        <p className="text-white font-bold">{i === 1 ? 'Rahul Sharma' : 'Sunita Desai'}</p>
                        <p className="text-xs text-neutral-500">Stayed in June 2026</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Truly a Divine Experience!</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                    The room was absolutely spotless and exactly as shown in the pictures. The temple view from the balcony in the morning during aarti time was mesmerizing. Will definitely book again.
                  </p>
                  <div className="bg-[#1a1a2e] p-4 rounded-xl border border-neutral-800 ml-6">
                    <p className="text-xs text-amber-500 font-bold mb-1">Response from Host</p>
                    <p className="text-sm text-neutral-300">Jai Shri Krishna Rahul! We are so glad you enjoyed the divine atmosphere. Looking forward to welcoming you back to Vishram Sthal.</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Policies */}
          <section id="policies" className="scroll-mt-24">
            <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-amber-500 rounded-full"></span> Important Policies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
                <h4 className="text-amber-500 font-bold mb-4 flex items-center gap-2"><Info className="w-5 h-5" /> House Rules</h4>
                <ul className="space-y-3 text-sm text-neutral-300">
                  <li className="flex justify-between border-b border-neutral-800 pb-2"><span>Check-in:</span> <b>2:00 PM</b></li>
                  <li className="flex justify-between border-b border-neutral-800 pb-2"><span>Check-out:</span> <b>11:00 AM</b></li>
                  <li className="flex justify-between border-b border-neutral-800 pb-2"><span>Smoking:</span> <b>Not Allowed</b></li>
                  <li className="flex justify-between border-b border-neutral-800 pb-2"><span>Pets:</span> <b>Not Allowed</b></li>
                  <li className="pt-2 text-neutral-500">Valid ID proof is mandatory for all guests upon arrival.</li>
                </ul>
              </div>
              <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
                <h4 className="text-amber-500 font-bold mb-4 flex items-center gap-2"><HelpCircle className="w-5 h-5" /> Cancellation</h4>
                <ul className="space-y-3 text-sm text-neutral-300">
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div> <b>Free Cancellation</b> up to 48 hours before check-in.</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div> <b>50% Refund</b> if cancelled 24-48 hours before.</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div> <b>No Refund</b> if cancelled less than 24 hours before.</li>
                  <li className="mt-4 pt-4 border-t border-neutral-800 text-neutral-500 italic">For Cash on Arrival bookings, you may cancel anytime without penalty.</li>
                </ul>
              </div>
            </div>
          </section>

        </div>

        {/* 2.4 Floating Booking Widget (Sticky Sidebar) */}
        <div className="lg:w-[35%]">
          <div className="sticky top-24 bg-[#1a1a2e] rounded-3xl p-6 md:p-8 border-2 border-amber-500/20 shadow-2xl shadow-black">
            <div className="flex items-baseline gap-2 mb-6 border-b border-neutral-800 pb-6">
              <span className="text-4xl font-black text-amber-500">₹{room.price}</span>
              <span className="text-neutral-400 font-medium">/ night</span>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 border border-neutral-700 rounded-xl overflow-hidden divide-x divide-neutral-700">
                <div className="p-3 bg-neutral-900">
                  <span className="block text-[10px] uppercase font-bold text-neutral-500">Check-in</span>
                  <span className="text-sm font-medium text-white">Select date</span>
                </div>
                <div className="p-3 bg-neutral-900">
                  <span className="block text-[10px] uppercase font-bold text-neutral-500">Check-out</span>
                  <span className="text-sm font-medium text-white">Select date</span>
                </div>
              </div>
              <div className="p-3 bg-neutral-900 border border-neutral-700 rounded-xl flex justify-between items-center">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-neutral-500">Guests</span>
                  <span className="text-sm font-medium text-white">2 Adults</span>
                </div>
                <ChevronDown className="w-4 h-4 text-neutral-400" />
              </div>
            </div>
            
            <Link 
              href={`/booking/${room.id}`}
              className="block w-full text-center bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 font-black text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all hover:scale-[1.02] mb-4"
            >
              Reserve Your Stay 🪷
            </Link>
            
            <div className="text-center space-y-2 text-sm font-medium">
              <p className="text-green-400">✓ Free cancellation available</p>
              <p className="text-neutral-400">No payment needed until confirmation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col">
          <div className="flex justify-between items-center p-6 text-white absolute top-0 left-0 right-0 z-10">
            <div className="text-sm font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
              {activeImage + 1} / {images.length}
            </div>
            <button 
              onClick={() => setIsGalleryOpen(false)}
              className="p-3 bg-neutral-900/50 hover:bg-red-500/80 rounded-full transition-colors backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-1 relative flex items-center justify-center p-4 md:p-12">
            <button 
              onClick={handlePrev}
              className="absolute left-4 md:left-8 p-4 bg-neutral-900/50 hover:bg-amber-500/80 text-white rounded-full transition-colors backdrop-blur-md z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
              <Image 
                src={images[activeImage]} 
                alt="Gallery Full" 
                fill 
                className="object-contain"
              />
            </div>
            
            <button 
              onClick={handleNext}
              className="absolute right-4 md:right-8 p-4 bg-neutral-900/50 hover:bg-amber-500/80 text-white rounded-full transition-colors backdrop-blur-md z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
          
          {/* Thumbnail strip in lightbox */}
          <div className="h-24 bg-neutral-950/80 flex items-center justify-center gap-2 px-4 overflow-x-auto pb-4 shrink-0 border-t border-neutral-900">
            {images.map((img: string, idx: number) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`relative w-16 h-16 rounded-md overflow-hidden shrink-0 transition-all ${activeImage === idx ? 'border-2 border-amber-500 opacity-100 scale-110' : 'opacity-40 hover:opacity-100'}`}
              >
                <Image src={img} alt="Thumb" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
