
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '@/types/chatTypes';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const getMessageStyle = (role: string) => {
    if (role === 'assistant') {
      return 'bg-accent/50 border-accent/20 text-foreground';
    }
    return 'bg-primary/10 border-primary/20 text-foreground';
  };

  return (
    <div className={`p-3 rounded-lg border ${getMessageStyle(message.role)}`}>
      <div className="mb-1 text-xs text-muted-foreground flex justify-between">
        <span>{message.role === 'assistant' ? 'Assistente' : 'Tu'}</span>
        <span>{message.timestamp.toLocaleTimeString()}</span>
      </div>
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <ReactMarkdown>
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
