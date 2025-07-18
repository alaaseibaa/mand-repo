import React, { useState } from 'react';
import { MessageCircle, Clock, X, Search, Plus, Grid3X3, User, Home } from 'lucide-react';
import { ChatSession } from '../types/chat';
import { getConversationHistory } from '../data/mockConversations';

interface ConversationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentConversationId?: string;
  onConversationSelect: (conversation: ChatSession) => void;
  onNewConversation: () => void;
  onNavigateHome?: () => void;
  onNavigateCategories?: () => void;
}

export const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  isOpen,
  onClose,
  currentConversationId,
  onConversationSelect,
  onNewConversation,
  onNavigateHome,
  onNavigateCategories
}) => {
  const [activeTab, setActiveTab] = useState<'new' | 'categories' | 'history'>('new');
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
    return 'from-orange-500 to-orange-600';
  };

  const handleLogoClick = () => {
    onNavigateHome?.();
    onClose();
  };

  const handleNewConversation = () => {
    onNewConversation();
    onClose();
  };

  const handleCategoriesClick = () => {
    onNavigateCategories?.();
    onClose();
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
        className={`fixed inset-y-0 right-0 w-80 backdrop-blur-2xl bg-white/95 border-l border-white/20 shadow-2xl z-50 transform transition-all duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        dir="rtl"
      >
        {/* Header with Logo */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-3 space-x-reverse hover:opacity-80 transition-opacity duration-200"
            aria-label="العودة للصفحة الرئيسية"
          >
            <img 
              src="/mandaleen-logo.png" 
              alt="مندلين" 
              className="h-8 w-8"
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              مندلين
            </h1>
          </button>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 lg:hidden"
            aria-label="إغلاق الشريط الجانبي"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="p-4 space-y-2">
          {/* New Conversation Tab */}
          <button
            onClick={() => {
              setActiveTab('new');
              handleNewConversation();
            }}
            className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-2xl transition-all duration-200 ${
              activeTab === 'new'
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
                : 'hover:bg-white/40 text-gray-700'
            }`}
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">محادثة جديدة</span>
          </button>

          {/* Categories Tab */}
          <button
            onClick={() => {
              setActiveTab('categories');
              handleCategoriesClick();
            }}
            className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-2xl transition-all duration-200 ${
              activeTab === 'categories'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'hover:bg-white/40 text-gray-700'
            }`}
          >
            <Grid3X3 className="h-5 w-5" />
            <span className="font-medium">الأقسام</span>
          </button>
        </div>

        {/* Conversation History Section */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-600">المحادثات السابقة</h3>
            <span className="text-xs text-gray-500">{conversations.length}</span>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pr-10 pl-3 py-2.5 border border-white/30 rounded-xl bg-white/40 backdrop-blur-md placeholder-gray-500 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-200"
              placeholder="البحث في المحادثات..."
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-2">
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => {
                  onConversationSelect(conversation);
                  setActiveTab('history');
                }}
                className={`w-full text-right p-3 rounded-xl mb-1 transition-all duration-200 hover:bg-white/40 group ${
                  currentConversationId === conversation.id
                    ? 'bg-white/60 border border-orange-200 shadow-sm'
                    : ''
                }`}
              >
                <div className="flex items-start space-x-3 space-x-reverse">
                  {/* Agent Avatar */}
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getCategoryColor(conversation.agentId)} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg`}>
                    {conversation.agentName.split(' ')[0][0]}{conversation.agentName.split(' ')[1]?.[0] || ''}
                  </div>

                  {/* Conversation Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">
                        {conversation.agentName}
                      </h4>
                      <div className="flex items-center space-x-1 space-x-reverse text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimestamp(conversation.lastActivity)}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600 truncate leading-relaxed">
                      {getLastMessage(conversation)}
                    </p>
                  </div>
                </div>

                {/* Active indicator */}
                {currentConversationId === conversation.id && (
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full" />
                )}
              </button>
            ))}

            {conversations.length === 0 && (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">لا توجد محادثات سابقة</p>
              </div>
            )}
          </div>
        </div>

        {/* Account Section at Bottom */}
        <div className="p-4 border-t border-white/10 mt-auto">
          <button className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-2xl hover:bg-white/40 text-gray-700 transition-all duration-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold text-sm">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1 text-right">
              <p className="font-medium text-sm">حسابي</p>
              <p className="text-xs text-gray-500">إعدادات الحساب</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};