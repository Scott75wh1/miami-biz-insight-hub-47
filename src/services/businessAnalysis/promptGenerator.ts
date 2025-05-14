
export function generateAnalysisPrompt(
  businessName: string,
  businessAddress: string,
  updatedDistrict: string,
  placesResult: any,
  censusResult: any,
  yelpResult: any,
  trendsResult: any,
  competitorAnalysis: any,
  businessType: string
): string {
  console.log(`Generando prompt di analisi per ${businessName} (${businessType}) in ${updatedDistrict}`);
  console.log(`Dati disponibili: Places: ${!!placesResult}, Census: ${!!censusResult}, Yelp: ${!!yelpResult}, Trends: ${!!trendsResult}`);

  // Estrai informazioni salienti dai dati per migliorare il prompt
  const placesData = placesResult?.results?.[0] || {};
  const censusDataStr = censusResult 
    ? `popolazione: ${censusResult.population || 'N/A'}, età media: ${censusResult.median_age || 'N/A'}, reddito medio: ${censusResult.median_income || 'N/A'}, famiglie: ${censusResult.households || 'N/A'}`
    : 'Dati demografici non disponibili';
  
  const competitorCount = yelpResult?.businesses?.length || 0;
  const topCompetitors = yelpResult?.businesses?.slice(0, 3).map((b: any) => b.name).join(", ") || 'nessun competitor trovato';

  return `
    ANALISI STRATEGICA DI BUSINESS PER "${businessName}" - ${updatedDistrict}, MIAMI
    
    Analizza in modo approfondito e strategico i dati per l'attività "${businessName}" situata a ${businessAddress} nel quartiere ${updatedDistrict} di Miami. 
    
    Riepilogo dati principali:
    - Tipo di business: ${businessType}
    - Distretto: ${updatedDistrict}
    - Dati demografici: ${censusDataStr}
    - Competitor principali: ${topCompetitors} (${competitorCount} totali)
    
    Dati dettagliati:
    - Dati di localizzazione: ${JSON.stringify(placesResult)}
    - Dati demografici: ${JSON.stringify(censusResult)}
    - Dati concorrenza: ${JSON.stringify(yelpResult)}
    - Dati di tendenza: ${JSON.stringify(trendsResult)}
    - Analisi dei competitor: ${JSON.stringify(competitorAnalysis)}
    
    REQUISITI ANALISI:
    
    1. Sommario Strategico: Fornisci un'analisi SWOT concisa ma completa per ${businessName} a ${updatedDistrict}, evidenziando le opportunità chiave e i rischi principali. Includi un indicatore di potenziale di successo su scala 1-10 con spiegazione.
    
    2. Analisi Demografica: Analizza dettagliatamente la composizione demografica di ${updatedDistrict} in relazione al business ${businessType}, con segmentazione per età, reddito, e stili di vita. Identifica i 2-3 segmenti demografici più promettenti con dati statistici a supporto.
    
    3. Analisi della Concorrenza: Identifica i 5 principali concorrenti di ${businessName} a ${updatedDistrict}, analizzando i loro punti di forza e debolezza specifici, posizionamento di mercato, e strategie di differenziazione. Fornisci raccomandazioni su come posizionarsi rispetto a ciascun concorrente.
    
    4. Analisi delle Tendenze: Fornisci dati quantitativi sulle tendenze di mercato per ${businessType} a ${updatedDistrict} con previsioni a 6-12 mesi. Identifica le tendenze emergenti che potrebbero rappresentare opportunità o minacce.
    
    5. Keywords Strategiche: Suggerisci 8-10 parole chiave specifiche per il marketing digitale locale di ${businessName} a ${updatedDistrict}, con una stima del volume di ricerca mensile e difficoltà di competizione.
    
    6. Opportunità di Mercato: Identifica 3-5 opportunità di mercato concrete e actionable per ${businessName} basate sui gap di mercato a ${updatedDistrict}, con potenziale ROI e timeframe di implementazione.
    
    7. Profilo del Consumatore: Crea 2-3 personas dettagliate dei clienti target a ${updatedDistrict} per ${businessType}, con dati demografici, comportamenti d'acquisto, motivazioni e pain points.
    
    8. Punti di Interesse Locali: Identifica attrazioni, business e punti di interesse strategici vicino a ${businessName} in ${updatedDistrict} con cui potrebbero essere sviluppate partnership strategiche.
    
    9. Raccomandazioni Strategiche: Fornisci 5-7 raccomandazioni concrete e dettagliate per ${businessName} con:
       - Descrizione della strategia
       - Motivazione basata sui dati
       - Step di implementazione
       - KPI per misurarne il successo
       - Timeline consigliata
    
    Utilizza dati concreti e specifici per supportare ogni affermazione. Sii specifico e preciso, utilizzando numeri e statistiche quando disponibili. Ogni analisi deve essere direttamente rilevante per ${businessName} a ${updatedDistrict} nel settore ${businessType}.
    
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
    
    IMPORTANTE: La risposta DEVE essere un JSON valido senza commenti o testo aggiuntivo, formattato esattamente secondo la struttura richiesta. Ogni campo deve avere contenuto significativo e specifico per ${businessName} in ${updatedDistrict}.
  `;
}
