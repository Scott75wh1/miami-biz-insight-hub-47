
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
              summary: "In base ai dati raccolti, l'attività \"Sapori\" nel quartiere Brickell ha un buon potenziale di crescita. L'area è caratterizzata da un'alta densità demografica con buon potere d'acquisto e mostra forti trend per il settore retail.",
              demographicAnalysis: "Brickell presenta una popolazione di circa 442.241 abitanti con un'età media di 40,1 anni e un reddito medio di $44.268. La densità di nuclei familiari (186.860) indica un'area residenziale con potenziali clienti disponibili per attività commerciali.",
              competitionAnalysis: "La concorrenza nel settore ristorazione a Brickell è di alto livello, con attività che mantengono rating superiori a 4.2/5. I punti di forza della concorrenza includono: qualità del cibo eccellente, atmosfera curata e servizio attento. Si consiglia di differenziarsi puntando su un'offerta gastronomica unica.",
              trendsAnalysis: "Il settore retail a Brickell mostra una forte tendenza di crescita (97/100), con l'attività \"Sapori\" che presenta già un buon interesse di ricerca (82/100). L'interesse combinato per \"retail Brickell\" è significativo (67/100), suggerendo un mercato ricettivo.",
              recommendations: [
                "Puntare su un posizionamento premium con offerta gastronomica distintiva per differenziarsi dalla concorrenza esistente",
                "Sviluppare una forte presenza digitale per capitalizzare l'interesse di ricerca già esistente",
                "Implementare un programma di fidelizzazione per clienti residenti nell'area",
                "Considerare partnership con attività locali complementari per ampliare la clientela",
                "Investire in una strategia di marketing localizzata per il quartiere Brickell"
              ]
            })
          }
        }
      ]
    };
  }
  
  try {
    console.log(`Sending prompt to OpenAI: "${prompt}"`);
    
    // Enhance the prompt to require JSON formatting
    const enhancedPrompt = `${prompt}
    
    Important: Your response MUST be valid JSON with the following structure:
    {
      "summary": "Brief overall analysis of the business potential",
      "demographicAnalysis": "Analysis of demographic data for this business type",
      "competitionAnalysis": "Analysis of competitors (3-5 key points)",
      "trendsAnalysis": "Analysis of market trends for this business",
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
              summary: "In base ai dati raccolti, l'attività \"Sapori\" nel quartiere Brickell ha un buon potenziale di crescita. L'area è caratterizzata da un'alta densità demografica con buon potere d'acquisto e mostra forti trend per il settore retail.",
              demographicAnalysis: "Brickell presenta una popolazione di circa 442.241 abitanti con un'età media di 40,1 anni e un reddito medio di $44.268. La densità di nuclei familiari (186.860) indica un'area residenziale con potenziali clienti disponibili per attività commerciali.",
              competitionAnalysis: "La concorrenza nel settore ristorazione a Brickell è di alto livello, con attività che mantengono rating superiori a 4.2/5. I punti di forza della concorrenza includono: qualità del cibo eccellente, atmosfera curata e servizio attento. Si consiglia di differenziarsi puntando su un'offerta gastronomica unica.",
              trendsAnalysis: "Il settore retail a Brickell mostra una forte tendenza di crescita (97/100), con l'attività \"Sapori\" che presenta già un buon interesse di ricerca (82/100). L'interesse combinato per \"retail Brickell\" è significativo (67/100), suggerendo un mercato ricettivo.",
              recommendations: [
                "Puntare su un posizionamento premium con offerta gastronomica distintiva per differenziarsi dalla concorrenza esistente",
                "Sviluppare una forte presenza digitale per capitalizzare l'interesse di ricerca già esistente",
                "Implementare un programma di fidelizzazione per clienti residenti nell'area",
                "Considerare partnership con attività locali complementari per ampliare la clientela",
                "Investire in una strategia di marketing localizzata per il quartiere Brickell"
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
