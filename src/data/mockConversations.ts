import { ChatSession } from '../types/chat';

export const mockConversations: ChatSession[] = [
  {
    id: 'conv-1',
    agentId: 'hotel-zoka',
    agentName: 'زوكا',
    agentTitle: 'مختص الحجوزات والضيافة المتميزة',
    messages: [
      {
        id: 'msg-1',
        content: 'مرحباً بك! كيف يمكنني مساعدتك في حجوزات الفنادق؟',
        sender: 'agent',
        timestamp: new Date('2024-01-13T16:45:00'),
        type: 'text',
        status: 'read'
      },
      {
        id: 'msg-2',
        content: 'أبحث عن فندق في الرياض لمدة 3 ليالي',
        sender: 'user',
        timestamp: new Date('2024-01-13T16:46:00'),
        type: 'text',
        status: 'read'
      }
    ],
    isActive: false,
    lastActivity: new Date('2024-01-13T17:30:00')
  }
];

export const getConversationHistory = (): ChatSession[] => {
  return mockConversations.sort((a, b) => 
    new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
  );
};

export const getConversationById = (id: string): ChatSession | undefined => {
  return mockConversations.find(conv => conv.id === id);
};