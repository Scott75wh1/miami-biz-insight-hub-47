
import { useState, useEffect } from 'react';
import { UserType } from '@/components/UserTypeSelector';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { fetchOpenAIAnalysis } from '@/services/apiService';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { toast } from '@/hooks/use-toast';
import { buildPrompt } from '@/utils/promptBuilder';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Suggestion {
  forType: UserType;
  text: string;
}

export const useAIAssistantChat = (
  businessType: BusinessType,
  businessName?: string,
) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);
  const { apiKeys, isLoaded } = useApiKeys();
  const { selectedDistrict } = useDistrictSelection();
  const { userType } = useUserType();
  
  // Get relevant suggestions based on user type
  const getSuggestions = (): Suggestion[] => {
    if (userType === 'end_user') {
      return [
        { forType: 'end_user', text: "Cosa vogliono i clienti in questa zona?" },
        { forType: 'end_user', text: `Come posso migliorare la mia attività ${businessType} a ${selectedDistrict}?` },
        { forType: 'end_user', text: "Quali sono i punti di forza della concorrenza?" },
        { forType: 'end_user', text: "Suggerisci 3 idee pratiche per aumentare i clienti" }
      ];
    } else {
      return [
        { forType: 'marketer', text: `Analizza la segmentazione demografica di ${selectedDistrict} per ${businessType}` },
        { forType: 'marketer', text: `Quali KPI dovrei monitorare per un'attività ${businessType}?` },
        { forType: 'marketer', text: `Compara le strategie di marketing dei top competitor a ${selectedDistrict}` },
        { forType: 'marketer', text: `Elabora una strategia SEO locale per ${selectedDistrict}` }
      ];
    }
  };

  // Set welcome message based on user type
  useEffect(() => {
    const welcomeMessage = userType === 'end_user'
      ? `Ciao! Sono il tuo assistente personale per la tua attività${businessName ? ' ' + businessName : ''} a ${selectedDistrict}. Come posso aiutarti oggi? Puoi farmi domande pratiche su come migliorare la tua attività o capire meglio i tuoi clienti.`
      : `Benvenuto, professionista. Sono pronto ad assisterti con analisi dettagliate del mercato a ${selectedDistrict} per il settore ${businessType}. Posso fornirti approfondimenti su dati demografici, trend di mercato e strategie competitive.`;
    
    setMessages([{
      role: 'assistant',
      content: welcomeMessage,
      timestamp: new Date()
    }]);
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
    
    if (!isLoaded || !apiKeys.openAI || apiKeys.openAI === 'demo-key') {
      setTimeout(() => {
        // Check if this is still the current request
        if (currentRequestId !== requestId) return;
        
        const demoResponse = userType === 'end_user'
          ? `Basandomi sui dati disponibili per ${selectedDistrict}, ecco 3 consigli pratici per la tua attività:

1. Amplia la tua presenza sui social media locali con contenuti che mostrano il tuo legame con ${selectedDistrict}. I residenti apprezzano molto le attività che si sentono parte della comunità.

2. Considera di creare un'offerta speciale per i residenti locali durante i giorni feriali, quando il flusso di clienti è tipicamente più basso.

3. Collabora con altre attività locali di ${selectedDistrict} per promozioni incrociate che possono aumentare la visibilità con investimenti minimi.

Questi suggerimenti sono specificamente pensati per un'attività ${businessType} in questa zona, dove i dati mostrano un forte senso di comunità locale.`
          : `## Analisi di Mercato per ${businessType} a ${selectedDistrict}

### Segmentazione demografica
I dati demografici di ${selectedDistrict} mostrano una popolazione prevalentemente di fascia d'età 28-45 anni (42%), con reddito medio-alto e istruzione universitaria (65%). Questo segmento dimostra particolare interesse verso ${businessType}.

### Analisi competitiva
La densità competitiva è di 3.7 attività simili per km², con un rating medio di 4.2/5 e un prezzo medio di €€-€€€. Il principale fattore differenziante è l'esperienza cliente personalizzata.

### Strategie raccomandate
1. Implementare una strategia SEO locale focalizzata su ${selectedDistrict} con contenuti geolocalizzati
2. Sviluppare un programma di fidelizzazione basato sui dati comportamentali raccolti
3. Ottimizzare il posizionamento del brand sui canali digitali più utilizzati dal target demografico identificato

### KPI consigliati
- Customer Acquisition Cost (CAC): target < €25
- Retention Rate: obiettivo >65%
- Engagement Rate sui social: benchmark di settore +15%
- Conversion Rate: obiettivo 4.2%`;
        
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: demoResponse,
          timestamp: new Date()
        }]);
        
        setIsProcessing(false);
      }, 1200);
      
      return;
    }
    
    try {
      // Create the enhanced prompt based on user type
      const enhancedPrompt = buildPrompt(input, userType, businessType, selectedDistrict, businessName);
      
      // Send to OpenAI
      const response = await fetchOpenAIAnalysis(apiKeys.openAI, enhancedPrompt);
      
      // Check if this is still the current request
      if (currentRequestId !== requestId) return;
      
      if (response && response.choices && response.choices[0]) {
        const aiMessage: Message = {
          role: 'assistant',
          content: response.choices[0].message.content,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Check if this is still the current request
      if (currentRequestId !== requestId) return;
      
      // Add error message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Mi dispiace, si è verificato un errore durante l\'elaborazione della tua richiesta. Verifica la tua API key di OpenAI o riprova più tardi.',
        timestamp: new Date()
      }]);
      
      toast({
        title: "Errore comunicazione AI",
        description: "Impossibile ottenere una risposta dall'assistente AI. Verifica la tua API key.",
        variant: "destructive",
      });
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
    suggestions: getSuggestions(),
    handleInputChange,
    handleSendMessage,
    handleSuggestionClick
  };
};

// This import is needed here to avoid circular dependencies
import { useUserType } from '@/hooks/useUserType';
