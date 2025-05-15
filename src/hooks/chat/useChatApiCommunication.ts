
import { useCallback } from 'react';
import { Message } from '@/types/chatTypes';
import { UserType } from '@/components/UserTypeSelector';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { generateDemoResponse, fetchAIResponse } from '@/services/aiAssistantService';
import { toast } from '@/hooks/use-toast';

interface UseChatApiCommunicationProps {
  input: string;
  setInput: (input: string) => void;
  messages: Message[];
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  apiKeys: {
    openAI: string;
    [key: string]: string;
  };
  isLoaded: boolean;
  userType: UserType;
  businessType: BusinessType;
  selectedDistrict: string;
  businessName?: string;
  currentRequestId: string | null;
  setCurrentRequestId: (id: string | null) => void;
  connectionAttempts: number;
  setConnectionAttempts: (attempts: number | ((prev: number) => number)) => void;
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
  businessType,
  selectedDistrict,
  businessName,
  currentRequestId,
  setCurrentRequestId,
  connectionAttempts,
  setConnectionAttempts
}: UseChatApiCommunicationProps) => {
  
  // Generate response in demo mode
  const generateDemoResponseWithWarning = useCallback(() => {
    const demoResponse = generateDemoResponse(userType, selectedDistrict, businessType);
    
    // Add warning if API key isn't configured
    const isOpenAIConfigured = apiKeys.openAI && apiKeys.openAI !== 'demo-key';
    const apiKeyWarning = !isOpenAIConfigured ? 
      "\n\n**NOTA: Questa è una risposta di esempio. Per ottenere analisi personalizzate, configura la tua API key di OpenAI nelle impostazioni.**" : "";
    
    return demoResponse + apiKeyWarning;
  }, [userType, selectedDistrict, businessType, apiKeys.openAI]);
  
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
        
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: generateDemoResponseWithWarning(),
          timestamp: new Date()
        }]);
        
        setIsProcessing(false);
        setCurrentRequestId(null);
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
      
      // Resetta i tentativi di connessione se andiamo a buon fine
      if (connectionAttempts > 0) {
        setConnectionAttempts(0);
      }
      
      if (response.success) {
        const aiMessage: Message = {
          role: 'assistant',
          content: response.content,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Se c'è stato un errore ma non è di connessione, mostra il messaggio di errore
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response.content,
          timestamp: new Date()
        }]);
        
        // Controlla se è un errore potenzialmente legato alla connessione
        if (response.error && typeof response.error === 'object') {
          const errorStr = JSON.stringify(response.error);
          if (errorStr.includes('network') || 
              errorStr.includes('connection') || 
              errorStr.includes('timeout') ||
              errorStr.includes('500')) {
            
            setConnectionAttempts(prev => prev + 1);
            
            // Se è il terzo errore consecutivo, mostra un toast con consiglio
            if (connectionAttempts >= 2) {
              toast({
                title: "Problemi persistenti di connessione",
                description: "Sembra che ci siano problemi persistenti con la connessione alle API. Prova a ricaricare la pagina o verifica la tua connessione internet.",
                variant: "destructive",
                duration: 8000
              });
            }
          }
        }
      }
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      
      // Se siamo qui, c'è un errore imprevisto
      // Controlla se è ancora la richiesta corrente
      if (currentRequestId === requestId) {
        toast({
          title: "Errore imprevisto",
          description: "Si è verificato un errore imprevisto durante l'elaborazione del messaggio.",
          variant: "destructive",
        });
        
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "Mi dispiace, si è verificato un errore imprevisto. Riprova più tardi.",
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
  
  return {
    handleSendMessage
  };
};
