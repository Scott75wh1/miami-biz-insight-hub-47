
import React from 'react';
import { Card } from '@/components/ui/card';
import { Message, Suggestion } from '@/types/chatTypes';
import { UserType } from '@/components/UserTypeSelector';
import ApiConnectionStatus from './ApiConnectionStatus';
import MessageList from './chatInterface/MessageList';
import ApiKeyWarning from './chatInterface/ApiKeyWarning';
import SuggestionList from './chatInterface/SuggestionList';
import ChatInput from './chatInterface/ChatInput';

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
      <MessageList 
        messages={messages}
        isProcessing={isProcessing}
      />
      
      {/* Chat input and suggestions */}
      <div className="border-t p-4 space-y-4">
        <ApiKeyWarning isOpenAIConfigured={isOpenAIConfigured} />
        
        <SuggestionList 
          suggestions={suggestions} 
          onSuggestionClick={onSuggestionClick}
        />
        
        <ChatInput
          input={input}
          onInputChange={onInputChange}
          onSendMessage={onSendMessage}
          isProcessing={isProcessing}
        />
      </div>
    </Card>
  );
};

export default ChatInterface;
