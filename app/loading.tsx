export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-orange-200 dark:border-gray-700 border-t-orange-500 dark:border-t-orange-500 rounded-full animate-spin"></div>
        <p className="mt-6 text-orange-500 font-bold text-lg animate-pulse">Loading Vishram Sthal...</p>
      </div>
    </div>
  );
}
