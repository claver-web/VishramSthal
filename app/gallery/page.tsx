'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, X, ChevronLeft, Maximize2, Sparkles, Image as ImageIcon, Loader2 } from 'lucide-react';
import Reveal from '@/components/Reveal';

interface RoomData {
  id: string;
  number: string;
  name?: string;
  type: string;
  price: number;
  description?: string;
  images?: string[];
}

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  src: string;
  description: string;
  roomId?: string;
}

const STATIC_PROPERTY_ITEMS: GalleryItem[] = [
  {
    id: 'team-1',
    title: 'Shubhankur Sharma',
    category: 'team',
    categoryLabel: 'Team',
    src: '/radhe.jpg',
    description: 'Vishram Sthal Team',
  },
  {
    id: 'team-2',
    title: 'Manoj Bhardwaj',
    category: 'team',
    categoryLabel: 'Team',
    src: '/radhe2.jpg',
    description: 'Vishram Sthal Team',
  },
  {
    id: 'team-3',
    title: 'Acharya Deshbandhu',
    category: 'team',
    categoryLabel: 'Team',
    src: '/radhe3.jpeg',
    description: 'Vishram Sthal Team',
  },
];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(STATIC_PROPERTY_ITEMS);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchGalleryData() {
      try {
        setLoading(true);
        const res = await fetch('/api/rooms');
        if (res.ok) {
          const rooms: RoomData[] = await res.json();
          const dynamicItems: GalleryItem[] = [];

          rooms.forEach((room) => {
            if (room.images && room.images.length > 0) {
              room.images.forEach((imgUrl, imgIdx) => {
                dynamicItems.push({
                  id: `room-${room.id}-${imgIdx}`,
                  title: room.name || `Room ${room.number}`,
                  category: 'rooms',
                  categoryLabel: `${room.type.replace('_', ' ')} Room`,
                  src: imgUrl,
                  description: room.description || `₹${room.price}/night - ${room.type} accommodation at Vishram Sthal.`,
                  roomId: room.id,
                });
              });
            }
          });

          setItems([...dynamicItems, ...STATIC_PROPERTY_ITEMS]);
        }
      } catch (err) {
        console.error('Failed to fetch gallery rooms:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGalleryData();
  }, []);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'team', label: 'Team' },
  ];

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter((item) => item.category === activeCategory);

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? filteredItems.length - 1 : selectedIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === filteredItems.length - 1 ? 0 : selectedIndex + 1);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-24">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-b from-neutral-900 to-neutral-950 border-b border-neutral-800/80 pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-amber-500 text-sm mb-4">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-neutral-300">Gallery</span>
          </div>

          <div className="flex items-center gap-3 text-amber-500 font-medium text-sm mb-2">
            <Sparkles size={16} />
            <span className="uppercase tracking-widest text-xs">Visual Tour</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Photo Gallery
          </h1>
          <p className="text-neutral-400 max-w-2xl mt-3 text-lg leading-relaxed">
            Explore authentic photos of Shree Radhe Radhe Vishram Sthali rooms, sanctuary spaces, and team.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pt-8 pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedIndex(null);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105'
                    : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800 hover:border-amber-500/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
            <Loader2 className="animate-spin text-amber-500 mb-4" size={36} />
            <p className="text-sm font-medium">Loading gallery photos...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-neutral-800 rounded-3xl bg-neutral-900/40 p-8">
            <ImageIcon className="mx-auto text-neutral-600 mb-4" size={48} />
            <h3 className="text-xl font-bold text-white">No photos found</h3>
            <p className="text-neutral-400 mt-2 text-sm">No images are currently available in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, index) => (
              <Reveal key={item.id} delay={index * 40}>
                <div
                  onClick={() => setSelectedIndex(index)}
                  className="group relative h-80 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 cursor-pointer transition-all duration-500 shadow-xl hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)]"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-neutral-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-950/70 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                    <Maximize2 size={16} />
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 inset-x-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-300 mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && filteredItems[selectedIndex] && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between z-10" onClick={(e) => e.stopPropagation()}>
            <div>
              <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest">
                {filteredItems[selectedIndex].categoryLabel}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                {filteredItems[selectedIndex].title}
              </h2>
            </div>

            <button
              onClick={() => setSelectedIndex(null)}
              className="p-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-full border border-neutral-800 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Display Area */}
          <div
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 z-20 p-3.5 rounded-full bg-neutral-900/80 hover:bg-amber-500 text-white hover:text-neutral-950 border border-neutral-800 transition-all duration-300 shadow-2xl"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Image Container */}
            <div className="relative w-full max-w-5xl h-[65vh] sm:h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-neutral-800">
              <Image
                src={filteredItems[selectedIndex].src}
                alt={filteredItems[selectedIndex].title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 z-20 p-3.5 rounded-full bg-neutral-900/80 hover:bg-amber-500 text-white hover:text-neutral-950 border border-neutral-800 transition-all duration-300 shadow-2xl"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Footer Caption */}
          <div
            className="text-center max-w-xl mx-auto z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-neutral-400 text-sm">
              {filteredItems[selectedIndex].description}
            </p>

            {filteredItems[selectedIndex].roomId && (
              <Link
                href={`/rooms/${filteredItems[selectedIndex].roomId}`}
                className="inline-block mt-3 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs rounded-full transition-transform hover:scale-105"
              >
                View Room Details
              </Link>
            )}

            <p className="text-xs text-neutral-500 font-mono mt-2">
              {selectedIndex + 1} / {filteredItems.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
