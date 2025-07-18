import { useState, useCallback, useRef, useEffect } from 'react';
import { Message, ChatSession, ChatState, VoiceRecording } from '../types/chat';
import { Agent } from '../types';
import { createSimpleZokaAgent, SimpleZokaAgent } from '../services/simpleZokaAgent';

export const useChat = (agent: Agent) => {
  const [chatState, setChatState] = useState<ChatState>({
    currentSession: null,
    isTyping: false,
    isConnected: true,
    isRecording: false,
    error: null,
    sidebarOpen: true
  });

  const [voiceRecording, setVoiceRecording] = useState<VoiceRecording>({
    isRecording: false,
    duration: 0
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const zokaAgentRef = useRef<SimpleZokaAgent | null>(null);

  // Initialize chat session and Zoka agent for restaurant agents
  useEffect(() => {
    // Initialize Zoka agent only for restaurant agents
    if (agent.id === 'restaurant-zoka' || agent.name.includes('زوكا')) {
      try {
        // Get API key from Vite environment variables
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        // API key validation check
        
        if (apiKey && apiKey !== 'your-gemini-api-key-here') {
          zokaAgentRef.current = createSimpleZokaAgent(apiKey);
          // Zoka Agent initialized successfully
        } else {
          console.warn('⚠️ No valid Google API key found. Please set VITE_GOOGLE_API_KEY in your .env file');
          setChatState(prev => ({
            ...prev,
            error: 'يرجى إعداد مفتاح API في ملف .env لتفعيل الذكاء الاصطناعي'
          }));
        }
      } catch (error) {
        console.error('❌ Failed to initialize Zoka agent:', error);
        setChatState(prev => ({
          ...prev,
          error: 'فشل في تهيئة الذكاء الاصطناعي'
        }));
      }
    }

    const session: ChatSession = {
      id: `chat-${agent.id}-${Date.now()}`,
      agentId: agent.id,
      agentName: agent.name,
      agentTitle: agent.title,
      messages: [
        {
          id: 'welcome-1',
          content: agent.id === 'restaurant-zoka' || agent.name.includes('زوكا')
            ? 'أهلاً وسهلاً بك في مطعم وكافيه زوكا! 🌟 كيف يمكنني مساعدتك اليوم؟'
            : `مرحباً! أنا ${agent.name}، ${agent.title}. كيف يمكنني مساعدتك اليوم؟`,
          sender: 'agent',
          timestamp: new Date(),
          type: 'text',
          status: 'read'
        }
      ],
      isActive: true,
      lastActivity: new Date()
    };

    setChatState(prev => ({
      ...prev,
      currentSession: session
    }));
  }, [agent]);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end'
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatState.currentSession?.messages, scrollToBottom]);

  // Send text message
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !chatState.currentSession) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
      status: 'sending'
    };

    // Add user message
    setChatState(prev => ({
      ...prev,
      currentSession: prev.currentSession ? {
        ...prev.currentSession,
        messages: [...prev.currentSession.messages, userMessage],
        lastActivity: new Date()
      } : null
    }));

    // Mark as sent
    setTimeout(() => {
      setChatState(prev => ({
        ...prev,
        currentSession: prev.currentSession ? {
          ...prev.currentSession,
          messages: prev.currentSession.messages.map(msg =>
            msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg
          )
        } : null
      }));
    }, 500);

    // Show minimal typing indicator for fast response feel
    setChatState(prev => ({ ...prev, isTyping: true }));

    // Get AI response - use Zoka agent for restaurant or fallback to mock
    const getAIResponse = async (): Promise<string> => {
      if (zokaAgentRef.current && (agent.id === 'restaurant-zoka' || agent.name.includes('زوكا'))) {
        try {
          // Using Zoka Agent for response...
          const response = await zokaAgentRef.current.sendMessage(content);
          // Hide typing indicator immediately when response arrives
          setChatState(prev => ({ ...prev, isTyping: false }));
          return response;
        } catch (error) {
          console.error('❌ Zoka Agent failed, falling back to mock:', error);
        }
      }
      
      // Fallback to mock responses for other agents
      const responses = [
        'شكراً لك على تواصلك معي. سأقوم بمساعدتك في هذا الأمر.',
        'فهمت طلبك. دعني أتحقق من المعلومات المطلوبة.',
        'هذا سؤال ممتاز. سأوضح لك الخطوات المطلوبة.',
        'بالطبع يمكنني مساعدتك في ذلك. إليك التفاصيل:',
        'أقدر صبرك. سأقوم بالبحث عن أفضل حل لك.'
      ];
      
      // Small delay for mock responses to show typing
      await new Promise(resolve => setTimeout(resolve, 800));
      setChatState(prev => ({ ...prev, isTyping: false }));
      return responses[Math.floor(Math.random() * responses.length)];
    };

    // Get response immediately with streaming effect
    (async () => {
      try {
        const responseContent = await getAIResponse();
        
        // Add message immediately but will be streamed in the UI
        const agentMessage: Message = {
          id: `agent-${Date.now()}`,
          content: responseContent,
          sender: 'agent',
          timestamp: new Date(),
          type: 'text',
          status: 'read'
        };

        setChatState(prev => ({
          ...prev,
          currentSession: prev.currentSession ? {
            ...prev.currentSession,
            messages: [...prev.currentSession.messages, agentMessage],
            lastActivity: new Date()
          } : null
        }));
      } catch (error) {
        console.error('❌ Error getting AI response:', error);
        setChatState(prev => ({
          ...prev,
          isTyping: false,
          error: 'حدث خطأ في الحصول على الاستجابة'
        }));
      }
    })();
  }, [chatState.currentSession, agent.id, agent.name]);

  // Start voice recording
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setVoiceRecording(prev => ({ ...prev, audioBlob }));
        
        // Simulate voice-to-text conversion
        setTimeout(() => {
          sendMessage('هذه رسالة صوتية تم تحويلها إلى نص');
          setVoiceRecording({ isRecording: false, duration: 0 });
        }, 1000);
      };

      mediaRecorder.start();
      setVoiceRecording({ isRecording: true, duration: 0 });

      // Start timer
      recordingTimerRef.current = setInterval(() => {
        setVoiceRecording(prev => ({
          ...prev,
          duration: prev.duration + 1
        }));
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      setChatState(prev => ({
        ...prev,
        error: 'لا يمكن الوصول إلى الميكروفون'
      }));
    }
  }, [sendMessage]);

  // Stop voice recording
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && voiceRecording.isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }
  }, [voiceRecording.isRecording]);

  // Clear error
  const clearError = useCallback(() => {
    setChatState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    chatState,
    voiceRecording,
    messagesEndRef,
    sendMessage,
    startRecording,
    stopRecording,
    clearError
  };
};