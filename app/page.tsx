import Link from 'next/link';
import Reveal from '@/components/Reveal';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-gray-800/80 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?q=80&w=2000')] bg-cover bg-center animate-pulse-slow" />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Vishram Sthal</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-xl md:text-3xl text-gray-200 mb-10 font-light drop-shadow-md">
              Word No. 6, Dehra Gopipur, Himachal Pradesh
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rooms" className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold text-lg transition-transform transform hover:scale-105 shadow-xl">
                Explore Rooms
              </Link>
              <Link href="/about" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-semibold text-lg transition-transform transform hover:scale-105 shadow-xl">
                Learn More
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Why Choose Us?</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Luxury Rooms', desc: 'Experience comfort like never before with our premium amenities.', icon: '🛏️' },
              { title: 'Prime Location', desc: 'Located centrally at Word No. 6, easily accessible and scenic.', icon: '📍' },
              { title: '24/7 Service', desc: 'Our dedicated staff is always available to cater to your needs.', icon: '🛎️' }
            ].map((feature, i) => (
              <Reveal key={i} delay={i * 200}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:-translate-y-3 transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center group h-full">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Room Preview Section */}
      <section className="py-24 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Our Featured Rooms</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { type: 'Standard', price: 2000, color: 'from-blue-400 to-blue-600' },
              { type: 'Deluxe', price: 4000, color: 'from-purple-400 to-purple-600' },
              { type: 'Suite', price: 8000, color: 'from-orange-400 to-orange-600' }
            ].map((room, i) => (
              <Reveal key={i} delay={i * 200}>
                <div className="rounded-3xl overflow-hidden shadow-2xl group border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 h-full flex flex-col hover:shadow-3xl transition-shadow">
                  <div className={`h-64 bg-gradient-to-br ${room.color} flex items-center justify-center`}>
                    <span className="text-white text-3xl font-extrabold opacity-90 group-hover:scale-110 transition-transform drop-shadow-md">{room.type}</span>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{room.type} Room</h3>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-orange-500">₹{room.price}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">/night</span>
                      </div>
                    </div>
                    <Link href={`/rooms?type=${room.type.toUpperCase()}`} className="mt-auto block w-full text-center py-4 rounded-xl border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold text-lg transition-all">
                      View Details
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-4xl font-bold mb-16 text-gray-900 dark:text-white">Guest Reviews</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Rahul S.', review: 'Absolutely beautiful property in Dehra Gopipur! The staff was incredibly welcoming and the amenities are top-notch.' },
              { name: 'Priya K.', review: 'The Deluxe room was spacious and clean. Loved the prime location at Word No. 6. Will visit again.' },
              { name: 'Amit V.', review: 'Best hotel experience in Himachal. The 24/7 service truly makes a difference. Highly recommended!' }
            ].map((testimonial, i) => (
              <Reveal key={i} delay={i * 200}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 h-full flex flex-col justify-between hover:-translate-y-2 transition-transform">
                  <div>
                    <div className="text-orange-500 text-5xl font-serif mb-2 leading-none">"</div>
                    <p className="text-gray-600 dark:text-gray-300 italic mb-6 text-lg">"{testimonial.review}"</p>
                  </div>
                  <p className="font-bold text-gray-900 dark:text-white text-lg">- {testimonial.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500 to-orange-600 text-center">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-md">Ready to Experience Luxury?</h2>
            <Link href="/rooms" className="inline-block px-12 py-5 bg-white text-orange-600 hover:bg-gray-100 rounded-full font-bold text-xl transition-transform transform hover:scale-105 shadow-2xl">
              Book Your Stay Now
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
