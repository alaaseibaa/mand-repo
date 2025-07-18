import React from 'react';
import { MessageCircle, Phone, Star } from 'lucide-react';
import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
  onChat: (agent: Agent) => void;
  onCall: (agent: Agent) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onChat, onCall }) => {
  const handleChatClick = () => {
    onChat(agent);
  };

  const handleCallClick = () => {
    onCall(agent);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl transition-all duration-300 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg">
      {/* Content */}
      <div className="p-4">
        {/* Header with avatar and status */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* Avatar placeholder with gradient */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
              {agent.name.split(' ')[0][0]}{agent.name.split(' ')[1]?.[0] || ''}
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                {agent.name}
              </h3>
              
              {/* Rating and reviews */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium text-gray-900">{agent.rating}</span>
                </div>
                <span className="text-xs text-gray-500">({agent.reviewCount} تقييم)</span>
              </div>
            </div>
          </div>
          
          {/* Online status */}
          <div className={`w-2 h-2 rounded-full ${agent.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
        </div>


        {/* Action buttons */}
        <div className="flex space-x-2 space-x-reverse">
          <button
            onClick={handleChatClick}
            disabled={!agent.isOnline}
            className={`flex-1 flex items-center justify-center space-x-2 space-x-reverse px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              agent.isOnline
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            aria-label={`بدء محادثة مع ${agent.name}`}
          >
            <MessageCircle className="h-3 w-3" />
            <span>محادثة</span>
          </button>
          
          <button
            onClick={handleCallClick}
            disabled={!agent.isOnline}
            className={`flex-1 flex items-center justify-center space-x-2 space-x-reverse px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              agent.isOnline
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                : 'bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed'
            }`}
            aria-label={`اتصال هاتفي مع ${agent.name}`}
          >
            <Phone className="h-3 w-3" />
            <span>مكالمة</span>
          </button>
        </div>
      </div>
    </div>
  );
};