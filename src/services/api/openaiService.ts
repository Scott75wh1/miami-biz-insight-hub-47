import { handleApiError } from './handleError';

export const fetchOpenAIAnalysis = async (apiKey: string, prompt: string) => {
  if (!apiKey || apiKey === 'demo-key') {
    console.error('OpenAI API key is not set or using demo key');
    // Return mock data for demonstration
    return {
      choices: [
        {
          message: {
            content: `Analisi per: ${prompt}\n\nIn base ai dati raccolti, il mercato a Miami mostra forti tendenze di crescita in questo settore. Le aree con maggiore potenziale sono Wynwood e Brickell. Si consiglia di considerare le tendenze demografiche e la concorrenza locale prima di procedere con nuove iniziative commerciali.`
          }
        }
      ]
    };
  }
  
  try {
    console.log(`Sending prompt to OpenAI: "${prompt}"`);
    
    // For now we'll still use mock data since we can't make actual API calls
    // In a real application, this would be a fetch to the OpenAI API
    return {
      choices: [
        {
          message: {
            content: `Analisi per: ${prompt}\n\nIn base ai dati raccolti, il mercato a Miami mostra forti tendenze di crescita in questo settore. Le aree con maggiore potenziale sono Wynwood e Brickell. Si consiglia di considerare le tendenze demografiche e la concorrenza locale prima di procedere con nuove iniziative commerciali.`
          }
        }
      ]
    };
  } catch (error) {
    return handleApiError(error, 'OpenAI');
  }
};

export const analyzeCompetitorReviews = async (apiKey: string, competitors: any[], businessType: string, district: string, cuisineType?: string) => {
  if (!apiKey || apiKey === 'demo-key' || !competitors || competitors.length === 0) {
    console.log('Using mock data for competitor strengths analysis');
    
    // Return mock strengths based on business type
    return getMockStrengthsData(businessType, cuisineType);
  }
  
  try {
    // Create a summary of the competitors for the prompt
    const competitorsData = competitors.map(comp => ({
      name: comp.name,
      rating: comp.rating,
      reviews: comp.reviews,
      reviewHighlight: comp.reviewHighlight || 'No highlight available'
    }));
    
    const prompt = `
      Analizza questi competitor nel settore ${businessType}${cuisineType ? ` (${cuisineType})` : ''} a ${district}:
      ${JSON.stringify(competitorsData)}
      
      Identifica i principali punti di forza per ciascun competitor basandoti sulle valutazioni e recensioni.
      Restituisci un JSON array con oggetti nella seguente struttura:
      { "name": "nome del competitor", "strengths": ["punto di forza 1", "punto di forza 2", "punto di forza 3"] }
    `;
    
    console.log(`Analyzing competitor reviews with OpenAI for ${district} ${businessType}`);
    
    // In a real implementation, we would call the OpenAI API
    // For now, we'll return mock data
    return getMockStrengthsData(businessType, cuisineType);
  } catch (error) {
    console.error('Error analyzing competitor reviews:', error);
    return getMockStrengthsData(businessType, cuisineType);
  }
};

// Add a new function to analyze trends data
export const analyzeTrendsData = async (
  apiKey: string, 
  businessType: string, 
  searchTrends: any[], 
  growingCategories: any[],
  district: string = 'Miami Beach'
) => {
  if (!apiKey || apiKey === 'demo-key') {
    console.log('Using mock data for trends analysis');
    return getMockTrendsAnalysis(businessType, searchTrends, growingCategories, district);
  }
  
  try {
    const prompt = `
      Analizza questi trend di mercato nel settore ${businessType} nella zona di ${district}:
      
      Trend di ricerca: ${JSON.stringify(searchTrends)}
      
      Categorie in crescita: ${JSON.stringify(growingCategories)}
      
      Fornisci 3 consigli strategici basati su questi dati di trend. Restituisci la risposta in formato JSON:
      {
        "summary": "Un breve riassunto della tendenza generale",
        "recommendations": ["consiglio 1", "consiglio 2", "consiglio 3"]
      }
    `;
    
    console.log(`Analyzing trends data with OpenAI for ${businessType} in ${district}`);
    
    // In a real implementation, we would call the OpenAI API
    // For now, we'll return mock data
    return getMockTrendsAnalysis(businessType, searchTrends, growingCategories, district);
  } catch (error) {
    console.error('Error analyzing trends data:', error);
    return getMockTrendsAnalysis(businessType, searchTrends, growingCategories, district);
  }
};

