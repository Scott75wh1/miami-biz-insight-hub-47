
import React from 'react';
import { useAIAssistantChat } from '@/hooks/useAIAssistantChat';
import { BusinessType } from '@/components/BusinessTypeSelector';
import ChatInterface from './ChatInterface';

interface EnhancedAIAssistantProps {
  businessType: BusinessType;
  businessName?: string;
}

const EnhancedAIAssistantRefactored: React.FC<EnhancedAIAssistantProps> = ({ businessType, businessName }) => {
  const {
    messages,
    input,
    isProcessing,
    userType,
    suggestions,
    handleInputChange,
    handleSendMessage,
    handleSuggestionClick,
    isOpenAIConfigured
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
      isOpenAIConfigured={isOpenAIConfigured}
    />
  );
};

export default EnhancedAIAssistantRefactored;
