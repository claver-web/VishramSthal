import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond, Noto_Serif_Devanagari, Tangerine } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MainWrapper from "@/components/MainWrapper";
import { Toaster } from "react-hot-toast";
import Preloader from "@/components/Preloader";
import ScrollToTop from "@/components/ScrollToTop";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { Suspense } from 'react';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: 'swap' });
const cormorant = Cormorant_Garamond({ weight: ["400", "600"], subsets: ["latin"], variable: "--font-cormorant", display: 'swap' });
const notoDevanagari = Noto_Serif_Devanagari({ weight: ["400", "700"], subsets: ["devanagari"], variable: "--font-noto-devanagari", display: 'swap' });
const tangerine = Tangerine({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-tangerine", display: 'swap' });

export const metadata: Metadata = {
  title: "Vishram Sthal - यतो धर्मस्ततो जयः | Luxury Hotel & Abode",
  description: "Experience premium comfort at Vishram Sthal, a luxury hotel located in Word No. 6, Dehra Gopipur. Book your stay now for an unforgettable vacation.",
  openGraph: {
    title: 'Vishram Sthal | यतो धर्मस्ततो जयः | Luxury Hotel',
    description: 'Experience premium comfort at Vishram Sthal in Word No. 6, Dehra Gopipur.',
    url: 'https://vishramsthal.com',
    siteName: 'Vishram Sthal',
    images: [{ url: 'https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?w=1200&h=630&fit=crop' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vishram Sthal | Luxury Hotel',
    description: 'Experience premium comfort at Vishram Sthal in Word No. 6, Dehra Gopipur.',
    images: ['https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?w=1200&h=630&fit=crop'],
  },
};

export const viewport = {
  themeColor: '#0f0f1a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "Vishram Sthal",
    "description": "Luxury Hotel in Word No. 6 Dehra Gopipur",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Word No. 6",
      "addressLocality": "Dehra Gopipur",
      "addressRegion": "Himachal Pradesh",
      "addressCountry": "IN"
    },
    "telephone": "+91 9815271636"
  };

  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth dark">
        <head>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </head>
        <body className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${notoDevanagari.variable} ${tangerine.variable} font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen flex flex-col`}>
          <Preloader />
          <Navigation />
          <MainWrapper>
            <Suspense fallback={null}>
              <AnalyticsTracker />
            </Suspense>
            {children}
          </MainWrapper>
          <ScrollToTop />
          <Toaster position="bottom-right" />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
