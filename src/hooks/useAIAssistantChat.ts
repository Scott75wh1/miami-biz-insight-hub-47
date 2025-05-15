
import { useState, useEffect } from 'react';
import { UserType } from '@/components/UserTypeSelector';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useUserType } from '@/hooks/useUserType';
import { getSuggestions, Suggestion } from '@/utils/aiAssistant/suggestionProvider';
import { Message } from '@/types/chatTypes';
import { 
  generateWelcomeMessage, 
  generateDemoResponse, 
  fetchAIResponse 
} from '@/services/aiAssistantService';

export { Suggestion } from '@/utils/aiAssistant/suggestionProvider';
export { Message } from '@/types/chatTypes';

export const useAIAssistantChat = (
  businessType: BusinessType,
  businessName?: string,
) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);
  const { apiKeys, isLoaded, areKeysSet } = useApiKeys();
  const { selectedDistrict } = useDistrictSelection();
  const { userType } = useUserType();
  
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

  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return;
    
    // Generate unique request ID
    const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
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
    
    // Verify OpenAI API key configuration
    const isOpenAIConfigured = apiKeys.openAI && apiKeys.openAI !== 'demo-key';
    
    if (!isLoaded || !isOpenAIConfigured) {
      // If API key isn't configured, show error toast and add informative message
      if (isLoaded && !isOpenAIConfigured) {
        toast({
          title: "Configurazione API mancante",
          description: "L'API key di OpenAI non è configurata. Vai nelle impostazioni per configurarla.",
          variant: "destructive",
        });
      }
      
      setTimeout(() => {
        // Check if this is still the current request
        if (currentRequestId !== requestId) return;
        
        const demoResponse = generateDemoResponse(userType, selectedDistrict, businessType);
        
        // Add warning if API key isn't configured
        const apiKeyWarning = !isOpenAIConfigured ? 
          "\n\n**NOTA: Questa è una risposta di esempio. Per ottenere analisi personalizzate, configura la tua API key di OpenAI nelle impostazioni.**" : "";
        
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: demoResponse + apiKeyWarning,
          timestamp: new Date()
        }]);
        
        setIsProcessing(false);
      }, 1200);
      
      return;
    }
    
    try {
      // Debug log
      console.log("Utilizzando API key OpenAI:", apiKeys.openAI.substring(0, 5) + "...");
      
      // Fetch AI response
      const response = await fetchAIResponse(
        apiKeys.openAI,
        input,
        userType,
        businessType,
        selectedDistrict,
        businessName
      );
      
      // Check if this is still the current request
      if (currentRequestId !== requestId) return;
      
      if (response.success) {
        const aiMessage: Message = {
          role: 'assistant',
          content: response.content,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response.content,
          timestamp: new Date()
        }]);
      }
    } finally {
      // Only update state if this is still the current request
      if (currentRequestId === requestId) {
        setIsProcessing(false);
        setCurrentRequestId(null);
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  return {
    messages,
    input,
    isProcessing,
    userType,
    suggestions: getSuggestions(userType, businessType, selectedDistrict),
    handleInputChange,
    handleSendMessage,
    handleSuggestionClick,
    isOpenAIConfigured: isLoaded && apiKeys.openAI && apiKeys.openAI !== 'demo-key'
  };
};
