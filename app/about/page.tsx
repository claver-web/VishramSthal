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
              {[
                { name: 'Team Member 1', role: 'Hospitality', img: '/radhe.jpg' },
                { name: 'Team Member 2', role: 'Management', img: '/radhe1.jpg' }
              ].map((member, i) => (
                <div key={i} className="w-56 text-center group">
                  <div className="w-40 h-40 mx-auto bg-gray-300 dark:bg-gray-700 rounded-full mb-6 overflow-hidden shadow-xl border-4 border-amber-500/50 group-hover:scale-105 transition-transform">
                     <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white">{member.name}</h4>
                  <p className="text-sm text-orange-500 font-bold mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="space-y-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">Find Us on the Map</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Main Map */}
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold text-amber-500 mb-4">Shree Radhe Radhe Vishram Sthali</h3>
                <div className="w-full rounded-3xl overflow-hidden shadow-2xl h-[400px] border border-gray-200 dark:border-gray-700 relative mb-6">
                  <iframe 
                    src="https://maps.google.com/maps?q=31.8793295,76.2164309&t=&z=18&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy">
                  </iframe>
                </div>
                <a 
                  href="https://www.google.com/maps/place/%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80+%E0%A4%B0%E0%A4%BE%E0%A4%A7%E0%A5%87+%E0%A4%B0%E0%A4%BE%E0%A4%A7%E0%A5%87+%E0%A4%B5%E0%A4%BF%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%AE+%E0%A4%B8%E0%A5%8D%E0%A4%A5%E0%A4%B2%E0%A5%80/@31.8791444,76.2160431,230m/data=!3m1!1e3!4m15!1m8!3m7!1s0x391b3970c005823f:0x5eebb5903b1d012!2sDehra+Gopipur,+Himachal+Pradesh+177101!3b1!8m2!3d31.8817558!4d76.2146448!16zL20vMGYxY2ti!3m5!1s0x391b39b3a3b742e1:0x3c53ba0b800f489a!8m2!3d31.8793295!4d76.2164309!16s%2Fg%2F11zcnkkv9j!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  Get Directions
                </a>
              </div>

              {/* Nearby Rooms Map */}
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold text-amber-500 mb-4">Stay Near Rooms</h3>
                <div className="w-full rounded-3xl overflow-hidden shadow-2xl h-[400px] border border-gray-200 dark:border-gray-700 relative mb-6">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d607.2681583915511!2d76.23435568615892!3d31.861472175993853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1785241534113!5m2!1sen!2sin"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=31.861472,76.234355"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-amber-500 font-bold py-3 px-8 rounded-full border border-amber-500/30 transition-transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
