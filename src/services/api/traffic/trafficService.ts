
import { TrafficRouteData } from './types';
import { apiLogger } from '../../logService';
import { fetchWithProxy } from '../proxyService';
import { generateMockTrafficData } from './mockTrafficData';

export const fetchTrafficData = async (
  apiKey: string,
  origin: string,
  destination: string,
  mode: string = 'driving'
): Promise<TrafficRouteData | null> => {
  const logIndex = apiLogger.logAPICall('Google Directions API', 'fetchTrafficData', 
    { origin, destination, mode, apiKey: apiKey.substring(0, 4) + '...' });
  
  if (!apiKey || apiKey === 'demo-key') {
    console.log('Google API key is not set or using demo key');
    // Generate mock data for demo
    const mockData = generateMockTrafficData(origin, destination, mode);
    apiLogger.logAPIResponse(logIndex, { 
      status: 'MOCK_DATA',
      routesCount: mockData.routes.length
    });
    return mockData;
  }
  
  try {
    console.log(`Using Google Directions API to analyze traffic from "${origin}" to "${destination}" via ${mode}`);
    
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=${mode}&departure_time=now&traffic_model=best_guess&key=${apiKey}`;
    
    // Use proxy service to avoid CORS issues
    const data = await fetchWithProxy(url);
    
    if (data && data.status === 'OK') {
      console.log(`Successfully fetched traffic data with ${data.routes.length} routes`);
      apiLogger.logAPIResponse(logIndex, { 
        status: 'SUCCESS',
        routesCount: data.routes.length
      });
      return data;
    } else {
      console.error(`Error in Google Directions API response: ${data?.status || 'Unknown error'}`);
      // Fall back to mock data
      const mockData = generateMockTrafficData(origin, destination, mode);
      apiLogger.logAPIResponse(logIndex, { 
        status: 'API_ERROR',
        error: data?.status || 'Unknown error',
        routesCount: mockData.routes.length
      });
      return mockData;
    }
  } catch (error) {
    console.error(`Error fetching traffic data:`, error);
    apiLogger.logAPIError(logIndex, error);
    
    // Fall back to mock data
    const mockData = generateMockTrafficData(origin, destination, mode);
    return mockData;
  }
};
