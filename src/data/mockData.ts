import { Chat, User, Message } from '../types';

/**
 * Mock data for demonstration purposes
 * Enhanced with proper error handling and data validation
 */

// Sample users with high-quality avatars from Pexels
const users: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'online',
    lastSeen: new Date()
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'online',
    lastSeen: new Date()
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'away',
    lastSeen: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: '4',
    name: 'David Rodriguez',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'offline',
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'online',
    lastSeen: new Date()
  }
];

// Enhanced sample messages with proper typing
const messages: Message[] = [
  {
    id: '1',
    chatId: 'chat-1',
    senderId: '1',
    senderName: 'Sarah Johnson',
    content: 'Hey! How are you doing today?',
    type: 'text',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    status: 'read',
    isRead: false
  },
  {
    id: '2',
    chatId: 'chat-2',
    senderId: '2',
    senderName: 'Mike Chen',
    content: 'Can we schedule the meeting for tomorrow?',
    type: 'text',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    status: 'delivered',
    isRead: false
  },
  {
    id: '3',
    chatId: 'chat-3',
    senderId: '3',
    senderName: 'Emma Wilson',
    content: 'Thanks for the help with the project! 🙏',
    type: 'text',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    status: 'read',
    isRead: true
  }
];

// Additional mock messages for chat conversations
export const mockMessages: Message[] = [
  ...messages,
  {
    id: '4',
    chatId: 'chat-1',
    senderId: 'current-user',
    senderName: 'You',
    content: 'I\'m doing great, thanks for asking!',
    type: 'text',
    timestamp: new Date(Date.now() - 4 * 60 * 1000),
    status: 'read',
    isRead: true
  },
  {
    id: '5',
    chatId: 'chat-1',
    senderId: '1',
    senderName: 'Sarah Johnson',
    content: 'That\'s wonderful to hear! 😊',
    type: 'text',
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    status: 'read',
    isRead: false
  }
];

// Generate mock chats with proper error handling
export const mockChats: Chat[] = users.map((user, index) => {
  const message = messages[index] || {
    id: `default-${user.id}`,
    chatId: `chat-${user.id}`,
    senderId: user.id,
    senderName: user.name,
    content: 'Hello there!',
    type: 'text' as const,
    timestamp: new Date(Date.now() - (index + 1) * 60 * 60 * 1000),
    status: 'read' as const,
    isRead: true
  };

  return {
    id: `chat-${user.id}`,
    participant: user,
    lastMessage: message,
    unreadCount: message.isRead ? 0 : Math.floor(Math.random() * 5) + 1,
    timestamp: message.timestamp
  };
});

// Sort chats by timestamp (most recent first)
mockChats.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());