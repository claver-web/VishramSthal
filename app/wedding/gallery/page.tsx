"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [images, setImages] = useState<any[]>([]);
  
  useEffect(() => {
    fetch('/api/media')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        const weddingImgs = data
          .filter((item: any) => item.folder === 'wedding' || item.folder?.startsWith('wedding_'))
          .map((item: any, i: number) => {
             const typeStr = item.folder === 'wedding' ? 'Wedding' : item.folder.replace('wedding_', '');
             const capitalizedType = typeStr.charAt(0).toUpperCase() + typeStr.slice(1);
             return {
               id: item.id,
               src: item.url,
               type: capitalizedType,
               title: item.filename || 'Gallery Image',
               height: i % 3 === 0 ? "h-96" : (i % 2 === 0 ? "h-80" : "h-64")
             };
          });
        setImages(weddingImgs);
      })
      .catch(err => console.error(err));
  }, []);

  const filters = ['All', ...Array.from(new Set(images.map(img => img.type)))];

  const filteredImages = activeFilter === 'All' ? images : images.filter(img => img.type === activeFilter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1a0a0a]">
      {/* Hero Banner */}
      <div className="relative pt-32 pb-20 flex items-center justify-center min-h-[40vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a] via-rose-950/50 to-[#1a0a0a] z-10" />
        <Image src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000" alt="Gallery" fill className="object-cover opacity-20 z-0" />
        
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-serif text-amber-400 mb-4">Moments & Memories</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">A glimpse into the magical celebrations hosted at Shani Marriage Palace.</p>
        </div>
      </div>

      {/* Video Highlights Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-serif text-white mb-8 text-center">Wedding Highlights</h2>
        <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden aspect-video bg-gray-900 border border-gray-800 group cursor-pointer shadow-2xl shadow-rose-900/20">
          <Image src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200" alt="Video Cover" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <div className="w-20 h-20 rounded-full bg-rose-600/80 backdrop-blur-md flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:bg-rose-500 transition-all shadow-lg">
              <Play size={32} className="ml-2" />
            </div>
            <p className="text-white font-serif text-2xl drop-shadow-md">Watch Cinematic Tour</p>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeFilter === filter 
                  ? 'bg-amber-500 text-gray-900 shadow-lg shadow-amber-500/20' 
                  : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800 hover:border-gray-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((img, index) => (
            <div 
              key={img.id} 
              className={`relative ${img.height} w-full rounded-2xl overflow-hidden cursor-pointer group break-inside-avoid`}
              onClick={() => openLightbox(index)}
            >
              <Image src={img.src} alt={img.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">{img.type}</span>
                <h3 className="text-xl font-serif text-white">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="px-8 py-3 border-2 border-rose-600 text-rose-500 font-bold rounded-full hover:bg-rose-600 hover:text-white transition-colors">
            Load More Photos
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center" onClick={closeLightbox}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2" onClick={closeLightbox}>
            <X size={32} />
          </button>
          
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4" onClick={prevImage}>
            <ChevronLeft size={48} />
          </button>
          
          <div className="relative w-[90vw] h-[80vh] max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={filteredImages[lightboxIndex].src} 
              alt={filteredImages[lightboxIndex].title}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center bg-black/50 backdrop-blur-md px-6 py-2 rounded-full">
              <h4 className="text-white font-serif">{filteredImages[lightboxIndex].title}</h4>
              <p className="text-amber-400 text-xs uppercase tracking-widest">{filteredImages[lightboxIndex].type}</p>
            </div>
          </div>
          
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4" onClick={nextImage}>
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </div>
  );
}
