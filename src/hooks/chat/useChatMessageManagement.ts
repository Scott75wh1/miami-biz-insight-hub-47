
import { useState, useEffect } from 'react';
import { Message } from '@/types/chatTypes';
import { UserType } from '@/components/UserTypeSelector';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { generateWelcomeMessage } from '@/services/aiAssistantService';

export const useChatMessageManagement = (
  userType: UserType,
  selectedDistrict: string,
  businessType: BusinessType,
  businessName?: string
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Initialize with welcome message when user type or district changes
  useEffect(() => {
    const welcomeMessage = generateWelcomeMessage(userType, selectedDistrict, businessType, businessName);
    setMessages([welcomeMessage]);
    // Reset connection status
    setConnectionAttempts(0);
  }, [userType, selectedDistrict, businessType, businessName]);

  return {
    messages,
    setMessages,
    currentRequestId,
    setCurrentRequestId,
    connectionAttempts,
    setConnectionAttempts,
    isProcessing,
    setIsProcessing
  };
};
