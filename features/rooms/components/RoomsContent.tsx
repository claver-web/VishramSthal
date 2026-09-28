'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Reveal from '@/components/Reveal';
import RoomFilterPanel from '@/components/rooms/RoomFilterPanel';
import RoomCard from '@/components/rooms/RoomCard';
import RoomCardSkeleton from '@/components/rooms/RoomCardSkeleton';
import { FilterIcon, GridIcon, ListIcon, XIcon } from '@/components/rooms/Icons';

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

export default function RoomsContent() {
  const searchParams = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const queryString = searchParams.toString();

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/rooms${queryString ? `?${queryString}` : ''}`);
        if (res.ok) {
          const data = await res.json();
          setRooms(data);
        } else {
          setRooms([]);
        }
      } catch (err) {
        setRooms([]);
      }
      setLoading(false);
    };
    fetchRooms();
  }, [queryString]);

  // Active filters for tags
  const activeFilters: { key: string, label: string }[] = [];
  searchParams.forEach((value, key) => {
    if (key === 'q' && value) activeFilters.push({ key, label: `Search: ${value}` });
    if (key === 'type' && value) value.split(',').forEach(v => activeFilters.push({ key: `type-${v}`, label: `Type: ${v}` }));
    if (key === 'capacity' && value) activeFilters.push({ key, label: `Guests: ${value}` });
    if (key === 'amenities' && value) value.split(',').forEach(v => activeFilters.push({ key: `am-${v}`, label: v }));
    if (key === 'view' && value) activeFilters.push({ key, label: value });
    if (key === 'minPrice' && value) activeFilters.push({ key, label: `Min ₹${value}` });
    if (key === 'maxPrice' && value) activeFilters.push({ key, label: `Max ₹${value}` });
  });

  return (
    <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Desktop Filter Panel */}
        <div className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-24 h-[calc(100vh-96px)] pb-4">
            <RoomFilterPanel />
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <div className={`fixed inset-0 z-50 transform transition-transform duration-300 lg:hidden ${mobileFilterOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFilterOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 h-[85vh] bg-gray-800 rounded-t-3xl overflow-hidden shadow-2xl flex flex-col">
            <RoomFilterPanel onMobileClose={() => setMobileFilterOpen(false)} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-700">
            <div>
              <p className="text-gray-300 font-medium">
                Showing <span className="font-bold text-white">{rooms.length}</span> {rooms.length === 1 ? 'sanctuary' : 'sanctuaries'}
              </p>
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button 
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-xl font-bold"
              >
                <FilterIcon className="w-5 h-5" />
                Filters
              </button>
              
              <div className="flex items-center bg-gray-900 rounded-lg p-1 ml-auto">
                <button 
                  onClick={() => setViewMode('grid')} 
                  className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-gray-800 shadow text-orange-500' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  <GridIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')} 
                  className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-gray-800 shadow text-orange-500' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  <ListIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Tags */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {activeFilters.map(filter => (
                <span key={filter.key} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-900/40 text-orange-200 border border-orange-800/50">
                  {filter.label}
                </span>
              ))}
            </div>
          )}

          {/* Room Grid / List */}
          {loading ? (
            <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {[1,2,3,4,5,6].map(i => (
                <RoomCardSkeleton key={i} viewMode={viewMode} />
              ))}
            </div>
          ) : rooms.length > 0 ? (
            <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {rooms.map((room, i) => (
                <RoomCard key={room.id} room={room} viewMode={viewMode} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-gray-800 rounded-3xl border border-dashed border-gray-700 relative overflow-hidden group">
              <div className="absolute inset-0 bg-mandala-pattern opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="relative z-10 w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-black/50 border border-gray-700">
                <FilterIcon className="w-10 h-10 text-orange-400" />
              </div>
              <h3 className="relative z-10 text-3xl font-extrabold text-white mb-3 font-serif">No Sanctuaries Found</h3>
              <p className="relative z-10 text-gray-400 text-center max-w-md mb-8 leading-relaxed">
                We couldn't find any sanctuaries matching your divine preferences. Please adjust your search criteria or clear some filters to reveal more options.
              </p>
              <button 
                onClick={() => window.location.href = '/rooms'}
                className="relative z-10 px-8 py-3 bg-gray-900 border-2 border-orange-500 text-orange-400 font-bold rounded-xl transition-all hover:bg-orange-500 hover:text-gray-900 shadow-md hover:shadow-lg hover:shadow-orange-500/20"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
