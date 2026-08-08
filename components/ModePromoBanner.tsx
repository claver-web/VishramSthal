"use client";

import { useModeStore } from '@/store/modeStore';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Bed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ModePromoBanner() {
  const { mode, setMode } = useModeStore();
  const router = useRouter();
  
  const isHotel = mode === 'hotel';

  const handleSwitch = () => {
    // Basic transition mimicking ModeSwitcher
    const newMode = isHotel ? 'wedding' : 'hotel';
    setMode(newMode);
    setTimeout(() => {
      if (newMode === 'wedding') {
        router.push('/wedding');
      } else {
        router.push('/');
      }
    }, 100);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`relative rounded-3xl overflow-hidden shadow-2xl ${
            isHotel ? 'bg-gradient-to-r from-rose-950 to-rose-900' : 'bg-gradient-to-r from-orange-950 to-orange-900'
          }`}
        >
          <div className="absolute inset-0 opacity-20">
            <div className={`absolute inset-0 bg-repeat ${
              isHotel ? 'mix-blend-overlay' : 'mix-blend-overlay'
            }`} />
          </div>

          <div className="flex flex-col md:flex-row relative z-10">
            {/* Content Side */}
            <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 w-max ${
                isHotel ? 'bg-rose-500/20 text-rose-300' : 'bg-orange-500/20 text-orange-300'
              }`}>
                {isHotel ? <><Sparkles size={14} /> Planning a Wedding?</> : <><Bed size={14} /> Need a Place to Stay?</>}
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight">
                {isHotel ? "Explore our luxurious wedding venues" : "Book comfortable rooms for your guests"}
              </h2>
              
              <p className="text-gray-300 mb-8 max-w-md text-lg">
                {isHotel 
                  ? "Transform your special day into an unforgettable memory with our stunning venues and flawless arrangements." 
                  : "Ensure your wedding guests have a comfortable and relaxing stay with our premium room accommodations."}
              </p>
              
              <button
                onClick={handleSwitch}
                className={`group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white transition-all w-max ${
                  isHotel 
                    ? 'bg-rose-600 hover:bg-rose-500 shadow-[0_0_20px_rgba(225,29,72,0.4)]' 
                    : 'bg-orange-600 hover:bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)]'
                }`}
              >
                {isHotel ? "Switch to Wedding Mode" : "Switch to Hotel Mode"}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Image Side */}
            <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-${isHotel ? 'rose-950' : 'orange-950'} to-transparent z-10`} />
              {/* Fallback image if specific ones aren't available */}
              <div className="absolute inset-0 bg-gray-800">
                 <Image 
                   src={isHotel ? "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80" : "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80"}
                   alt={isHotel ? "Wedding setup" : "Hotel room"}
                   fill
                   className="object-cover transition-transform duration-700 hover:scale-105"
                 />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