// Helper function for mock trends analysis recommendations
function getMockTrendsAnalysis(businessType: string, searchTrends: any[], growingCategories: any[], district: string = 'Miami Beach') {
  let analysis = {
    summary: "",
    recommendations: []
  };
  
  // Base recommendations by business type
  let baseAnalysis;
  switch(businessType) {
    case 'restaurant':
      baseAnalysis = {
        summary: "Il mercato della ristorazione a Miami mostra una forte crescita, con particolare interesse verso cucine fusion e opzioni vegane.",
        recommendations: [
          "Considerare l'inclusione di opzioni vegane o plant-based nel menu per attrarre una clientela in crescita",
          "Esplorare le possibilità di cucina fusion che combinano influenze latine e mediterranee, molto ricercate nella zona",
          "Investire nella presenza online, dato che le ricerche per ristoranti su Google sono tra le più alte e in crescita"
        ]
      };
      break;
    case 'coffee_shop':
      baseAnalysis = {
        summary: "Il settore delle caffetterie sta vivendo una specializzazione, con forte interesse verso cold brew e caffè di nicchia.",
        recommendations: [
          "Differenziarsi offrendo varietà di cold brew e caffè speciali, un trend in forte crescita (+31%)",
          "Considerare un'offerta di brunch per diversificare il business e attrarre clientela nel fine settimana",
          "Puntare su caffè biologici e sostenibili, segmento in crescita del +18% nell'ultimo periodo"
        ]
      };
      break;
    default:
      baseAnalysis = {
        summary: "Il mercato a Miami mostra un forte interesse verso soluzioni digitali e sostenibili.",
        recommendations: [
          "Integrare una soluzione e-commerce o di presenza digitale per sfruttare la crescita del +24% in questo settore",
          "Considerare pratiche commerciali sostenibili, un aspetto sempre più ricercato dai consumatori (+15%)",
          "Analizzare la possibilità di espandersi attraverso modelli di franchising, in crescita del +12%"
        ]
      };
  }
  
  // Modify recommendations based on district
  switch(district.toLowerCase()) {
    case 'wynwood':
      if (businessType === 'restaurant') {
        analysis = {
          summary: `Il mercato della ristorazione a ${district} è orientato verso concetti innovativi e fusion, con una forte presenza di food truck.`,
          recommendations: [
            "Sviluppare un concetto di ristorazione che incorpori elementi artistici, in linea con l'identità culturale del quartiere",
            "Considerare un format ibrido tra ristorante e food truck per massimizzare la flessibilità e ridurre i costi iniziali",
            "Puntare su menu fusion che combinano influenze latine e internazionali, particolarmente ricercati nella zona"
          ]
        };
      } else if (businessType === 'coffee_shop') {
        analysis = {
          summary: `Il settore delle caffetterie a ${district} è fortemente orientato verso esperienze artistiche e specialità di nicchia.`,
          recommendations: [
            "Creare uno spazio che funzioni anche come galleria d'arte o venue per eventi culturali, sfruttando l'identità artistica del quartiere",
            "Offrire metodi di estrazione alternativi e caffè di specialità con tostature artigianali locali",
            "Considerare collaborazioni con artisti locali per packaging e merchandising personalizzato"
          ]
        };
      } else {
        analysis = {
          summary: `${district} mostra un forte orientamento verso attività che integrano elementi artistici e creativi.`,
          recommendations: [
            "Incorporare elementi artistici e creativi nella strategia di business, in linea con l'identità del quartiere",
            "Considerare modelli di business pop-up o temporary per testare il mercato con investimenti contenuti",
            "Sviluppare collaborazioni con il vivace ecosistema artistico locale per aumentare visibilità e clientela"
          ]
        };
      }
      break;
      
    case 'brickell':
      if (businessType === 'restaurant') {
        analysis = {
          summary: `Il mercato della ristorazione a ${district} è orientato verso concetti premium e business dining, con clientela corporate.`,
          recommendations: [
            "Sviluppare un'offerta di business lunch efficiente e di qualità per la clientela corporate della zona",
            "Considerare orari estesi per aperitivi post-lavoro, particolarmente ricercati dai professionisti del quartiere finanziario",
            "Puntare su un design sofisticato e un servizio impeccabile, elementi molto apprezzati dalla clientela di ${district}"
          ]
        };
      } else if (businessType === 'coffee_shop') {
        analysis = {
          summary: `Il settore delle caffetterie a ${district} è orientato verso business café con spazi di lavoro e networking.`,
          recommendations: [
            "Creare aree dedicate al lavoro con connessioni veloci e prese elettriche abbondanti per i professionisti locali",
            "Offrire servizi di prenotazione salette per meeting informali e piccole riunioni di lavoro",
            "Sviluppare un programma di fidelizzazione specifico per i lavoratori delle aziende circostanti"
          ]
        };
      } else {
        analysis = {
          summary: `${district} mostra una forte domanda per servizi e prodotti premium orientati al mondo business e finanziario.`,
          recommendations: [
            "Orientare l'offerta verso una clientela corporate con elevata capacità di spesa",
            "Considerare servizi B2B che rispondano alle esigenze delle numerose aziende presenti nel quartiere",
            "Puntare su un posizionamento premium con elementi di esclusività e attenzione ai dettagli"
          ]
        };
      }
      break;
      
    case 'miami beach':
    default:
      analysis = baseAnalysis;
  }
  
  return analysis;
}

