import React, { Suspense } from 'react';
import RoomsContent from './RoomsContent';

export const revalidate = 60; // Route-based ISR cache

export default function RoomsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-900 transition-colors">
      <Suspense fallback={<div className="container mx-auto px-4 text-center py-20">Loading...</div>}>
        <RoomsContent />
      </Suspense>
    </div>
  );
}
