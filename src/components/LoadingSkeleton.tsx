import React from 'react';

/**
 * LoadingSkeleton Component
 * Provides loading placeholders while content is being fetched
 * Improves perceived performance and user experience
 */
const LoadingSkeleton: React.FC = () => {
  const skeletonItems = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div 
      className="loading-skeleton"
      role="status" 
      aria-label="Loading conversations"
    >
      {/* Search Bar Skeleton */}
      <div className="skeleton-search p-4 border-b border-gray-200">
        <div className="skeleton-search__input h-10 bg-gray-200 rounded-full animate-pulse" />
      </div>

      {/* Chat Items Skeleton */}
      <div className="skeleton-list">
        {skeletonItems.map((index) => (
          <div 
            key={index}
            className="skeleton-item flex items-center p-4 border-b border-gray-100"
          >
            {/* Avatar Skeleton */}
            <div className="skeleton-avatar w-10 h-10 bg-gray-200 rounded-full animate-pulse mr-3" />
            
            {/* Content Skeleton */}
            <div className="skeleton-content flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="skeleton-name h-4 bg-gray-200 rounded animate-pulse w-24" />
                <div className="skeleton-time h-3 bg-gray-200 rounded animate-pulse w-12" />
              </div>
              <div className="skeleton-message h-3 bg-gray-200 rounded animate-pulse w-48" />
            </div>

            {/* Badge Skeleton (Random appearance) */}
            {Math.random() > 0.7 && (
              <div className="skeleton-badge w-5 h-5 bg-gray-200 rounded-full animate-pulse ml-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;