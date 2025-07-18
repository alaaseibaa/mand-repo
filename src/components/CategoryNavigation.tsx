import React, { useState } from 'react';
import { Search, User, LogOut, MapPin, Phone, Users, Building, Heart, Hotel, Shield, UtensilsCrossed, Menu } from 'lucide-react';
import { Category } from '../types';
import { ConversationSidebar } from './ConversationSidebar';

interface CategoryNavigationProps {
  isLoggedIn: boolean;
  onToggleLogin: () => void;
  onCategorySelect: (category: Category) => void;
}

export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  isLoggedIn,
  onToggleLogin,
  onCategorySelect
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const categories: Category[] = [
    {
      id: 'government',
      name: 'الحكومة',
      icon: Shield,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50/30',
      borderColor: 'border-emerald-100/50',
      hoverBg: 'hover:bg-emerald-50/50',
      agents: 0,
      description: 'الخدمات الحكومية والإدارية'
    },
    {
      id: 'ngos',
      name: 'المنظمات غير الحكومية',
      icon: Heart,
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50/30',
      borderColor: 'border-rose-100/50',
      hoverBg: 'hover:bg-rose-50/50',
      agents: 0,
      description: 'المنظمات الخيرية والتطوعية'
    },
    {
      id: 'hospitals',
      name: 'المستشفيات',
      icon: Building,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50/30',
      borderColor: 'border-blue-100/50',
      hoverBg: 'hover:bg-blue-50/50',
      agents: 0,
      description: 'الخدمات الطبية والصحية'
    },
    {
      id: 'hotels',
      name: 'الفنادق',
      icon: Hotel,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50/30',
      borderColor: 'border-purple-100/50',
      hoverBg: 'hover:bg-purple-50/50',
      agents: 1,
      description: 'خدمات الضيافة والإقامة'
    },
    {
      id: 'restaurants',
      name: 'المطاعم',
      icon: UtensilsCrossed,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50/30',
      borderColor: 'border-amber-100/50',
      hoverBg: 'hover:bg-amber-50/50',
      agents: 1,
      description: 'المطاعم والخدمات الغذائية'
    }
  ];

  const handleCategoryClick = (category: Category) => {
    onCategorySelect(category);
  };

  const handleConversationSelect = () => {
    // Handle conversation selection - could navigate to chat
    // Selected conversation handler
  };

  const handleNewConversation = () => {
    // Handle new conversation
    // New conversation handler
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden" dir="rtl">
      {/* Conversation Sidebar */}
      <ConversationSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onConversationSelect={handleConversationSelect}
        onNewConversation={handleNewConversation}
      />

      {/* Liquid Glass Blur Overlay when sidebar is open */}
      <div 
        className={`fixed inset-0 transition-all duration-500 pointer-events-none z-30 ${
          sidebarOpen 
            ? 'backdrop-blur-xl bg-white/20 opacity-100' 
            : 'opacity-0'
        }`}
      />
      {/* Enhanced Background Gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange-200/40 via-blue-200/30 to-purple-200/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-orange-300/30 to-pink-300/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-blue-300/30 to-purple-300/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-1/3 left-10 w-64 h-64 bg-gradient-to-r from-emerald-200/25 to-teal-200/20 rounded-full blur-2xl opacity-30" />
        <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-gradient-to-l from-rose-200/25 to-orange-200/20 rounded-full blur-2xl opacity-35" />
      </div>

      {/* Minimal Modern Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo + Hamburger */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 backdrop-blur-xl bg-white/10 border border-white/20"
                aria-label="قائمة المحادثات"
              >
                <Menu className="h-5 w-5 text-gray-700" />
              </button>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <img 
                  src="/mandaleen-logo.png" 
                  alt="مندلين" 
                  className="h-8 w-8"
                />
                <h1 className="text-2xl font-semibold text-black tracking-normal">
                  مندلين
                </h1>
              </div>
            </div>

            {/* Liquid Glass Search Box */}
            <div className="flex-1 max-w-xl mx-12">
              <div className="relative group">
                {/* Liquid glass container */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/25 to-white/20 rounded-full backdrop-blur-3xl border border-white/20 shadow-2xl shadow-orange-500/10 group-hover:shadow-orange-500/20 transition-all duration-500" />
                
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-50/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Search icon */}
                <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none z-10">
                  <Search className="h-5 w-5 text-gray-500 group-hover:text-orange-500 transition-colors duration-300" />
                </div>
                
                {/* Input field */}
                <input
                  type="text"
                  className="relative w-full pr-12 pl-6 py-4 bg-transparent border-0 rounded-full placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-0 text-lg font-medium"
                  placeholder="ابحث عن أي خدمة..."
                />
              </div>
            </div>

            {/* Minimal Login Button */}
            <div className="flex items-center">
              <button
                onClick={onToggleLogin}
                className="group relative overflow-hidden px-6 py-3 rounded-full backdrop-blur-xl bg-gradient-to-r from-orange-500/90 to-orange-600/90 hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-300 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 border border-orange-400/30"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative flex items-center space-x-2 space-x-reverse font-medium">
                  {isLoggedIn ? (
                    <>
                      <LogOut className="h-4 w-4" />
                      <span>خروج</span>
                    </>
                  ) : (
                    <>
                      <User className="h-4 w-4" />
                      <span>دخول</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <img 
                  src="/mandaleen-logo.png" 
                  alt="مندلين" 
                  className="h-16 w-16 ml-4"
                />
                <h1 className="text-6xl sm:text-7xl font-bold text-gray-900">
                  مرحباً بكم في{' '}
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    مندلين
                  </span>
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                منصة شاملة للوصول إلى جميع الخدمات في مكان واحد
              </p>
              
              <div className="max-w-2xl mx-auto mb-16">
                <div className="relative">
                  <div className="backdrop-blur-2xl bg-white/40 rounded-3xl p-6 border border-white/30 shadow-2xl shadow-black/10 ring-1 ring-white/20">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <Search className="h-6 w-6 text-orange-500 flex-shrink-0" />
                      <input
                        type="text"
                        className="flex-1 bg-transparent text-lg placeholder-gray-500 text-gray-900 focus:outline-none"
                        placeholder="ابحث عن الخدمة التي تحتاجها..."
                      />
                      <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg shadow-orange-500/30">
                        بحث
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                فئات الخدمات
              </h2>
              <p className="text-xl text-gray-600">
                اختر الفئة المناسبة للوصول إلى الخدمات المطلوبة
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryClick(category)}
                    className="group relative overflow-hidden rounded-3xl transition-all duration-300 cursor-pointer backdrop-blur-xl bg-white/30 hover:bg-white/40 border-2 border-white/50 hover:border-white/70 hover:shadow-2xl hover:shadow-black/10 ring-1 ring-white/30 hover:ring-white/40"
                    role="button"
                    tabIndex={0}
                    aria-label={`عرض وكلاء ${category.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCategoryClick(category);
                      }
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    <div className="relative p-8 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-lg shadow-black/20`}>
                          <Icon className="h-8 w-8" />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Users className="h-5 w-5 text-gray-500" />
                            <span className="text-2xl font-bold text-gray-900">
                              {category.agents}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">وكيل متاح</p>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 flex-grow">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <MapPin className="h-4 w-4" />
                            <span>متوفر في جميع المدن</span>
                          </div>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Phone className="h-4 w-4" />
                            <span>دعم 24/7</span>
                          </div>
                        </div>
                        
                        <div className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-12 border-t border-white/20 backdrop-blur-sm bg-white/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
                <img 
                  src="/mandaleen-logo.png" 
                  alt="مندلين" 
                  className="h-8 w-8"
                />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  مندلين
                </h3>
              </div>
              <p className="text-gray-600">
                منصة شاملة لجميع الخدمات في مكان واحد
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};