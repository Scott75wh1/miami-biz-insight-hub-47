
import { analyzeCompetitorReviews } from '@/services/api/openai';

export async function analyzeCompetitors(
  apiKey: string,
  businesses: any[],
  businessType: string,
  district: string
) {
  return await analyzeCompetitorReviews(
    apiKey,
    businesses || [],
    businessType,
    district
  );
}
