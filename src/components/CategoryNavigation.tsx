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
    <div className="min-h-screen bg-white relative overflow-hidden flex" dir="rtl">
      {/* Conversation Sidebar */}
      <ConversationSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onConversationSelect={handleConversationSelect}
        onNewConversation={handleNewConversation}
        onNavigateHome={() => {
          // Already on home page, just close sidebar
          setSidebarOpen(false);
        }}
        onNavigateCategories={() => {
          // Already on categories page, just close sidebar
          setSidebarOpen(false);
        }}
      />

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:mr-64' : 'lg:mr-64'}`}>
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left: Hamburger + Title */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 lg:hidden"
                aria-label="قائمة المحادثات"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              
              <h1 className="text-xl font-semibold text-gray-900">
                استكشف الوكلاء
              </h1>
            </div>

            {/* Right: Login Button */}
            <div className="flex items-center space-x-3 space-x-reverse">
              <button
                onClick={onToggleLogin}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm font-medium"
              >
                {isLoggedIn ? 'خروج' : 'دخول'}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
        {/* Hero Section */}
          <section className="text-center py-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              الوكلاء
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              اكتشف وتفاعل مع إصدارات مخصصة من مندلين تجمع بين التعليمات والمعرفة الإضافية وأي مجموعة من المهارات.
            </p>
            
            {/* Search Box */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pr-12 pl-4 py-4 bg-gray-100 border-0 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all duration-200"
                  placeholder="البحث عن الوكلاء"
                />
              </div>
            </div>
          </section>

          {/* Category Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-1 space-x-reverse bg-gray-100 rounded-lg p-1">
              <button className="px-6 py-2 bg-white text-gray-900 rounded-md shadow-sm font-medium text-sm">
                الأفضل
              </button>
              <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md font-medium text-sm">
                الكتابة
              </button>
              <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md font-medium text-sm">
                الإنتاجية
              </button>
              <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md font-medium text-sm">
                البحث والتحليل
              </button>
              <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md font-medium text-sm">
                التعليم
              </button>
              <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-md font-medium text-sm">
                نمط الحياة
              </button>
            </div>
          </div>

          {/* Featured Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">مميز</h2>
            <p className="text-gray-600 mb-6">أفضل الاختيارات المنتقاة من هذا الأسبوع</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Featured Agent Cards */}
              <div className="bg-gray-800 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="flex items-center space-x-4 space-x-reverse mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">✍️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">مساعد الكتابة</h3>
                    <p className="text-gray-300 text-sm">مساعد كتابة فائق القوة ⚡</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-4">بواسطة puzzle.today</p>
              </div>
              
              <div className="bg-gray-800 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="flex items-center space-x-4 space-x-reverse mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">مساعد الباحث</h3>
                    <p className="text-gray-300 text-sm">تعزيز البحث بأكثر من 200 مليون مورد</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-4">بواسطة awesomegpts.ai</p>
              </div>
            </div>
          </div>

          {/* Service Categories */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">فئات الخدمات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryClick(category)}
                    className="group relative overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg"
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
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-sm`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-lg font-semibold text-gray-900">
                              {category.agents}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">وكيل متاح</p>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-4 flex-grow">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <MapPin className="h-3 w-3" />
                            <span>متوفر</span>
                          </div>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Phone className="h-3 w-3" />
                            <span>24/7</span>
                          </div>
                        </div>
                        
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};