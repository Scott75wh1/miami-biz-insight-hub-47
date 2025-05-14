
import { analyzeCompetitorReviews } from '@/services/api/openai';

export async function analyzeCompetitors(
  apiKey: string,
  businesses: any[],
  businessType: string,
  district: string
) {
  console.log(`Analyzing ${businesses.length} competitors in ${district} for ${businessType}`);
  
  // Controlla se il distretto è "North Miami" e prendi in considerazione nomi alternativi
  const normalizedDistrict = district.toLowerCase().includes('north miami') ? 'North Miami' : district;
  
  // Verifica se abbiamo dati validi
  if (!businesses || businesses.length === 0) {
    console.log(`No competitor data found for ${normalizedDistrict}, using default data`);
  }
  
  return await analyzeCompetitorReviews(
    apiKey,
    businesses || [],
    businessType,
    normalizedDistrict
  );
}
