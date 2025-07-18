import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Phone, Video, MoreVertical, Wifi, WifiOff } from 'lucide-react';
import { Agent } from '../types';
import { StreamingChatBubble } from './StreamingChatBubble';
import { TypingIndicator } from './TypingIndicator';
import { VoiceRecorder } from './VoiceRecorder';
import { ConversationSidebar } from './ConversationSidebar';
import { useChat } from '../hooks/useChat';

interface ChatInterfaceProps {
  agent: Agent;
  onStartCall: (agent: Agent) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ agent, onStartCall }) => {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const {
    chatState,
    voiceRecording,
    messagesEndRef,
    sendMessage,
    startRecording,
    stopRecording,
    clearError
  } = useChat(agent);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Throttled scroll function for streaming updates
  const scrollToBottomThrottled = useCallback(() => {
    // Use requestAnimationFrame for smooth scrolling during streaming
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: 'auto', // Changed to 'auto' for instant scrolling during streaming
        block: 'end' 
      });
    });
  }, [messagesEndRef]);

  // Regular scroll function for completion
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'end' 
    });
  }, [messagesEndRef]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    await sendMessage(inputValue);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCall = () => {
    onStartCall(agent);
  };

  const handleVideoCall = () => {
    // Starting video call...
    alert(`بدء مكالمة فيديو مع ${agent.name}`);
  };

  const handleConversationSelect = () => {
    // Selected conversation handler
    // Here you would typically load the selected conversation
    // For now, we'll just close the sidebar on mobile
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleNewConversation = () => {
    // Starting new conversation...
    // Here you would typically create a new conversation
  };

  if (!chatState.currentSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white relative overflow-hidden flex" dir="rtl">

      {/* Conversation Sidebar */}
      <ConversationSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentConversationId={chatState.currentSession.id}
        onConversationSelect={handleConversationSelect}
        onNewConversation={handleNewConversation}
        onNavigateHome={() => {
          // Navigate back to home - this would need to be passed from App component
          setSidebarOpen(false);
          // For now, just close sidebar. In a real app, you'd navigate to home
        }}
        onNavigateCategories={() => {
          // Navigate to categories - this would need to be passed from App component  
          setSidebarOpen(false);
          // For now, just close sidebar. In a real app, you'd navigate to categories
        }}
      />

      {/* Main Chat Area */}
      <div className={`relative flex flex-col h-full flex-1 min-w-0 transition-all duration-300 ${
        sidebarOpen ? 'lg:mr-64' : 'lg:mr-64'
      }`}>
        {/* Chat Header */}
        <header className={`fixed top-0 z-40 bg-white border-b border-gray-200 transition-all duration-300 ${
          sidebarOpen ? 'left-0 right-0 lg:right-64' : 'left-0 right-0 lg:right-64'
        }`}>
          <div className="px-6">
            <div className="flex items-center justify-between h-16">
              
              {/* Left: Hamburger + Agent Info */}
              <div className="flex items-center space-x-3 space-x-reverse">
                {/* Sidebar Toggle - Before agent info */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 lg:hidden"
                  aria-label="قائمة المحادثات"
                >
                  <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                  {agent.name.split(' ')[0][0]}{agent.name.split(' ')[1]?.[0] || ''}
                </div>
                
                <div className="text-right">
                  <h2 className="text-base font-medium text-gray-900">{agent.name}</h2>
                  <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-500">
                    {chatState.isConnected ? (
                      <>
                        <Wifi className="h-3 w-3 text-green-500" />
                        <span>متصل</span>
                      </>
                    ) : (
                      <>
                        <WifiOff className="h-3 w-3 text-red-500" />
                        <span>غير متصل</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex items-center space-x-3 space-x-reverse">
                <button
                  onClick={handleCall}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  aria-label="مكالمة صوتية"
                >
                  <Phone className="h-5 w-5 text-gray-600" />
                </button>
                
                <button
                  onClick={handleVideoCall}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  aria-label="مكالمة فيديو"
                >
                  <Video className="h-5 w-5 text-gray-600" />
                </button>
                
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Error Banner */}
        {chatState.error && (
          <div className="bg-red-50 border-b border-red-200 px-4 py-3 flex items-center justify-between">
            <span className="text-red-700 text-sm">{chatState.error}</span>
            <button
              onClick={clearError}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              إغلاق
            </button>
          </div>
        )}

        {/* Chat Messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-6 py-4 space-y-1 pt-20 relative z-20"
          style={{ scrollBehavior: 'smooth' }}
        >
          {chatState.currentSession.messages.map((message, index) => (
            <StreamingChatBubble
              key={message.id}
              message={message}
              isLast={index === chatState.currentSession!.messages.length - 1}
              enableStreaming={true}
              onStreamingUpdate={scrollToBottomThrottled}
              onStreamingComplete={scrollToBottom}
            />
          ))}
          
          {chatState.isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 bg-white border-t border-gray-200 px-6 py-4 relative z-30">
          <div className={`bg-gray-100 rounded-2xl border transition-all duration-300 ${
            isInputFocused 
              ? 'border-gray-300 bg-white shadow-sm' 
              : 'border-transparent'
          }`}>
            <div className="flex items-end space-x-3 space-x-reverse p-3">
              {/* Voice Recorder */}
              <VoiceRecorder
                voiceRecording={voiceRecording}
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
                disabled={!chatState.isConnected}
              />

              {/* Text Input */}
              <div className="flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="اكتب رسالتك هنا..."
                  disabled={!chatState.isConnected || voiceRecording.isRecording}
                  className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none resize-none leading-relaxed py-2"
                  style={{ minHeight: '24px', maxHeight: '120px' }}
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || !chatState.isConnected || voiceRecording.isRecording}
                className={`p-3 rounded-full transition-all duration-200 shadow-lg ${
                  inputValue.trim() && chatState.isConnected && !voiceRecording.isRecording
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                aria-label="إرسال الرسالة"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};