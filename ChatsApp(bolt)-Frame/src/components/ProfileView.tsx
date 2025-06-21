import React, { useEffect } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { ProfileViewState } from '../types';

interface ProfileViewProps {
  profileView: ProfileViewState;
  onClose: () => void;
  onExpand: () => void;
}

/**
 * ProfileView Component
 * Modal component for viewing profile pictures with zoom functionality
 * Supports mini view (160x160px) and full-screen view with smooth transitions
 */
const ProfileView: React.FC<ProfileViewProps> = ({ 
  profileView, 
  onClose, 
  onExpand 
}) => {
  const { isVisible, isFullScreen, user } = profileView;

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onClose]);

  // Prevent body scroll when modal is open
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

  if (!isVisible || !user) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleExpandClick = () => {
    // Simulate haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    onExpand();
  };

  return (
    <div
      className={`profile-view fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-title"
      aria-describedby="profile-description"
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 transition-all duration-300 ${
          isFullScreen ? 'bg-black' : 'bg-black bg-opacity-50 backdrop-blur-sm'
        }`}
      />

      {/* Profile Container */}
      <div
        className={`profile-view__container relative transition-all duration-300 ease-out ${
          isFullScreen 
            ? 'w-full h-full flex items-center justify-center' 
            : 'w-40 h-40 rounded-2xl overflow-hidden shadow-2xl'
        } ${isVisible ? 'scale-100' : 'scale-75'}`}
      >
        {/* Control Buttons */}
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          {!isFullScreen && (
            <button
              onClick={handleExpandClick}
              className="control-btn w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 shadow-lg"
              aria-label="Expand to full screen"
            >
              <Maximize2 className="w-4 h-4 text-gray-700" />
            </button>
          )}
          
          <button
            onClick={onClose}
            className="control-btn w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 shadow-lg"
            aria-label="Close profile view"
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {/* Profile Image */}
        <div
          className={`profile-image-container ${
            isFullScreen ? 'max-w-md max-h-md' : 'w-full h-full'
          }`}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className={`profile-image w-full h-full object-cover transition-all duration-300 ${
              isFullScreen ? 'rounded-lg shadow-2xl' : ''
            }`}
            id="profile-image"
          />
        </div>

        {/* Profile Info (Full Screen Only) */}
        {isFullScreen && (
          <div className="profile-info absolute bottom-8 left-8 right-8 text-center">
            <h2 
              id="profile-title"
              className="text-2xl font-bold text-white mb-2 drop-shadow-lg"
            >
              {user.name}
            </h2>
            <p 
              id="profile-description"
              className={`text-sm text-white text-opacity-90 drop-shadow-md ${
                user.status === 'online' ? 'text-green-300' : 
                user.status === 'away' ? 'text-yellow-300' : 'text-gray-300'
              }`}
            >
              {user.status === 'online' ? 'Online' : 
               user.status === 'away' ? 'Away' : 'Offline'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;