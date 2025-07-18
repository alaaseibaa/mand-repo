export interface Agent {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  rating: number;
  reviewCount: number;
  isOnline: boolean;
  responseTime: string;
  languages: string[];
  specialties: string[];
  categoryId: string;
  experience: string;
  location: string;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  hoverBg: string;
  agents: number;
  description: string;
}

export interface NavigationState {
  selectedCategory: Category | null;
  isLoading: boolean;
  error: string | null;
}