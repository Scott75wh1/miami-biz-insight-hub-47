
import React, { useRef, useEffect } from 'react';
import { SendIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import { Message, Suggestion } from '@/types/chatTypes';
import { UserType } from '@/components/UserTypeSelector';
import ApiConnectionStatus from './ApiConnectionStatus';

interface ChatInterfaceProps {
  messages: Message[];
  input: string;
  isProcessing: boolean;
  userType: UserType;
  suggestions: Suggestion[];
  isOpenAIConfigured: boolean;
  connectionStatus?: 'good' | 'unstable' | 'error';
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onSuggestionClick: (suggestion: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  input,
  isProcessing,
  userType,
  suggestions,
  isOpenAIConfigured,
  connectionStatus = 'good',
  onInputChange,
  onSendMessage,
  onSuggestionClick,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
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

  // Determine message style based on role
  const getMessageStyle = (role: string) => {
    if (role === 'assistant') {
      return 'bg-accent/50 border-accent/20 text-foreground';
    }
    return 'bg-primary/10 border-primary/20 text-foreground';
  };
  
  const handleReset = () => {
    // Ricarica la pagina per resettare completamente lo stato dell'app
    window.location.reload();
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden border">
      {/* Status banner for API connection issues */}
      <ApiConnectionStatus 
        status={connectionStatus} 
        onRetry={handleReset}
      />
      
      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border ${getMessageStyle(msg.role)}`}
          >
            <div className="mb-1 text-xs text-muted-foreground flex justify-between">
              <span>{msg.role === 'assistant' ? 'Assistente' : 'Tu'}</span>
              <span>{msg.timestamp.toLocaleTimeString()}</span>
            </div>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown>
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className={`p-3 rounded-lg border ${getMessageStyle('assistant')}`}>
            <div className="mb-1 text-xs text-muted-foreground">
              Assistente
            </div>
            <div className="flex space-x-2 items-center">
              <div className="animate-pulse flex space-x-1">
                <div className="h-2 w-2 bg-primary rounded-full"></div>
                <div className="h-2 w-2 bg-primary rounded-full animation-delay-200"></div>
                <div className="h-2 w-2 bg-primary rounded-full animation-delay-400"></div>
              </div>
              <span className="text-sm text-muted-foreground">Generando risposta...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>
      
      {/* Chat input and suggestions */}
      <div className="border-t p-4 space-y-4">
        {!isOpenAIConfigured && (
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-2 rounded text-xs text-amber-800 dark:text-amber-300">
            <span className="font-medium">Modalità demo:</span> Configura la API key di OpenAI nelle impostazioni per risposte personalizzate.
          </div>
        )}
        
        {suggestions.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Suggerimenti:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => onSuggestionClick(suggestion.text)}
                  className="text-xs flex items-center gap-1"
                >
                  <Sparkles className="h-3 w-3 text-primary" />
                  {suggestion.label || suggestion.text}
                </Button>
              ))}
            </div>
          </div>
        )}
        
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
      </div>
    </Card>
  );
};

export default ChatInterface;
