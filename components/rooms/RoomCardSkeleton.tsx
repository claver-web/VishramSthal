import React from 'react';

interface RoomCardSkeletonProps {
  viewMode: 'grid' | 'list';
}

export default function RoomCardSkeleton({ viewMode }: RoomCardSkeletonProps) {
  const isList = viewMode === 'list';

  return (
    <div className={`bg-gray-800 rounded-3xl shadow-lg border border-gray-700 overflow-hidden flex ${isList ? 'flex-col md:flex-row h-full md:h-64' : 'flex-col h-full'}`}>
      {/* Image / Banner Skeleton */}
      <div className={`relative bg-gray-700 animate-pulse ${isList ? 'w-full md:w-2/5 h-56 md:h-full shrink-0' : 'h-56'}`}>
        <div className="absolute top-4 right-4 w-20 h-6 bg-gray-600 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-24 h-6 bg-gray-600 rounded-lg animate-pulse"></div>
      </div>

      {/* Content Skeleton */}
      <div className={`p-6 flex flex-col flex-grow ${isList ? 'w-full md:w-3/5 justify-between' : ''}`}>
        <div>
          <div className="flex justify-between items-start mb-4 gap-4">
            <div className="w-2/3">
              <div className="h-8 bg-gray-700 rounded-lg animate-pulse w-full mb-2"></div>
              <div className="h-4 bg-gray-700 rounded-lg animate-pulse w-1/2"></div>
            </div>
            <div className="text-right shrink-0">
              <div className="h-8 bg-gray-700 rounded-lg animate-pulse w-20 mb-1"></div>
              <div className="h-3 bg-gray-700 rounded-lg animate-pulse w-12 ml-auto"></div>
            </div>
          </div>
          
          <div className="space-y-2 mt-4 mb-5">
            <div className="h-4 bg-gray-700 rounded-lg animate-pulse w-full"></div>
            <div className="h-4 bg-gray-700 rounded-lg animate-pulse w-5/6"></div>
            {!isList && <div className="h-4 bg-gray-700 rounded-lg animate-pulse w-4/6"></div>}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="h-6 bg-gray-700 rounded-md animate-pulse w-16"></div>
            <div className="h-6 bg-gray-700 rounded-md animate-pulse w-20"></div>
            <div className="h-6 bg-gray-700 rounded-md animate-pulse w-24"></div>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-700 flex gap-3">
          <div className="flex-1 h-11 bg-gray-700 rounded-xl animate-pulse"></div>
          <div className="flex-1 h-11 bg-gray-700 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
