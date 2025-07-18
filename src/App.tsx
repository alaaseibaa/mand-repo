import React, { useState } from 'react';
import { CategoryNavigation } from './components/CategoryNavigation';
import { AgentList } from './components/AgentList';
import { ChatInterface } from './components/ChatInterface';
import { CallInterface } from './components/CallInterface';
import { useNavigation } from './hooks/useNavigation';
import { Agent } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentChatAgent, setCurrentChatAgent] = useState<Agent | null>(null);
  const [currentCallAgent, setCurrentCallAgent] = useState<Agent | null>(null);
  const { navigationState, selectCategory, goBack } = useNavigation();


  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleStartChat = (agent: Agent) => {
    setCurrentChatAgent(agent);
  };

  const handleBackFromChat = () => {
    setCurrentChatAgent(null);
  };

  const handleStartCall = (agent: Agent) => {
    setCurrentCallAgent(agent);
  };

  const handleBackFromCall = () => {
    setCurrentCallAgent(null);
  };

  // Show call interface if an agent is selected for call
  if (currentCallAgent) {
    return (
      <CallInterface
        agent={currentCallAgent}
        onBack={handleBackFromCall}
      />
    );
  }

  // Show chat interface if an agent is selected for chat
  if (currentChatAgent) {
    return (
      <ChatInterface
        agent={currentChatAgent}
        onBack={handleBackFromChat}
        onStartCall={handleStartCall}
      />
    );
  }
  // Show agent list if a category is selected
  if (navigationState.selectedCategory) {
    return (
      <AgentList
        category={navigationState.selectedCategory}
        onBack={goBack}
        onStartChat={handleStartChat}
        onStartCall={handleStartCall}
      />
    );
  }

  // Show category navigation by default
  return (
    <CategoryNavigation
      isLoggedIn={isLoggedIn}
      onToggleLogin={toggleLogin}
      onCategorySelect={selectCategory}
    />
  );
}

export default App;