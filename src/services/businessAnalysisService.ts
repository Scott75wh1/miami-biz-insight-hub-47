import { fetchPlacesData, fetchYelpData, fetchGoogleTrendsData, fetchCensusData, fetchOpenAIAnalysis } from '@/services/apiService';
import { detectBusinessType } from '@/utils/businessTypeDetector';
import { identifyDistrict } from '@/utils/locationDetector';
import { BusinessAnalysis } from '@/services/api/openai/types';

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
  console.log(`Starting analysis for ${businessInfo.name} at ${businessInfo.address}`);
  
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
  
  // 6. Use OpenAI to analyze and interpret combined data with enhanced context
  const businessData = {
    name: businessInfo.name,
    address: businessInfo.address,
    district: updatedDistrict,
    places: placesResult,
    yelp: yelpResult,
    census: censusResult,
    trends: trendsResult
  };
  
  // Create a structured prompt for OpenAI to generate a more detailed and contextual analysis
  const aiPrompt = `Analizza in dettaglio questi dati per l'attività "${businessInfo.name}" situata a ${businessInfo.address} nel quartiere ${updatedDistrict} di Miami. Assicurati di menzionare esplicitamente che si tratta di ${updatedDistrict} in ogni sezione dell'analisi:
    
    Dati di localizzazione: ${JSON.stringify(placesResult)}
    
    Dati demografici: ${JSON.stringify(censusResult)}
    
    Dati concorrenza: ${JSON.stringify(yelpResult)}
    
    Dati di tendenza: ${JSON.stringify(trendsResult)}
    
    Fornisci un'analisi dettagliata contestualizzata che includa:
    1. Un riassunto chiaro e completo del potenziale dell'attività nel quartiere ${updatedDistrict}
    2. Analisi demografica specifica per ${businessInfo.type} in ${updatedDistrict} con informazioni demografiche precise e dettagliate
    3. Analisi dettagliata della concorrenza con punti di forza e debolezza dei principali competitor in ${updatedDistrict}
    4. Tendenze di mercato rilevanti per ${businessInfo.type} a ${updatedDistrict} con dati quantitativi
    5. Parole chiave raccomandate per il marketing locale in ${updatedDistrict}
    6. Opportunità di mercato specifiche per ${updatedDistrict}
    7. Profilo del consumatore tipico in ${updatedDistrict} per ${businessInfo.type}
    8. Attrazioni locali e punti di interesse vicino al business in ${updatedDistrict}
    9. Raccomandazioni strategiche specifiche e attuabili (5-7 raccomandazioni dettagliate)
    
    Utilizza dati concreti dei vari dataset per supportare ogni affermazione. Incorpora informazioni contestuali sul quartiere ${updatedDistrict} e sulle sue peculiarità. Sii molto specifico e dettagliato, utilizzando numeri e statistiche quando disponibili.
    
    Formato richiesto: JSON con campi 'summary', 'demographicAnalysis', 'competitionAnalysis', 'trendsAnalysis', 'recommendedKeywords', 'marketOpportunities', 'consumerProfile', 'localHighlights', 'recommendations'.
  `;
  
  console.log(`Sending enhanced prompt to OpenAI for contextual analysis of ${businessInfo.name} in ${updatedDistrict}`);
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
      
      // Ensure all required fields exist and convert marketOpportunities to string if it's an array
      parsedAnalysis = {
        summary: parsedAnalysis.summary || `Analisi non disponibile per ${updatedDistrict}`,
        demographicAnalysis: parsedAnalysis.demographicAnalysis || `Analisi demografica non disponibile per ${updatedDistrict}`,
        competitionAnalysis: parsedAnalysis.competitionAnalysis || `Analisi competitiva non disponibile per ${updatedDistrict}`,
        trendsAnalysis: parsedAnalysis.trendsAnalysis || `Analisi delle tendenze non disponibile per ${updatedDistrict}`,
        recommendedKeywords: Array.isArray(parsedAnalysis.recommendedKeywords) ? 
          parsedAnalysis.recommendedKeywords : 
          [`${businessInfo.type} ${updatedDistrict}`, `${businessInfo.name} ${updatedDistrict}`],
        // Convert marketOpportunities to string if it's an array
        marketOpportunities: Array.isArray(parsedAnalysis.marketOpportunities) ? 
          parsedAnalysis.marketOpportunities.join('\n\n') : 
          parsedAnalysis.marketOpportunities || `Opportunità di mercato non disponibili per ${updatedDistrict}`,
        consumerProfile: parsedAnalysis.consumerProfile || `Profilo del consumatore non disponibile per ${updatedDistrict}`,
        localHighlights: parsedAnalysis.localHighlights || `Punti di interesse non disponibili per ${updatedDistrict}`,
        recommendations: Array.isArray(parsedAnalysis.recommendations) ? 
          parsedAnalysis.recommendations : 
          [`Raccomandazioni non disponibili per ${updatedDistrict}`]
      };
    } catch (e) {
      console.error("Error parsing OpenAI response:", e);
      // If not proper JSON, use the raw text
      parsedAnalysis = {
        summary: aiAnalysis.choices[0].message.content,
        demographicAnalysis: `Analisi demografica non disponibile in formato strutturato per ${updatedDistrict}`,
        competitionAnalysis: `Analisi competitiva non disponibile in formato strutturato per ${updatedDistrict}`,
        trendsAnalysis: `Analisi delle tendenze non disponibile in formato strutturato per ${updatedDistrict}`,
        recommendedKeywords: [`${businessInfo.type} ${updatedDistrict}`, `${businessInfo.name} ${updatedDistrict}`],
        marketOpportunities: `Opportunità di mercato non disponibili per ${updatedDistrict}`,
        consumerProfile: `Profilo del consumatore non disponibile per ${updatedDistrict}`,
        localHighlights: `Punti di interesse non disponibili per ${updatedDistrict}`,
        recommendations: ["Consultare il testo completo dell'analisi"]
      };
    }
  } else {
    parsedAnalysis = {
      summary: `Non è stato possibile generare un'analisi completa con i dati disponibili per ${updatedDistrict}`,
      demographicAnalysis: `Dati demografici insufficienti per ${updatedDistrict}`,
      competitionAnalysis: `Dati competitivi insufficienti per ${updatedDistrict}`,
      trendsAnalysis: `Dati sulle tendenze insufficienti per ${updatedDistrict}`,
      recommendedKeywords: [`${businessInfo.type} ${updatedDistrict}`, `${businessInfo.name} ${updatedDistrict}`],
      marketOpportunities: `Opportunità di mercato non disponibili per ${updatedDistrict}`,
      consumerProfile: `Profilo del consumatore non disponibile per ${updatedDistrict}`,
      localHighlights: `Punti di interesse non disponibili per ${updatedDistrict}`,
      recommendations: ["Verificare le API key e riprovare l'analisi"]
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
