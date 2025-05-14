
import React from 'react';
import { useAIAssistantChat } from '@/hooks/useAIAssistantChat';
import { BusinessType } from '@/components/BusinessTypeSelector';
import ChatInterface from './ChatInterface';

interface AIAssistantProps {
  businessType: BusinessType;
  businessName?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ 
  businessType,
  businessName 
}) => {
  const {
    messages,
    input,
    isProcessing,
    userType,
    suggestions,
    handleInputChange,
    handleSendMessage,
    handleSuggestionClick
  } = useAIAssistantChat(businessType, businessName);

  return (
    <ChatInterface
      messages={messages}
      input={input}
      isProcessing={isProcessing}
      userType={userType}
      suggestions={suggestions}
      onInputChange={handleInputChange}
      onSendMessage={handleSendMessage}
      onSuggestionClick={handleSuggestionClick}
    />
  );
};

export default AIAssistant;
