"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, ArrowUp, X, Mail } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Handle click outside to close contact card
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--color-gold)] z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Floating Action / Contact Button & Popover */}
      <AnimatePresence>
        {isVisible && (
          <div ref={cardRef} className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
            {/* Contact Popup Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 15 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="mb-4 w-80 max-w-[calc(100vw-2rem)] rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-[var(--color-gold)]/40 shadow-2xl p-5 text-white overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-saffron)]/20 text-[var(--color-saffron)]">
                        <span className="text-base">🪷</span>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                      </div>
                      <div>
                        <h4 className="font-serif font-semibold text-sm text-[var(--color-gold)] leading-tight">
                          Vishram Sthal Concierge
                        </h4>
                        <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Online • Instant Assistance
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                      aria-label="Close contact popup"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Contact Options */}
                  <div className="space-y-2.5">
                    {/* WhatsApp Primary Contact */}
                    <a
                      href="https://wa.me/918988478367?text=Hello%20Vishram%20Sthal%20team!%20I%20would%20like%20to%20inquire%20about%20room%20availability%20and%20booking."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium shadow-md shadow-emerald-950/40 transition-all transform hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-200">WhatsApp Chat</span>
                        <span className="text-sm font-bold">+91 8988478367</span>
                      </div>
                    </a>

                    {/* Phone Call */}
                    <a
                      href="tel:+919815271636"
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium transition-all"
                    >
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--color-saffron)]/20 text-[var(--color-saffron)]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] uppercase text-white/60 font-medium">Direct Call</span>
                        <span className="text-xs font-semibold">+91 9815271636</span>
                      </div>
                    </a>

                    {/* Email */}
                    <a
                      href="mailto:reservations@vishramsthal.com"
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium transition-all"
                    >
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col text-left truncate">
                        <span className="text-[10px] uppercase text-white/60 font-medium">Email Inquiries</span>
                        <span className="text-xs font-semibold truncate">reservations@vishramsthal.com</span>
                      </div>
                    </a>

                    {/* Scroll to Top */}
                    <button
                      onClick={scrollToTop}
                      className="w-full flex items-center justify-center gap-2 pt-2.5 pb-1 text-xs text-white/70 hover:text-[var(--color-gold)] transition-colors border-t border-white/10 mt-1 cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                      <span>Back to top of page</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Floating Toggle Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[var(--color-saffron)] to-[var(--color-saffron-dark)] text-white rounded-full shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:shadow-[0_0_30px_rgba(255,215,0,0.8)] transition-shadow cursor-pointer"
              aria-label="Contact Concierge or WhatsApp"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <>
                  <span className="text-2xl">🪷</span>
                  {/* WhatsApp online notification indicator dot */}
                  <span className="absolute top-0 right-0 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
                  </span>
                </>
              )}
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

