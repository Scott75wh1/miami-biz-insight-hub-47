import { fetchPlacesData, fetchYelpData, fetchGoogleTrendsData, fetchCensusData, fetchOpenAIAnalysis } from '@/services/apiService';
import { detectBusinessType } from '@/utils/businessTypeDetector';

export interface BusinessInfo {
  name: string;
  address: string;
  district: string;
  type: string; // Changed from optional to required
}

export interface AnalysisResult {
  businessInfo: BusinessInfo;
  rawData: {
    places: any;
    yelp: any;
    census: any;
    trends: any;
  };
  analysis: {
    summary: string;
    demographicAnalysis: string;
    competitionAnalysis: string;
    trendsAnalysis: string;
    recommendations: string[];
  };
}

export async function performBusinessAnalysis(
  businessInfo: BusinessInfo,
  apiKeys: Record<string, string>,
): Promise<AnalysisResult> {
  // 1. Get location data using the Places API
  const placesResult = await fetchPlacesData(
    `${businessInfo.name} ${businessInfo.address}`, 
    apiKeys.googlePlaces
  );
  
  // 2. Get Yelp data for business name
  const yelpResult = await fetchYelpData(
    businessInfo.name,
    apiKeys.yelp,
    businessInfo.district
  );
  
  // 3. Get demographic data for the location
  const censusResult = await fetchCensusData(
    businessInfo.district,
    apiKeys.censusGov
  );
  
  // 4. Get Google Trends data for business type
  const businessType = businessInfo.type;
  const trendsResult = await fetchGoogleTrendsData(
    apiKeys.googleTrends,
    [businessType, businessInfo.name, `${businessType} ${businessInfo.district}`],
    "US-FL-528",
    businessInfo.district
  );
  
  // 5. Use OpenAI to analyze and interpret combined data
  const businessData = {
    name: businessInfo.name,
    address: businessInfo.address,
    district: businessInfo.district,
    places: placesResult,
    yelp: yelpResult,
    census: censusResult,
    trends: trendsResult
  };
  
  // Create a structured prompt for OpenAI to generate JSON
  const aiPrompt = `Analizza questi dati per l'attività "${businessInfo.name}" situata a ${businessInfo.address} nel quartiere ${businessInfo.district}:
    
    Dati demografici: ${JSON.stringify(censusResult)}
    
    Dati concorrenza: ${JSON.stringify(yelpResult)}
    
    Dati di tendenza: ${JSON.stringify(trendsResult)}
    
    Fornisci una analisi dettagliata ma concisa che includa:
    1. Potenziale demografico dell'area per questo tipo di attività
    2. Analisi della concorrenza (3-5 punti principali)
    3. Tendenze di mercato rilevanti
    4. Raccomandazioni specifiche (3-5)
    
    Formato richiesto: JSON con campi 'summary', 'demographicAnalysis', 'competitionAnalysis', 'trendsAnalysis', 'recommendations'.
  `;
  
  const aiAnalysis = await fetchOpenAIAnalysis(apiKeys.openAI, aiPrompt);
  
  // Process the OpenAI response
  let parsedAnalysis;
  if (aiAnalysis && aiAnalysis.choices && aiAnalysis.choices[0]) {
    try {
      // Attempt to parse as JSON if the response is formatted correctly
      const content = aiAnalysis.choices[0].message.content;
      // Try to extract JSON if it's embedded in text
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : content;
      parsedAnalysis = JSON.parse(jsonString);
      
      // Ensure all required fields exist
      parsedAnalysis = {
        summary: parsedAnalysis.summary || "Analisi non disponibile",
        demographicAnalysis: parsedAnalysis.demographicAnalysis || "Analisi demografica non disponibile",
        competitionAnalysis: parsedAnalysis.competitionAnalysis || "Analisi competitiva non disponibile",
        trendsAnalysis: parsedAnalysis.trendsAnalysis || "Analisi delle tendenze non disponibile",
        recommendations: Array.isArray(parsedAnalysis.recommendations) ? 
          parsedAnalysis.recommendations : 
          ["Raccomandazioni non disponibili"]
      };
    } catch (e) {
      console.error("Error parsing OpenAI response:", e);
      // If not proper JSON, use the raw text
      parsedAnalysis = {
        summary: aiAnalysis.choices[0].message.content,
        demographicAnalysis: "Analisi demografica non disponibile in formato strutturato",
        competitionAnalysis: "Analisi competitiva non disponibile in formato strutturato",
        trendsAnalysis: "Analisi delle tendenze non disponibile in formato strutturato",
        recommendations: ["Consultare il testo completo dell'analisi"]
      };
    }
  } else {
    parsedAnalysis = {
      summary: "Non è stato possibile generare un'analisi completa con i dati disponibili",
      demographicAnalysis: "Dati insufficienti",
      competitionAnalysis: "Dati insufficienti",
      trendsAnalysis: "Dati insufficienti",
      recommendations: ["Verificare le API key e riprovare l'analisi"]
    };
  }
  
  // Combine all data into a single object for the results component
  return {
    businessInfo: {
      name: businessInfo.name,
      address: businessInfo.address,
      district: businessInfo.district,
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