// Helper function to generate mock strengths data
function getMockStrengthsData(businessType: string, cuisineType?: string) {
  let strengths = [];
  
  switch (businessType) {
    case 'restaurant':
      if (cuisineType === 'Italiano') {
        strengths = [
          { name: "Trattoria Milano", strengths: ["Pasta fatta in casa", "Atmosfera autentica", "Vini pregiati"] },
          { name: "Ristorante Roma", strengths: ["Pizza napoletana", "Ingredienti importati", "Chef italiano"] },
          { name: "Osteria Venezia", strengths: ["Piatti regionali", "Porzioni abbondanti", "Prezzi competitivi"] }
        ];
      } else if (cuisineType === 'Giapponese') {
        strengths = [
          { name: "Sushi Bar Miami Beach", strengths: ["Pesce ultra-fresco", "Presentazione impeccabile", "Omakase rinomato"] },
          { name: "Katana Japanese Restaurant", strengths: ["Ottimo rapporto qualità-prezzo", "Menu variegato", "Chef esperti"] },
          { name: "Azabu Miami Beach", strengths: ["Stelle Michelin", "Ingredienti importati dal Giappone", "Esperienza esclusiva"] }
        ];
      } else {
        // Generic restaurant strengths
        strengths = [
          { name: "Fine Dining Restaurant", strengths: ["Alta qualità degli ingredienti", "Servizio eccezionale", "Ambiente elegante"] },
          { name: "Casual Eatery", strengths: ["Prezzi accessibili", "Porzioni generose", "Atmosfera informale"] },
          { name: "Local Favorite", strengths: ["Ricette tradizionali", "Ingredienti locali", "Ambiente accogliente"] }
        ];
      }
      break;
    case 'coffee_shop':
      strengths = [
        { name: "Miami Coffee Corner", strengths: ["Miscele esclusive", "Baristi esperti", "Pasticceria artigianale"] },
        { name: "Beach Brew", strengths: ["Caffè di specialità", "Location esclusiva", "Ambiente perfetto per lavorare"] },
        { name: "Morning Perk", strengths: ["Prezzi competitivi", "Servizio veloce", "Colazioni complete"] }
      ];
      break;
    default:
      strengths = [
        { name: "Business A", strengths: ["Qualità superiore", "Personale competente", "Ubicazione strategica"] },
        { name: "Business B", strengths: ["Prezzi competitivi", "Servizio rapido", "Orari flessibili"] },
        { name: "Business C", strengths: ["Prodotti esclusivi", "Esperienza personalizzata", "Tecnologie innovative"] }
      ];
  }
  
  return strengths;
}
