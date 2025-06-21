import React from 'react';
import { Chat, ProfileViewState } from '../types';

interface ChatItemProps {
  chat: Chat;
  onProfileClick: (user: any) => void;
  'data-testid'?: string;
}

/**
 * ChatItem Component
 * Individual chat item with profile picture, message preview, and metadata
 * Height: 80px with touch-optimized interaction areas
 */
const ChatItem: React.FC<ChatItemProps> = ({ 
  chat, 
  onProfileClick, 
  'data-testid': testId 
}) => {
  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Simulate haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
    onProfileClick(chat.participant);
  };

  const handleChatClick = () => {
    // Simulate haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    console.log(`Opening chat with ${chat.participant.name}`);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return minutes < 1 ? 'now' : `${minutes}m`;
    }
    
    if (hours < 24) {
      return `${hours}h`;
    }
    
    return date.toLocaleDateString();
  };

  return (
    <article
      className="chat-item flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 cursor-pointer"
      onClick={handleChatClick}
      data-testid={testId}
      role="button"
      tabIndex={0}
      aria-label={`Chat with ${chat.participant.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleChatClick();
        }
      }}
    >
      {/* Profile Picture */}
      <div className="chat-item__avatar relative mr-3">
        <button
          onClick={handleProfileClick}
          className="profile-avatar w-10 h-10 rounded-full overflow-hidden transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`View ${chat.participant.name}'s profile`}
          data-testid="profile-avatar"
        >
          <img
            src={chat.participant.avatar}
            alt={chat.participant.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </button>
        
        {/* Online Status Indicator */}
        {chat.participant.status === 'online' && (
          <div 
            className="status-indicator absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
            aria-label="Online"
          />
        )}
      </div>

      {/* Chat Content */}
      <div className="chat-item__content flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="chat-item__name text-sm font-semibold text-gray-900 truncate">
            {chat.participant.name}
          </h3>
          <time 
            className="chat-item__time text-xs text-gray-500"
            dateTime={chat.timestamp.toISOString()}
          >
            {formatTime(chat.timestamp)}
          </time>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="chat-item__message text-sm text-gray-600 truncate">
            {chat.lastMessage.content}
          </p>
          
          {/* Unread Count Badge */}
          {chat.unreadCount > 0 && (
            <span 
              className="unread-badge bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center ml-2"
              aria-label={`${chat.unreadCount} unread messages`}
            >
              {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ChatItem;