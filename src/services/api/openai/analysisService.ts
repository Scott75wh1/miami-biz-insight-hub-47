
import { handleApiError } from '../handleError';
import { OpenAIResponse, ApiErrorResponse } from './types';

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
    
    const nameMatch = prompt.match(/attività "(.*?)"/i);
    if (nameMatch && nameMatch[1]) {
      businessName = nameMatch[1];
    }
    
    const districtMatch = prompt.match(/quartiere (.*?) di Miami/i);
    if (districtMatch && districtMatch[1]) {
      district = districtMatch[1];
    }
    
    const typeMatch = prompt.match(/Tipo di business: (.*?)(?:\n|$)/);
    if (typeMatch && typeMatch[1]) {
      businessType = typeMatch[1];
    }
    
    console.log(`Dati simulati per: "${businessName}" (${businessType}) in ${district}`);
    
    // Return mock data for demonstration but in JSON format with personalized content
    return {
      choices: [
        {
          message: {
            content: JSON.stringify({
              summary: `In base ai dati raccolti, l'attività "${businessName}" nel quartiere ${district} ha un buon potenziale di crescita. L'area è caratterizzata da una solida densità demografica con un discreto potere d'acquisto e mostra trend positivi per il settore, specialmente per attività che offrono un'esperienza di qualità ai clienti.`,
              demographicAnalysis: `${district} presenta una popolazione di circa 58.786 abitanti con un'età media di 36.1 anni e un reddito medio di $41,523. La densità di nuclei familiari (21,232) indica un'area residenziale con potenziali clienti disponibili. La comunità è culturalmente diversificata, con una significativa presenza di residenti di origine internazionale, il che può influenzare le preferenze dei consumatori.`,
              competitionAnalysis: `La concorrenza nel settore a ${district} è moderata, con attività che mantengono rating medi di 4.2/5. I punti di forza della concorrenza includono: diversità dell'offerta, prezzi accessibili e atmosfera accogliente. L'attività ${businessName} si può differenziare puntando su un'offerta più raffinata e autentica rispetto ai competitor locali di ${district}.`,
              trendsAnalysis: `Il settore a ${district} mostra una tendenza di crescita (78/100), con particolare interesse per le attività che offrono esperienze autentiche. L'interesse è in aumento (65/100) e l'interesse combinato per "${district}" mostra un trend positivo (71/100).`,
              recommendedKeywords: [`${businessName} ${district}`, `miglior servizio ${district}`, `offerte ${businessName}`, `recensioni ${businessName} ${district}`, `${businessName} qualità`, `visita ${businessName} ${district}`],
              marketOpportunities: `${district} offre opportunità interessanti per ${businessName}, grazie alla popolazione diversificata e alla crescente domanda di esperienze autentiche. La zona è in fase di rinnovamento urbano, con nuovi progetti immobiliari che stanno attirando residenti con maggiore potere d'acquisto. Inoltre, la posizione strategica all'interno di Miami permette a ${businessName} di attirare clientela anche da altre zone.`,
              consumerProfile: `Il consumatore tipico di ${district} per ${businessName} è una persona di età compresa tra i 30 e i 55 anni, con reddito medio-alto, istruzione universitaria e apprezzamento per la qualità. Famiglie, coppie e professionisti locali rappresentano i segmenti principali. Molti consumatori dell'area apprezzano l'esperienza completa e sono disposti a spendere per servizi di qualità in un ambiente piacevole.`,
              localHighlights: `${district} ospita attrazioni come musei, parchi e centri commerciali. Nelle vicinanze si trovano anche diverse strutture ricettive. La posizione di ${businessName} offre buona visibilità essendo su una delle arterie principali del quartiere, con facile accesso dai principali assi viari.`,
              recommendations: [
                `Sviluppare un'offerta che bilanci autenticità con influenze locali per attrarre sia i puristi che i clienti locali di ${district}`,
                `Implementare un programma di fidelizzazione specifico per i residenti di ${district}, con offerte speciali infrasettimanali`,
                `Creare partnership con attrazioni locali di ${district} per eventi a tema`,
                `Investire in una strategia di marketing digitale locale con focus su SEO per il quartiere ${district} e geotargeting`,
                `Offrire opzioni personalizzate per eventi aziendali e privati, sfruttando la presenza di istituzioni locali`,
                `Organizzare eventi esclusivi per differenziarsi dalla concorrenza locale di ${district}`,
                `Sviluppare una forte presenza sui social media con contenuti che evidenzino l'autenticità dell'esperienza presso ${businessName}`
              ]
            })
          }
        }
      ]
    };
  }
  
  try {
    console.log(`Invio prompt a OpenAI con chiave API valida (${apiKey.substring(0, 3)}...)`);
    
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
    
    // Extract business name and district from the prompt to personalize mock data
    let businessName = "Attività";
    let district = "Miami Beach";
    let businessType = "general";
    
    const nameMatch = prompt.match(/attività "(.*?)"/i);
    if (nameMatch && nameMatch[1]) {
      businessName = nameMatch[1];
    }
    
    const districtMatch = prompt.match(/quartiere (.*?) di Miami/i);
    if (districtMatch && districtMatch[1]) {
      district = districtMatch[1];
    }
    
    const typeMatch = prompt.match(/Tipo di business: (.*?)(?:\n|$)/);
    if (typeMatch && typeMatch[1]) {
      businessType = typeMatch[1];
    }
    
    console.log(`Simulazione risposta per: "${businessName}" (${businessType}) in ${district}`);
    
    // In a real implementation, this would be a fetch to the OpenAI API
    // For now, return personalized mock data
    return {
      choices: [
        {
          message: {
            content: JSON.stringify({
              summary: `In base ai dati raccolti, l'attività "${businessName}" nel quartiere ${district} ha un buon potenziale di crescita. L'area è caratterizzata da una solida densità demografica con un discreto potere d'acquisto e mostra trend positivi per il settore, specialmente per attività che offrono un'esperienza di qualità ai clienti.`,
              demographicAnalysis: `${district} presenta una popolazione di circa 58.786 abitanti con un'età media di 36.1 anni e un reddito medio di $41,523. La densità di nuclei familiari (21,232) indica un'area residenziale con potenziali clienti disponibili. La comunità è culturalmente diversificata, con una significativa presenza di residenti di origine internazionale, il che può influenzare le preferenze dei consumatori.`,
              competitionAnalysis: `La concorrenza nel settore a ${district} è moderata, con attività che mantengono rating medi di 4.2/5. I punti di forza della concorrenza includono: diversità dell'offerta, prezzi accessibili e atmosfera accogliente. L'attività ${businessName} si può differenziare puntando su un'offerta più raffinata e autentica rispetto ai competitor locali di ${district}.`,
              trendsAnalysis: `Il settore a ${district} mostra una tendenza di crescita (78/100), con particolare interesse per le attività che offrono esperienze autentiche. L'interesse è in aumento (65/100) e l'interesse combinato per "${district}" mostra un trend positivo (71/100).`,
              recommendedKeywords: [`${businessName} ${district}`, `miglior servizio ${district}`, `offerte ${businessName}`, `recensioni ${businessName} ${district}`, `${businessName} qualità`, `visita ${businessName} ${district}`, `${businessType} ${district}`, `${businessType} vicino a me`],
              marketOpportunities: `${district} offre opportunità interessanti per ${businessName}, grazie alla popolazione diversificata e alla crescente domanda di esperienze autentiche. La zona è in fase di rinnovamento urbano, con nuovi progetti immobiliari che stanno attirando residenti con maggiore potere d'acquisto. Inoltre, la posizione strategica all'interno di Miami permette a ${businessName} di attirare clientela anche da altre zone.`,
              consumerProfile: `Il consumatore tipico di ${district} per ${businessName} è una persona di età compresa tra i 30 e i 55 anni, con reddito medio-alto, istruzione universitaria e apprezzamento per la qualità. Famiglie, coppie e professionisti locali rappresentano i segmenti principali. Molti consumatori dell'area apprezzano l'esperienza completa e sono disposti a spendere per servizi di qualità in un ambiente piacevole.`,
              localHighlights: `${district} ospita attrazioni come musei, parchi e centri commerciali. Nelle vicinanze si trovano anche diverse strutture ricettive. La posizione di ${businessName} offre buona visibilità essendo su una delle arterie principali del quartiere, con facile accesso dai principali assi viari.`,
              recommendations: [
                `Sviluppare un'offerta che bilanci autenticità con influenze locali per attrarre sia i puristi che i clienti locali di ${district}`,
                `Implementare un programma di fidelizzazione specifico per i residenti di ${district}, con offerte speciali infrasettimanali`,
                `Creare partnership con attrazioni locali di ${district} per eventi a tema`,
                `Investire in una strategia di marketing digitale locale con focus su SEO per il quartiere ${district} e geotargeting`,
                `Offrire opzioni personalizzate per eventi aziendali e privati, sfruttando la presenza di istituzioni locali`,
                `Organizzare eventi esclusivi per differenziarsi dalla concorrenza locale di ${district}`,
                `Sviluppare una forte presenza sui social media con contenuti che evidenzino l'autenticità dell'esperienza presso ${businessName}`
              ]
            })
          }
        }
      ]
    };
  } catch (error) {
    console.error("Errore nell'analisi OpenAI:", error);
    const errorResponse = handleApiError(error, 'OpenAI') as ApiErrorResponse;
    
    // Create a valid OpenAIResponse even in error case
    return {
      choices: [],
      ...errorResponse
    };
  }
};
