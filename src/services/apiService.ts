
// Error handler for API requests
const handleApiError = (error: any, serviceName: string) => {
  console.error(`Error in ${serviceName} API call:`, error);
  return null;
};

export const fetchPlacesData = async (query: string, apiKey: string, location: string = 'Miami, FL') => {
  if (!apiKey || apiKey === 'demo-key') {
    console.log('Google Places API key is not set or using demo key');
    // Return more realistic mock data for demonstration
    return {
      results: [
        { 
          name: 'Pasta e Vino', 
          vicinity: `${location.split(',')[0]}, Ocean Drive`, 
          rating: 4.5, 
          user_ratings_total: 236,
          types: ['restaurant', 'food'],
          price_level: 3
        },
        { 
          name: 'El Cafecito', 
          vicinity: `${location.split(',')[0]}, Collins Avenue`, 
          rating: 4.2, 
          user_ratings_total: 187,
          types: ['cafe', 'coffee_shop'],
          price_level: 2
        },
        { 
          name: 'The Local Grill', 
          vicinity: `${location.split(',')[0]}, Washington Ave`, 
          rating: 4.7, 
          user_ratings_total: 452,
          types: ['restaurant', 'bar'],
          price_level: 3
        },
        { 
          name: 'Sushi Deluxe', 
          vicinity: `${location.split(',')[0]}, Lincoln Road`, 
          rating: 4.3, 
          user_ratings_total: 325,
          types: ['restaurant', 'japanese'],
          price_level: 4
        },
        { 
          name: 'Fresh Fitness Cafe', 
          vicinity: `${location.split(',')[0]}, Alton Road`, 
          rating: 4.4, 
          user_ratings_total: 176,
          types: ['cafe', 'health'],
          price_level: 2
        }
      ],
      status: 'OK'
    };
  }
  
  try {
    // In a real implementation, we would use the actual Google Places API
    console.log(`Fetching places data for query: "${query}" in ${location}`);
    
    // For now we'll use enhanced mock data since we can't make actual API calls
    // In a real application, this would be a fetch to the Google Places API
    return {
      results: [
        { 
          name: `Top ${query.split(' ')[0]} of ${location.split(',')[0]}`, 
          vicinity: `${location.split(',')[0]}, Main Street`, 
          rating: 4.8, 
          user_ratings_total: 532,
          types: [query.split(' ')[0].toLowerCase(), 'establishment'],
          price_level: 3
        },
        { 
          name: `${location.split(',')[0]} ${query.split(' ')[0]} Corner`, 
          vicinity: `${location.split(',')[0]}, Beach Avenue`, 
          rating: 4.5, 
          user_ratings_total: 347,
          types: [query.split(' ')[0].toLowerCase(), 'food'],
          price_level: 2
        },
        { 
          name: `${query.split(' ')[0]} Paradise`, 
          vicinity: `${location.split(',')[0]}, Palm Drive`, 
          rating: 4.6, 
          user_ratings_total: 421,
          types: [query.split(' ')[0].toLowerCase(), 'establishment'],
          price_level: 3
        },
        { 
          name: `${location.split(',')[0]} ${query.split(' ')[0]} Express`, 
          vicinity: `${location.split(',')[0]}, Harbor Road`, 
          rating: 4.3, 
          user_ratings_total: 289,
          types: [query.split(' ')[0].toLowerCase(), 'service'],
          price_level: 2
        },
        { 
          name: `${query.split(' ')[0]} & More`, 
          vicinity: `${location.split(',')[0]}, Central Avenue`, 
          rating: 4.4, 
          user_ratings_total: 312,
          types: [query.split(' ')[0].toLowerCase(), 'store'],
          price_level: 3
        }
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
