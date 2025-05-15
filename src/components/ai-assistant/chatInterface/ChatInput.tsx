
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface ChatInputProps {
  input: string;
  isProcessing: boolean;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, isProcessing, onInputChange, onSendMessage }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isProcessing) {
      e.preventDefault();
      onSendMessage();
    }
  };
  
  return (
    <div className="flex items-center gap-2 mt-2">
      <Input
        placeholder="Scrivi un messaggio..."
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isProcessing}
        className="flex-1"
      />
      <Button 
        onClick={onSendMessage} 
        disabled={isProcessing || !input.trim()} 
        size="icon"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChatInput;
