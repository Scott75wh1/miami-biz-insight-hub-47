
// Importing types

import { logApiRequest } from '../logService';

/**
 * Generate a comprehensive and detailed prompt for OpenAI analysis
 */
export function generateAnalysisPrompt(
  businessName: string,
  businessAddress: string,
  district: string,
  placesData: any,
  censusData: any,
  yelpData: any,
  trendsData: any,
  competitorAnalysis: any,
  businessType: string
): string {
  console.log(`Generating enhanced OpenAI prompt for ${businessName} in ${district}`);
  
  // Log the request for debugging
  const requestId = logApiRequest('generateAnalysisPrompt', {
    business: businessName,
    district,
    type: businessType
  });
  
  // Create a more focused and systematic prompt for better results
  const prompt = `
Sei un esperto analista di business nel contesto di Miami, con competenze specifiche in analisi di mercato, demografia, e competitività. Ti fornirò i dati di un'attività che richiede un'analisi dettagliata.

DETTAGLI ATTIVITÀ:
- Nome: ${businessName}
- Indirizzo: ${businessAddress}
- Distretto: ${district}
- Tipo di attività: ${businessType}

DATI DEMOGRAFICI DEL DISTRETTO DI ${district.toUpperCase()}:
${JSON.stringify(censusData, null, 2)}

DATI DEI COMPETITOR NEL DISTRETTO:
${JSON.stringify(competitorAnalysis, null, 2)}

DATI YELP RILEVANTI:
${JSON.stringify(yelpData?.businesses?.slice(0, 5) || [], null, 2)}

DATI DI TENDENZA DI MERCATO:
${JSON.stringify(trendsData || {}, null, 2)}

ANALISI RICHIESTA:
Analizza in modo dettagliato e restituisci un report completo con le sezioni seguenti IN ITALIANO:

1. SOMMARIO ESECUTIVO: Un breve riassunto di alto livello (3-4 frasi) sulle prospettive dell'attività nel distretto.

2. ANALISI DEMOGRAFICA: Analisi dettagliata delle caratteristiche demografiche del distretto e come queste influenzano il potenziale successo dell'attività.

3. PROFILO DEL CONSUMATORE: Descrivi il cliente tipo per questa attività nel distretto specifico.

4. ANALISI DELLA CONCORRENZA: Valutazione dei principali competitor, loro punti di forza e debolezze.

5. ANALISI DELLE TENDENZE: Identifica le tendenze rilevanti per questo tipo di attività nella zona.

6. RACCOMANDAZIONI STRATEGICHE: Fornisci 5 raccomandazioni concrete e azionabili per aumentare le probabilità di successo dell'attività.

7. OPPORTUNITÀ DI MERCATO: Identifica 3 opportunità di mercato specifiche per questa attività nel distretto.

8. ELEMENTI DISTINTIVI LOCALI: Menziona 3 caratteristiche uniche del distretto che potrebbero influenzare l'attività.

9. PAROLE CHIAVE RACCOMANDATE: Suggerisci 5 parole chiave per il marketing digitale dell'attività.

Fornisci la tua risposta nel seguente formato JSON:

{
  "summary": "Testo del sommario...",
  "demographicAnalysis": "Testo dell'analisi demografica...",
  "consumerProfile": "Testo del profilo consumatore...",
  "competitionAnalysis": "Testo dell'analisi della concorrenza...",
  "trendsAnalysis": "Testo dell'analisi delle tendenze...",
  "recommendations": ["Raccomandazione 1", "Raccomandazione 2", "Raccomandazione 3", "Raccomandazione 4", "Raccomandazione 5"],
  "marketOpportunities": ["Opportunità 1", "Opportunità 2", "Opportunità 3"],
  "localHighlights": ["Elemento distintivo 1", "Elemento distintivo 2", "Elemento distintivo 3"],
  "recommendedKeywords": ["Parola chiave 1", "Parola chiave 2", "Parola chiave 3", "Parola chiave 4", "Parola chiave 5"]
}

La tua analisi deve essere ASSOLUTAMENTE in italiano, specifica per il distretto indicato, e con raccomandazioni concrete e attuabili.
`;

  console.log(`Enhanced prompt generated for ${businessName} with ${prompt.length} characters`);
  return prompt;
}
