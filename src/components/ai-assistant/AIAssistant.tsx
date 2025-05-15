
import React, { useState, useEffect } from 'react';
import { fetchOpenAIAnalysis } from '@/services/apiService';
import { useApiKeys } from '@/hooks/useApiKeys';
import { toast } from '@/hooks/use-toast';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useUserType } from '@/hooks/useUserType';
import { UserType } from '@/components/UserTypeSelector';
import { BusinessType } from '@/components/BusinessTypeSelector';
import ChatInterface from './ChatInterface';
import { buildPrompt } from '@/utils/promptBuilder';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Suggestion {
  forType: UserType;
  text: string;
}

interface AIAssistantProps {
  businessType: BusinessType;
  businessName?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ businessType, businessName }) => {
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
    
    try {
      // Create the enhanced prompt based on user type
      const enhancedPrompt = buildPrompt(input, userType, businessType, selectedDistrict, businessName);
      
      // Send to OpenAI if key is available
      if (isLoaded && apiKeys.openAI && apiKeys.openAI !== 'demo-key') {
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
      } else {
        // Generate mock response based on user type and query
        await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate API delay
        
        let mockResponse = '';
        
        if (input.toLowerCase().includes('clienti') || input.toLowerCase().includes('target')) {
          mockResponse = userType === 'end_user' 
            ? `I dati demografici di ${selectedDistrict} mostrano che i clienti in questa zona sono principalmente nella fascia d'età 28-45 anni, con un reddito medio-alto. Per la tua attività ${businessType}, potresti focalizzarti su:

1. Offrire servizi che rispondono alle esigenze di giovani professionisti
2. Comunicare sui canali social più utilizzati da questa fascia d'età
3. Creare offerte speciali nelle fasce orarie dopo l'ufficio (17:00-20:00) quando il traffico pedonale è più alto`
            : `# Analisi demografica - ${selectedDistrict}

## Segmentazione primaria
- **Fascia d'età dominante**: 28-45 anni (42% della popolazione)
- **Reddito medio**: €58,420 (+12.3% rispetto media cittadina)
- **Educazione**: 64.7% laurea o superiore
- **Composizione familiare**: 43% single, 38% coppie senza figli

## Comportamento d'acquisto
- Sensibilità al prezzo: Moderata (-0.8 elasticità)
- Canali di acquisto preferiti: Online+ritiro in negozio (52%), in-store (38%)
- Frequenza acquisti: 2.4 volte/settimana
- Fattori decisionali: qualità (68%), convenienza (43%), esperienza (38%)

## Raccomandazioni per segmentazione
1. Targeting primario: professionisti 30-40 anni con focus su qualità/esperienza
2. Targeting secondario: coppie DINK (Double Income No Kids) con alto potere d'acquisto
3. Differenziazione dalla concorrenza tramite esperienza cliente premium`;
        } else if (input.toLowerCase().includes('concorrenza') || input.toLowerCase().includes('competitor')) {
          mockResponse = userType === 'end_user'
            ? `Dall'analisi dei competitor ${businessType} a ${selectedDistrict}, emergono queste caratteristiche vincenti:

1. I competitor più apprezzati offrono un'esperienza autentica e personalizzata
2. Il servizio clienti è un fattore fondamentale (citato nel 78% delle recensioni positive)
3. La presenza sui social media locali aumenta la visibilità del 43%

Ti consiglio di visitare i principali competitor come osservatore per individuare opportunità di differenziazione e aree in cui potresti fare meglio.`
            : `# Analisi Competitiva ${businessType} - ${selectedDistrict}

## Panoramica competitiva
- Densità: 3.7 attività simili per km²
- Rating medio competitor: 4.2/5.0
- Prezzo medio: €€-€€€
- Turnover: 24% annuo

## Top Competitor
1. **Competitor A**
   - USP: Esperienza cliente distintiva
   - Quota di mercato stimata: 17%
   - Punti di forza: innovazione, presenza digitale, loyalty program
   - Debolezze: prezzi elevati, tempi di attesa

2. **Competitor B**
   - USP: Rapporto qualità-prezzo
   - Quota di mercato stimata: 14%
   - Punti di forza: prezzi accessibili, efficienza operativa
   - Debolezze: esperienza standardizzata, bassa differenziazione

## Gap di opportunità
- Solo 8% dei competitor utilizza efficacemente programmi di fidelizzazione digitalizzati
- Carenza di offerte premium nel segmento 25-35 anni
- Opportunità di partnership con attività complementari sottoutilizzata (solo 12% dei competitor)`;
        } else {
          mockResponse = userType === 'end_user'
            ? `Ecco 3 idee pratiche per migliorare la tua attività ${businessType} a ${selectedDistrict}:

1. **Collaborazioni locali**: Crea partnership con altre attività complementari del quartiere per promozioni incrociate. I dati mostrano un aumento del 28% della clientela con investimento minimo.

2. **Programma fedeltà semplice**: Anche un sistema basico come "compra 10, prendi 1 gratis" può aumentare le visite ripetute del 34% in questa zona.

3. **Presenza digitale localizzata**: Assicurati che il tuo Google My Business sia completo con foto aggiornate e orari corretti. Il 76% dei residenti di ${selectedDistrict} cerca attività online prima di visitarle.`
            : `# Strategie di Marketing per ${businessType} a ${selectedDistrict}

## Strategia SEO Locale
- Keywords target: "${businessType} ${selectedDistrict}" (3.2K ricerche/mese), "miglior ${businessType} vicino a me" (1.8K ricerche/mese)
- Ottimizzazione Google My Business: completare profilo al 100%, raccogliere 15+ recensioni (obiettivo: 4.5+ rating)
- Contenuti geo-localizzati: creare 3-5 landing page per servizi principali con focus su ${selectedDistrict}
- Schema markup: implementare LocalBusiness e Review schema

## Canali ad alta performance
1. **SEM geo-localizzato**: targeting 2km radius da ${selectedDistrict}, bid adjustment +30% mobile
2. **Social Ads**: Meta targeting per interessi + geolocalizzazione, ROAS target >280%
3. **Local partnerships**: co-marketing con business complementari non concorrenti

## Metriche KPI
- CTR organico target: >4.2%
- Conversion rate landing pages: >3.8%
- CPA: <€28.50
- Customer Retention Rate: target >65%
- Net Promoter Score: target >40`;
        }
        
        const aiMessage: Message = {
          role: 'assistant',
          content: mockResponse,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
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

  return (
    <ChatInterface
      messages={messages}
      input={input}
      isProcessing={isProcessing}
      userType={userType}
      suggestions={getSuggestions()}
      onInputChange={handleInputChange}
      onSendMessage={handleSendMessage}
      onSuggestionClick={handleSuggestionClick}
    />
  );
};

export default AIAssistant;
