import Reveal from '@/components/Reveal';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-32 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal>
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">Our Story</h1>
            <p className="text-xl text-orange-500 font-bold uppercase tracking-widest">Word No. 6, Dehra Gopipur</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <Reveal delay={100}>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to Vishram Sthal</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                Nestled in the heart of Dehra Gopipur, Vishram Sthal is more than just a hotel; it's a sanctuary of luxury and peace. Located perfectly at Word No. 6, we offer our guests breathtaking views and unparalleled comfort.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                Since our inception, our mission has been to provide a home away from home. Whether you're here for a short business trip or a long, relaxing vacation, our state-of-the-art amenities and world-class service ensure an unforgettable stay.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="grid grid-cols-2 gap-6">
              <div className="h-72 bg-gray-200 dark:bg-gray-700 rounded-3xl overflow-hidden shadow-2xl transform -translate-y-6">
                 <img src="https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?w=500" alt="Hotel" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="h-72 bg-gray-200 dark:bg-gray-700 rounded-3xl overflow-hidden shadow-2xl transform translate-y-6">
                 <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500" alt="Room" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Premium Amenities</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">We've curated everything you need for a perfect stay.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: '📶', name: 'High-Speed WiFi' },
                { icon: '🍽️', name: 'In-house Restaurant' },
                { icon: '🏊‍♂️', name: 'Swimming Pool' },
                { icon: '🚗', name: 'Valet Parking' },
                { icon: '💆‍♀️', name: 'Spa & Wellness' },
                { icon: '🛎️', name: '24/7 Room Service' },
                { icon: '🏋️‍♂️', name: 'Fitness Center' },
                { icon: '👔', name: 'Laundry Service' },
              ].map((amenity, i) => (
                <div key={i} className="text-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-3 hover:shadow-2xl transition-all duration-300">
                  <div className="text-5xl mb-6">{amenity.icon}</div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{amenity.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-32 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-gray-900 dark:text-white">Meet Our Team</h2>
            <div className="flex justify-center gap-12 flex-wrap">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-56 text-center group">
                  <div className="w-40 h-40 mx-auto bg-gray-300 dark:bg-gray-700 rounded-full mb-6 overflow-hidden shadow-xl border-4 border-white dark:border-gray-800 group-hover:scale-105 transition-transform">
                     <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="Team Member" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white">Staff Member {i}</h4>
                  <p className="text-sm text-orange-500 font-bold mt-1">Hospitality</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Find Us on the Map</h2>
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px] border border-gray-200 dark:border-gray-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13543.515220805128!2d76.2155!3d31.8762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904d9a1b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sDehra%20Gopipur%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy">
              </iframe>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
