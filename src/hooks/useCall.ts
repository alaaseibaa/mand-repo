import { useState, useCallback, useRef, useEffect } from 'react';
import { CallState, CallSession } from '../types/chat';
import { Agent } from '../types';

export const useCall = (agent: Agent) => {
  const [callState, setCallState] = useState<CallState>({
    isActive: false,
    duration: 0,
    isMuted: false,
    isConnecting: false,
    startTime: null
  });

  const [currentCall, setCurrentCall] = useState<CallSession | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startCall = useCallback(() => {
    setCallState(prev => ({
      ...prev,
      isConnecting: true,
      startTime: new Date()
    }));

    // Simulate connection delay
    setTimeout(() => {
      const callSession: CallSession = {
        id: `call-${agent.id}-${Date.now()}`,
        agentId: agent.id,
        agentName: agent.name,
        agentTitle: agent.title,
        startTime: new Date(),
        duration: 0,
        status: 'active'
      };

      setCurrentCall(callSession);
      setCallState(prev => ({
        ...prev,
        isActive: true,
        isConnecting: false,
        duration: 0
      }));

      // Start duration timer
      timerRef.current = setInterval(() => {
        setCallState(prev => ({
          ...prev,
          duration: prev.duration + 1
        }));
      }, 1000);
    }, 2000);
  }, [agent]);

  const endCall = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (currentCall) {
      const endedCall: CallSession = {
        ...currentCall,
        endTime: new Date(),
        status: 'ended',
        duration: callState.duration
      };
      setCurrentCall(endedCall);
    }

    setCallState({
      isActive: false,
      duration: 0,
      isMuted: false,
      isConnecting: false,
      startTime: null
    });
  }, [currentCall, callState.duration]);

  const toggleMute = useCallback(() => {
    setCallState(prev => ({
      ...prev,
      isMuted: !prev.isMuted
    }));
  }, []);

  const formatDuration = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return {
    callState,
    currentCall,
    startCall,
    endCall,
    toggleMute,
    formatDuration
  };
};