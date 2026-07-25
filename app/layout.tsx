import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vishram Sthal | Luxury Hotel in Word No. 6 Dehra Gopipur",
  description: "Experience premium comfort at Vishram Sthal, a luxury hotel located in Word No. 6, Dehra Gopipur. Book your stay now for an unforgettable vacation.",
  openGraph: {
    title: 'Vishram Sthal | Luxury Hotel',
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
    "telephone": "+91 9876543210"
  };

  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <head>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </head>
        <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen flex flex-col`}>
          <ThemeProvider />
          <Navigation />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Toaster position="bottom-right" />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
