import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import ChatList from './components/ChatList';
import ChatScreen from './components/ChatScreen';
import Navigation from './components/Navigation';
import { mockChats } from './data/mockData';
import { useErrorHandler } from './hooks/useErrorHandler';
import { Chat } from './types';

/**
 * Main App Component
 * Enhanced with comprehensive error handling, performance optimizations,
 * and proper state management following React best practices
 */
function App() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { errors, addError } = useErrorHandler();

  // Enhanced data loading with proper error handling
  useEffect(() => {
    const loadChats = async () => {
      try {
        setIsLoading(true);
        
        // Simulate network delay with timeout handling
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        );
        
        const dataPromise = new Promise<Chat[]>((resolve) => 
          setTimeout(() => resolve(mockChats), 1000)
        );

        const result = await Promise.race([dataPromise, timeoutPromise]) as Chat[];
        
        // Validate data before setting state
        if (Array.isArray(result) && result.length > 0) {
          setChats(result);
        } else {
          throw new Error('Invalid chat data received');
        }
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load chats';
        addError('LOAD_CHATS_ERROR', errorMessage);
        
        // Fallback to empty state
        setChats([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadChats();
  }, [addError]);

  // Enhanced meta tag management with cleanup
  useEffect(() => {
    const metaTags: HTMLElement[] = [];
    
    try {
      // Update page title
      document.title = 'ChatsApp - Modern Messaging';
      
      // Add theme color for mobile browsers
      const themeColorMeta = document.createElement('meta');
      themeColorMeta.name = 'theme-color';
      themeColorMeta.content = '#3B82F6';
      document.head.appendChild(themeColorMeta);
      metaTags.push(themeColorMeta);

      // Add apple touch icon meta
      const appleTouchIcon = document.createElement('link');
      appleTouchIcon.rel = 'apple-touch-icon';
      appleTouchIcon.href = '/apple-touch-icon.png';
      document.head.appendChild(appleTouchIcon);
      metaTags.push(appleTouchIcon);

      // Add viewport meta for better mobile experience
      let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
      if (!viewportMeta) {
        viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        document.head.appendChild(viewportMeta);
        metaTags.push(viewportMeta);
      }
      viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';

    } catch (error) {
      addError('META_SETUP_ERROR', 'Failed to setup page metadata');
    }

    return () => {
      // Cleanup meta tags
      metaTags.forEach(tag => {
        if (document.head.contains(tag)) {
          document.head.removeChild(tag);
        }
      });
    };
  }, [addError]);

  // Memoized event handlers for better performance
  const handleSearchClick = React.useCallback(() => {
    setIsSearchVisible(true);
  }, []);

  const handleSearchClose = React.useCallback(() => {
    setIsSearchVisible(false);
  }, []);

  // Error notification component
  const ErrorNotifications = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {errors.map((error) => (
        <div
          key={error.timestamp.getTime()}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg max-w-sm"
        >
          <p className="text-sm font-medium">{error.message}</p>
        </div>
      ))}
    </div>
  );

  return (
    <ErrorBoundary>
      <Router>
        <div 
          className="app min-h-screen bg-gray-50 flex flex-col overflow-hidden"
          data-testid="chat-app"
        >
          <Routes>
            <Route path="/" element={
              <>
                {/* Application Header */}
                <Header />

                {/* Main Content Area */}
                <main className="app__content flex-1 flex flex-col pt-15">
                  <ChatList 
                    chats={chats} 
                    isLoading={isLoading}
                    isSearchVisible={isSearchVisible}
                    onSearchClose={handleSearchClose}
                  />
                </main>

                {/* Bottom Navigation */}
                <Navigation onSearchClick={handleSearchClick} />
              </>
            } />
            <Route path="/chat/:chatId" element={
              <ChatScreen chats={chats} />
            } />
          </Routes>

          {/* Error Notifications */}
          <ErrorNotifications />

          {/* Screen Reader Announcements */}
          <div 
            id="announcements" 
            className="sr-only" 
            aria-live="polite" 
            aria-atomic="true"
          />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;