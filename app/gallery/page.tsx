'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, X, ChevronLeft, Maximize2, Sparkles, Image as ImageIcon, Loader2 } from 'lucide-react';
import Reveal from '@/components/Reveal';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  src: string;
  description: string;
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchGalleryData() {
      try {
        setLoading(true);
        const dynamicItems: GalleryItem[] = [];

        // 1. Fetch images uploaded specifically to Media Library via /api/media
        const res = await fetch('/api/media');
        if (res.ok) {
          const mediaList: any[] = await res.json();
          mediaList.forEach((m) => {
            dynamicItems.push({
              id: m.id,
              title: m.filename ? m.filename.split('.')[0] : 'Gallery Photo',
              category: 'gallery',
              categoryLabel: 'Gallery Upload',
              src: m.url,
              description: `Uploaded on ${new Date(m.createdAt || Date.now()).toLocaleDateString()}`,
            });
          });
        }

        // 2. Local fallback if saved in browser storage
        const savedMedia = localStorage.getItem('vishram_admin_media');
        if (savedMedia) {
          try {
            const adminMedia: any[] = JSON.parse(savedMedia);
            adminMedia.forEach((m) => {
              dynamicItems.push({
                id: m.id || `media-${Date.now()}-${Math.random()}`,
                title: m.name ? m.name.split('.')[0] : 'Gallery Upload',
                category: 'gallery',
                categoryLabel: 'Gallery Upload',
                src: m.url,
                description: m.date ? `Uploaded on ${m.date}` : 'Gallery photo',
              });
            });
          } catch (e) {
            console.error('Failed to parse saved media:', e);
          }
        }

        // De-duplicate by image source URL
        const uniqueItems = Array.from(new Map(dynamicItems.map(item => [item.src, item])).values());
        setItems(uniqueItems);
      } catch (err) {
        console.error('Failed to fetch gallery images:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGalleryData();
  }, []);

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? items.length - 1 : selectedIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === items.length - 1 ? 0 : selectedIndex + 1);
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
            Exclusively showing photos uploaded directly to the Vishram Sthal Gallery.
          </p>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
            <Loader2 className="animate-spin text-amber-500 mb-4" size={36} />
            <p className="text-sm font-medium">Loading gallery photos...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-neutral-800 rounded-3xl bg-neutral-900/40 p-8 max-w-md mx-auto">
            <ImageIcon className="mx-auto text-neutral-600 mb-4" size={48} />
            <h3 className="text-xl font-bold text-white">No gallery photos uploaded yet</h3>
            <p className="text-neutral-400 mt-2 text-sm">
              Photos uploaded in Admin Media Library will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {items.map((item, index) => (
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
      {selectedIndex !== null && items[selectedIndex] && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between z-10" onClick={(e) => e.stopPropagation()}>
            <div>
              <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest">
                {items[selectedIndex].categoryLabel}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                {items[selectedIndex].title}
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
                src={items[selectedIndex].src}
                alt={items[selectedIndex].title}
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
              {items[selectedIndex].description}
            </p>
            <p className="text-xs text-neutral-500 font-mono mt-2">
              {selectedIndex + 1} / {items.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
