import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, Search, Filter, User } from 'lucide-react';
import { Category, Agent } from '../types';
import { AgentCard } from './AgentCard';
import { ConversationSidebar } from './ConversationSidebar';
import { getAgentsByCategory } from '../data/mockAgents';

interface AgentListProps {
  category: Category;
  onBack: () => void;
  onStartChat: (agent: Agent) => void;
  onStartCall: (agent: Agent) => void;
}

export const AgentList: React.FC<AgentListProps> = ({ category, onBack, onStartChat, onStartCall }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOnline, setFilterOnline] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'responseTime'>('rating');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      const categoryAgents = getAgentsByCategory(category.id);
      setAgents(categoryAgents);
      setFilteredAgents(categoryAgents);
      setIsLoading(false);
    }, 300);
  }, [category.id]);

  useEffect(() => {
    let filtered = agents;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply online filter
    if (filterOnline) {
      filtered = filtered.filter(agent => agent.isOnline);
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name, 'ar');
        case 'responseTime':
          return a.isOnline === b.isOnline ? 0 : a.isOnline ? -1 : 1;
        default:
          return 0;
      }
    });

    setFilteredAgents(filtered);
  }, [agents, searchQuery, filterOnline, sortBy]);

  const handleChat = (agent: Agent) => {
    onStartChat(agent);
  };

  const handleCall = (agent: Agent) => {
    onStartCall(agent);
  };

  const handleConversationSelect = () => {
    // Handle conversation selection - could navigate to chat
    // Selected conversation handler
  };

  const handleNewConversation = () => {
    // Handle new conversation
    // New conversation handler
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onlineAgentsCount = agents.filter(agent => agent.isOnline).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden" dir="rtl">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange-200/40 via-blue-200/30 to-purple-200/20 rounded-full blur-3xl opacity-60" />
        </div>
        
        <div className="relative pt-32 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-600">جاري تحميل الوكلاء...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex" dir="rtl">
      {/* Conversation Sidebar */}
      <ConversationSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onConversationSelect={handleConversationSelect}
        onNewConversation={handleNewConversation}
        onNavigateHome={() => {
          // Navigate back to home
          setSidebarOpen(false);
          onBack(); // Go back to categories, then home
        }}
        onNavigateCategories={() => {
          // Navigate to categories
          setSidebarOpen(false);
          onBack(); // Go back to categories
        }}
      />

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:mr-64' : 'lg:mr-64'}`}>
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left: Hamburger + Back + Title */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 lg:hidden"
                aria-label="قائمة المحادثات"
              >
                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <button
                onClick={onBack}
                className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
                aria-label="العودة إلى الفئات"
              >
                <ArrowRight className="h-4 w-4 group-hover:transform group-hover:translate-x-1 transition-transform duration-200" />
                <span className="font-medium">عودة</span>
              </button>
              
              <h1 className="text-xl font-semibold text-gray-900">
                {category.name}
              </h1>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-3 py-2 bg-gray-100 border-0 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all duration-200"
                  placeholder="ابحث عن وكيل..."
                />
              </div>
            </div>

            {/* Right: Login Button */}
            <div className="flex items-center">
              <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm font-medium">
                دخول
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Filters */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              {/* Status */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-600">{onlineAgentsCount} متاح الآن</span>
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-3 space-x-reverse">
                <button
                  onClick={() => setFilterOnline(!filterOnline)}
                  className={`flex items-center space-x-2 space-x-reverse px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filterOnline
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Filter className="h-3 w-3" />
                  <span>متاح الآن</span>
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'rating' | 'name' | 'responseTime')}
                  className="px-3 py-1.5 rounded-lg bg-white text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                >
                  <option value="rating">ترتيب حسب التقييم</option>
                  <option value="name">ترتيب حسب الاسم</option>
                  <option value="responseTime">ترتيب حسب التوفر</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-600 text-sm">
              عرض {filteredAgents.length} من أصل {agents.length} وكيل
            </p>
          </div>

          {/* Agent cards */}
          {filteredAgents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onChat={handleChat}
                  onCall={handleCall}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-2xl p-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  لا توجد نتائج
                </h3>
                <p className="text-gray-600 mb-6">
                  لم نجد أي وكلاء يطابقون معايير البحث الخاصة بك
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterOnline(false);
                  }}
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200"
                >
                  إعادة تعيين البحث
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};