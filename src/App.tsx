import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatList from './components/ChatList';
import Navigation from './components/Navigation';
import { mockChats } from './data/mockData';
import { Chat } from './types';

/**
 * Main App Component
 * Implements mobile-first, three-panel layout with semantic HTML5 structure
 * Provides error boundaries and performance optimizations
 */
function App() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Simulate data loading with loading states
  useEffect(() => {
    const loadChats = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setChats(mockChats);
      } catch (error) {
        console.error('Failed to load chats:', error);
        // In production, show error toast/notification
      } finally {
        setIsLoading(false);
      }
    };

    loadChats();
  }, []);

  // Set proper viewport and theme meta tags
  useEffect(() => {
    // Update page title
    document.title = 'ChatsApp - Modern Messaging';
    
    // Add theme color for mobile browsers
    const themeColorMeta = document.createElement('meta');
    themeColorMeta.name = 'theme-color';
    themeColorMeta.content = '#3B82F6';
    document.head.appendChild(themeColorMeta);

    // Add apple touch icon meta
    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.rel = 'apple-touch-icon';
    appleTouchIcon.href = '/apple-touch-icon.png';
    document.head.appendChild(appleTouchIcon);

    return () => {
      document.head.removeChild(themeColorMeta);
      document.head.removeChild(appleTouchIcon);
    };
  }, []);

  const handleSearchClick = () => {
    setIsSearchVisible(true);
  };

  const handleSearchClose = () => {
    setIsSearchVisible(false);
  };

  return (
    <div 
      className="app min-h-screen bg-gray-50 flex flex-col overflow-hidden"
      data-testid="chat-app"
    >
      {/* Application Header */}
      <Header />

      {/* Main Content Area */}
      <div className="app__content flex-1 flex flex-col pt-15">
        <ChatList 
          chats={chats} 
          isLoading={isLoading}
          isSearchVisible={isSearchVisible}
          onSearchClose={handleSearchClose}
        />
      </div>

      {/* Bottom Navigation */}
      <Navigation onSearchClick={handleSearchClick} />

      {/* Add screen reader announcements */}
      <div 
        id="announcements" 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      />
    </div>
  );
}

export default App;