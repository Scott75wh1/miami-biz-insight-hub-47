
import React from 'react';
import { Message } from '@/types/chatTypes';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isError = message.isError;
  
  return (
    <div
      className={cn(
        "flex max-w-[80%] rounded-lg p-4",
        isUser ? "bg-primary text-primary-foreground ml-auto" : "bg-muted",
        isError && "bg-destructive/10 border border-destructive/20"
      )}
    >
      <div className="space-y-2">
        <div className={cn("text-sm font-medium", isUser ? "text-primary-foreground" : "text-foreground")}>
          {isUser ? 'Tu' : 'Assistente'}
        </div>
        <div className={cn(
          "prose dark:prose-invert max-w-none",
          isUser ? "text-primary-foreground" : "text-foreground"
        )}>
          {message.isTyping ? (
            <TypingIndicator />
          ) : (
            <ReactMarkdown>{message.content}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
