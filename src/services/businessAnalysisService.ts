
import { fetchPlacesData, fetchYelpData, fetchGoogleTrendsData, fetchCensusData, fetchOpenAIAnalysis } from '@/services/apiService';
import { detectBusinessType } from '@/utils/businessTypeDetector';
import { identifyDistrict } from '@/utils/locationDetector';
import { BusinessAnalysis } from '@/services/api/openai/types';
import { analyzeCompetitorReviews } from '@/services/api/openai';

export interface BusinessInfo {
  name: string;
  address: string;
  district: string;
  type: string;
}

export interface AnalysisResult {
  businessInfo: BusinessInfo;
  rawData: {
    places: any;
    yelp: any;
    census: any;
    trends: any;
  };
  analysis: BusinessAnalysis; // Use the defined interface
}

export async function performBusinessAnalysis(
  businessInfo: BusinessInfo,
  apiKeys: Record<string, string>,
): Promise<AnalysisResult> {
  console.log(`Starting comprehensive analysis for ${businessInfo.name} at ${businessInfo.address}`);
  
  // 1. Get location data using the Places API
  const placesResult = await fetchPlacesData(
    `${businessInfo.name} ${businessInfo.address}`, 
    apiKeys.googlePlaces
  );
  
  // 2. Identify the correct district based on the address and location data
  const detectedDistrict = await identifyDistrict(
    businessInfo.address, 
    placesResult, 
    apiKeys.googlePlaces
  );
  
  // Update the district if we detected a different one
  const updatedDistrict = detectedDistrict || businessInfo.district;
  console.log(`Detected district: ${updatedDistrict} (Original: ${businessInfo.district})`);
  
  // 3. Get Yelp data for business name in the identified district
  const yelpResult = await fetchYelpData(
    apiKeys.yelp,
    businessInfo.name,
    updatedDistrict
  );
  
  // 4. Get demographic data for the location
  const censusResult = await fetchCensusData(
    updatedDistrict,
    apiKeys.censusGov
  );
  
  // 5. Get Google Trends data for business type
  const businessType = businessInfo.type;
  const trendsResult = await fetchGoogleTrendsData(
    apiKeys.googleTrends,
    [businessType, businessInfo.name, `${businessType} ${updatedDistrict}`],
    "US-FL-528",
    updatedDistrict
  );
  
  // 6. Get specific competitor analysis
  const competitorAnalysis = await analyzeCompetitorReviews(
    apiKeys.openAI,
    yelpResult?.businesses || [],
    businessType,
    updatedDistrict
  );
  
  // 7. Use OpenAI to analyze and interpret combined data with enhanced context
  const businessData = {
    name: businessInfo.name,
    address: businessInfo.address,
    district: updatedDistrict,
    places: placesResult,
    yelp: yelpResult,
    census: censusResult,
    trends: trendsResult,
    competitors: competitorAnalysis
  };
  
  // Create an enhanced prompt with more specific strategic requirements
  const aiPrompt = `
    ANALISI STRATEGICA DI BUSINESS PER "${businessInfo.name}" - ${updatedDistrict}, MIAMI
    
    Analizza in modo approfondito e strategico i dati per l'attività "${businessInfo.name}" situata a ${businessInfo.address} nel quartiere ${updatedDistrict} di Miami. 
    
    Dati a disposizione:
    - Dati di localizzazione: ${JSON.stringify(placesResult)}
    - Dati demografici: ${JSON.stringify(censusResult)}
    - Dati concorrenza: ${JSON.stringify(yelpResult)}
    - Dati di tendenza: ${JSON.stringify(trendsResult)}
    - Analisi dei competitor: ${JSON.stringify(competitorAnalysis)}
    
    REQUISITI ANALISI:
    
    1. Sommario Strategico: Fornisci un'analisi SWOT concisa ma completa per ${businessInfo.name} a ${updatedDistrict}, evidenziando le opportunità chiave e i rischi principali. Includi un indicatore di potenziale di successo su scala 1-10 con spiegazione.
    
    2. Analisi Demografica: Analizza dettagliatamente la composizione demografica di ${updatedDistrict} in relazione al business ${businessInfo.type}, con segmentazione per età, reddito, e stili di vita. Identifica i 2-3 segmenti demografici più promettenti con dati statistici a supporto.
    
    3. Analisi della Concorrenza: Identifica i 5 principali concorrenti di ${businessInfo.name} a ${updatedDistrict}, analizzando i loro punti di forza e debolezza specifici, posizionamento di mercato, e strategie di differenziazione. Fornisci raccomandazioni su come posizionarsi rispetto a ciascun concorrente.
    
    4. Analisi delle Tendenze: Fornisci dati quantitativi sulle tendenze di mercato per ${businessInfo.type} a ${updatedDistrict} con previsioni a 6-12 mesi. Identifica le tendenze emergenti che potrebbero rappresentare opportunità o minacce.
    
    5. Keywords Strategiche: Suggerisci 8-10 parole chiave specifiche per il marketing digitale locale di ${businessInfo.name} a ${updatedDistrict}, con una stima del volume di ricerca mensile e difficoltà di competizione.
    
    6. Opportunità di Mercato: Identifica 3-5 opportunità di mercato concrete e actionable per ${businessInfo.name} basate sui gap di mercato a ${updatedDistrict}, con potenziale ROI e timeframe di implementazione.
    
    7. Profilo del Consumatore: Crea 2-3 personas dettagliate dei clienti target a ${updatedDistrict} per ${businessInfo.type}, con dati demografici, comportamenti d'acquisto, motivazioni e pain points.
    
    8. Punti di Interesse Locali: Identifica attrazioni, business e punti di interesse strategici vicino a ${businessInfo.name} in ${updatedDistrict} con cui potrebbero essere sviluppate partnership strategiche.
    
    9. Raccomandazioni Strategiche: Fornisci 5-7 raccomandazioni concrete e dettagliate per ${businessInfo.name} con:
       - Descrizione della strategia
       - Motivazione basata sui dati
       - Step di implementazione
       - KPI per misurarne il successo
       - Timeline consigliata
    
    Utilizza dati concreti e specifici per supportare ogni affermazione. Sii specifico e preciso, utilizzando numeri e statistiche quando disponibili. Ogni analisi deve essere direttamente rilevante per ${businessInfo.name} a ${updatedDistrict} nel settore ${businessInfo.type}.
    
    Formato richiesto: JSON con i seguenti campi:
    - summary
    - demographicAnalysis
    - competitionAnalysis
    - trendsAnalysis
    - recommendedKeywords (array)
    - marketOpportunities
    - consumerProfile
    - localHighlights
    - recommendations (array di stringhe)
  `;
  
  console.log(`Sending enhanced strategic business prompt to OpenAI for comprehensive analysis of ${businessInfo.name} in ${updatedDistrict}`);
  const aiAnalysis = await fetchOpenAIAnalysis(apiKeys.openAI, aiPrompt);
  
  // Process the OpenAI response
  let parsedAnalysis: BusinessAnalysis;
  if (aiAnalysis && aiAnalysis.choices && aiAnalysis.choices[0]) {
    try {
      // Attempt to parse as JSON if the response is formatted correctly
      const content = aiAnalysis.choices[0].message.content;
      // Try to extract JSON if it's embedded in text
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : content;
      parsedAnalysis = JSON.parse(jsonString);
      
      // Ensure all required fields exist with personalized content
      parsedAnalysis = {
        summary: parsedAnalysis.summary || `Analisi strategica non disponibile per ${businessInfo.name} a ${updatedDistrict}`,
        demographicAnalysis: parsedAnalysis.demographicAnalysis || `Analisi demografica dettagliata non disponibile per ${updatedDistrict}`,
        competitionAnalysis: parsedAnalysis.competitionAnalysis || `Analisi dettagliata dei 5 principali competitor non disponibile per ${businessInfo.name} a ${updatedDistrict}`,
        trendsAnalysis: parsedAnalysis.trendsAnalysis || `Analisi approfondita delle tendenze non disponibile per ${businessInfo.name} a ${updatedDistrict}`,
        recommendedKeywords: Array.isArray(parsedAnalysis.recommendedKeywords) && parsedAnalysis.recommendedKeywords.length >= 8 ? 
          parsedAnalysis.recommendedKeywords : 
          [`${businessInfo.name} ${updatedDistrict}`, `miglior ${businessInfo.type} ${updatedDistrict}`, `${businessInfo.type} autentico ${updatedDistrict}`, 
           `${businessInfo.type} vicino a me`, `${businessInfo.type} recensioni ${updatedDistrict}`, `${businessInfo.type} economico ${updatedDistrict}`,
           `${businessInfo.type} di qualità ${updatedDistrict}`, `${businessInfo.name} orari`, `${businessInfo.name} menu`, `${businessInfo.name} prenotazione`],
        // Convert marketOpportunities to string if it's an array
        marketOpportunities: Array.isArray(parsedAnalysis.marketOpportunities) ? 
          parsedAnalysis.marketOpportunities.join('\n\n') : 
          parsedAnalysis.marketOpportunities || `Opportunità di mercato strategiche non disponibili per ${businessInfo.name} a ${updatedDistrict}`,
        consumerProfile: parsedAnalysis.consumerProfile || `Personas dettagliate dei clienti target non disponibili per ${businessInfo.name} a ${updatedDistrict}`,
        localHighlights: parsedAnalysis.localHighlights || `Punti di interesse strategici non disponibili per ${updatedDistrict}`,
        recommendations: Array.isArray(parsedAnalysis.recommendations) ? 
          parsedAnalysis.recommendations : 
          [`Sviluppare un piano di marketing digitale locale focalizzato su ${updatedDistrict}`,
           `Creare un programma di fidelizzazione per i residenti di ${updatedDistrict}`,
           `Implementare una strategia di menu speciali basati sulle tendenze identificate`,
           `Stabilire partnership con attrazioni locali e hotel di ${updatedDistrict}`,
           `Ottimizzare la presenza sui social media con contenuti specifici per ${updatedDistrict}`,
           `Organizzare eventi tematici mensili per attirare clientela locale`,
           `Investire in SEO locale per aumentare la visibilità nelle ricerche relative a ${updatedDistrict}`]
      };
    } catch (e) {
      console.error("Error parsing OpenAI response:", e);
      // If not proper JSON, use the raw text but customize it with business info
      parsedAnalysis = {
        summary: aiAnalysis.choices[0].message.content,
        demographicAnalysis: `Analisi demografica strategica non disponibile in formato strutturato per ${businessInfo.name} a ${updatedDistrict}`,
        competitionAnalysis: `Analisi dei 5 principali competitor non disponibile in formato strutturato per ${businessInfo.name} a ${updatedDistrict}`,
        trendsAnalysis: `Analisi delle tendenze di mercato non disponibile in formato strutturato per ${businessInfo.name} a ${updatedDistrict}`,
        recommendedKeywords: [`${businessInfo.name} ${updatedDistrict}`, `miglior ${businessInfo.type} ${updatedDistrict}`, `${businessInfo.type} autentico ${updatedDistrict}`,
                             `${businessInfo.type} vicino a me`, `${businessInfo.type} recensioni ${updatedDistrict}`, `${businessInfo.type} economico ${updatedDistrict}`,
                             `${businessInfo.type} di qualità ${updatedDistrict}`, `${businessInfo.name} orari`, `${businessInfo.name} menu`, `${businessInfo.name} prenotazione`],
        marketOpportunities: `Opportunità di mercato strategiche non disponibili per ${businessInfo.name} a ${updatedDistrict}`,
        consumerProfile: `Profili dettagliati dei clienti target non disponibili per ${businessInfo.name} a ${updatedDistrict}`,
        localHighlights: `Punti di interesse strategici non disponibili per ${businessInfo.name} a ${updatedDistrict}`,
        recommendations: ["Consultare il testo completo dell'analisi strategica per raccomandazioni personalizzate"]
      };
    }
  } else {
    // Create default analysis with business name and district if OpenAI fails
    parsedAnalysis = {
      summary: `Non è stato possibile generare un'analisi strategica completa per ${businessInfo.name} con i dati disponibili per ${updatedDistrict}`,
      demographicAnalysis: `Dati demografici insufficienti per ${updatedDistrict} per analizzare ${businessInfo.name}`,
      competitionAnalysis: `Dati sui 5 principali competitor insufficienti per ${updatedDistrict} per analizzare ${businessInfo.name}`,
      trendsAnalysis: `Dati sulle tendenze di mercato insufficienti per ${businessInfo.name} a ${updatedDistrict}`,
      recommendedKeywords: [`${businessInfo.name} ${updatedDistrict}`, `miglior ${businessInfo.type} ${updatedDistrict}`, `${businessInfo.type} autentico ${updatedDistrict}`,
                           `${businessInfo.type} vicino a me`, `${businessInfo.type} recensioni ${updatedDistrict}`, `${businessInfo.type} economico ${updatedDistrict}`,
                           `${businessInfo.type} di qualità ${updatedDistrict}`, `${businessInfo.name} orari`, `${businessInfo.name} menu`, `${businessInfo.name} prenotazione`],
      marketOpportunities: `Opportunità di mercato strategiche non disponibili per ${businessInfo.name} a ${updatedDistrict}`,
      consumerProfile: `Profili dettagliati dei clienti target non disponibili per ${businessInfo.name} a ${updatedDistrict}`,
      localHighlights: `Punti di interesse strategici non disponibili per ${businessInfo.name} a ${updatedDistrict}`,
      recommendations: [`Verificare le API key e riprovare l'analisi strategica per ${businessInfo.name}`]
    };
  }
  
  // Combine all data into a single object for the results component
  return {
    businessInfo: {
      name: businessInfo.name,
      address: businessInfo.address,
      district: updatedDistrict, // Use the detected district
      type: businessType
    },
    rawData: {
      places: placesResult,
      yelp: yelpResult,
      census: censusResult,
      trends: trendsResult
    },
    analysis: parsedAnalysis
  };
}
