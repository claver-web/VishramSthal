'use client';

import React, { useState, useEffect } from 'react';
import { SearchIcon, FilterIcon, XIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon } from './Icons';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const ROOM_TYPES = [
  { id: 'STANDARD', name: 'Tulsi Nivas (Standard)' },
  { id: 'DELUXE', name: 'Kunj Kutir (Deluxe)' },
  { id: 'SUITE', name: 'Radha Mahal (Suite)' },
  { id: 'PREMIUM', name: 'Krishna Kunj (Premium)' },
];

const AMENITIES = [
  'AC', 'Non-AC', 'Private Room', 'Dormitory', 'Attached Bathroom',
  'Balcony with View', 'Temple View', 'Garden Access', 'Meditation Space',
  'Work Desk', 'WiFi', 'TV', 'Room Service', 'Hot Water', 'Air Purifier'
];

const VIEW_TYPES = ['Temple View', 'Garden View', 'City View', 'River View'];
const CAPACITIES = [1, 2, 3, 4];

const SORT_OPTIONS = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'name_asc', label: 'Name: A to Z' },
  { id: 'capacity_asc', label: 'Capacity: Low to High' },
  { id: 'popularity', label: 'Popularity' },
];

interface FilterProps {
  onMobileClose?: () => void;
}

export default function RoomFilterPanel({ onMobileClose }: FilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const [selectedTypes, setSelectedTypes] = useState<string[]>(searchParams.get('type')?.split(',').filter(Boolean) || []);
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(searchParams.get('amenities')?.split(',').filter(Boolean) || []);
  const [selectedCapacity, setSelectedCapacity] = useState<string>(searchParams.get('capacity') || '');
  const [availableOnly, setAvailableOnly] = useState<boolean>(searchParams.get('available') !== 'false'); // Default true
  const [selectedView, setSelectedView] = useState<string>(searchParams.get('view') || '');
  const [sortOption, setSortOption] = useState<string>(searchParams.get('sort') || 'recommended');

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    type: true,
    price: true,
    amenities: false,
    capacity: true,
    view: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    const currentParams = searchParams.toString();
    const params = new URLSearchParams(currentParams);
    if (debouncedSearch) params.set('q', debouncedSearch);
    else params.delete('q');

    if (selectedTypes.length > 0) params.set('type', selectedTypes.join(','));
    else params.delete('type');

    if (minPrice) params.set('minPrice', minPrice);
    else params.delete('minPrice');

    if (maxPrice) params.set('maxPrice', maxPrice);
    else params.delete('maxPrice');

    if (selectedAmenities.length > 0) params.set('amenities', selectedAmenities.join(','));
    else params.delete('amenities');

    if (selectedCapacity) params.set('capacity', selectedCapacity);
    else params.delete('capacity');

    if (!availableOnly) params.set('available', 'false');
    else params.delete('available');

    if (selectedView) params.set('view', selectedView);
    else params.delete('view');

    if (sortOption && sortOption !== 'recommended') params.set('sort', sortOption);
    else params.delete('sort');

    const newQueryString = params.toString();
    if (currentParams !== newQueryString) {
      router.replace(`${pathname}?${newQueryString}`, { scroll: false });
    }
  }, [debouncedSearch, selectedTypes, minPrice, maxPrice, selectedAmenities, selectedCapacity, availableOnly, selectedView, sortOption, pathname, router, searchParams]);

  const toggleType = (id: string) => setSelectedTypes(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  const toggleAmenity = (am: string) => setSelectedAmenities(prev => prev.includes(am) ? prev.filter(a => a !== am) : [...prev, am]);

  return (
    <div className="bg-[#FFFDF7] dark:bg-gray-800 border-2 border-orange-500/20 rounded-2xl shadow-xl overflow-hidden flex flex-col h-full relative">
      {/* Temple Arch Decoration Top */}
      <div className="h-8 bg-gradient-to-r from-orange-400 to-orange-600 w-full relative" style={{ borderRadius: '1rem 1rem 0 0', clipPath: 'polygon(0 0, 5% 100%, 15% 0, 25% 100%, 35% 0, 50% 100%, 65% 0, 75% 100%, 85% 0, 95% 100%, 100% 0, 100% 100%, 0 100%)', transform: 'rotate(180deg)', top: '-1px' }}></div>
      <div className="h-4 bg-orange-600/10 w-full absolute top-0 left-0"></div>

      <div className="p-4 flex-grow mt-2 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FilterIcon className="w-4 h-4 text-orange-500" />
            Find Your Sanctuary
          </h2>
          {onMobileClose && (
            <button onClick={onMobileClose} className="lg:hidden p-2 text-gray-500 hover:text-orange-500 rounded-full hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors">
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all shadow-sm"
          />
        </div>

        {/* Sort (Mobile friendly placement) */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Sort By</label>
          <div className="relative">
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full text-sm appearance-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-2 pl-3 pr-8 focus:ring-2 focus:ring-orange-500 outline-none shadow-sm cursor-pointer"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        {/* Room Type */}
        <div className="mb-4 border-t border-gray-100 dark:border-gray-700 pt-3">
          <button onClick={() => toggleSection('type')} className="w-full flex justify-between items-center mb-2 group">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-orange-500 transition-colors">Spiritual Room Type</span>
            {expandedSections.type ? <ChevronUpIcon className="w-4 h-4 text-gray-500" /> : <ChevronDownIcon className="w-4 h-4 text-gray-500" />}
          </button>
          {expandedSections.type && (
            <div className="space-y-2 mt-2">
              {ROOM_TYPES.map(type => (
                <label key={type.id} className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${selectedTypes.includes(type.id) ? 'bg-orange-500 border-orange-500' : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 group-hover:border-orange-400'}`}>
                    {selectedTypes.includes(type.id) && <CheckIcon className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-xs">{type.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="mb-4 border-t border-gray-100 dark:border-gray-700 pt-3">
          <button onClick={() => toggleSection('price')} className="w-full flex justify-between items-center mb-2 group">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-orange-500 transition-colors">Price Range (₹)</span>
            {expandedSections.price ? <ChevronUpIcon className="w-4 h-4 text-gray-500" /> : <ChevronDownIcon className="w-4 h-4 text-gray-500" />}
          </button>
          {expandedSections.price && (
            <div className="flex items-center gap-2 mt-2">
              <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-1.5 px-2 focus:ring-1 focus:ring-orange-500 outline-none text-xs" />
              <span className="text-gray-400 text-xs">-</span>
              <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-1.5 px-2 focus:ring-1 focus:ring-orange-500 outline-none text-xs" />
            </div>
          )}
        </div>

        {/* Capacity */}
        <div className="mb-4 border-t border-gray-100 dark:border-gray-700 pt-3">
          <button onClick={() => toggleSection('capacity')} className="w-full flex justify-between items-center mb-2 group">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-orange-500 transition-colors">Guests</span>
            {expandedSections.capacity ? <ChevronUpIcon className="w-4 h-4 text-gray-500" /> : <ChevronDownIcon className="w-4 h-4 text-gray-500" />}
          </button>
          {expandedSections.capacity && (
            <div className="flex flex-wrap gap-2 mt-2">
              {CAPACITIES.map(cap => (
                <button
                  key={cap}
                  onClick={() => setSelectedCapacity(selectedCapacity === String(cap) ? '' : String(cap))}
                  className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center transition-all shadow-sm border ${selectedCapacity === String(cap) ? 'bg-orange-500 text-white border-orange-500' : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-orange-300'}`}
                >
                  {cap}{cap === 4 ? '+' : ''}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Amenities */}
        <div className="mb-4 border-t border-gray-100 dark:border-gray-700 pt-3">
          <button onClick={() => toggleSection('amenities')} className="w-full flex justify-between items-center mb-2 group">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-orange-500 transition-colors">Features & Amenities</span>
            {expandedSections.amenities ? <ChevronUpIcon className="w-4 h-4 text-gray-500" /> : <ChevronDownIcon className="w-4 h-4 text-gray-500" />}
          </button>
          {expandedSections.amenities && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {AMENITIES.map(am => (
                <label key={am} className="flex items-center gap-2 cursor-pointer group">
                  <div className={`relative w-6 h-3.5 rounded-full transition-colors ${selectedAmenities.includes(am) ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                    <div className={`absolute top-0.5 left-0.5 w-2.5 h-2.5 rounded-full bg-white transition-transform ${selectedAmenities.includes(am) ? 'transform translate-x-2.5' : ''}`}></div>
                  </div>
                  <span className="text-[11px] text-gray-700 dark:text-gray-300 line-clamp-1" title={am}>{am}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* View Type */}
        <div className="mb-4 border-t border-gray-100 dark:border-gray-700 pt-3">
          <button onClick={() => toggleSection('view')} className="w-full flex justify-between items-center mb-2 group">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-orange-500 transition-colors">Room View</span>
            {expandedSections.view ? <ChevronUpIcon className="w-4 h-4 text-gray-500" /> : <ChevronDownIcon className="w-4 h-4 text-gray-500" />}
          </button>
          {expandedSections.view && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {VIEW_TYPES.map(view => (
                <button
                  key={view}
                  onClick={() => setSelectedView(selectedView === view ? '' : view)}
                  className={`text-[11px] py-1.5 px-2 rounded-lg border text-center transition-all ${selectedView === view ? 'bg-orange-100 dark:bg-orange-900/30 border-orange-500 text-orange-700 dark:text-orange-300 font-bold' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-orange-300'}`}
                >
                  {view}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Availability Toggle */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-700 mb-4">
          <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-orange-500 transition-colors">Show Available Only</span>
            <div className={`relative w-8 h-4 rounded-full transition-colors ${availableOnly ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
              <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform ${availableOnly ? 'transform translate-x-4 shadow-sm' : ''}`}></div>
            </div>
            <input type="checkbox" className="hidden" checked={availableOnly} onChange={() => setAvailableOnly(!availableOnly)} />
          </label>
        </div>
      </div>

      {/* Mobile Apply Button */}
      {onMobileClose && (
        <div className="p-4 border-t border-orange-500/20 bg-white dark:bg-gray-900 lg:hidden">
          <button onClick={onMobileClose} className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-all shadow-[0_0_15px_rgba(249,115,22,0.4)] active:scale-95">
            Show Filtered Rooms
          </button>
        </div>
      )}
    </div>
  );
}
