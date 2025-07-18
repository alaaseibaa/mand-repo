import React from 'react';
import { MessageCircle, Clock, X, Search, Plus } from 'lucide-react';
import { ChatSession } from '../types/chat';
import { getConversationHistory } from '../data/mockConversations';

interface ConversationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentConversationId?: string;
  onConversationSelect: (conversation: ChatSession) => void;
  onNewConversation: () => void;
}

export const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  isOpen,
  onClose,
  currentConversationId,
  onConversationSelect,
  onNewConversation
}) => {
  const conversations = getConversationHistory();

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      return 'الآن';
    } else if (diffInHours < 24) {
      return `منذ ${diffInHours} ساعة`;
    } else if (diffInDays === 1) {
      return 'أمس';
    } else if (diffInDays < 7) {
      return `منذ ${diffInDays} أيام`;
    } else {
      return date.toLocaleDateString('ar-SA', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const getLastMessage = (conversation: ChatSession) => {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (!lastMessage) return '';
    
    const content = lastMessage.content;
    return content.length > 50 ? content.substring(0, 50) + '...' : content;
  };

  const getCategoryColor = (agentId: string) => {
    if (agentId.startsWith('gov-')) return 'from-emerald-500 to-emerald-600';
    if (agentId.startsWith('hospital-')) return 'from-blue-500 to-blue-600';
    if (agentId.startsWith('hotel-')) return 'from-purple-500 to-purple-600';
    if (agentId.startsWith('ngo-')) return 'from-rose-500 to-rose-600';
    return 'from-gray-500 to-gray-600';
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 right-0 w-80 bg-white border-l border-gray-200 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        dir="rtl"
      >
        {/* Top Header */}
        <div className="flex items-center justify-end p-4 mt-20">
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 lg:hidden"
            aria-label="إغلاق الشريط الجانبي"
          >
            <X className="h-4 w-4 text-gray-600 hover:text-gray-900" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4 pt-0">
          <button
            onClick={onNewConversation}
            className="w-full flex items-center justify-center space-x-2 space-x-reverse px-4 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-colors duration-200 text-gray-700 font-medium"
            aria-label="محادثة جديدة"
          >
            <Plus className="h-4 w-4" />
            <span>محادثة جديدة</span>
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-500 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              placeholder="البحث في المحادثات..."
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onConversationSelect(conversation)}
                className={`w-full text-right p-3 rounded-lg mb-1 transition-all duration-200 hover:bg-gray-100 group ${
                  currentConversationId === conversation.id
                    ? 'bg-gray-100 border-l-2 border-orange-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3 space-x-reverse">
                  {/* Agent Avatar */}
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getCategoryColor(conversation.agentId)} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                    {conversation.agentName.split(' ')[0][0]}{conversation.agentName.split(' ')[1]?.[0] || ''}
                  </div>

                  {/* Conversation Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 text-sm truncate">
                        {conversation.agentName}
                      </h3>
                      <div className="flex items-center space-x-1 space-x-reverse text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimestamp(conversation.lastActivity)}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600 truncate">
                      {getLastMessage(conversation)}
                    </p>
                  </div>
                </div>

                {/* Unread indicator (if needed) */}
                {conversation.isActive && (
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-center text-xs text-gray-500">
            <MessageCircle className="h-4 w-4 mr-2" />
            <span>{conversations.length} محادثة</span>
          </div>
        </div>
      </div>
    </>
  );
};