
import { fetchOpenAIAnalysis } from '@/services/apiService';
import { toast } from '@/hooks/use-toast';
import { Message } from '@/types/chatTypes';
import { buildEnhancedPrompt } from '@/utils/aiAssistant/promptBuilder';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { UserType } from '@/components/UserTypeSelector';

export const generateWelcomeMessage = (
  userType: UserType,
  selectedDistrict: string,
  businessType: BusinessType,
  businessName?: string
): Message => {
  const welcomeMessage = userType === 'end_user'
    ? `Ciao! Sono il tuo assistente personale per la tua attività${businessName ? ' ' + businessName : ''} a ${selectedDistrict}. Come posso aiutarti oggi? Puoi farmi domande pratiche su come migliorare la tua attività o capire meglio i tuoi clienti.`
    : `Benvenuto, professionista. Sono pronto ad assisterti con analisi dettagliate del mercato a ${selectedDistrict} per il settore ${businessType}. Posso fornirti approfondimenti su dati demografici, trend di mercato e strategie competitive.`;
  
  return {
    role: 'assistant',
    content: welcomeMessage,
    timestamp: new Date()
  };
};

export const generateDemoResponse = (
  userType: UserType, 
  selectedDistrict: string, 
  businessType: BusinessType
): string => {
  if (userType === 'end_user') {
    return `Basandomi sui dati disponibili per ${selectedDistrict}, ecco 3 consigli pratici per la tua attività:

1. Amplia la tua presenza sui social media locali con contenuti che mostrano il tuo legame con ${selectedDistrict}. I residenti apprezzano molto le attività che si sentono parte della comunità.

2. Considera di creare un'offerta speciale per i residenti locali durante i giorni feriali, quando il flusso di clienti è tipicamente più basso.

3. Collabora con altre attività locali di ${selectedDistrict} per promozioni incrociate che possono aumentare la visibilità con investimenti minimi.

Questi suggerimenti sono specificamente pensati per un'attività ${businessType} in questa zona, dove i dati mostrano un forte senso di comunità locale.`;
  } else {
    return `## Analisi di Mercato per ${businessType} a ${selectedDistrict}

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
  }
};

export const fetchAIResponse = async (
  apiKey: string,
  userMessage: string,
  userType: UserType,
  businessType: BusinessType,
  selectedDistrict: string,
  businessName?: string
) => {
  try {
    const enhancedPrompt = buildEnhancedPrompt(
      userMessage,
      userType,
      businessType,
      selectedDistrict,
      businessName
    );
    
    // Send to OpenAI
    const response = await fetchOpenAIAnalysis(apiKey, enhancedPrompt);
    
    if (response && response.choices && response.choices[0]) {
      return {
        success: true,
        content: response.choices[0].message.content
      };
    } else {
      throw new Error('Invalid API response');
    }
  } catch (error) {
    console.error('Error getting AI response:', error);
    
    toast({
      title: "Errore comunicazione AI",
      description: "Impossibile ottenere una risposta dall'assistente AI. Verifica la tua API key.",
      variant: "destructive",
    });
    
    return {
      success: false,
      content: 'Mi dispiace, si è verificato un errore durante l\'elaborazione della tua richiesta. Verifica la tua API key di OpenAI o riprova più tardi.',
      error
    };
  }
};
