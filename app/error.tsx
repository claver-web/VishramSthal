'use client';

import { useEffect } from 'react';
import Link from 'next/link';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors">
      <div className="bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-2xl text-center max-w-md w-full border border-gray-100 dark:border-gray-700">
        <div className="text-red-500 text-7xl mb-6">⚠️</div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Something went wrong!</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">We apologize for the inconvenience. Our team has been notified.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-bold transition-colors"
          >
            Try again
          </button>
          <Link href="/" className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-colors shadow-lg">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
