'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-900 relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-mandala-pattern opacity-5"></div>
      
      <div className="relative z-10 max-w-md w-full bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-700 text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mb-6 border border-gray-700 shadow-lg shadow-black/50">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-serif font-extrabold text-white mb-4">Something went wrong</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          We encountered an unexpected disturbance in our divine service. Please accept our apologies and try again.
        </p>
        
        <button
          onClick={() => reset()}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-0.5"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
