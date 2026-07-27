import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser, SignInButton } from '@clerk/nextjs';
import { StarIcon } from './Icons';
import Reveal from '@/components/Reveal';

interface Room {
  id: string;
  number: string;
  type: string;
  price: number;
  capacity: number;
  description: string;
  amenities: string[];
  isAvailable: boolean;
}

interface RoomCardProps {
  room: Room;
  viewMode: 'grid' | 'list';
  index: number;
}

const getSpiritualName = (type: string) => {
  switch (type) {
    case 'STANDARD': return 'Tulsi Nivas';
    case 'DELUXE': return 'Kunj Kutir';
    case 'SUITE': return 'Radha Mahal';
    case 'PREMIUM': return 'Krishna Kunj';
    default: return type;
  }
};

export default function RoomCard({ room, viewMode, index }: RoomCardProps) {
  const { isSignedIn, isLoaded } = useUser();
  const [isHovered, setIsHovered] = useState(false);

  const spiritualName = getSpiritualName(room.type);
  const isList = viewMode === 'list';

  return (
    <Reveal delay={index * 50}>
      <div 
        className={`bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-700 transition-all duration-300 transform ${isHovered ? '-translate-y-2' : ''} ${isList ? 'flex flex-col md:flex-row h-full md:h-64' : 'flex flex-col h-full'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image / Banner */}
        <div className={`relative bg-gray-800 flex items-center justify-center overflow-hidden group ${isList ? 'w-full md:w-2/5 h-56 md:h-full shrink-0' : 'h-56'}`}>
          <Image 
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800" 
            alt="Room Image" 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}></div>
          <span className="relative z-10 text-gray-100 font-bold group-hover:scale-110 transition-transform flex flex-col items-center gap-2 drop-shadow-lg">
            <StarIcon className="w-8 h-8 text-gold-400" />
            <span className="tracking-widest uppercase text-sm">{spiritualName}</span>
          </span>
          
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            {room.isAvailable ? (
              <span className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-green-400">Available</span>
            ) : (
              <span className="bg-red-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-red-400">Booked</span>
            )}
          </div>
          
          {/* Card Badge */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="bg-gray-900/90 backdrop-blur-sm text-orange-400 px-3 py-1 rounded-lg text-xs font-bold shadow-lg shadow-black/10 uppercase tracking-wider">
              {room.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={`p-6 flex flex-col flex-grow ${isList ? 'w-full md:w-3/5 justify-between' : ''}`}>
          <div>
            <div className="flex justify-between items-start mb-2 gap-4">
              <div>
                <h3 className="text-2xl font-extrabold text-white line-clamp-1">{spiritualName}</h3>
                <p className="text-orange-400 font-semibold text-sm mt-1">Room {room.number} • {room.capacity} Guest{room.capacity > 1 ? 's' : ''}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-2xl font-bold text-white">₹{room.price}</span>
                <span className="block text-xs text-gray-400 font-medium uppercase tracking-wide mt-0.5">/ night</span>
              </div>
            </div>
            
            <p className={`text-gray-300 mt-4 mb-5 leading-relaxed text-sm ${isList ? 'line-clamp-2' : 'line-clamp-3'}`}>
              {room.description || `Experience the divine tranquility in our ${spiritualName}. Perfectly suited for your spiritual retreat.`}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {room.amenities.slice(0, isList ? 6 : 3).map(amenity => (
                <span key={amenity} className="bg-gray-700/50 text-orange-300 px-2.5 py-1 rounded-md text-xs font-semibold border border-gray-600 shadow-sm">
                  {amenity}
                </span>
              ))}
              {room.amenities.length > (isList ? 6 : 3) && (
                <span className="bg-gray-600/50 text-gray-400 px-2.5 py-1 rounded-md text-xs font-semibold border border-gray-500 shadow-sm">
                  +{room.amenities.length - (isList ? 6 : 3)} more
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-auto pt-4 border-t border-gray-700 flex gap-3">
            <Link href={`/rooms/${room.id}`} className="flex-1 text-center py-2.5 bg-gray-900 border-2 border-orange-500 text-orange-400 font-bold rounded-xl transition-all hover:bg-gray-800 shadow-sm text-sm">
              Details
            </Link>
            
            {isLoaded && isSignedIn ? (
              <Link href={`/booking/${room.id}`} className="flex-1 text-center py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm">
                Book Now
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="flex-1 text-center py-2.5 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
