'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, X, ChevronLeft, Maximize2, Sparkles } from 'lucide-react';
import Reveal from '@/components/Reveal';

interface GalleryItem {
  id: string;
  title: string;
  category: 'rooms' | 'ambiance' | 'spiritual' | 'dining';
  categoryLabel: string;
  src: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Divine Suite Bedroom',
    category: 'rooms',
    categoryLabel: 'Rooms & Suites',
    src: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=1200',
    description: 'Luxurious king bed with handcrafted wooden decor and warm ambient lighting.',
  },
  {
    id: '2',
    title: 'Spiritual Heritage Entrance',
    category: 'spiritual',
    categoryLabel: 'Temple & Divine View',
    src: 'https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?q=80&w=1200',
    description: 'The welcoming entrance decorated with sacred motifs and lotus arrangements.',
  },
  {
    id: '3',
    title: 'Serene Sunset Courtyard',
    category: 'ambiance',
    categoryLabel: 'Ambiance & Retreat',
    src: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=1200',
    description: 'Peaceful open courtyard overlooking the Kangra hills during golden hour.',
  },
  {
    id: '4',
    title: 'Satvik Dining Pavilion',
    category: 'dining',
    categoryLabel: 'Dining & Hospitality',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200',
    description: 'Pure vegetarian Satvik dining experience prepared with devotion.',
  },
  {
    id: '5',
    title: 'Deluxe Family Sanctuary',
    category: 'rooms',
    categoryLabel: 'Rooms & Suites',
    src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200',
    description: 'Spacious multi-guest suite with traditional brass finishes and plush seating.',
  },
  {
    id: '6',
    title: 'Morning Prayer & Aarti View',
    category: 'spiritual',
    categoryLabel: 'Temple & Divine View',
    src: 'https://images.unsplash.com/photo-1582292866953-2708b73059da?q=80&w=1200',
    description: 'Breathtaking sunrise views over nearby sacred shrines.',
  },
  {
    id: '7',
    title: 'Super Deluxe Balcony View',
    category: 'rooms',
    categoryLabel: 'Rooms & Suites',
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200',
    description: 'Private balcony overlooking peaceful green gardens in Dehra Gopipur.',
  },
  {
    id: '8',
    title: 'Meditation & Relaxation Lounge',
    category: 'ambiance',
    categoryLabel: 'Ambiance & Retreat',
    src: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200',
    description: 'Quiet sanctuary reserved for guests seeking inner peace and meditation.',
  },
  {
    id: '9',
    title: 'Evening Lantern Glow',
    category: 'ambiance',
    categoryLabel: 'Ambiance & Retreat',
    src: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?q=80&w=1200',
    description: 'Warm saffron lanterns casting a serene glow across the property path.',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'rooms', label: 'Rooms & Suites' },
  { id: 'spiritual', label: 'Spiritual Views' },
  { id: 'ambiance', label: 'Ambiance & Retreat' },
  { id: 'dining', label: 'Satvik Dining' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

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
            Immerse yourself in the divine peace, elegant rooms, and serene surroundings of Shree Radhe Radhe Vishram Sthali.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pt-8 pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
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

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 50}>
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
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
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
            <p className="text-xs text-neutral-500 font-mono mt-2">
              {selectedIndex + 1} / {filteredItems.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
