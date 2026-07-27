'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Reveal from '@/components/Reveal';
import RoomFilterPanel from '@/components/rooms/RoomFilterPanel';
import RoomCard from '@/components/rooms/RoomCard';
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

function RoomsContent() {
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
          <div className="absolute bottom-0 left-0 right-0 h-[85vh] bg-[#FFFDF7] dark:bg-gray-800 rounded-t-3xl overflow-hidden shadow-2xl flex flex-col">
            <RoomFilterPanel onMobileClose={() => setMobileFilterOpen(false)} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Showing <span className="font-bold text-gray-900 dark:text-white">{rooms.length}</span> {rooms.length === 1 ? 'sanctuary' : 'sanctuaries'}
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
              
              <div className="flex items-center bg-gray-100 dark:bg-gray-900 rounded-lg p-1 ml-auto">
                <button 
                  onClick={() => setViewMode('grid')} 
                  className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-800 shadow text-orange-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                >
                  <GridIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')} 
                  className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-800 shadow text-orange-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
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
                <span key={filter.key} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200 border border-orange-200 dark:border-orange-800/50">
                  {filter.label}
                  {/* Note: In a real app we'd add an X icon to remove the filter, but URLSearchParams needs more logic to handle array deletions nicely without a router push callback per tag. */}
                </span>
              ))}
            </div>
          )}

          {/* Room Grid / List */}
          {loading ? (
            <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className={`animate-pulse bg-white dark:bg-gray-800 rounded-3xl shadow-xl ${viewMode === 'grid' ? 'h-[500px]' : 'h-64'}`}></div>
              ))}
            </div>
          ) : rooms.length > 0 ? (
            <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {rooms.map((room, i) => (
                <RoomCard key={room.id} room={room} viewMode={viewMode} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
              <div className="w-24 h-24 bg-orange-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                <FilterIcon className="w-10 h-10 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Sanctuaries Found</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-8">
                We couldn't find any rooms matching your divine preferences. Please try adjusting your filters or search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RoomsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#F9F7F1] dark:bg-gray-900 transition-colors">
      <Suspense fallback={<div className="container mx-auto px-4 text-center py-20">Loading...</div>}>
        <RoomsContent />
      </Suspense>
    </div>
  );
}
