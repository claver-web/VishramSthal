import Link from 'next/link';
import Image from 'next/image';
import nextDynamic from 'next/dynamic';
import prisma from '@/lib/prisma';

const Reveal = nextDynamic(() => import('@/components/Reveal'));

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch rooms from the database
  const rooms = await prisma.room.findMany({
    orderBy: { price: 'asc' },
    take: 4,
  });

  // Fetch reviews from the database
  const recentReviews = await prisma.review.findMany({
    where: { status: 'PUBLISHED' },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
    take: 3
  });

  const displayRooms = rooms;

  const roomNames = {
    'STANDARD': 'Standard Room',
    'DELUXE': 'Kunj Kutir',
    'SUITE': 'Radha Mahal',
    'PREMIUM': 'Krishna Kunj'
  };

  const roomDescriptions = {
    'STANDARD': 'Simple elegance inspired by devotion',
    'DELUXE': 'Grove-inspired luxury with garden views',
    'SUITE': 'Royal suite with Radha Krishna themed decor',
    'PREMIUM': 'Ultimate luxury with private temple view'
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-mandala-pattern">
      {/* 1. HERO SECTION REDESIGN */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Layer 1: Soft gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-midnight)] via-[#2a1b38]/90 to-[var(--color-midnight)] z-10" />
        
        {/* Layer 2: Parallax background image */}
        <Image 
          src="https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=2000"
          alt="Vishram Sthal Hero"
          fill
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/e79fwAJzAPm44z/YQAAAABJRU5ErkJggg=="
          className="object-cover object-center z-0 opacity-20"
          sizes="100vw"
        />
        
        {/* Layer 3: Particles (simulated with CSS for now) */}
        <div className="absolute inset-0 z-15 pointer-events-none opacity-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] mix-blend-overlay" />

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-20 flex flex-col items-center">
          <Reveal>
            <div className="w-16 h-16 mb-4 mx-auto animate-spin-slow opacity-80">
              <svg viewBox="0 0 100 100" className="text-gold fill-current"><path d="M50 0 C55 20 70 30 100 50 C70 70 55 80 50 100 C45 80 30 70 0 50 C30 30 45 20 50 0 Z" /></svg>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <p className="text-2xl md:text-3xl text-white font-sanskrit mb-2 tracking-widest drop-shadow-md">
              ॐ Welcome to
            </p>
          </Reveal>
          
          <Reveal delay={200}>
            <h1 className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDD0] to-[#FFD700] mb-4 drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]">
              Vishram Sthal
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex items-center justify-center gap-4 my-6">
              <span className="w-12 h-1 bg-white/50 rounded-full"></span>
              <span className="text-3xl">🦚</span>
              <span className="w-12 h-1 bg-white/50 rounded-full"></span>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-2xl md:text-4xl text-white font-cormorant mb-4 italic drop-shadow-lg">
              "Where Divine Love Meets Luxury"
            </p>
            <p className="text-lg md:text-xl text-white/90 font-light mb-10 max-w-2xl mx-auto">
              Experience the eternal bliss of Radha Krishna's abode at Word No. 6, Dehra Gopipur
            </p>
          </Reveal>

          <Reveal delay={500}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative">
              <Link href="/rooms" className="relative group px-10 py-4 bg-[var(--color-saffron)] text-white rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(249,115,22,0.6)] hover:shadow-[0_0_30px_rgba(255,215,0,0.8)] animate-pulse-glow hover:-translate-y-1 overflow-hidden">
                <span className="relative z-10">Book Your Divine Stay</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-saffron)] to-[var(--color-saffron-light)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              
              <Link href="#divine-ambiance" className="px-10 py-4 bg-transparent border-2 border-[var(--color-gold)] text-white rounded-full font-bold text-lg transition-all hover:bg-[var(--color-gold)] hover:text-[var(--color-foreground)] hover:-translate-y-1">
                Explore the Abode
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center animate-float cursor-pointer">
          <span className="text-white/80 text-sm font-medium mb-2 uppercase tracking-widest">Discover More</span>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </section>

      {/* 2. PREMIUM ROOMS SHOWCASE SECTION */}
      <section className="py-24 bg-[var(--color-midnight)] border-y border-[var(--border-color)]">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif text-[var(--color-gold)] mb-4">Your Divine Abodes</h2>
              <div className="flex justify-center items-center gap-4 mb-4">
                <span className="w-24 h-px bg-[var(--color-saffron)]"></span>
                <span className="text-2xl text-[var(--color-saffron)]">🌸</span>
                <span className="w-24 h-px bg-[var(--color-saffron)]"></span>
              </div>
              <p className="text-xl font-cormorant text-gray-300 italic">Choose your sacred sanctuary at Vishram Sthal</p>
            </div>
          </Reveal>

          {displayRooms.length === 0 ? (
            <div className="text-center py-12 text-gray-400 italic">
              New sacred sanctuaries are currently being prepared. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayRooms.map((room, i) => {
              const name = room.name || roomNames[room.type as keyof typeof roomNames] || room.type;
              const desc = room.description || roomDescriptions[room.type as keyof typeof roomDescriptions] || 'A comfortable stay.';
              const displayImage = room.images && room.images.length > 0 
                ? room.images[0] 
                : 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80';
              
              return (
                <Reveal key={room.id} delay={i * 150}>
                  <div className="group rounded-xl overflow-hidden shadow-xl bg-gray-800 h-full flex flex-col hover:shadow-[0_10px_30px_rgba(255,215,0,0.3)] transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-[var(--color-gold)] relative">
                    <div className="h-64 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                      <div className="absolute inset-0 bg-[var(--color-saffron)] mix-blend-overlay opacity-30 z-10" />
                      {/* Image with Placeholder */}
                      <Image
                        src={displayImage}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/e79fwAJzAPm44z/YQAAAABJRU5ErkJggg=="
                      />
                      <div className="absolute bottom-4 left-4 z-20">
                        <h3 className="text-3xl font-serif text-white font-bold tracking-wide drop-shadow-lg">{name}</h3>
                        <p className="text-white/90 text-sm font-sans uppercase tracking-widest">{room.type} ROOM</p>
                      </div>
                      <div className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${room.isAvailable ? 'bg-green-400 animate-diya-flicker' : 'bg-red-400'}`}></span>
                        <span className="text-white text-xs font-bold">{room.isAvailable ? 'Available' : 'Booked'}</span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZjliMjM0IiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')]">

                      <div className="flex justify-between items-end mb-6 pb-4 border-b border-gray-700">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Starting from</p>
                          <p className="text-3xl font-bold text-[var(--color-saffron)]">₹{room.price}</p>
                        </div>
                        <div className="text-right text-sm text-gray-500 flex flex-col items-end">
                          <span title="Capacity" className="flex items-center gap-1">👥 {room.capacity} Guests</span>
                        </div>
                      </div>
                      
                      <Link href={`/rooms?type=${room.type}`} className="rounded-md block w-full text-center py-3 bg-gray-700 text-[var(--color-gold)] hover:bg-[var(--color-saffron)] hover:text-white font-serif text-lg transition-colors border border-[var(--color-gold)]/30 group-hover:border-[var(--color-saffron)]">
                        View Details
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          )}

          <Reveal delay={400}>
            <div className="mt-16 text-center">
              <Link href="/rooms" className="inline-block px-10 py-4 bg-[var(--color-saffron)] text-white rounded-full font-bold text-lg hover:bg-[var(--color-gold)] hover:text-gray-900 transition-all shadow-lg hover:-translate-y-1">
                Explore All Rooms
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. DIVINE AMBIANCE SECTION */}
      <section id="divine-ambiance" className="py-24 relative overflow-hidden bg-[var(--background)]">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: 'Peaceful Environment', desc: 'Immerse yourself in a serene atmosphere inspired by the eternal groves of Vrindavan, where every breeze whispers divine love.', icon: '🌿' },
              { title: 'Divine Architecture', desc: 'Experience the perfect harmony of modern luxury infused with traditional temple aesthetics, featuring intricate arches and sacred geometry.', icon: '🏛️' },
              { title: 'Spiritual Experience', desc: 'Awaken your soul with morning aartis, meditation spaces, and the gentle chiming of temple bells creating a holistic retreat.', icon: '🪔' }
            ].map((feature, i) => (
              <Reveal key={i} delay={i * 200}>
                <div className="bg-[var(--card-bg)] backdrop-blur-md p-10 rounded-2xl shadow-xl hover:-translate-y-4 transition-all duration-500 border-t-4 border-[var(--color-gold)] relative group overflow-hidden h-full flex flex-col items-center text-center">
                  {/* Watermark */}
                  <div className="absolute -bottom-10 -right-10 text-9xl opacity-5 group-hover:opacity-10 group-hover:rotate-12 transition-all transform origin-center font-sanskrit text-[var(--color-saffron)]">ॐ</div>
                  
                  <div className="text-6xl mb-6 bg-gray-800 p-4 rounded-full shadow-inner text-[var(--color-saffron)]">{feature.icon}</div>
                  <h3 className="text-3xl font-serif mb-4 text-[var(--color-gold)]">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed font-sans">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DIVINE EXPERIENCES SECTION */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif text-[var(--color-gold)] mb-4">Divine Experiences Await</h2>
              <div className="flex justify-center items-center gap-4 mb-4">
                <span className="w-16 h-px bg-[var(--color-gold)]"></span>
                <span className="text-xl">🪔</span>
                <span className="w-16 h-px bg-[var(--color-gold)]"></span>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Morning Aarti', desc: 'Start your day with the divine vibrations of the morning Aarti by the serene riverbanks.', icon: '🌅' },
              { title: 'Yoga & Meditation', desc: 'Find inner peace with guided sessions in our tranquil meditation gardens.', icon: '🧘‍♀️' },
              { title: 'Temple Visits', desc: 'Guided tours to nearby sacred shrines and ancient temples.', icon: '🛕' },
              { title: 'Satvik Dining', desc: 'Nourish your body and soul with our pure, spiritually prepared vegetarian cuisine.', icon: '🍽️' },
              { title: 'Evening Bhajan', desc: 'Immerse in devotion with live musical gatherings and soulful kirtans every evening.', icon: '🎵' },
              { title: 'Peacock Gardens', desc: 'Stroll through our lush gardens, home to beautiful peacocks echoing Vrindavan.', icon: '🦚' },
            ].map((exp, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="flex items-start gap-6 p-6 rounded-2xl hover:bg-gray-800 transition-colors shadow-sm hover:shadow-lg border border-transparent hover:border-[var(--color-gold)]/50 group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-saffron)]/10 flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform shrink-0 shadow-inner">
                    {exp.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[var(--color-gold)] mb-2 group-hover:text-[var(--color-saffron)] transition-colors">{exp.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{exp.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GUEST TESTIMONIALS SECTION */}
      <section className="py-24 bg-[#151525] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582292866953-2708b73059da?q=80&w=2000')] opacity-10 bg-cover bg-center mix-blend-screen" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Reveal>
            <h2 className="text-5xl font-serif text-[var(--color-gold)] mb-16">Blessings from Our Guests</h2>
          </Reveal>
          
          <div className="flex flex-wrap justify-center gap-8">
            {recentReviews.length > 0 ? recentReviews.map((testimonial, i) => (
              <Reveal key={testimonial.id} delay={i * 200}>
                <div className="bg-gray-800 p-8 w-full max-w-sm mx-auto shadow-xl relative mt-8 border-2 border-gray-700 rounded-sm">
                  {/* Parchment styling corners */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--color-saffron)]"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--color-saffron)]"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--color-saffron)]"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--color-saffron)]"></div>
                  
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full border-4 border-[var(--color-gold)] bg-gray-200 overflow-hidden shadow-lg">
                    <Image 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.user?.name || 'Google Guest')}&background=f97316&color=fff&size=150`} 
                      alt="Guest" 
                      fill 
                      sizes="80px" 
                      className="object-cover" 
                      unoptimized
                    />
                  </div>
                  
                  <div className="mt-8 mb-4 text-[var(--color-saffron)] flex justify-center gap-1">
                    {'🪷'.repeat(testimonial.rating || 5)}
                  </div>
                  
                  <p className="font-cormorant text-xl italic text-gray-300 mb-6 leading-relaxed line-clamp-4">
                    "{testimonial.comment}"
                  </p>
                  
                  <div className="border-t border-gray-600 pt-4">
                    <p className="font-bold text-[var(--color-gold)] font-serif text-lg">{testimonial.user?.name || 'Google Guest'}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Verified Guest</p>
                  </div>
                </div>
              </Reveal>
            )) : (
              <p className="text-gray-400 italic">Divine blessings from our guests will appear here soon.</p>
            )}
          </div>
          
          {recentReviews.length > 0 && (
            <Reveal delay={600}>
              <div className="mt-16 text-center">
                <Link href="/reviews" className="inline-block px-10 py-4 bg-transparent border-2 border-[var(--color-saffron)] text-[var(--color-saffron)] rounded-full font-bold text-lg hover:bg-[var(--color-saffron)] hover:text-white transition-all shadow-lg hover:-translate-y-1">
                  See More Reviews
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* 6. SPECIAL OFFERS SECTION */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-serif text-center text-[var(--color-gold)] mb-12">Divine Blessings & Offers</h2>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Offer 1 */}
            <Reveal delay={100}>
              <div className="flex flex-col sm:flex-row bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-[var(--color-gold)] group">
                <div className="sm:w-2/5 bg-[var(--color-saffron)] p-6 flex flex-col justify-center items-center text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582560475093-ba66accbc424?q=80&w=400')] bg-cover opacity-20 mix-blend-multiply" />
                  <span className="relative z-10 text-5xl font-bold mb-2 font-serif">20%</span>
                  <span className="relative z-10 text-lg uppercase tracking-widest text-center">Off</span>
                </div>
                <div className="p-8 sm:w-3/5 flex flex-col justify-between relative">
                  <div>
                    <span className="absolute top-4 right-4 text-[var(--color-saffron)] text-xs font-bold px-2 py-1 bg-[var(--color-saffron)]/10 rounded-full animate-pulse">LIMITED TIME</span>
                    <h3 className="text-2xl font-serif text-white mb-2">Spiritual Retreat Package</h3>
                    <p className="text-sm text-gray-400 mb-4">Stay 3 nights and receive complimentary morning aarti access, yoga sessions, and one satvik dinner.</p>
                  </div>
                  <button className="w-full py-3 border-2 border-[var(--color-saffron)] text-[var(--color-saffron)] font-bold rounded-lg hover:bg-[var(--color-saffron)] hover:text-white transition-colors">
                    Claim Blessing
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Offer 2 */}
            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-[var(--color-gold)] group">
                <div className="sm:w-2/5 bg-[var(--color-maroon)] p-6 flex flex-col justify-center items-center text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=400')] bg-cover opacity-20 mix-blend-overlay" />
                  <span className="relative z-10 text-5xl font-bold mb-2 font-serif">15%</span>
                  <span className="relative z-10 text-lg uppercase tracking-widest text-center">Off</span>
                </div>
                <div className="p-8 sm:w-3/5 flex flex-col justify-between relative">
                  <div>
                    <span className="absolute top-4 right-4 text-[var(--color-maroon)] text-xs font-bold px-2 py-1 bg-[var(--color-maroon)]/10 rounded-full">FESTIVE</span>
                    <h3 className="text-2xl font-serif text-white mb-2">Janmashtami Special</h3>
                    <p className="text-sm text-gray-400 mb-4">Celebrate divine love with special room decor, prasad baskets, and VIP temple darshan access.</p>
                  </div>
                  <button className="w-full py-3 border-2 border-[var(--color-maroon)] text-[var(--color-maroon)] font-bold rounded-lg hover:bg-[var(--color-maroon)] hover:text-white transition-colors">
                    Claim Blessing
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7. LOCATION SECTION */}
      <section className="py-24 bg-gray-900 border-t border-[var(--border-color)]">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-4xl font-serif text-center text-[var(--color-gold)] mb-12">Blessed Location</h2>
          </Reveal>
          <div className="flex flex-col lg:flex-row gap-12 bg-gray-800 p-4 rounded-3xl shadow-xl border border-[var(--color-gold)]/30">
            <div className="lg:w-1/2 rounded-2xl overflow-hidden h-[400px] relative bg-gray-200">
              {/* Simulated Map */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000')] bg-cover bg-center opacity-80" />
              <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[var(--color-saffron)] mb-2 animate-bounce">
                  <span className="text-2xl">🛕</span>
                </div>
                <div className="bg-gray-900 px-4 py-2 rounded-lg shadow-xl font-bold text-sm">
                  Word No. 6, Dehra Gopipur
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 p-6 flex flex-col justify-center">
              <h3 className="text-3xl font-serif mb-6 text-[var(--color-saffron)]">Nearby Sacred Sites</h3>
              <ul className="space-y-6">
                {[
                  { name: 'Ancient Radha Krishna Mandir', dist: '0.5 km (5 min walk)', icon: '🚶' },
                  { name: 'Beas River Ghats', dist: '1.2 km (15 min walk)', icon: '🌊' },
                  { name: 'Spiritual Markets', dist: '0.2 km (2 min walk)', icon: '🛍️' },
                  { name: 'Meditation Gardens', dist: '1.5 km (5 min drive)', icon: '🚗' },
                ].map((site, i) => (
                  <li key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-700 transition-colors border border-transparent hover:border-[var(--color-gold)]/50 group">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-saffron)]/20 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                      {site.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white">{site.name}</h4>
                      <p className="text-sm text-gray-400">{site.dist}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
