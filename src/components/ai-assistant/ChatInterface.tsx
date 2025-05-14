
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Loader2, Send, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserType } from '@/hooks/useUserType';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Suggestion {
  forType: UserType;
  text: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  input: string;
  isProcessing: boolean;
  userType: UserType;
  suggestions: Suggestion[];
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onSuggestionClick: (text: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  input,
  isProcessing,
  userType,
  suggestions,
  onInputChange,
  onSendMessage,
  onSuggestionClick,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="flex items-center text-lg">
          <MessageSquare className="mr-2 h-5 w-5" />
          {userType === 'end_user' ? 'Assistente Personale' : 'Consulente Strategico'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: '500px' }}>
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg" alt="AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                
                <div 
                  className={`rounded-lg p-3 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground ml-2' 
                      : 'bg-muted'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </div>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="flex items-start max-w-[85%]">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg" alt="AI" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-primary/60 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-primary/60 rounded-full animate-pulse delay-150"></div>
                    <div className="h-2 w-2 bg-primary/60 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Suggested questions */}
        <div className="px-4 py-2 border-t">
          <p className="text-xs text-muted-foreground mb-2">Domande suggerite:</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestions.filter(s => s.forType === userType).map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs py-1 h-auto"
                onClick={() => onSuggestionClick(suggestion.text)}
                disabled={isProcessing}
              >
                <Lightbulb className="h-3 w-3 mr-1" />
                {suggestion.text.length > 30 ? suggestion.text.substring(0, 30) + '...' : suggestion.text}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Input area */}
        <div className="p-4 border-t">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              onSendMessage();
            }}
            className="flex items-end gap-2"
          >
            <div className="flex-1">
              <Textarea
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder={userType === 'end_user' 
                  ? "Fai una domanda sulla tua attività..." 
                  : "Richiedi un'analisi dettagliata..."}
                rows={3}
                className="resize-none"
                disabled={isProcessing}
              />
            </div>
            <Button 
              type="submit"
              disabled={isProcessing || !input.trim()}
              className="h-10"
            >
              {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
