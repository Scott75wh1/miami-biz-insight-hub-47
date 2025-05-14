
import { BusinessAnalysis } from '@/services/api/openai/types';

export function processAnalysisResponse(
  aiAnalysis: any, 
  businessName: string, 
  businessType: string, 
  updatedDistrict: string
): BusinessAnalysis {
  if (aiAnalysis && aiAnalysis.choices && aiAnalysis.choices[0]) {
    try {
      // Attempt to parse as JSON if the response is formatted correctly
      const content = aiAnalysis.choices[0].message.content;
      // Try to extract JSON if it's embedded in text
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : content;
      const parsedAnalysis = JSON.parse(jsonString);
      
      // Ensure all required fields exist with personalized content
      return {
        summary: parsedAnalysis.summary || `Analisi strategica non disponibile per ${businessName} a ${updatedDistrict}`,
        demographicAnalysis: parsedAnalysis.demographicAnalysis || `Analisi demografica dettagliata non disponibile per ${updatedDistrict}`,
        competitionAnalysis: parsedAnalysis.competitionAnalysis || `Analisi dettagliata dei 5 principali competitor non disponibile per ${businessName} a ${updatedDistrict}`,
        trendsAnalysis: parsedAnalysis.trendsAnalysis || `Analisi approfondita delle tendenze non disponibile per ${businessName} a ${updatedDistrict}`,
        recommendedKeywords: Array.isArray(parsedAnalysis.recommendedKeywords) && parsedAnalysis.recommendedKeywords.length >= 8 ? 
          parsedAnalysis.recommendedKeywords : 
          [`${businessName} ${updatedDistrict}`, `miglior ${businessType} ${updatedDistrict}`, `${businessType} autentico ${updatedDistrict}`, 
           `${businessType} vicino a me`, `${businessType} recensioni ${updatedDistrict}`, `${businessType} economico ${updatedDistrict}`,
           `${businessType} di qualità ${updatedDistrict}`, `${businessName} orari`, `${businessName} menu`, `${businessName} prenotazione`],
        // Convert marketOpportunities to string if it's an array
        marketOpportunities: Array.isArray(parsedAnalysis.marketOpportunities) ? 
          parsedAnalysis.marketOpportunities.join('\n\n') : 
          parsedAnalysis.marketOpportunities || `Opportunità di mercato strategiche non disponibili per ${businessName} a ${updatedDistrict}`,
        consumerProfile: parsedAnalysis.consumerProfile || `Personas dettagliate dei clienti target non disponibili per ${businessName} a ${updatedDistrict}`,
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
      return {
        summary: aiAnalysis.choices[0].message.content,
        demographicAnalysis: `Analisi demografica strategica non disponibile in formato strutturato per ${businessName} a ${updatedDistrict}`,
        competitionAnalysis: `Analisi dei 5 principali competitor non disponibile in formato strutturato per ${businessName} a ${updatedDistrict}`,
        trendsAnalysis: `Analisi delle tendenze di mercato non disponibile in formato strutturato per ${businessName} a ${updatedDistrict}`,
        recommendedKeywords: [`${businessName} ${updatedDistrict}`, `miglior ${businessType} ${updatedDistrict}`, `${businessType} autentico ${updatedDistrict}`,
                              `${businessType} vicino a me`, `${businessType} recensioni ${updatedDistrict}`, `${businessType} economico ${updatedDistrict}`,
                              `${businessType} di qualità ${updatedDistrict}`, `${businessName} orari`, `${businessName} menu`, `${businessName} prenotazione`],
        marketOpportunities: `Opportunità di mercato strategiche non disponibili per ${businessName} a ${updatedDistrict}`,
        consumerProfile: `Profili dettagliati dei clienti target non disponibili per ${businessName} a ${updatedDistrict}`,
        localHighlights: `Punti di interesse strategici non disponibili per ${businessName} a ${updatedDistrict}`,
        recommendations: ["Consultare il testo completo dell'analisi strategica per raccomandazioni personalizzate"]
      };
    }
  } else {
    // Create default analysis with business name and district if OpenAI fails
    return {
      summary: `Non è stato possibile generare un'analisi strategica completa per ${businessName} con i dati disponibili per ${updatedDistrict}`,
      demographicAnalysis: `Dati demografici insufficienti per ${updatedDistrict} per analizzare ${businessName}`,
      competitionAnalysis: `Dati sui 5 principali competitor insufficienti per ${updatedDistrict} per analizzare ${businessName}`,
      trendsAnalysis: `Dati sulle tendenze di mercato insufficienti per ${businessName} a ${updatedDistrict}`,
      recommendedKeywords: [`${businessName} ${updatedDistrict}`, `miglior ${businessType} ${updatedDistrict}`, `${businessType} autentico ${updatedDistrict}`,
                            `${businessType} vicino a me`, `${businessType} recensioni ${updatedDistrict}`, `${businessType} economico ${updatedDistrict}`,
                            `${businessType} di qualità ${updatedDistrict}`, `${businessName} orari`, `${businessName} menu`, `${businessName} prenotazione`],
      marketOpportunities: `Opportunità di mercato strategiche non disponibili per ${businessName} a ${updatedDistrict}`,
      consumerProfile: `Profili dettagliati dei clienti target non disponibili per ${businessName} a ${updatedDistrict}`,
      localHighlights: `Punti di interesse strategici non disponibili per ${businessName} a ${updatedDistrict}`,
      recommendations: [`Verificare le API key e riprovare l'analisi strategica per ${businessName}`]
    };
  }
}
