import React, { useState } from 'react';
import { MessageCircle, Clock, X, Search, Plus, Grid3X3, User, Home, Library, Sparkles, Bot, Settings } from 'lucide-react';
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
  const [activeSection, setActiveSection] = useState<'chats' | 'agents'>('chats');
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
    return content.length > 40 ? content.substring(0, 40) + '...' : content;
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

  // Mock agents data for the agents section
  const mockAgents = [
    { id: 'zoka', name: 'زوكا', title: 'مختص المطاعم والضيافة', icon: '🍽️', category: 'restaurants' },
    { id: 'hotel-agent', name: 'وكيل الفنادق', title: 'خدمات الحجز والإقامة', icon: '🏨', category: 'hotels' },
    { id: 'gov-agent', name: 'الخدمات الحكومية', title: 'المعاملات الرسمية', icon: '🏛️', category: 'government' },
    { id: 'health-agent', name: 'المساعد الطبي', title: 'الاستشارات الصحية', icon: '🏥', category: 'hospitals' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 right-0 w-64 bg-gray-900 border-l border-gray-800 z-50 transform transition-all duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:translate-x-0`}
        dir="rtl"
      >
        {/* Header with Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-2 space-x-reverse hover:bg-gray-800 rounded-lg p-2 transition-colors duration-200"
            aria-label="العودة للصفحة الرئيسية"
          >
            <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-bold">م</span>
            </div>
            <span className="text-white font-medium text-sm">مندلين</span>
          </button>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded-md transition-colors duration-200 lg:hidden"
            aria-label="إغلاق الشريط الجانبي"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-2 space-y-1">
          {/* New Chat */}
          <button
            onClick={handleNewConversation}
            className="w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors duration-200 group"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">محادثة جديدة</span>
            <span className="mr-auto text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">Ctrl+Shift+O</span>
          </button>

          {/* Search Chats */}
          <button
            onClick={() => setActiveSection('chats')}
            className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg transition-colors duration-200 ${
              activeSection === 'chats' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Search className="h-4 w-4" />
            <span className="text-sm font-medium">البحث في المحادثات</span>
          </button>

          {/* Library/Categories */}
          <button
            onClick={() => {
              setActiveSection('agents');
              handleCategoriesClick();
            }}
            className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg transition-colors duration-200 ${
              activeSection === 'agents' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Library className="h-4 w-4" />
            <span className="text-sm font-medium">مكتبة الوكلاء</span>
          </button>

          {/* Divider */}
          <div className="border-t border-gray-800 my-2" />

          {/* Agents Section */}
          <div className="space-y-1">
            <div className="px-3 py-2">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">الوكلاء</h3>
            </div>
            
            {mockAgents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => {
                  // Handle agent selection
                  handleCategoriesClick();
                }}
                className="w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors duration-200 group"
              >
                <div className="w-6 h-6 rounded-md bg-gray-700 flex items-center justify-center text-sm">
                  {agent.icon}
                </div>
                <div className="flex-1 text-right">
                  <div className="text-sm font-medium text-white">{agent.name}</div>
                  <div className="text-xs text-gray-500 truncate">{agent.title}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 my-2" />
        </div>

        {/* Conversations Section */}
        <div className="flex-1 overflow-hidden">
          <div className="px-3 py-2">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">المحادثات</h3>
          </div>
          
          <div className="px-2 pb-2 overflow-y-auto max-h-96">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => {
                    onConversationSelect(conversation);
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                  className={`w-full text-right p-2 rounded-lg transition-colors duration-200 group relative ${
                    currentConversationId === conversation.id
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2 space-x-reverse">
                    <div className="w-6 h-6 rounded-md bg-gray-700 flex items-center justify-center text-xs flex-shrink-0">
                      <MessageCircle className="h-3 w-3" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate mb-1">
                        {conversation.agentName}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {getLastMessage(conversation)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {formatTimestamp(conversation.lastActivity)}
                      </div>
                    </div>
                  </div>
                </button>
              ))}

              {conversations.length === 0 && (
                <div className="text-center py-8">
                  <MessageCircle className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">لا توجد محادثات</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 p-2">
          <button className="w-full flex items-center space-x-3 space-x-reverse px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors duration-200">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
              <User className="h-3 w-3 text-white" />
            </div>
            <div className="flex-1 text-right">
              <div className="text-sm font-medium text-white">حسابي</div>
              <div className="text-xs text-gray-500">مستخدم مجاني</div>
            </div>
            <Settings className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
    </>
  );
};