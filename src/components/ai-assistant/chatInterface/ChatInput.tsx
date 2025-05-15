
import React, { useRef, useEffect } from 'react';
import { SendIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  isProcessing: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  onInputChange,
  onSendMessage,
  isProcessing
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [input]);
  
  // Handle enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };
  
  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        placeholder="Scrivi un messaggio..."
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyPress}
        disabled={isProcessing}
        className="resize-none pr-10 min-h-[60px] max-h-[150px]"
        rows={1}
      />
      <Button
        size="icon"
        variant="ghost"
        onClick={onSendMessage}
        disabled={!input.trim() || isProcessing}
        className="absolute right-2 bottom-2 text-primary"
      >
        <SendIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChatInput;
