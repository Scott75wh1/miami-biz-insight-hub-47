
import { handleApiError } from '../handleError';
import { OpenAIResponse } from './types';

export const fetchOpenAIAnalysis = async (apiKey: string, prompt: string): Promise<OpenAIResponse | null> => {
  if (!apiKey || apiKey === 'demo-key') {
    console.error('OpenAI API key is not set or using demo key');
    // Return mock data for demonstration but in JSON format
    return {
      choices: [
        {
          message: {
            content: JSON.stringify({
              summary: "In base ai dati raccolti, l'attività \"Sapori\" nel quartiere North Miami ha un buon potenziale di crescita. L'area è caratterizzata da una solida densità demografica con un discreto potere d'acquisto e mostra trend positivi per il settore ristorazione, specialmente per ristoranti che offrono un'esperienza gastronomica di qualità.",
              demographicAnalysis: "North Miami presenta una popolazione di circa 58.786 abitanti con un'età media di 36.1 anni e un reddito medio di $41,523. La densità di nuclei familiari (21,232) indica un'area residenziale con potenziali clienti disponibili per attività di ristorazione. La comunità è culturalmente diversificata, con una significativa presenza di residenti di origine haitiana e latinoamericana, il che può influenzare le preferenze culinarie.",
              competitionAnalysis: "La concorrenza nel settore ristorazione a North Miami è moderata, con attività che mantengono rating medi di 4.2/5. I punti di forza della concorrenza includono: diversità dell'offerta culinaria, prezzi accessibili e atmosfera familiare. Il ristorante Sapori si può differenziare puntando su un'offerta gastronomica più raffinata e autentica rispetto ai competitor locali.",
              trendsAnalysis: "Il settore ristorazione a North Miami mostra una tendenza di crescita (78/100), con particolare interesse per i ristoranti che offrono esperienze autentiche. L'interesse per la cucina italiana di qualità è in aumento (65/100) e l'interesse combinato per \"ristoranti North Miami\" mostra un trend positivo (71/100).",
              recommendedKeywords: ["ristorante italiano North Miami", "Sapori Miami", "cucina autentica italiana", "miglior ristorante North Miami", "pranzo North Miami", "cena romantica North Miami"],
              marketOpportunities: "North Miami offre opportunità interessanti per un ristorante italiano di qualità, grazie alla popolazione diversificata e alla crescente domanda di esperienze culinarie autentiche. La zona è in fase di rinnovamento urbano, con nuovi progetti immobiliari che stanno attirando residenti con maggiore potere d'acquisto. Inoltre, la posizione strategica tra Downtown Miami e Aventura permette di attirare clientela anche da altre zone.",
              consumerProfile: "Il consumatore tipico di North Miami per un ristorante come Sapori è una persona di età compresa tra i 30 e i 55 anni, con reddito medio-alto, istruzione universitaria e apprezzamento per l'autentica cucina italiana. Famiglie, coppie e professionisti locali rappresentano i segmenti principali. Molti consumatori dell'area apprezzano l'esperienza gastronomica completa e sono disposti a spendere per cibo di qualità in un ambiente piacevole.",
              localHighlights: "North Miami ospita attrazioni come il Museum of Contemporary Art (MOCA), il campus della Florida International University e il Enchanted Forest Elaine Gordon Park. Nelle vicinanze si trovano centri commerciali come il Mall at 163rd Street. La posizione di Sapori su NE 125th Street offre buona visibilità essendo su una delle arterie principali del quartiere, con facile accesso sia da Biscayne Boulevard che da I-95.",
              recommendations: [
                "Sviluppare un menu che bilanci piatti italiani autentici con influenze locali per attrarre sia i puristi che i clienti locali",
                "Implementare un programma di fidelizzazione specifico per i residenti di North Miami, con offerte speciali infrasettimanali",
                "Creare partnership con il vicino Museum of Contemporary Art (MOCA) per eventi gastronomici a tema artistico",
                "Investire in una strategia di marketing digitale locale con focus su SEO per il quartiere North Miami e geotargeting",
                "Offrire opzioni di catering per eventi aziendali e universitari, sfruttando la presenza di FIU e altre istituzioni locali",
                "Organizzare serate a tema con degustazioni di vini italiani per differenziarsi dalla concorrenza locale",
                "Sviluppare una forte presenza sui social media con contenuti che evidenzino l'autenticità dell'esperienza culinaria italiana"
              ]
            })
          }
        }
      ]
    };
  }
  
  try {
    console.log(`Sending prompt to OpenAI: "${prompt.substring(0, 100)}..."`);
    
    // Enhance the prompt to require JSON formatting
    const enhancedPrompt = `${prompt}
    
    Important: Your response MUST be valid JSON with the following structure:
    {
      "summary": "Brief overall analysis of the business potential",
      "demographicAnalysis": "Analysis of demographic data for this business type",
      "competitionAnalysis": "Analysis of competitors (3-5 key points)",
      "trendsAnalysis": "Analysis of market trends for this business",
      "recommendedKeywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4", "keyword 5"],
      "marketOpportunities": "Detailed description of market opportunities in this district",
      "consumerProfile": "Detailed profile of the typical consumer in this area",
      "localHighlights": "Details about local attractions and points of interest",
      "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3", "recommendation 4", "recommendation 5"]
    }
    
    Make sure your response can be parsed by JSON.parse() without errors.`;
    
    // For now we'll still use mock data since we can't make actual API calls
    // In a real application, this would be a fetch to the OpenAI API
    return {
      choices: [
        {
          message: {
            content: JSON.stringify({
              summary: "In base ai dati raccolti, l'attività \"Sapori\" nel quartiere North Miami ha un buon potenziale di crescita. L'area è caratterizzata da una solida densità demografica con un discreto potere d'acquisto e mostra trend positivi per il settore ristorazione, specialmente per ristoranti che offrono un'esperienza gastronomica di qualità.",
              demographicAnalysis: "North Miami presenta una popolazione di circa 58.786 abitanti con un'età media di 36.1 anni e un reddito medio di $41,523. La densità di nuclei familiari (21,232) indica un'area residenziale con potenziali clienti disponibili per attività di ristorazione. La comunità è culturalmente diversificata, con una significativa presenza di residenti di origine haitiana e latinoamericana, il che può influenzare le preferenze culinarie.",
              competitionAnalysis: "La concorrenza nel settore ristorazione a North Miami è moderata, con attività che mantengono rating medi di 4.2/5. I punti di forza della concorrenza includono: diversità dell'offerta culinaria, prezzi accessibili e atmosfera familiare. Il ristorante Sapori si può differenziare puntando su un'offerta gastronomica più raffinata e autentica rispetto ai competitor locali.",
              trendsAnalysis: "Il settore ristorazione a North Miami mostra una tendenza di crescita (78/100), con particolare interesse per i ristoranti che offrono esperienze autentiche. L'interesse per la cucina italiana di qualità è in aumento (65/100) e l'interesse combinato per \"ristoranti North Miami\" mostra un trend positivo (71/100).",
              recommendedKeywords: ["ristorante italiano North Miami", "Sapori Miami", "cucina autentica italiana", "miglior ristorante North Miami", "pranzo North Miami", "cena romantica North Miami"],
              marketOpportunities: "North Miami offre opportunità interessanti per un ristorante italiano di qualità, grazie alla popolazione diversificata e alla crescente domanda di esperienze culinarie autentiche. La zona è in fase di rinnovamento urbano, con nuovi progetti immobiliari che stanno attirando residenti con maggiore potere d'acquisto. Inoltre, la posizione strategica tra Downtown Miami e Aventura permette di attirare clientela anche da altre zone.",
              consumerProfile: "Il consumatore tipico di North Miami per un ristorante come Sapori è una persona di età compresa tra i 30 e i 55 anni, con reddito medio-alto, istruzione universitaria e apprezzamento per l'autentica cucina italiana. Famiglie, coppie e professionisti locali rappresentano i segmenti principali. Molti consumatori dell'area apprezzano l'esperienza gastronomica completa e sono disposti a spendere per cibo di qualità in un ambiente piacevole.",
              localHighlights: "North Miami ospita attrazioni come il Museum of Contemporary Art (MOCA), il campus della Florida International University e il Enchanted Forest Elaine Gordon Park. Nelle vicinanze si trovano centri commerciali come il Mall at 163rd Street. La posizione di Sapori su NE 125th Street offre buona visibilità essendo su una delle arterie principali del quartiere, con facile accesso sia da Biscayne Boulevard che da I-95.",
              recommendations: [
                "Sviluppare un menu che bilanci piatti italiani autentici con influenze locali per attrarre sia i puristi che i clienti locali",
                "Implementare un programma di fidelizzazione specifico per i residenti di North Miami, con offerte speciali infrasettimanali",
                "Creare partnership con il vicino Museum of Contemporary Art (MOCA) per eventi gastronomici a tema artistico",
                "Investire in una strategia di marketing digitale locale con focus su SEO per il quartiere North Miami e geotargeting",
                "Offrire opzioni di catering per eventi aziendali e universitari, sfruttando la presenza di FIU e altre istituzioni locali",
                "Organizzare serate a tema con degustazioni di vini italiani per differenziarsi dalla concorrenza locale",
                "Sviluppare una forte presenza sui social media con contenuti che evidenzino l'autenticità dell'esperienza culinaria italiana"
              ]
            })
          }
        }
      ]
    };
  } catch (error) {
    return handleApiError(error, 'OpenAI');
  }
};
