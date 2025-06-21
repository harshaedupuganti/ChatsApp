import { Chat, User, Message } from '../types';

/**
 * Mock data for demonstration purposes
 * In production, this would be replaced with API calls
 */

// Sample users with high-quality avatars from Pexels
const users: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'online'
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'online'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'away'
  },
  {
    id: '4',
    name: 'David Rodriguez',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'offline'
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'online'
  },
  {
    id: '6',
    name: 'Alex Thompson',
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'online'
  },
  {
    id: '7',
    name: 'Jessica Brown',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'away'
  },
  {
    id: '8',
    name: 'Ryan Davis',
    avatar: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'online'
  },
  {
    id: '9',
    name: 'Amanda Garcia',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'offline'
  },
  {
    id: '10',
    name: 'Kevin Martinez',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'online'
  }
];

// Sample messages
const messages: Message[] = [
  {
    id: '1',
    senderId: '1',
    content: 'Hey! How are you doing today?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    isRead: false
  },
  {
    id: '2',
    senderId: '2',
    content: 'Can we schedule the meeting for tomorrow?',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    isRead: false
  },
  {
    id: '3',
    senderId: '3',
    content: 'Thanks for the help with the project! 🙏',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    isRead: true
  },
  {
    id: '4',
    senderId: '4',
    content: 'Let me know when you\'re free to chat',
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    isRead: true
  },
  {
    id: '5',
    senderId: '5',
    content: 'The presentation looks great! Well done 👏',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false
  },
  {
    id: '6',
    senderId: '6',
    content: 'Are we still on for lunch today?',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    isRead: true
  },
  {
    id: '7',
    senderId: '7',
    content: 'I\'ll send over the documents shortly',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    isRead: true
  },
  {
    id: '8',
    senderId: '8',
    content: 'Great job on the presentation! 🎉',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    isRead: true
  },
  {
    id: '9',
    senderId: '9',
    content: 'Let\'s catch up soon over coffee ☕',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    isRead: true
  },
  {
    id: '10',
    senderId: '10',
    content: 'Thanks for the quick response!',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true
  }
];

// Generate mock chats
export const mockChats: Chat[] = users.map((user, index) => ({
  id: `chat-${user.id}`,
  participant: user,
  lastMessage: messages[index],
  unreadCount: messages[index].isRead ? 0 : Math.floor(Math.random() * 5) + 1,
  timestamp: messages[index].timestamp
}));

// Sort chats by timestamp (most recent first)
mockChats.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());