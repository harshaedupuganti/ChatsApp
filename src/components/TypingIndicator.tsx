import React from 'react';
import { User } from '../types';

interface TypingIndicatorProps {
  user: User;
}

/**
 * TypingIndicator Component
 * Shows when someone is typing with animated dots
 */
const TypingIndicator: React.FC<TypingIndicatorProps> = ({ user }) => {
  return (
    <div className="typing-indicator flex items-center space-x-2 p-3">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-6 h-6 rounded-full"
      />
      <div className="typing-dots flex items-center space-x-1 bg-gray-200 rounded-full px-3 py-2">
        <div className="typing-dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="typing-dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="typing-dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
};

export default TypingIndicator;