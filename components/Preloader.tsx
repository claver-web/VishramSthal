'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1000);
  const [windowHeight, setWindowHeight] = useState(1000);

  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    const hasVisited = sessionStorage.getItem('hasVisitedVishramSthal');
    if (hasVisited) {
      setShow(false);
    } else {
      const timer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('hasVisitedVishramSthal', 'true');
      }, 4000); // 4 seconds preloader
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-indigo-950 via-purple-950 to-orange-950 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Floating dust/particles */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/60 rounded-full blur-[1px]"
              initial={{
                x: Math.random() * windowWidth,
                y: windowHeight + 10,
                opacity: Math.random()
              }}
              animate={{
                y: -20,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative flex flex-col items-center"
          >
            {/* CSS 8-petal lotus animation / Logo container */}
            <div className="w-32 h-32 relative mb-8 flex justify-center items-center">
               <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0"
               >
                 {[...Array(8)].map((_, i) => (
                   <div
                     key={i}
                     className="absolute w-4 h-16 bg-gradient-to-t from-orange-500 to-yellow-300 opacity-50 rounded-full origin-bottom left-1/2 -ml-2"
                     style={{ transform: `rotate(${i * 45}deg) translateY(-50%)` }}
                   />
                 ))}
               </motion.div>
               <span className="font-playfair text-5xl font-bold text-white z-10 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]">VS</span>
            </div>

            {/* Typewriter text */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
              className="overflow-hidden whitespace-nowrap border-r-2 border-orange-400 pr-2"
            >
              <h1 className="text-4xl md:text-6xl font-playfair text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-yellow-400 tracking-wider">
                Vishram Sthal
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="mt-4 text-orange-200/80 font-cormorant text-xl tracking-widest uppercase"
            >
              The Abode of Peace
            </motion.p>

            {/* Glowing progress bar */}
            <div className="w-64 h-1 bg-white/10 mt-12 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3.5, ease: 'easeInOut' }}
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 to-yellow-300 shadow-[0_0_10px_rgba(251,191,36,1)]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
