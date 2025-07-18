export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  type: 'text' | 'voice';
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'ai';
  timestamp: Date;
  sender: {
    id: string;
    name: string;
    type: 'user' | 'ai';
  };
  isError?: boolean;
}

export interface ChatSession {
  id: string;
  agentId: string;
  agentName: string;
  agentTitle: string;
  agentAvatar?: string;
  messages: Message[];
  isActive: boolean;
  lastActivity: Date;
}

export interface ChatState {
  currentSession: ChatSession | null;
  isTyping: boolean;
  isConnected: boolean;
  isRecording: boolean;
  error: string | null;
  sidebarOpen: boolean;
}

export interface VoiceRecording {
  isRecording: boolean;
  duration: number;
  audioBlob?: Blob;
}

export interface CallState {
  isActive: boolean;
  duration: number;
  isMuted: boolean;
  isConnecting: boolean;
  startTime: Date | null;
}

export interface CallSession {
  id: string;
  agentId: string;
  agentName: string;
  agentTitle: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  status: 'connecting' | 'active' | 'ended';
}