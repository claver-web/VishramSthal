import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    where: { status: 'PUBLISHED' },
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        <Link href="/" className="inline-flex items-center text-amber-500 hover:text-amber-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 mb-4">
            All Divine Blessings
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Read what our cherished guests have to say about their spiritual journey and stay at Vishram Sthal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.length > 0 ? reviews.map((testimonial) => (
            <div key={testimonial.id} className="bg-[#1a1a2e] p-8 w-full shadow-xl relative mt-8 border border-neutral-800 hover:border-amber-500/50 transition-colors rounded-2xl">
              
              <div className="absolute -top-10 left-8 w-20 h-20 rounded-full border-4 border-neutral-900 bg-neutral-800 overflow-hidden shadow-lg">
                <Image 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.user?.name || 'Google Guest')}&background=f97316&color=fff&size=150`} 
                  alt="Guest" 
                  fill 
                  sizes="80px" 
                  className="object-cover" 
                  unoptimized
                />
              </div>
              
              <div className="mt-6 mb-4 text-amber-500 flex justify-start gap-1">
                {'🪷'.repeat(testimonial.rating || 5)}
              </div>
              
              <p className="font-cormorant text-xl italic text-neutral-300 mb-6 leading-relaxed">
                "{testimonial.comment}"
              </p>
              
              <div className="border-t border-neutral-800 pt-4">
                <p className="font-bold text-amber-500 font-serif text-lg">{testimonial.user?.name || 'Google Guest'}</p>
                <p className="text-xs text-neutral-500 uppercase tracking-widest">Verified Guest</p>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-20 bg-neutral-900 rounded-3xl border border-neutral-800">
              <p className="text-xl text-neutral-400">Divine blessings from our guests will appear here soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
