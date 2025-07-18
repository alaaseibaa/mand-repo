import { useState, useEffect, useRef } from 'react';

interface UseStreamingTextOptions {
  text: string;
  speed?: number; // Characters per interval
  interval?: number; // Milliseconds between updates
  onComplete?: () => void;
  onUpdate?: () => void; // Called on each character update
  enabled?: boolean;
}

export const useStreamingText = ({
  text,
  speed = 5, // 5 characters per 15ms = ultra fast
  interval = 15, // 15ms intervals for ultra smooth animation
  onComplete,
  onUpdate,
  enabled = true
}: UseStreamingTextOptions) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    if (!enabled || !text) {
      setDisplayedText(text);
      return;
    }

    // Reset state
    setDisplayedText('');
    setIsStreaming(true);
    currentIndexRef.current = 0;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start streaming animation
    intervalRef.current = setInterval(() => {
      const currentIndex = currentIndexRef.current;
      
      if (currentIndex >= text.length) {
        // Animation complete
        clearInterval(intervalRef.current!);
        setIsStreaming(false);
        onComplete?.();
        return;
      }

      // Add next batch of characters
      const nextIndex = Math.min(currentIndex + speed, text.length);
      setDisplayedText(text.substring(0, nextIndex));
      currentIndexRef.current = nextIndex;
      
      // Trigger update callback for scrolling
      onUpdate?.();
    }, interval);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, speed, interval, enabled, onComplete, onUpdate]);

  const skipToEnd = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDisplayedText(text);
    setIsStreaming(false);
    currentIndexRef.current = text.length;
    onComplete?.();
  };

  return {
    displayedText,
    isStreaming,
    skipToEnd,
    progress: text.length > 0 ? (currentIndexRef.current / text.length) * 100 : 0
  };
};