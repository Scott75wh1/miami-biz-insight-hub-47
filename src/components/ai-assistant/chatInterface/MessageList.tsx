
import React, { useEffect, useRef } from 'react';
import { Message } from '@/types/chatTypes';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MessageListProps {
  messages: Message[];
  isProcessing: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isProcessing }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);
  
  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className="flex-1 p-4 overflow-y-auto" 
      style={{ height: 'calc(100% - 180px)' }}
    >
      <div className="space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isProcessing && (
          <TypingIndicator />
        )}
      </div>
    </ScrollArea>
  );
};

export default MessageList;
