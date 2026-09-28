import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function VenueDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const venue = await prisma.weddingVenue.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!venue) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1a0a0a]">
      {/* Hero Image */}
      <div className="relative pt-24 h-[60vh] min-h-[400px]">
        <Image src={venue.images?.[0] || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000'} alt={venue.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0a] via-[#1a0a0a]/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
          <div className="container mx-auto">
            <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-sm font-bold tracking-widest uppercase mb-4">
              {venue.type} Venue
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-2">{venue.name}</h1>
            <p className="text-xl text-gray-300">Up to {venue.capacity} Guests • ₹{(venue.priceStarting || 0).toLocaleString()}/day</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="w-full lg:w-2/3">
          <section className="mb-12">
            <h2 className="text-3xl font-serif text-rose-300 mb-6">About the Venue</h2>
            <p className="text-gray-300 leading-relaxed text-lg">{venue.description || "No description provided."}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-serif text-rose-300 mb-6">Amenities & Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(venue.amenities || []).map(f => (
                <div key={f} className="flex items-center gap-3 p-4 bg-gray-900 rounded-xl border border-gray-800">
                  <span className="text-amber-500 text-xl">✓</span>
                  <span className="text-gray-200">{f}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-serif text-rose-300 mb-6">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(venue.images || []).map((img, i) => (
                <div key={i} className="relative h-48 rounded-xl overflow-hidden bg-gray-800">
                  <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Booking Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-900 rounded-2xl p-8 sticky top-28 border border-gray-800 shadow-2xl">
            <h3 className="text-2xl font-serif text-white mb-6">Request Booking</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Your Name</label>
                <input type="text" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white outline-none focus:border-rose-500" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                <input type="tel" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white outline-none focus:border-rose-500" placeholder="+91 9805271636" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Estimated Date</label>
                <input type="date" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white outline-none focus:border-rose-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Guest Count</label>
                <select className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white outline-none focus:border-rose-500">
                  <option>100-200</option>
                  <option>200-500</option>
                  <option>500+</option>
                </select>
              </div>
              <button type="button" className="w-full py-4 mt-4 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-500 transition-colors shadow-lg">
                Send Enquiry
              </button>
            </form>
            
            <div className="mt-6 text-center border-t border-gray-800 pt-6">
              <p className="text-sm text-gray-400 mb-2">Prefer to call?</p>
              <a href="tel:+919805271636" className="text-xl font-bold text-amber-400">+91 9805271636</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
