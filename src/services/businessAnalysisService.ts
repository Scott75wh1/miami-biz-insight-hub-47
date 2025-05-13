
import { fetchPlacesData, fetchYelpData, fetchGoogleTrendsData, fetchCensusData, fetchOpenAIAnalysis } from '@/services/apiService';
import { detectBusinessType } from '@/utils/businessTypeDetector';
import { identifyDistrict } from '@/utils/locationDetector';

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
    businessInfo.name,
    apiKeys.yelp,
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
  const aiPrompt = `Analizza in dettaglio questi dati per l'attività "${businessInfo.name}" situata a ${businessInfo.address} nel quartiere ${updatedDistrict} di Miami:
    
    Dati di localizzazione: ${JSON.stringify(placesResult)}
    
    Dati demografici: ${JSON.stringify(censusResult)}
    
    Dati concorrenza: ${JSON.stringify(yelpResult)}
    
    Dati di tendenza: ${JSON.stringify(trendsResult)}
    
    Fornisci un'analisi dettagliata contestualizzata che includa:
    1. Un riassunto chiaro e completo del potenziale dell'attività nel quartiere ${updatedDistrict}
    2. Analisi demografica specifica per questo tipo di attività (${businessInfo.type}) in questa zona
    3. Analisi dettagliata della concorrenza con punti di forza e debolezza
    4. Tendenze di mercato rilevanti per ${businessInfo.type} a ${updatedDistrict}
    5. Raccomandazioni strategiche specifiche e attuabili (3-5)
    
    Utilizza dati concreti dei vari dataset per supportare ogni affermazione. Incorpora informazioni contestuali sul quartiere ${updatedDistrict} e sulle sue peculiarità. 
    
    Formato richiesto: JSON con campi 'summary', 'demographicAnalysis', 'competitionAnalysis', 'trendsAnalysis', 'recommendations'.
  `;
  
  console.log(`Sending enhanced prompt to OpenAI for contextual analysis of ${businessInfo.name} in ${updatedDistrict}`);
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
