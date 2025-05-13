
import { CompetitorStrength, TrendsAnalysis } from './types';

// Helper function for mock strengths analysis recommendations
export function getMockStrengthsData(businessType: string, cuisineType?: string): CompetitorStrength[] {
  let strengths: CompetitorStrength[] = [];
  
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

// Helper function for mock trends analysis recommendations
export function getMockTrendsAnalysis(
  businessType: string, 
  searchTrends: any[], 
  growingCategories: any[],
  district: string = 'Miami Beach'
): TrendsAnalysis {
  let analysis: TrendsAnalysis = {
    summary: "",
    recommendations: []
  };
  
  // Base recommendations by business type
  let baseAnalysis: TrendsAnalysis;
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
