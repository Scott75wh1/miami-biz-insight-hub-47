
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
    
    // Aggiungiamo un indicatore di tentativi
    let attempts = 0;
    const maxAttempts = 2;
    let lastError = null;
    
    // Sistema di retry per problemi di connessione
    while (attempts < maxAttempts) {
      try {
        // Se stiamo riprovando, mostriamo un toast informativo
        if (attempts > 0) {
          toast({
            title: "Ritentativo connessione",
            description: `Tentativo ${attempts + 1}/${maxAttempts} di connessione all'API OpenAI...`,
          } as any);
          
          // Attendiamo un po' prima di riprovare
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
        
        // Send to OpenAI
        const response = await fetchOpenAIAnalysis(apiKey, enhancedPrompt);
        
        if (response && response.choices && response.choices[0]) {
          return {
            success: true,
            content: response.choices[0].message.content
          };
        } else if (response && response.error) {
          // Se abbiamo un errore API specifico, non ritentiamo
          throw new Error(response.message || 'Errore API specifico');
        } else {
          throw new Error('Invalid API response');
        }
      } catch (error: any) {
        lastError = error;
        
        // Se è un errore di autenticazione o un errore specifico noto, non ritentiamo
        if (error.message?.includes('authentication') || 
            error.message?.includes('auth_') ||
            error.message?.includes('API key')) {
          break;
        }
        
        attempts++;
        
        // Se abbiamo raggiunto il numero massimo di tentativi, usciamo dal ciclo
        if (attempts >= maxAttempts) break;
      }
    }
    
    // Se siamo qui, tutti i tentativi sono falliti
    console.error('Error getting AI response after retries:', lastError);
    
    toast({
      title: "Errore comunicazione AI",
      description: "Impossibile ottenere una risposta dall'assistente AI dopo ripetuti tentativi. Verifica la tua API key o la connessione internet.",
      variant: "destructive",
    } as any);
    
    return {
      success: false,
      content: 'Mi dispiace, si è verificato un errore durante l\'elaborazione della tua richiesta. Verifica la tua API key di OpenAI o riprova più tardi.',
      error: lastError
    };
  } catch (error) {
    console.error('Error getting AI response:', error);
    
    toast({
      title: "Errore comunicazione AI",
      description: "Impossibile ottenere una risposta dall'assistente AI. Verifica la tua API key.",
      variant: "destructive",
    } as any);
    
    return {
      success: false,
      content: 'Mi dispiace, si è verificato un errore durante l\'elaborazione della tua richiesta. Verifica la tua API key di OpenAI o riprova più tardi.',
      error
    };
  }
};
