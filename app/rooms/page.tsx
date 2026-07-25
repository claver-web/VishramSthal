'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser, SignInButton } from '@clerk/nextjs';
import Reveal from '@/components/Reveal';

type Room = {
  id: string;
  number: string;
  type: string;
  price: number;
  capacity: number;
  description: string;
  amenities: string[];
  isAvailable: boolean;
};

export default function RoomsPage() {
  const { isSignedIn, isLoaded } = useUser();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We will build this API route in the next step, for now fetch/mock it
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/rooms?type=${filter}`);
        if (res.ok) {
          const data = await res.json();
          setRooms(data);
        } else {
          setRooms([]); // Fallback empty if api doesn't exist yet
        }
      } catch (err) {
        setRooms([]);
      }
      setLoading(false);
    };
    fetchRooms();
  }, [filter]);

  const filters = ['ALL', 'STANDARD', 'DELUXE', 'SUITE', 'PREMIUM'];

  return (
    <div className="min-h-screen py-32 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <Reveal>
          <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-12 text-gray-900 dark:text-white tracking-tight">Discover Our Rooms</h1>
        </Reveal>
        
        <Reveal delay={200}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all shadow-md ${filter === f ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white transform scale-105' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-3xl h-[600px] shadow-xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.length > 0 ? rooms.map((room, i) => (
              <Reveal key={room.id} delay={i * 100}>
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
                  <div className="h-56 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative group">
                    <span className="text-gray-600 dark:text-gray-300 font-bold group-hover:scale-110 transition-transform">Room View Placeholder</span>
                    <div className="absolute top-4 right-4">
                      {room.isAvailable ? (
                        <span className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">Available</span>
                      ) : (
                        <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">Booked</span>
                      )}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">{room.type} Room</h3>
                        <p className="text-orange-500 font-bold mt-1">Room {room.number} • Up to {room.capacity} Guests</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{room.price}</span>
                      <span className="text-lg text-gray-500 dark:text-gray-400">/ night</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 my-4 flex-grow leading-relaxed">{room.description}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {room.amenities.slice(0, 4).map(amenity => (
                        <span key={amenity} className="bg-orange-50 dark:bg-gray-700 text-orange-600 dark:text-orange-400 px-3 py-1.5 rounded-lg text-sm font-semibold border border-orange-100 dark:border-gray-600">
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 4 && (
                        <span className="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg text-sm font-semibold border border-gray-200 dark:border-gray-500">
                          +{room.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                    <div className="mt-auto">
                      {isLoaded && isSignedIn ? (
                        <Link href={`/booking/${room.id}`} className="block w-full text-center py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg rounded-xl transition-all shadow-lg transform hover:scale-105">
                          Book Now
                        </Link>
                      ) : (
                        <SignInButton mode="modal">
                          <button className="block w-full text-center py-4 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold text-lg rounded-xl transition-all shadow-lg transform hover:scale-105">
                            Sign In to Book
                          </button>
                        </SignInButton>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            )) : (
              <div className="col-span-1 md:col-span-3 text-center py-32">
                <p className="text-2xl text-gray-500 dark:text-gray-400 font-medium">Loading rooms from database...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
