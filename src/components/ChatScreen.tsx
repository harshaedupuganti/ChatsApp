import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Video, MoreVertical, Send, Paperclip, Smile, Image, FileText } from 'lucide-react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import InputToolbar from './InputToolbar';
import ImageViewer from './ImageViewer';
import DocumentPreview from './DocumentPreview';
import { Chat, Message, User } from '../types';
import { mockMessages } from '../data/mockData';

interface ChatScreenProps {
  chats: Chat[];
}

/**
 * ChatScreen Component
 * Individual chat conversation view with real-time messaging
 */
const ChatScreen: React.FC<ChatScreenProps> = ({ chats }) => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Find current chat
  const currentChat = chats.find(chat => chat.id === chatId);
  const currentUser: User = {
    id: 'current-user',
    name: 'You',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'online'
  };

  // Load messages for current chat
  useEffect(() => {
    if (currentChat) {
      setIsLoading(true);
      // Simulate loading messages
      setTimeout(() => {
        setMessages(mockMessages.filter(msg => 
          msg.chatId === chatId || Math.random() > 0.5
        ));
        setIsLoading(false);
      }, 500);
    }
  }, [chatId, currentChat]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (content: string, type: 'text' | 'image' | 'document' = 'text', attachment?: any) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      chatId: chatId!,
      senderId: currentUser.id,
      senderName: currentUser.name,
      content,
      type,
      attachment,
      timestamp: new Date(),
      status: 'sent',
      isRead: false
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
      ));
    }, 3000);

    // Simulate response
    if (Math.random() > 0.3) {
      setTimeout(() => {
        const responseMessage: Message = {
          id: `msg-${Date.now() + 1}`,
          chatId: chatId!,
          senderId: currentChat!.participant.id,
          senderName: currentChat!.participant.name,
          content: getRandomResponse(),
          type: 'text',
          timestamp: new Date(),
          status: 'read',
          isRead: false
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 2000 + Math.random() * 3000);
    }
  };

  const getRandomResponse = () => {
    const responses = [
      "That sounds great!",
      "I agree with you",
      "Let me think about it",
      "Thanks for sharing that",
      "Interesting point!",
      "I'll get back to you on that",
      "Sounds good to me",
      "That makes sense"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageViewer(true);
  };

  const handleDocumentClick = (document: any) => {
    setSelectedDocument(document);
    setShowDocumentPreview(true);
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!currentChat) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Chat not found</h2>
          <button
            onClick={handleBack}
            className="text-blue-500 hover:text-blue-600 px-4 py-2 rounded-lg border border-blue-500 hover:bg-blue-50 transition-colors"
          >
            Go back to chats
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-screen flex flex-col h-screen bg-white">
      {/* Chat Header */}
      <header className="chat-header flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center">
          <button
            onClick={handleBack}
            className="mr-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center">
            <div className="relative mr-3">
              <img
                src={currentChat.participant.avatar}
                alt={currentChat.participant.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {currentChat.participant.status === 'online' && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            
            <div>
              <h1 className="font-semibold text-gray-900">{currentChat.participant.name}</h1>
              <p className="text-sm text-gray-500">
                {currentChat.participant.status === 'online' ? 'Online' : 
                 currentChat.participant.status === 'away' ? 'Away' : 'Offline'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Voice call"
          >
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Video call"
          >
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Messages Container */}
      <div className="messages-container flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.senderId === currentUser.id}
                onImageClick={handleImageClick}
                onDocumentClick={handleDocumentClick}
              />
            ))}
            
            {isTyping && (
              <TypingIndicator 
                user={currentChat.participant}
              />
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Toolbar */}
      <InputToolbar onSendMessage={handleSendMessage} />

      {/* Image Viewer Modal */}
      {showImageViewer && (
        <ImageViewer
          imageUrl={selectedImage}
          onClose={() => setShowImageViewer(false)}
        />
      )}

      {/* Document Preview Modal */}
      {showDocumentPreview && selectedDocument && (
        <DocumentPreview
          document={selectedDocument}
          onClose={() => setShowDocumentPreview(false)}
        />
      )}
    </div>
  );
};

export default ChatScreen;