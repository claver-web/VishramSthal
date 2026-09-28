import Link from 'next/link';
import Image from 'next/image';

import prisma from '@/lib/prisma';

export const metadata = {
  title: "Wedding Venues - Shani Marriage Palace | Banquet Halls & Lawns",
  description: "Browse our stunning selection of indoor banquet halls, outdoor lawns, and terrace venues for your perfect day."
};

export const dynamic = 'force-dynamic';

export default async function VenuesListing() {
  const venues = await prisma.weddingVenue.findMany({
    where: { isAvailable: true }
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#1a0a0a]">
      {/* Hero Banner */}
      <div className="relative pt-32 pb-20 flex items-center justify-center min-h-[40vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a] via-rose-950/50 to-[#1a0a0a] z-10" />
        <Image src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000" alt="Venues" fill className="object-cover opacity-30 z-0" />
        
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-serif text-amber-400 mb-4">Our Wedding Venues</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Explore spaces designed to make your special moments unforgettable.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar (Mock) */}
        <div className="w-full lg:w-1/4">
          <div className="bg-gray-900 rounded-2xl p-6 sticky top-24 border border-gray-800">
            <h3 className="text-xl font-serif text-rose-300 mb-6 border-b border-gray-800 pb-4">Filter Venues</h3>
            
            <div className="mb-6">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Venue Type</h4>
              <div className="space-y-2">
                {['Single Hall', 'Double Hall', 'Diamond Hall'].map(t => (
                  <label key={t} className="flex items-center gap-3 text-gray-300">
                    <input type="checkbox" className="accent-rose-500 w-4 h-4" /> {t}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Capacity</h4>
              <div className="space-y-2">
                {['100-200', '200-500', '500+'].map(c => (
                  <label key={c} className="flex items-center gap-3 text-gray-300">
                    <input type="checkbox" className="accent-rose-500 w-4 h-4" /> {c} Guests
                  </label>
                ))}
              </div>
            </div>
            
            <button className="w-full py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-500 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Venues Grid */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {venues.map(venue => (
              <div key={venue.id} className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-rose-500/50 transition-colors flex flex-col group">
                <div className="relative h-64 overflow-hidden">
                  <Image src={venue.images?.[0] || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800'} alt={venue.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-lg">
                    {venue.type}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-serif text-white">{venue.name}</h3>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                    <span className="flex items-center gap-1">👥 {venue.capacity} Guests</span>
                    <span className="flex items-center gap-1">🏷️ ₹{(venue.priceStarting || 0).toLocaleString()}/day</span>
                  </div>
                  
                  <ul className="text-sm text-gray-400 space-y-2 mb-8 flex-grow">
                    {(venue.amenities || []).slice(0, 4).map(f => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="text-amber-500">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  
                  <Link href={`/wedding/venues/${venue.id}`} className="w-full block text-center py-3 border-2 border-rose-600 text-rose-500 font-bold rounded-lg hover:bg-rose-600 hover:text-white transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
