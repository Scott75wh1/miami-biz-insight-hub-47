
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '@/types/chatTypes';
import { UserType } from '@/components/UserTypeSelector';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { fetchAIResponse, generateDemoResponse } from '@/services/aiAssistantService';

interface UseChatApiCommunicationProps {
  input: string;
  setInput: (input: string) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  apiKeys: {
    openAI: string;
    [key: string]: string;
  };
  isLoaded: boolean;
  userType: UserType;
  selectedDistrict: string;
  businessType: BusinessType;
  businessName?: string;
  currentRequestId: string | null;
  setCurrentRequestId: (id: string | null) => void;
  connectionAttempts: number;
  setConnectionAttempts: (attempts: number) => void;
}

export const useChatApiCommunication = ({
  input,
  setInput,
  messages,
  setMessages,
  isProcessing,
  setIsProcessing,
  apiKeys,
  isLoaded,
  userType,
  selectedDistrict,
  businessType,
  businessName,
  currentRequestId,
  setCurrentRequestId,
  connectionAttempts,
  setConnectionAttempts
}: UseChatApiCommunicationProps) => {
  
  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isProcessing) return;
    
    // Generate a request ID for tracking this specific request
    const requestId = uuidv4();
    setCurrentRequestId(requestId);
    
    // Add user message to chat
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    try {
      // Set up initial typing state
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '', isTyping: true, timestamp: new Date() }
      ]);
      
      // Check if OpenAI API key is configured, otherwise use demo response
      if (!isLoaded || !apiKeys.openAI || apiKeys.openAI === 'demo-key') {
        // Simulate network delay for demo
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate demo response
        const demoResponse = generateDemoResponse(userType, selectedDistrict, businessType);
        
        // Update messages with response
        setMessages(prev => [
          ...prev.slice(0, -1), // Remove typing indicator
          { role: 'assistant', content: demoResponse, timestamp: new Date() }
        ]);
      } else {
        // Make real API call
        const response = await fetchAIResponse(
          apiKeys.openAI,
          input,
          userType,
          businessType,
          selectedDistrict,
          businessName
        );
        
        if (response.success) {
          // Reset connection attempts counter on success
          setConnectionAttempts(0);
          
          // Update messages with response
          setMessages(prev => [
            ...prev.slice(0, -1), // Remove typing indicator
            { role: 'assistant', content: response.content, timestamp: new Date() }
          ]);
        } else {
          // Increment connection attempts on failure
          setConnectionAttempts(prev => prev + 1);
          
          // Update messages with error
          setMessages(prev => [
            ...prev.slice(0, -1), // Remove typing indicator
            { 
              role: 'assistant', 
              content: response.content || "Mi dispiace, si è verificato un errore di comunicazione.", 
              isError: true,
              timestamp: new Date() 
            }
          ]);
        }
      }
    } catch (error) {
      console.error('Error in chat communication:', error);
      
      // Increment connection attempts on error
      setConnectionAttempts(prev => prev + 1);
      
      // Update messages with error
      setMessages(prev => [
        ...prev.slice(0, -1), // Remove typing indicator
        { 
          role: 'assistant', 
          content: "Mi dispiace, si è verificato un errore durante l'elaborazione della tua richiesta.", 
          isError: true,
          timestamp: new Date() 
        }
      ]);
    } finally {
      setIsProcessing(false);
      setCurrentRequestId(null);
    }
  }, [
    input,
    isProcessing,
    messages,
    setMessages,
    setInput,
    setIsProcessing,
    apiKeys,
    isLoaded,
    userType,
    selectedDistrict,
    businessType,
    businessName,
    setCurrentRequestId,
    setConnectionAttempts
  ]);
  
  return { handleSendMessage };
};
