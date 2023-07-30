import React from 'react';
import SkeletonSidebar from './SkeletonSidebar';

const PageSkeleton = () => {
  return (
    <div className="flex h-screen bg-gray-800 text-white">
      {/* Sidebar Skeleton */}
      <div className="w-1/6 p-4">
     <SkeletonSidebar />
      </div>

      {/* Main Content Area Skeleton */}
      <div className="flex-1 p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-500 w-2/3 mb-4"></div>
          <div className="h-6 bg-gray-500 w-1/2 mb-2"></div>
          <div className="h-6 bg-gray-500 w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
