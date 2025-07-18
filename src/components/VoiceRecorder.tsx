import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { VoiceRecording } from '../types/chat';

interface VoiceRecorderProps {
  voiceRecording: VoiceRecording;
  onStartRecording: () => void;
  onStopRecording: () => void;
  disabled?: boolean;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  voiceRecording,
  onStartRecording,
  onStopRecording,
  disabled = false
}) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (voiceRecording.isRecording) {
    return (
      <div className="flex items-center space-x-3 space-x-reverse bg-red-50 border border-red-200 rounded-2xl px-4 py-3 animate-pulse">
        <button
          onClick={onStopRecording}
          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200 shadow-lg shadow-red-500/25"
          aria-label="إيقاف التسجيل"
        >
          <MicOff className="h-4 w-4" />
        </button>
        
        <div className="flex items-center space-x-2 space-x-reverse flex-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-red-700">
            جاري التسجيل... {formatDuration(voiceRecording.duration)}
          </span>
        </div>
        
        <div className="flex space-x-1 space-x-reverse">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-red-400 rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${i * 100}ms`
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={onStartRecording}
      disabled={disabled}
      className={`p-3 rounded-full transition-all duration-200 shadow-lg ${
        disabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white hover:bg-gray-50 text-gray-600 hover:text-orange-500 shadow-gray-200/50 hover:shadow-orange-500/25 hover:scale-105'
      }`}
      aria-label="بدء التسجيل الصوتي"
    >
      <Mic className="h-5 w-5" />
    </button>
  );
};