import React from 'react';
import { Check, CheckCheck, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message, ChatMessage } from '../types/chat';
import { useStreamingText } from '../hooks/useStreamingText';

interface StreamingChatBubbleProps {
  message: Message | ChatMessage;
  isLast: boolean;
  enableStreaming?: boolean;
  onStreamingComplete?: () => void;
  onStreamingUpdate?: () => void;
}

export const StreamingChatBubble: React.FC<StreamingChatBubbleProps> = ({ 
  message, 
  isLast, 
  enableStreaming = true,
  onStreamingComplete,
  onStreamingUpdate
}) => {
  // Handle both Message and ChatMessage types
  const isUser = 'sender' in message && typeof message.sender === 'string' 
    ? message.sender === 'user'
    : 'type' in message 
    ? message.type === 'user'
    : false;

  // Only enable streaming for AI messages
  const shouldStream = !isUser && enableStreaming && isLast;
  
  const { displayedText, isStreaming, skipToEnd } = useStreamingText({
    text: message.content,
    speed: 5, // 5 characters per 15ms = ultra fast
    interval: 15, // 15ms for ultra smooth streaming
    enabled: shouldStream,
    onComplete: onStreamingComplete,
    onUpdate: onStreamingUpdate
  });

  const getStatusIcon = () => {
    // Only show status for Message type (not ChatMessage)
    if ('status' in message) {
      switch (message.status) {
        case 'sending':
          return <Clock className="h-3 w-3 text-gray-400 animate-pulse" />;
        case 'sent':
          return <Check className="h-3 w-3 text-gray-400" />;
        case 'delivered':
          return <CheckCheck className="h-3 w-3 text-gray-400" />;
        case 'read':
          return <CheckCheck className="h-3 w-3 text-orange-500" />;
        default:
          return null;
      }
    }
    return null;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const contentToDisplay = shouldStream ? displayedText : message.content;

  return (
    <div
      className={`flex ${isUser ? 'justify-start' : 'justify-end'} mb-4 animate-slideIn`}
      style={{
        animationDelay: isLast ? '0ms' : '100ms'
      }}
    >
      <div
        className={`max-w-[70%] sm:max-w-[60%] ${
          isUser
            ? 'order-2 mr-3'
            : 'order-1 ml-3'
        }`}
      >
        {/* Message bubble */}
        <div
          className={`relative px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
            isUser
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-br-md'
              : 'backdrop-blur-xl bg-white/80 text-gray-900 border border-white/40 rounded-bl-md'
          }`}
          onClick={isStreaming ? skipToEnd : undefined}
          style={{ cursor: isStreaming ? 'pointer' : 'default' }}
          title={isStreaming ? 'اضغط لإظهار النص كاملاً' : undefined}
        >
          {/* Render markdown for AI messages, plain text for user messages */}
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {contentToDisplay}
            </p>
          ) : (
            <div className="text-sm leading-relaxed prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  // Custom styling for markdown elements
                  h1: ({ children }) => (
                    <h1 className="text-base font-bold text-gray-900 mb-2 mt-1">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-sm font-bold text-gray-900 mb-2 mt-1">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-sm font-semibold text-gray-800 mb-1 mt-1">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-sm text-gray-900 mb-2 last:mb-0">{children}</p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900">{children}</strong>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-sm text-gray-900 mb-2 space-y-1 mr-2">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-sm text-gray-900 mb-2 space-y-1 mr-2">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-sm text-gray-900">{children}</li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-r-2 border-orange-300 pr-3 mr-2 text-sm italic text-gray-700 mb-2">{children}</blockquote>
                  ),
                  code: ({ children, className }) => {
                    // Inline code
                    if (!className) {
                      return <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-xs font-mono">{children}</code>;
                    }
                    // Code block
                    return (
                      <pre className="bg-gray-100 text-gray-800 p-2 rounded text-xs font-mono overflow-x-auto mb-2">
                        <code>{children}</code>
                      </pre>
                    );
                  },
                  a: ({ children, href }) => (
                    <a href={href} className="text-orange-600 hover:text-orange-700 underline" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                }}
              >
                {contentToDisplay}
              </ReactMarkdown>
              
              {/* Streaming cursor */}
              {isStreaming && (
                <span className="inline-block w-2 h-4 bg-orange-500 ml-1 animate-pulse" />
              )}
            </div>
          )}
          
          {/* Message tail */}
          <div
            className={`absolute top-4 w-3 h-3 transform rotate-45 ${
              isUser
                ? 'right-[-6px] bg-gradient-to-r from-orange-500 to-orange-600'
                : 'left-[-6px] backdrop-blur-xl bg-white/80 border-l border-b border-white/40'
            }`}
          />
        </div>

        {/* Message info */}
        <div
          className={`flex items-center mt-1 space-x-2 space-x-reverse text-xs text-gray-500 ${
            isUser ? 'justify-start' : 'justify-end'
          }`}
        >
          <span>{formatTime(message.timestamp)}</span>
          {isStreaming && !isUser && (
            <span className="text-orange-500 animate-pulse">جاري الكتابة...</span>
          )}
          {isUser && getStatusIcon()}
        </div>
      </div>

      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium shadow-sm ${
          isUser
            ? 'order-1 bg-gradient-to-br from-orange-400 to-orange-600 text-white'
            : 'order-2 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700'
        }`}
      >
        {isUser ? 'أ' : 'ل'}
      </div>
    </div>
  );
};