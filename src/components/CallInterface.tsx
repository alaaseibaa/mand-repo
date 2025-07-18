import React, { useEffect } from 'react';
import { PhoneOff, Mic, MicOff } from 'lucide-react';
import { Agent } from '../types';
import { useCall } from '../hooks/useCall';

interface CallInterfaceProps {
  agent: Agent;
  onBack: () => void;
}

export const CallInterface: React.FC<CallInterfaceProps> = ({ agent, onBack }) => {
  const { callState, startCall, endCall, toggleMute, formatDuration } = useCall(agent);

  useEffect(() => {
    startCall();
  }, [startCall]);

  const handleEndCall = () => {
    endCall();
    onBack();
  };

  const getCallStatus = () => {
    if (callState.isConnecting) return 'جاري الاتصال...';
    if (callState.isActive) return 'متصل الآن';
    return 'منتهية';
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-50/90 via-blue-50/70 to-purple-50/90 backdrop-blur-xl">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-blue-500/3 to-purple-500/5" />
      
      {/* Safe area container */}
      <div className="flex flex-col h-full px-5 pt-11 pb-8 relative z-10">
        
        {/* Agent Information Section */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          
          {/* Agent Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 border-4 border-white/40 shadow-xl shadow-orange-500/20 relative overflow-hidden">
              {agent.avatar ? (
                <img 
                  src={agent.avatar} 
                  alt={agent.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                  {agent.name.charAt(0)}
                </div>
              )}
              
              {/* Glass overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 rounded-full" />
            </div>
            
            {/* Pulse animation for active call */}
            {callState.isActive && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-green-500/50 animate-ping" />
                <div className="absolute inset-0 rounded-full border-2 border-green-500/30 animate-ping animation-delay-75" />
              </>
            )}
          </div>

          {/* Agent Name */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 arabic-text">
              {agent.name}
            </h1>
            <p className="text-lg text-gray-600 arabic-text">
              {agent.title}
            </p>
          </div>

          {/* Call Status */}
          <div className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full">
            <div className={`w-2 h-2 rounded-full ${
              callState.isConnecting ? 'bg-yellow-500 animate-pulse' :
              callState.isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
            }`} />
            <span className="text-sm font-medium text-gray-700 arabic-text">
              {getCallStatus()}
            </span>
          </div>

          {/* Call Duration */}
          {callState.isActive && (
            <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-6 py-3">
              <p className="text-2xl font-semibold text-gray-900 font-mono text-center">
                {formatDuration(callState.duration)}
              </p>
            </div>
          )}

          {/* Audio Visualization (when active) */}
          {callState.isActive && !callState.isMuted && (
            <div className="flex items-center space-x-1 h-8">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-orange-500 rounded-full animate-pulse"
                  style={{
                    height: Math.random() * 20 + 8,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${1 + Math.random()}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Control Panel */}
        <div className="flex items-center justify-center space-x-12 space-x-reverse">
          
          {/* Mute Button */}
          <button
            onClick={toggleMute}
            disabled={!callState.isActive}
            className={`
              relative w-18 h-18 rounded-full border-2 transition-all duration-300
              ${callState.isMuted 
                ? 'bg-red-500 border-red-400 shadow-lg shadow-red-500/30' 
                : 'bg-white/25 border-white/40 backdrop-blur-md shadow-lg shadow-black/10'
              }
              ${!callState.isActive ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
              min-w-[44px] min-h-[44px]
            `}
            aria-label={callState.isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
          >
            <div className="flex items-center justify-center">
              {callState.isMuted ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className={`w-6 h-6 ${callState.isMuted ? 'text-white' : 'text-gray-700'}`} />
              )}
            </div>
            
            {/* Glass overlay */}
            {!callState.isMuted && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 rounded-full" />
            )}
          </button>

          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            className="
              relative w-18 h-18 rounded-full 
              bg-gradient-to-br from-red-500 to-red-600 
              border-2 border-white/30
              shadow-xl shadow-red-500/40
              transition-all duration-300
              active:scale-95
              min-w-[44px] min-h-[44px]
            "
            aria-label="إنهاء المكالمة"
          >
            <div className="flex items-center justify-center">
              <PhoneOff className="w-6 h-6 text-white" />
            </div>
            
            {/* Glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5 rounded-full" />
          </button>
        </div>

        {/* Bottom spacing for safe area */}
        <div className="h-6" />
      </div>

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite">
        {callState.isConnecting && 'جاري الاتصال بالوكيل'}
        {callState.isActive && `مكالمة نشطة، المدة ${formatDuration(callState.duration)}`}
        {callState.isMuted && 'تم كتم الصوت'}
      </div>
    </div>
  );
};