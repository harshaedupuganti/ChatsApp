import React, { useState, useRef } from 'react';
import { Send, Paperclip, Smile, Image, FileText, X } from 'lucide-react';

interface InputToolbarProps {
  onSendMessage: (content: string, type?: 'text' | 'image' | 'document', attachment?: any) => void;
}

/**
 * InputToolbar Component
 * Message input section with expandable text field and attachment options
 */
const InputToolbar: React.FC<InputToolbarProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      setShowEmojiPicker(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate image upload
      const imageUrl = URL.createObjectURL(file);
      onSendMessage('', 'image', { url: imageUrl, name: file.name, size: file.size });
      setShowAttachmentMenu(false);
    }
  };

  const handleDocumentSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      
      onSendMessage('', 'document', { 
        name: file.name, 
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        type: file.type,
        url: URL.createObjectURL(file)
      });
      setShowAttachmentMenu(false);
    }
  };

  const commonEmojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🔥', '💯', '🎉'];

  return (
    <div className="input-toolbar relative border-t border-gray-200 bg-white p-4">
      {/* Simple Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-full left-4 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-50">
          <div className="grid grid-cols-5 gap-2">
            {commonEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiClick(emoji)}
                className="text-2xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Attachment Menu */}
      {showAttachmentMenu && (
        <div className="absolute bottom-full left-4 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-40">
          <button
            onClick={() => imageInputRef.current?.click()}
            className="flex items-center w-full p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Image className="w-5 h-5 text-blue-500 mr-3" />
            <span className="text-sm font-medium">Photo</span>
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center w-full p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FileText className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-sm font-medium">Document</span>
          </button>
        </div>
      )}

      {/* Input Container */}
      <div className="flex items-end space-x-2">
        {/* Attachment Button */}
        <button
          onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
          className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Attach file"
        >
          {showAttachmentMenu ? <X className="w-5 h-5" /> : <Paperclip className="w-5 h-5" />}
        </button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-30"
            rows={1}
          />
          
          {/* Emoji Button */}
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 rounded-full transition-colors"
            aria-label="Add emoji"
          >
            <Smile className="w-5 h-5" />
          </button>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`flex-shrink-0 p-2 rounded-full transition-all ${
            message.trim()
              ? 'bg-blue-500 text-white hover:bg-blue-600 scale-100'
              : 'bg-gray-200 text-gray-400 scale-95'
          }`}
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt,.zip,.rar"
        onChange={handleDocumentSelect}
        className="hidden"
      />
    </div>
  );
};

export default InputToolbar;