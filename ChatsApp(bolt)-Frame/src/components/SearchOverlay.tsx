import React, { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchOverlayProps {
  isVisible: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClose: () => void;
}

/**
 * SearchOverlay Component
 * Full-screen search overlay that slides up from bottom
 * Provides focused search experience with smooth animations
 */
const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isVisible,
  searchQuery,
  onSearchChange,
  onClose
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when overlay opens
  useEffect(() => {
    if (isVisible && inputRef.current) {
      // Small delay to ensure smooth animation
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isVisible]);

  // Handle ESC key to close overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onClose]);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    // Simulate haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    onClose();
  };

  const handleClearSearch = () => {
    onSearchChange('');
    inputRef.current?.focus();
  };

  return (
    <div
      className={`search-overlay fixed inset-0 z-50 transition-all duration-300 ease-out ${
        isVisible 
          ? 'opacity-100 pointer-events-auto' 
          : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
      />

      {/* Search Container */}
      <div
        className={`search-container absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${
          isVisible ? 'transform translate-y-0' : 'transform translate-y-full'
        }`}
        style={{ height: '60vh', minHeight: '400px' }}
      >
        {/* Header */}
        <div className="search-header flex items-center justify-between p-6 border-b border-gray-200">
          <h2 
            id="search-title"
            className="text-xl font-semibold text-gray-900"
          >
            Search Conversations
          </h2>
          <button
            onClick={handleCloseClick}
            className="close-btn p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close search"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Search Input */}
        <div className="search-input-container p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search conversations, messages, or contacts..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input w-full pl-12 pr-12 py-4 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
              aria-label="Search conversations"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="clear-btn absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results Area */}
        <div className="search-results flex-1 px-6 pb-6 overflow-y-auto">
          {!searchQuery && (
            <div className="search-suggestions">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                Recent Searches
              </h3>
              <div className="space-y-2">
                {['Sarah Johnson', 'Project meeting', 'lunch plans'].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => onSearchChange(suggestion)}
                    className="suggestion-item w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
                  >
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchQuery && (
            <div className="search-results-content">
              <p className="text-sm text-gray-500 mb-4">
                Searching for "{searchQuery}"...
              </p>
              {/* Search results will be populated here */}
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Search results will appear here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;