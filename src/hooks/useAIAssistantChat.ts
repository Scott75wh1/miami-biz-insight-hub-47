
import { useState, useEffect, useCallback } from 'react';
import { UserType } from '@/components/UserTypeSelector';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useUserType } from '@/hooks/useUserType';
import { getSuggestions } from '@/utils/aiAssistant/suggestionProvider';
import { Message, ChatState, Suggestion } from '@/types/chatTypes';
import { toast } from '@/hooks/use-toast';
import { 
  useChatMessageManagement, 
  useChatInputHandling, 
  useChatApiCommunication 
} from './chat';

// Re-export types for convenience
export type { Message, Suggestion } from '@/types/chatTypes';

interface ApiKeysWithIndex {
  openAI: string;
  [key: string]: string;
}

export const useAIAssistantChat = (
  businessType: BusinessType,
  businessName?: string,
) => {
  const { apiKeys, isLoaded } = useApiKeys();
  const { selectedDistrict } = useDistrictSelection();
  const { userType } = useUserType();
  const isOpenAIConfigured = isLoaded && apiKeys.openAI && apiKeys.openAI !== 'demo-key';
  
  // Properly convert apiKeys to the required format with a type assertion
  const apiKeysWithIndex: ApiKeysWithIndex = apiKeys as unknown as ApiKeysWithIndex;
  
  // Use the extracted hooks for specific functionality
  const { 
    messages, 
    setMessages, 
    currentRequestId, 
    setCurrentRequestId,
    connectionAttempts,
    setConnectionAttempts, 
    isProcessing, 
    setIsProcessing 
  } = useChatMessageManagement(userType, selectedDistrict, businessType, businessName);
  
  const { input, setInput, handleInputChange, handleSuggestionClick } = useChatInputHandling();
  
  const { handleSendMessage } = useChatApiCommunication({
    input,
    setInput,
    messages,
    setMessages,
    isProcessing,
    setIsProcessing,
    apiKeys: apiKeysWithIndex,
    isLoaded,
    userType,
    businessType,
    selectedDistrict,
    businessName,
    currentRequestId,
    setCurrentRequestId,
    connectionAttempts,
    setConnectionAttempts
  });

  return {
    messages,
    input,
    isProcessing,
    userType,
    suggestions: getSuggestions(userType, businessType, selectedDistrict),
    handleInputChange,
    handleSendMessage,
    handleSuggestionClick,
    isOpenAIConfigured,
    connectionStatus: connectionAttempts > 0 ? 'unstable' : 'good' as 'good' | 'unstable' | 'error'
  };
};
