
import { useState, useEffect } from 'react';
import { UserType } from '@/components/UserTypeSelector';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { Message } from '@/types/chatTypes';
import { generateWelcomeMessage } from '@/services/aiAssistantService';

export const useChatMessageManagement = (
  userType: UserType,
  selectedDistrict: string,
  businessType: BusinessType,
  businessName?: string
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  
  // Set welcome message based on user type
  useEffect(() => {
    const welcomeMessage = generateWelcomeMessage(
      userType,
      selectedDistrict,
      businessType,
      businessName
    );
    
    setMessages([welcomeMessage]);
  }, [selectedDistrict, businessType, businessName, userType]);
  
  return {
    messages,
    setMessages,
    isProcessing,
    setIsProcessing,
    currentRequestId,
    setCurrentRequestId,
    connectionAttempts,
    setConnectionAttempts
  };
};
