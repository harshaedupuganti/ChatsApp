/**
 * TypeScript interfaces for the chat application
 * Provides comprehensive type safety and integration points
 */

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  content: string;
  type: 'text' | 'image' | 'document';
  attachment?: {
    url: string;
    name: string;
    size: string | number;
    type?: string;
  };
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  isRead: boolean;
}

export interface Chat {
  id: string;
  participant: User;
  lastMessage: Message;
  unreadCount: number;
  timestamp: Date;
}

export interface ProfileViewState {
  isVisible: boolean;
  isFullScreen: boolean;
  user: User | null;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  isActive: boolean;
  badge?: number;
}

export interface AppError {
  code: string;
  message: string;
  timestamp: Date;
}