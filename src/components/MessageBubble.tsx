import React from 'react';
import { Check, CheckCheck, Clock, Download } from 'lucide-react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  onImageClick?: (imageUrl: string) => void;
  onDocumentClick?: (document: any) => void;
}

/**
 * MessageBubble Component
 * Individual message bubble with content, timestamp, and status indicators
 */
const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwn,
  onImageClick,
  onDocumentClick
}) => {
  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Clock className="w-4 h-4 text-gray-400" />;
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const renderContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="message-image">
            <img
              src={message.attachment?.url || message.content}
              alt="Shared image"
              className="max-w-xs rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => onImageClick?.(message.attachment?.url || message.content)}
            />
            {message.content && message.content !== message.attachment?.url && (
              <p className="mt-2 text-sm">{message.content}</p>
            )}
          </div>
        );
      
      case 'document':
        return (
          <div 
            className="message-document flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors max-w-xs"
            onClick={() => onDocumentClick?.(message.attachment)}
          >
            <div className="flex-shrink-0 mr-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {message.attachment?.name || 'Document'}
              </p>
              <p className="text-xs text-gray-500">
                {message.attachment?.size || 'Unknown size'}
              </p>
            </div>
          </div>
        );
      
      default:
        return <p className="text-sm">{message.content}</p>;
    }
  };

  return (
    <div className={`message-bubble flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
        isOwn 
          ? 'bg-blue-500 text-white rounded-br-md' 
          : 'bg-gray-200 text-gray-900 rounded-bl-md'
      }`}>
        {/* Message Content */}
        <div className="message-content">
          {renderContent()}
        </div>

        {/* Timestamp and Status */}
        <div className={`flex items-center justify-end mt-1 space-x-1 ${
          isOwn ? 'text-blue-100' : 'text-gray-500'
        }`}>
          <span className="text-xs">
            {formatTime(message.timestamp)}
          </span>
          {isOwn && (
            <div className="flex-shrink-0">
              {getStatusIcon()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;