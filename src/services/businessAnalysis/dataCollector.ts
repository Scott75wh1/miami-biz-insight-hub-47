
import { BusinessInfo } from './types';
import { fetchPlacesData, fetchYelpData, fetchGoogleTrendsData, fetchCensusData } from '@/services/apiService';
import { identifyDistrict } from '@/utils/locationDetector';

export async function collectBusinessData(
  businessInfo: BusinessInfo,
  apiKeys: Record<string, string>
): Promise<{
  updatedDistrict: string;
  placesResult: any;
  yelpResult: any;
  censusResult: any;
  trendsResult: any;
}> {
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
  
  return {
    updatedDistrict,
    placesResult,
    yelpResult,
    censusResult,
    trendsResult
  };
}
