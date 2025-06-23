import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chat } from '../types';

interface ChatItemProps {
  chat: Chat;
  onProfileClick: (user: any) => void;
  'data-testid'?: string;
}

/**
 * ChatItem Component - Optimized with React.memo
 * Individual chat item with enhanced accessibility and performance
 */
const ChatItem: React.FC<ChatItemProps> = memo(({ 
  chat, 
  onProfileClick, 
  'data-testid': testId 
}) => {
  const navigate = useNavigate();

  const handleProfileClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Haptic feedback for supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
    
    onProfileClick(chat.participant);
  }, [chat.participant, onProfileClick]);

  const handleChatClick = React.useCallback(() => {
    // Haptic feedback for supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    navigate(`/chat/${chat.id}`);
  }, [chat.id, navigate]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleChatClick();
    }
  }, [handleChatClick]);

  const formatTime = React.useCallback((date: Date) => {
    try {
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
      
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Unknown';
    }
  }, []);

  // Memoize formatted time to prevent unnecessary recalculations
  const formattedTime = React.useMemo(() => 
    formatTime(chat.timestamp), 
    [chat.timestamp, formatTime]
  );

  return (
    <article
      className="chat-item flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
      onClick={handleChatClick}
      data-testid={testId}
      role="button"
      tabIndex={0}
      aria-label={`Chat with ${chat.participant.name}. Last message: ${chat.lastMessage.content}`}
      onKeyDown={handleKeyDown}
    >
      {/* Profile Picture */}
      <div className="chat-item__avatar relative mr-3 flex-shrink-0">
        <button
          onClick={handleProfileClick}
          className="profile-avatar w-12 h-12 rounded-full overflow-hidden transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`View ${chat.participant.name}'s profile`}
          data-testid="profile-avatar"
        >
          <img
            src={chat.participant.avatar}
            alt={chat.participant.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              // Fallback for broken images
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop';
            }}
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
          <h3 className="chat-item__name text-base font-semibold text-gray-900 truncate">
            {chat.participant.name}
          </h3>
          <time 
            className="chat-item__time text-xs text-gray-500 flex-shrink-0"
            dateTime={chat.timestamp.toISOString()}
            title={chat.timestamp.toLocaleString()}
          >
            {formattedTime}
          </time>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="chat-item__message text-sm text-gray-600 truncate flex-1">
            {chat.lastMessage.type === 'image' && '📷 '}
            {chat.lastMessage.type === 'document' && '📄 '}
            {chat.lastMessage.content}
          </p>
          
          {/* Unread Count Badge */}
          {chat.unreadCount > 0 && (
            <span 
              className="unread-badge bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center ml-2 flex-shrink-0"
              aria-label={`${chat.unreadCount} unread messages`}
            >
              {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </article>
  );
});

ChatItem.displayName = 'ChatItem';

export default ChatItem;