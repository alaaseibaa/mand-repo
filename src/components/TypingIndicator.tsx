import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-end mb-4 animate-fadeIn">
      <div className="flex items-center space-x-3 space-x-reverse">
        <div className="backdrop-blur-xl bg-white/80 border border-white/40 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
          <div className="flex items-center space-x-1 space-x-reverse">
            <div className="flex space-x-1 space-x-reverse">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-xs text-gray-500 mr-2">يكتب...</span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs font-medium text-gray-700 shadow-sm">
          و
        </div>
      </div>
    </div>
  );
};