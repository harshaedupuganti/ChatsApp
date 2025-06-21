/**
 * TypeScript interfaces for the chat application
 * Provides type safety and integration points for team development
 */

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead?: boolean;
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