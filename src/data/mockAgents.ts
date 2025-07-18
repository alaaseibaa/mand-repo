import { Agent } from '../types';

export const mockAgents: Agent[] = [
  // Hotel agent - زوكا
  {
    id: 'hotel-zoka',
    name: 'زوكا',
    title: 'مختص الحجوزات والضيافة المتميزة',
    rating: 4.9,
    reviewCount: 342,
    isOnline: true,
    responseTime: 'خلال دقيقة',
    languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
    specialties: ['الحجوزات الفندقية', 'خدمات الضيافة', 'السياحة الفاخرة', 'التخطيط للرحلات'],
    categoryId: 'hotels',
    experience: '8 سنوات',
    location: 'الرياض'
  },
  // Restaurant agent - مطعم و كافيه زوكا
  {
    id: 'restaurant-zoka-cafe',
    name: 'مطعم و كافيه زوكا',
    title: 'مختص الحجوزات والطلبات الغذائية',
    rating: 4.7,
    reviewCount: 186,
    isOnline: true,
    responseTime: 'خلال دقيقتين',
    languages: ['العربية', 'الإنجليزية'],
    specialties: ['حجوزات الطاولات', 'الطلبات الخارجية', 'تنظيم المناسبات', 'القوائم الخاصة'],
    categoryId: 'restaurants',
    experience: '5 سنوات',
    location: 'الرياض'
  }
];

export const getAgentsByCategory = (categoryId: string): Agent[] => {
  return mockAgents.filter(agent => agent.categoryId === categoryId);
};