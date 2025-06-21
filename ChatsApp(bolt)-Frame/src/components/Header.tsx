import React from 'react';
import { Bell, Settings } from 'lucide-react';

/**
 * Header Component
 * Fixed header with app branding and action buttons
 * Height: 60px with proper iOS/Android status bar compatibility
 */
const Header: React.FC = () => {
  const handleNotificationClick = () => {
    // Simulate haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    console.log('Notifications clicked');
  };

  const handleSettingsClick = () => {
    // Simulate haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    console.log('Settings clicked');
  };

  return (
    <header 
      className="header fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm"
      role="banner"
      aria-label="Application header"
    >
      <div className="header__container flex items-center justify-between h-15 px-4">
        {/* App Branding */}
        <div className="header__brand">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            ChatsApp
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="header__actions flex items-center space-x-3">
          <button
            onClick={handleNotificationClick}
            className="header__action-btn p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 active:scale-95"
            aria-label="Notifications"
            data-testid="notification-button"
          >
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          
          <button
            onClick={handleSettingsClick}
            className="header__action-btn p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 active:scale-95"
            aria-label="Settings"
            data-testid="settings-button"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;