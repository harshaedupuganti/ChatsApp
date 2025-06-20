import React, { useState, useEffect, useCallback } from 'react';
import ChatItem from './ChatItem';
import ProfileView from './ProfileView';
import LoadingSkeleton from './LoadingSkeleton';
import SearchOverlay from './SearchOverlay';
import { Chat, User, ProfileViewState } from '../types';

interface ChatListProps {
  chats: Chat[];
  isLoading?: boolean;
  isSearchVisible: boolean;
  onSearchClose: () => void;
}

/**
 * ChatList Component
 * Main content area with virtual scroll implementation
 * Includes search overlay functionality and lazy loading
 */
const ChatList: React.FC<ChatListProps> = ({ 
  chats, 
  isLoading = false,
  isSearchVisible,
  onSearchClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [profileView, setProfileView] = useState<ProfileViewState>({
    isVisible: false,
    isFullScreen: false,
    user: null
  });
  const [visibleChats, setVisibleChats] = useState<Chat[]>([]);

  // Intersection Observer for lazy loading
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const sentinelRef = React.useRef<HTMLDivElement>(null);

  // Filter chats based on search query
  const filteredChats = chats.filter(chat =>
    chat.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Implement virtual scrolling for performance
  useEffect(() => {
    const loadMoreChats = () => {
      const currentLength = visibleChats.length;
      const nextChats = filteredChats.slice(0, currentLength + 20);
      setVisibleChats(nextChats);
    };

    // Initialize with first batch
    if (filteredChats.length > 0 && visibleChats.length === 0) {
      setVisibleChats(filteredChats.slice(0, 20));
    }

    // Setup intersection observer for infinite scroll
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleChats.length < filteredChats.length) {
          loadMoreChats();
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [filteredChats, visibleChats.length]);

  // Handle profile view
  const handleProfileClick = useCallback((user: User) => {
    setProfileView({
      isVisible: true,
      isFullScreen: false,
      user
    });
  }, []);

  const handleProfileClose = useCallback(() => {
    setProfileView({
      isVisible: false,
      isFullScreen: false,
      user: null
    });
  }, []);

  const handleProfileExpand = useCallback(() => {
    setProfileView(prev => ({
      ...prev,
      isFullScreen: true
    }));
  }, []);

  // Handle search functionality
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    // Reset visible chats when search changes
    setVisibleChats([]);
  }, []);

  const handleSearchClose = useCallback(() => {
    setSearchQuery('');
    onSearchClose();
  }, [onSearchClose]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <main 
      className="chat-list flex-1 overflow-hidden bg-white"
      role="main"
      aria-label="Chat conversations list"
    >
      {/* Chat List */}
      <div 
        className="chat-list__container overflow-y-auto"
        style={{ height: 'calc(100vh - 116px)' }}
        role="list"
        aria-label="Chat conversations"
      >
        {visibleChats.length === 0 && searchQuery && (
          <div className="empty-state flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 text-gray-300 mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <p className="text-gray-500 text-center">
              No conversations found for "{searchQuery}"
            </p>
          </div>
        )}

        {visibleChats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            onProfileClick={handleProfileClick}
            data-testid={`chat-item-${chat.id}`}
          />
        ))}

        {/* Infinite Scroll Sentinel */}
        <div 
          ref={sentinelRef} 
          className="h-1"
          aria-hidden="true"
        />

        {/* Loading More Indicator */}
        {visibleChats.length < filteredChats.length && (
          <div className="loading-more p-4 text-center">
            <div className="inline-block w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Profile View Modal */}
      <ProfileView
        profileView={profileView}
        onClose={handleProfileClose}
        onExpand={handleProfileExpand}
      />

      {/* Search Overlay */}
      <SearchOverlay
        isVisible={isSearchVisible}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onClose={handleSearchClose}
      />
    </main>
  );
};

export default ChatList;