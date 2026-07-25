import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors">
      <div className="text-center animate-fade-in">
        <div className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-600 font-black text-9xl mb-6 drop-shadow-lg">404</div>
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Room Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-10 max-w-md mx-auto font-medium">
          The page you are looking for doesn't exist or has been moved from Vishram Sthal.
        </p>
        <Link href="/" className="inline-block px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-transform transform hover:scale-105 shadow-xl">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
