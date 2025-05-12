
import { useApiKeys } from '@/hooks/useApiKeys';

// Error handler for API requests
const handleApiError = (error: any, serviceName: string) => {
  console.error(`Error in ${serviceName} API call:`, error);
  return null;
};

export const fetchPlacesData = async (query: string, location: string = 'Miami, FL') => {
  const { apiKeys } = useApiKeys();
  if (!apiKeys.googlePlaces) {
    console.error('Google Places API key is not set');
    return null;
  }
  
  try {
    // This would be a real API call to Google Places
    // For demonstration purposes, we're using a mock implementation
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&key=${apiKeys.googlePlaces}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch from Google Places API');
    
    return await response.json();
  } catch (error) {
    return handleApiError(error, 'Google Places');
  }
};

export const fetchCensusData = async (location: string = 'Miami') => {
  const { apiKeys } = useApiKeys();
  if (!apiKeys.censusGov) {
    console.error('Census.gov API key is not set');
    return null;
  }
  
  try {
    // This would be a real API call to Census.gov
    // For demonstration purposes, we're using a mock implementation
    const url = `https://api.census.gov/data/2019/pep/population?key=${apiKeys.censusGov}&get=POP,NAME&for=place:*&in=state:12&NAME=${encodeURIComponent(location)}*`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch from Census.gov API');
    
    return await response.json();
  } catch (error) {
    return handleApiError(error, 'Census.gov');
  }
};

export const fetchYelpData = async (term: string, location: string = 'Miami, FL') => {
  const { apiKeys } = useApiKeys();
  if (!apiKeys.yelp) {
    console.error('Yelp API key is not set');
    return null;
  }
  
  try {
    // This would be a real API call to Yelp
    // Note: The Yelp API requires CORS headers, so in a real implementation
    // this would need to be proxied through a backend server
    const url = `https://api.yelp.com/v3/businesses/search?term=${encodeURIComponent(term)}&location=${encodeURIComponent(location)}`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKeys.yelp}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch from Yelp API');
    
    return await response.json();
  } catch (error) {
    return handleApiError(error, 'Yelp');
  }
};

export const fetchGoogleTrendsData = async (keywords: string[], geo: string = 'US-FL-528') => {
  const { apiKeys } = useApiKeys();
  if (!apiKeys.googleTrends) {
    console.error('Google Trends API key is not set');
    return null;
  }
  
  try {
    // This would be a real API call to Google Trends
    // Note: Google Trends doesn't have an official API, so this is a placeholder
    const keywordsParam = keywords.join(',');
    const url = `https://trends.google.com/trends/api/explore?hl=en-US&tz=-120&req={"comparisonItem":[{"keyword":"${keywordsParam}","geo":"${geo}","time":"today 12-m"}]}&tz=120&key=${apiKeys.googleTrends}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch from Google Trends API');
    
    return await response.json();
  } catch (error) {
    return handleApiError(error, 'Google Trends');
  }
};

export const fetchOpenAIAnalysis = async (prompt: string) => {
  const { apiKeys } = useApiKeys();
  if (!apiKeys.openAI) {
    console.error('OpenAI API key is not set');
    return null;
  }
  
  try {
    const url = 'https://api.openai.com/v1/chat/completions';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKeys.openAI}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant specialized in business and market analysis for Miami. Provide concise, data-driven responses.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
      }),
    });
    
    if (!response.ok) throw new Error('Failed to fetch from OpenAI API');
    
    return await response.json();
  } catch (error) {
    return handleApiError(error, 'OpenAI');
  }
};
