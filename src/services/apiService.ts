
// Error handler for API requests
const handleApiError = (error: any, serviceName: string) => {
  console.error(`Error in ${serviceName} API call:`, error);
  return null;
};

export const fetchPlacesData = async (query: string, apiKey: string, location: string = 'Miami, FL') => {
  if (!apiKey || apiKey === 'demo-key') {
    console.error('Google Places API key is not set or using demo key');
    // Return mock data for demonstration
    return {
      results: [
        { name: 'Business 1', vicinity: 'Address 1', rating: 4.5 },
        { name: 'Business 2', vicinity: 'Address 2', rating: 4.2 },
        { name: 'Business 3', vicinity: 'Address 3', rating: 4.7 },
      ],
      status: 'OK'
    };
  }
  
  try {
    // In a real implementation, we would use the actual Google Places API
    console.log(`Fetching places data for query: "${query}" in ${location}`);
    
    // For now we'll still use mock data since we can't make actual API calls
    // In a real application, this would be a fetch to the Google Places API
    return {
      results: [
        { name: 'Business 1 (API)', vicinity: 'Address 1', rating: 4.5 },
        { name: 'Business 2 (API)', vicinity: 'Address 2', rating: 4.2 },
        { name: 'Business 3 (API)', vicinity: 'Address 3', rating: 4.7 },
      ],
      status: 'OK'
    };
  } catch (error) {
    return handleApiError(error, 'Google Places');
  }
};

export const fetchCensusData = async (apiKey: string, location: string = 'Miami') => {
  if (!apiKey || apiKey === 'demo-key') {
    console.error('Census.gov API key is not set or using demo key');
    // Return mock data for demonstration
    return {
      population: 442241,
      median_age: 40.1,
      median_income: 44268,
      households: 186860
    };
  }
  
  try {
    // In a real implementation, we would use the actual Census.gov API
    console.log(`Fetching census data for: ${location}`);
    
    // For now we'll still use mock data since we can't make actual API calls
    // In a real application, this would be a fetch to the Census.gov API
    return {
      population: 442241,
      median_age: 40.1,
      median_income: 44268,
      households: 186860
    };
  } catch (error) {
    return handleApiError(error, 'Census.gov');
  }
};

export const fetchYelpData = async (apiKey: string, term: string, location: string = 'Miami, FL') => {
  if (!apiKey || apiKey === 'demo-key') {
    console.error('Yelp API key is not set or using demo key');
    // Return mock data for demonstration
    return {
      businesses: [
        { name: 'Business A', location: { address1: 'Address A' }, rating: 4.5, review_count: 236 },
        { name: 'Business B', location: { address1: 'Address B' }, rating: 4.3, review_count: 187 },
        { name: 'Business C', location: { address1: 'Address C' }, rating: 4.7, review_count: 452 },
      ]
    };
  }
  
  try {
    // In a real implementation, we would use the actual Yelp API
    console.log(`Fetching Yelp data for: ${term} in ${location}`);
    
    // For now we'll still use mock data since we can't make actual API calls
    // In a real application, this would be a fetch to the Yelp API
    return {
      businesses: [
        { name: 'Business A (API)', location: { address1: 'Address A' }, rating: 4.5, review_count: 236 },
        { name: 'Business B (API)', location: { address1: 'Address B' }, rating: 4.3, review_count: 187 },
        { name: 'Business C (API)', location: { address1: 'Address C' }, rating: 4.7, review_count: 452 },
      ]
    };
  } catch (error) {
    return handleApiError(error, 'Yelp');
  }
};

export const fetchGoogleTrendsData = async (apiKey: string, keywords: string[], geo: string = 'US-FL-528') => {
  if (!apiKey || apiKey === 'demo-key') {
    console.error('Google Trends API key is not set or using demo key');
    // Return mock data for demonstration
    return {
      trends: keywords.map((keyword, index) => ({
        keyword,
        value: 100 - (index * 15), // Just a mock decreasing value
        formattedTime: 'Last 12 months'
      }))
    };
  }
  
  if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
    console.error('Invalid keywords parameter for Google Trends');
    return null;
  }
  
  try {
    // In a real implementation, we would use the actual Google Trends API
    console.log(`Fetching Google Trends data for keywords: ${keywords.join(', ')} in ${geo}`);
    
    // For now we'll still use mock data since we can't make actual API calls
    // In a real application, this would be a fetch to the Google Trends API
    return {
      trends: keywords.map((keyword, index) => ({
        keyword,
        value: 100 - (index * 15), // Just a mock decreasing value
        formattedTime: 'Last 12 months'
      }))
    };
  } catch (error) {
    return handleApiError(error, 'Google Trends');
  }
};

export const fetchOpenAIAnalysis = async (apiKey: string, prompt: string) => {
  if (!apiKey || apiKey === 'demo-key') {
    console.error('OpenAI API key is not set or using demo key');
    // Return mock data for demonstration
    return {
      choices: [
        {
          message: {
            content: `Analisi per: ${prompt}\n\nIn base ai dati raccolti, il mercato a Miami mostra forti tendenze di crescita in questo settore. Le aree con maggiore potenziale sono Wynwood e Brickell. Si consiglia di considerare le tendenze demografiche e la concorrenza locale prima di procedere con nuove iniziative commerciali.`
          }
        }
      ]
    };
  }
  
  try {
    console.log(`Sending prompt to OpenAI: "${prompt}"`);
    
    // For now we'll still use mock data since we can't make actual API calls
    // In a real application, this would be a fetch to the OpenAI API
    return {
      choices: [
        {
          message: {
            content: `Analisi per: ${prompt}\n\nIn base ai dati raccolti, il mercato a Miami mostra forti tendenze di crescita in questo settore. Le aree con maggiore potenziale sono Wynwood e Brickell. Si consiglia di considerare le tendenze demografiche e la concorrenza locale prima di procedere con nuove iniziative commerciali.`
          }
        }
      ]
    };
  } catch (error) {
    return handleApiError(error, 'OpenAI');
  }
};
