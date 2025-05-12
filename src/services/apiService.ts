// Error handler for API requests
const handleApiError = (error: any, serviceName: string) => {
  console.error(`Error in ${serviceName} API call:`, error);
  return null;
};

export const fetchPlacesData = async (query: string, apiKey: string, location: string = 'Miami, FL') => {
  if (!apiKey || apiKey === 'demo-key') {
    console.log('Google Places API key is not set or using demo key');
    // Return more realistic mock data for demonstration
    const district = location.split(',')[0];
    return {
      results: [
        { 
          name: `${district} Fine Dining`, 
          vicinity: `${district}, Ocean Drive`, 
          rating: 4.5, 
          user_ratings_total: 236,
          types: ['restaurant', 'food'],
          price_level: 3,
          place_id: 'mock-place-1'
        },
        { 
          name: `${district} Café`, 
          vicinity: `${district}, Collins Avenue`, 
          rating: 4.2, 
          user_ratings_total: 187,
          types: ['cafe', 'coffee_shop'],
          price_level: 2,
          place_id: 'mock-place-2'
        },
        { 
          name: `The ${district} Grill`, 
          vicinity: `${district}, Washington Ave`, 
          rating: 4.7, 
          user_ratings_total: 452,
          types: ['restaurant', 'bar'],
          price_level: 3,
          place_id: 'mock-place-3'
        },
        { 
          name: `${district} Sushi Bar`, 
          vicinity: `${district}, Lincoln Road`, 
          rating: 4.3, 
          user_ratings_total: 325,
          types: ['restaurant', 'japanese'],
          price_level: 4,
          place_id: 'mock-place-4'
        },
        { 
          name: `${district} Health Café`, 
          vicinity: `${district}, Alton Road`, 
          rating: 4.4, 
          user_ratings_total: 176,
          types: ['cafe', 'health'],
          price_level: 2,
          place_id: 'mock-place-5'
        }
      ],
      status: 'OK'
    };
  }
  
  try {
    // In a real implementation, we would use the actual Google Places API
    console.log(`Fetching places data for query: "${query}" in ${location}`);
    
    // Extract district from location for more realistic names
    const district = location.split(',')[0];
    
    // For now we'll use enhanced mock data since we can't make actual API calls
    // In a real application, this would be a fetch to the Google Places API
    return {
      results: [
        { 
          name: `${district} Trattoria Italiana`, 
          vicinity: `${district}, Main Street`, 
          rating: 4.8, 
          user_ratings_total: 532,
          types: [query.toLowerCase().includes('restaurant') ? 'restaurant' : query.split(' ')[0].toLowerCase(), 'establishment'],
          price_level: 3,
          place_id: 'place-1'
        },
        { 
          name: `${district} Bistro`, 
          vicinity: `${district}, Beach Avenue`, 
          rating: 4.5, 
          user_ratings_total: 347,
          types: [query.toLowerCase().includes('restaurant') ? 'restaurant' : query.split(' ')[0].toLowerCase(), 'food'],
          price_level: 2,
          place_id: 'place-2'
        },
        { 
          name: `Café del ${district}`, 
          vicinity: `${district}, Palm Drive`, 
          rating: 4.6, 
          user_ratings_total: 421,
          types: [query.toLowerCase().includes('coffee') ? 'cafe' : query.split(' ')[0].toLowerCase(), 'establishment'],
          price_level: 3,
          place_id: 'place-3'
        },
        { 
          name: `${district} Express Dining`, 
          vicinity: `${district}, Harbor Road`, 
          rating: 4.3, 
          user_ratings_total: 289,
          types: [query.toLowerCase().includes('restaurant') ? 'restaurant' : query.split(' ')[0].toLowerCase(), 'food'],
          price_level: 2,
          place_id: 'place-4'
        },
        { 
          name: `${district} Specialty Kitchen`, 
          vicinity: `${district}, Central Avenue`, 
          rating: 4.4, 
          user_ratings_total: 312,
          types: [query.toLowerCase().includes('restaurant') ? 'restaurant' : query.split(' ')[0].toLowerCase(), 'food'],
          price_level: 3,
          place_id: 'place-5'
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
    const district = location.split(',')[0];
    return {
      businesses: [
        { name: `${district} Fine Dining`, location: { address1: `${district}, Ocean Drive` }, rating: 4.5, review_count: 236,
          reviews: [{ rating: 5, text: "Amazing food and atmosphere!" }, { rating: 4, text: "Great service, will come back!" }] },
        { name: `${district} Café`, location: { address1: `${district}, Collins Avenue` }, rating: 4.2, review_count: 187,
          reviews: [{ rating: 4, text: "Great coffee and pastries" }, { rating: 4, text: "Nice place to work from" }] },
        { name: `The ${district} Grill`, location: { address1: `${district}, Washington Ave` }, rating: 4.7, review_count: 452,
          reviews: [{ rating: 5, text: "Best steak in town!" }, { rating: 5, text: "Outstanding service and food" }] },
      ]
    };
  }
  
  try {
    // In a real implementation, we would use the actual Yelp API
    console.log(`Fetching Yelp data for: ${term} in ${location}`);
    
    // Extract district from location for more realistic names
    const district = location.split(',')[0];
    
    // For now we'll still use mock data since we can't make actual API calls
    // In a real application, this would be a fetch to the Yelp API
    return {
      businesses: [
        { name: `${district} Trattoria Italiana`, location: { address1: `${district}, Main Street` }, rating: 4.8, review_count: 532,
          reviews: [{ rating: 5, text: "Authentic Italian cuisine!" }, { rating: 5, text: "Best pasta in Miami" }] },
        { name: `${district} Bistro`, location: { address1: `${district}, Beach Avenue` }, rating: 4.5, review_count: 347,
          reviews: [{ rating: 5, text: "Cozy atmosphere and great food" }, { rating: 4, text: "Good wine selection" }] },
        { name: `Café del ${district}`, location: { address1: `${district}, Palm Drive` }, rating: 4.6, review_count: 421,
          reviews: [{ rating: 5, text: "Excellent coffee and pastries" }, { rating: 4, text: "Great place to work from" }] },
        { name: `${district} Express Dining`, location: { address1: `${district}, Harbor Road` }, rating: 4.3, review_count: 289,
          reviews: [{ rating: 4, text: "Quick service and tasty food" }, { rating: 4, text: "Good lunch spot" }] },
        { name: `${district} Specialty Kitchen`, location: { address1: `${district}, Central Avenue` }, rating: 4.4, review_count: 312,
          reviews: [{ rating: 5, text: "Unique dishes, great flavors" }, { rating: 4, text: "Creative menu options" }] },
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

// New function to combine data from Google Places and Yelp
export const fetchCombinedCompetitorData = async (businessType: string, district: string, apiKeys: any) => {
  try {
    console.log(`Fetching combined data for ${businessType} in ${district}`);
    // Get appropriate business search term
    let searchTerm = '';
    switch (businessType) {
      case 'restaurant':
        searchTerm = 'restaurants';
        break;
      case 'coffee_shop':
        searchTerm = 'coffee shops';
        break;
      case 'retail':
        searchTerm = 'retail shops';
        break;
      case 'tech':
        searchTerm = 'tech companies';
        break;
      case 'fitness':
        searchTerm = 'fitness centers';
        break;
      default:
        searchTerm = 'businesses';
    }

    // Get location data from Google Places
    const placesQuery = `${searchTerm} in ${district}, Miami`;
    const placesData = await fetchPlacesData(placesQuery, apiKeys.googlePlaces, `${district}, Miami`);
    console.log("Places data fetched:", placesData?.results ? placesData.results.length : 0);

    // Get review data from Yelp
    const yelpData = await fetchYelpData(apiKeys.yelp, searchTerm, `${district}, Miami`);
    console.log("Yelp data fetched:", yelpData?.businesses ? yelpData.businesses.length : 0);
    
    // If we have both sets of data, combine them based on similar names
    if (placesData?.results && yelpData?.businesses) {
      const combinedResults = placesData.results.map((place: any) => {
        // Try to find matching business in Yelp data by name similarity
        const yelpMatch = yelpData.businesses.find((business: any) => 
          business.name.toLowerCase().includes(place.name.toLowerCase().split(' ')[0]) || 
          place.name.toLowerCase().includes(business.name.toLowerCase().split(' ')[0])
        );
        
        // Format the business type
        const typeFromData = place.types && place.types.length > 0
          ? place.types[0].replace(/_/g, ' ')
          : searchTerm.replace(/_/g, ' ');
        
        const formattedType = typeFromData.charAt(0).toUpperCase() + typeFromData.slice(1);
        
        // Calculate sentiment based on Yelp reviews if available, otherwise estimate from rating
        let sentiments;
        if (yelpMatch && yelpMatch.reviews) {
          const positive = yelpMatch.reviews.filter((r: any) => r.rating >= 4).length;
          const neutral = yelpMatch.reviews.filter((r: any) => r.rating === 3).length;
          const negative = yelpMatch.reviews.filter((r: any) => r.rating < 3).length;
          const total = yelpMatch.reviews.length || 1;
          
          sentiments = {
            positive: Math.round((positive / total) * 100),
            neutral: Math.round((neutral / total) * 100),
            negative: Math.round((negative / total) * 100)
          };
        } else {
          // Default sentiment distribution based on rating
          if (place.rating >= 4.5) {
            sentiments = { positive: 75, neutral: 20, negative: 5 };
          } else if (place.rating >= 4.0) {
            sentiments = { positive: 65, neutral: 25, negative: 10 };
          } else if (place.rating >= 3.5) {
            sentiments = { positive: 55, neutral: 30, negative: 15 };
          } else {
            sentiments = { positive: 40, neutral: 35, negative: 25 };
          }
        }
        
        return {
          name: place.name,
          type: formattedType,
          location: place.vicinity || `${district}, Miami`,
          rating: place.rating || (yelpMatch ? yelpMatch.rating : 0),
          reviews: place.user_ratings_total || (yelpMatch ? yelpMatch.review_count : 0),
          priceLevel: place.price_level ? '$'.repeat(place.price_level) : '$$$',
          sentiments: sentiments,
          yelpMatch: yelpMatch ? true : false,
          reviewHighlight: yelpMatch && yelpMatch.reviews ? 
            yelpMatch.reviews.find((r: any) => r.rating >= 4)?.text : null
        };
      });
      
      console.log(`Combined ${combinedResults.length} results for ${district}`);
      return combinedResults;
    }
    
    // If either API call failed, return null
    return null;
  } catch (error) {
    console.error('Error combining competitor data:', error);
    return null;
  }
};
