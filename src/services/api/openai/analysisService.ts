
import { handleApiError } from '../handleError';
import { OpenAIResponse, ApiErrorResponse } from './types';
import { toast } from '@/hooks/use-toast';

export const fetchOpenAIAnalysis = async (apiKey: string, prompt: string): Promise<OpenAIResponse | null> => {
  // Log per verificare che il prompt sia completo
  console.log(`OpenAI Prompt (primi 300 caratteri): ${prompt.substring(0, 300)}...`);
  console.log(`OpenAI Prompt lunghezza totale: ${prompt.length} caratteri`);
  
  if (!apiKey || apiKey === 'demo-key') {
    console.log('OpenAI API key non impostata o chiave demo in uso, utilizzo dati simulati');
    
    // Extract business name and district from the prompt to personalize mock data
    let businessName = "Attività";
    let district = "Miami Beach";
    let businessType = "general";
    let isEndUser = prompt.includes("imprenditori a prendere decisioni pratiche");
    
    const nameMatch = prompt.match(/attività "(.*?)"/i);
    if (nameMatch && nameMatch[1]) {
      businessName = nameMatch[1];
    }
    
    const districtMatch = prompt.match(/distretto di (.*?)( |,|\.|\n)/i) || 
                         prompt.match(/quartiere (.*?) di Miami/i) || 
                         prompt.match(/a (.*?)( |,|\.|\n)/i);
    if (districtMatch && districtMatch[1]) {
      district = districtMatch[1];
    }
    
    const typeMatch = prompt.match(/Tipo di business: (.*?)(?:\n|$)/) || 
                     prompt.match(/attività (.*?) a/i);
    if (typeMatch && typeMatch[1]) {
      businessType = typeMatch[1];
    }
    
    console.log(`Dati simulati per: "${businessName}" (${businessType}) in ${district}, tipo utente: ${isEndUser ? 'end-user' : 'marketer'}`);
    
    // Generate mock response based on detected user type
    let mockResponse = '';
    
    if (isEndUser) {
      // End user format - more practical, action-oriented
      mockResponse = `Ecco alcuni suggerimenti pratici per la tua attività ${businessType} a ${district}:

1. **Migliora la visibilità locale**: I dati mostrano che a ${district} il 68% dei clienti scopre nuove attività passando davanti. Assicurati che la tua insegna sia ben visibile e l'esterno del locale sia accogliente.

2. **Sfrutta i social media locali**: Crea post specifici su luoghi ed eventi di ${district}. Le persone di quest'area interagiscono il 43% in più con contenuti localizzati rispetto a quelli generici.

3. **Offerte per residenti**: Crea un programma fedeltà specifico per i residenti di ${district}. I dati mostrano che i clienti locali tornano il 75% in più se hanno accesso a promozioni dedicate.

4. **Collaborazioni locali**: Identifica 2-3 attività complementari a ${district} (non concorrenti) per promozioni incrociate. Questo può aumentare la clientela del 24% con investimento minimo.

Queste strategie sono particolarmente efficaci per ${businessType} a ${district} in base ai dati demografici e comportamentali che abbiamo analizzato.`;
    } else {
      // Marketer format - more analytical, data-driven
      mockResponse = `# Analisi Strategica: ${businessType} a ${district}

## Segmentazione demografica
L'analisi dei dati demografici di ${district} rivela:
- Età media: 36.4 anni (vs 42.1 media Miami)
- Reddito medio: $58,420 (+12.3% rispetto media cittadina)
- Istruzione: 64.7% con laurea o superiore
- Concentrazione target primario: 23.8% della popolazione

## Analisi competitiva
La densità competitiva nel settore ${businessType} a ${district} è di 3.7 attività/km² (vs 2.9 media cittadina):
- Rating medio competitor: 4.2/5.0
- Prezzo medio: €€-€€€
- Top differentiatori: experience design (42%), autenticità (36%), innovazione (22%)

## Trend di mercato Q2 2025
- Crescita domanda settore: +8.7% YoY
- Crescita spesa media consumatore: +4.3% YoY
- Canali in crescita: mobile ordering (+31%), loyalty programs (+18%)
- Keywords in crescita: "${businessType} autentico ${district}" (+56%), "${businessType} experience ${district}" (+43%)

## KPI raccomandati
1. Customer Acquisition Cost (CAC): < €28.50
2. Customer Lifetime Value (CLTV): > €420
3. Retention Rate: target 68% (benchmark settore: 59%)
4. Conversion rate campagne geo-targeting: >3.8%
5. Net Promoter Score: target >45 (benchmark area: 39)

## Strategie prioritarie
1. Implementare campagna SEM geo-localizzata con targeting demografico 28-45 anni
2. Sviluppare strategia di content marketing basata sui trend locali di ${district}
3. Ottimizzare customer journey con focus sui touchpoint digitali pre-visita
4. Implementare programma di fidelizzazione con incentivi scaglionati
5. Pianificare co-marketing con attrattori locali di ${district} per incrementare footfall`;
    }
    
    // Return personalized mock data based on detected user type
    return {
      choices: [
        {
          message: {
            content: mockResponse
          }
        }
      ]
    };
  }
  
  try {
    console.log(`Invio prompt a OpenAI con chiave API valida (${apiKey.substring(0, 3)}...)`);
    
    // Aggiungiamo un controllo di timeout per gestire richieste bloccate
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 secondi di timeout
    
    // Implementazione reale dell'API OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4o", // Utilizzo gpt-4o, un modello avanzato
        messages: [
          {
            role: "system",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      }),
      signal: controller.signal
    });
    
    // Puliamo il timeout
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Errore OpenAI:", errorData);
      
      // Gestione errori specifici
      if (errorData.error?.type === "auth_subrequest_error") {
        toast({
          title: "Errore di autenticazione OpenAI",
          description: "Controlla che la tua API key di OpenAI sia corretta e attiva nelle impostazioni.",
          variant: "destructive",
        });
      } else {
        toast({
          title: `Errore ${response.status}`,
          description: errorData.error?.message || "Errore sconosciuto nel contattare OpenAI",
          variant: "destructive",
        });
      }
      
      throw new Error(`Error ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log("OpenAI Response:", data);
    
    return {
      choices: data.choices || []
    };
  } catch (error: any) {
    console.error("Errore nell'analisi OpenAI:", error);
    
    // Verifica se è un errore di abort/timeout
    if (error.name === 'AbortError') {
      toast({
        title: "Timeout di connessione",
        description: "La richiesta all'API OpenAI è scaduta. Riprova tra qualche istante.",
        variant: "destructive",
      });
      
      return {
        choices: [],
        error: true,
        errorType: 'TIMEOUT_ERROR',
        message: 'La connessione è scaduta. Riprova più tardi.'
      };
    }
    
    const errorResponse = handleApiError(error, 'OpenAI') as ApiErrorResponse;
    
    // Create a valid OpenAIResponse even in error case
    return {
      choices: [],
      ...errorResponse
    };
  }
};
