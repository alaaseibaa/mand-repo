import { useState, useCallback } from 'react';
import { Category, NavigationState } from '../types';

export const useNavigation = () => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    selectedCategory: null,
    isLoading: false,
    error: null
  });

  const selectCategory = useCallback((category: Category) => {
    setNavigationState(prev => ({
      ...prev,
      selectedCategory: category,
      isLoading: true,
      error: null
    }));

    // Simulate loading delay for smooth transition
    setTimeout(() => {
      setNavigationState(prev => ({
        ...prev,
        isLoading: false
      }));
    }, 300);
  }, []);

  const goBack = useCallback(() => {
    setNavigationState(prev => ({
      ...prev,
      selectedCategory: null,
      isLoading: false,
      error: null
    }));
  }, []);

  const setError = useCallback((error: string) => {
    setNavigationState(prev => ({
      ...prev,
      error,
      isLoading: false
    }));
  }, []);

  return {
    navigationState,
    selectCategory,
    goBack,
    setError
  };
};