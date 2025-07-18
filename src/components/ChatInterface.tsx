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
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden flex" dir="rtl">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-orange-200/30 via-blue-200/20 to-purple-200/15 rounded-full blur-3xl opacity-60" />
      </div>

      {/* Conversation Sidebar */}
      <ConversationSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentConversationId={chatState.currentSession.id}
        onConversationSelect={handleConversationSelect}
        onNewConversation={handleNewConversation}
      />

      {/* Main Chat Area */}
      <div className={`relative flex flex-col h-full flex-1 min-w-0 transition-all duration-300 ${
        sidebarOpen ? 'lg:mr-80' : ''
      }`}>
        {/* Chat Header */}
        <header className={`fixed top-0 z-40 backdrop-blur-2xl bg-white/10 border-b border-white/10 transition-all duration-300 ${
          sidebarOpen ? 'left-0 right-0 lg:right-80' : 'left-0 right-0'
        }`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              
              {/* Left: Hamburger + Agent Info */}
              <div className="flex items-center space-x-3 space-x-reverse">
                {/* Sidebar Toggle - Before agent info */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 backdrop-blur-xl bg-white/10 border border-white/20"
                  aria-label="قائمة المحادثات"
                >
                  <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg">
                  {agent.name.split(' ')[0][0]}{agent.name.split(' ')[1]?.[0] || ''}
                </div>
                
                <div className="text-right">
                  <h2 className="text-lg font-semibold text-gray-900">{agent.name}</h2>
                  <div className="flex items-center space-x-2 space-x-reverse text-xs">
                    {chatState.isConnected ? (
                      <>
                        <Wifi className="h-3 w-3 text-green-500" />
                        <span className="text-green-600">متصل</span>
                      </>
                    ) : (
                      <>
                        <WifiOff className="h-3 w-3 text-red-500" />
                        <span className="text-red-600">غير متصل</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex items-center space-x-3 space-x-reverse">
                <button
                  onClick={handleCall}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 backdrop-blur-xl bg-white/10 border border-white/20"
                  aria-label="مكالمة صوتية"
                >
                  <Phone className="h-5 w-5 text-gray-700" />
                </button>
                
                <button
                  onClick={handleVideoCall}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 backdrop-blur-xl bg-white/10 border border-white/20"
                  aria-label="مكالمة فيديو"
                >
                  <Video className="h-5 w-5 text-gray-700" />
                </button>
                
                <button className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 backdrop-blur-xl bg-white/10 border border-white/20">
                  <MoreVertical className="h-5 w-5 text-gray-700" />
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
          className="flex-1 overflow-y-auto px-4 py-6 space-y-1 pt-24 relative z-20"
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
        <div className="flex-shrink-0 backdrop-blur-xl bg-white/80 border-t border-white/30 px-4 py-4 relative z-30">
          <div className={`backdrop-blur-md bg-white/60 rounded-3xl border transition-all duration-300 ${
            isInputFocused 
              ? 'border-orange-300/60 shadow-lg shadow-orange-500/10' 
              : 'border-white/40 shadow-md shadow-black/5'
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
                  className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none resize-none text-sm leading-relaxed py-2"
                  style={{ minHeight: '24px', maxHeight: '120px' }}
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || !chatState.isConnected || voiceRecording.isRecording}
                className={`p-3 rounded-full transition-all duration-200 shadow-lg ${
                  inputValue.trim() && chatState.isConnected && !voiceRecording.isRecording
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-gray-200/50'
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