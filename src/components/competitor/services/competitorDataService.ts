
import { BusinessType } from '@/components/BusinessTypeSelector';
import { fetchCombinedCompetitorData } from '@/services/apiService';
import { Competitor } from '../types';
import { getDefaultCompetitors } from '../utils/defaultCompetitorsUtil';
import { useApiKeys } from '@/hooks/useApiKeys';

export const getCompetitorsByDistrict = async (
  district: string, 
  businessType: BusinessType | string,
  apiKeys: ReturnType<typeof useApiKeys>['apiKeys'],
  cuisineType?: string
): Promise<Competitor[]> => {
  console.log(`Fetching competitors for ${district}, business type: ${businessType}`);

  try {
    // First try to get real competitor data from the APIs
    const data = await fetchCombinedCompetitorData(
      businessType as string, 
      district, 
      apiKeys,
      cuisineType
    );
    
    // Check if we have valid data with businesses
    const hasBusinesses = data && 'businesses' in data && Array.isArray(data.businesses);
    
    if (hasBusinesses && data.businesses.length > 0) {
      console.log(`Returning ${data.businesses.length} real competitors for ${district}`);
      
      // Transform API response to match Competitor interface
      return data.businesses.map((business: any) => ({
        id: `${business.name.replace(/\s+/g, '-').toLowerCase()}-${Math.floor(Math.random() * 1000)}`,
        name: business.name,
        type: business.type || 'Business',
        location: business.location || district,
        rating: business.rating || 0,
        reviewCount: business.reviews || 0,
        district: district,
        priceLevel: business.priceLevel || '$$',
        strengths: [],
        sentiments: business.sentiments || { positive: 60, neutral: 30, negative: 10 },
        reviewHighlight: business.reviewHighlight || null
      }));
    }
    
    // If no real data, return default competitors
    console.log(`No competitor data from API, using defaults for ${district}`);
    return getDefaultCompetitors(district, businessType as BusinessType);
    
  } catch (error) {
    console.error('Error fetching competitors:', error);
    
    // Fallback to default data
    return getDefaultCompetitors(district, businessType as BusinessType);
  }
};

// Added this function to fix the missing loadCompetitorData reference in useCompetitorData.ts
export const loadCompetitorData = async (
  businessType: BusinessType | string,
  district: string,
  apiKeys: ReturnType<typeof useApiKeys>['apiKeys'],
  cuisineType?: string
): Promise<Competitor[]> => {
  return getCompetitorsByDistrict(district, businessType as BusinessType, apiKeys, cuisineType);
};
