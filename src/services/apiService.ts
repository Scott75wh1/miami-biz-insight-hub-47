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
    
    // Select different businesses based on district and query
    const businessType = query.toLowerCase().includes('restaurant') ? 'restaurant' : 
                         query.toLowerCase().includes('coffee') ? 'coffee' : 
                         query.toLowerCase().includes('retail') ? 'retail' : 'business';
    
    // Generate different businesses for each district
    const districtBusinesses = {
      'Downtown': [
        { 
          name: `Downtown Prime Steakhouse`, 
          vicinity: `Downtown, Biscayne Blvd`, 
          rating: 4.8, 
          user_ratings_total: 432,
          types: ['restaurant', 'food'],
          price_level: 4,
          place_id: 'mock-downtown-1'
        },
        { 
          name: `Café Miami Centro`, 
          vicinity: `Downtown, Flagler St`, 
          rating: 4.3, 
          user_ratings_total: 287,
          types: ['cafe', 'coffee_shop'],
          price_level: 2,
          place_id: 'mock-downtown-2'
        },
        { 
          name: `Urban Foodie`, 
          vicinity: `Downtown, NE 2nd Ave`, 
          rating: 4.5, 
          user_ratings_total: 312,
          types: ['restaurant', 'bar'],
          price_level: 3,
          place_id: 'mock-downtown-3'
        },
        { 
          name: `Downtown Tech Hub`, 
          vicinity: `Downtown, SE 1st St`, 
          rating: 4.0, 
          user_ratings_total: 165,
          types: ['tech', 'business_center'],
          price_level: 3,
          place_id: 'mock-downtown-4'
        },
        { 
          name: `City Fitness Center`, 
          vicinity: `Downtown, Brickell Ave`, 
          rating: 4.2, 
          user_ratings_total: 198,
          types: ['gym', 'fitness'],
          price_level: 3,
          place_id: 'mock-downtown-5'
        }
      ],
      'Brickell': [
        { 
          name: `Brickell Haute Cuisine`, 
          vicinity: `Brickell, SE 8th St`, 
          rating: 4.9, 
          user_ratings_total: 512,
          types: ['restaurant', 'fine_dining'],
          price_level: 4,
          place_id: 'mock-brickell-1'
        },
        { 
          name: `Financial District Coffee`, 
          vicinity: `Brickell, SW 7th St`, 
          rating: 4.6, 
          user_ratings_total: 345,
          types: ['cafe', 'coffee_shop'],
          price_level: 3,
          place_id: 'mock-brickell-2'
        },
        { 
          name: `Brickell Wine Bar`, 
          vicinity: `Brickell, Brickell Ave`, 
          rating: 4.7, 
          user_ratings_total: 387,
          types: ['restaurant', 'bar'],
          price_level: 4,
          place_id: 'mock-brickell-3'
        },
        { 
          name: `Luxury Retail Brickell`, 
          vicinity: `Brickell, SE 9th St`, 
          rating: 4.5, 
          user_ratings_total: 224,
          types: ['retail', 'shopping'],
          price_level: 4,
          place_id: 'mock-brickell-4'
        },
        { 
          name: `Brickell Executive Fitness`, 
          vicinity: `Brickell, SW 10th St`, 
          rating: 4.4, 
          user_ratings_total: 276,
          types: ['gym', 'fitness'],
          price_level: 4,
          place_id: 'mock-brickell-5'
        }
      ],
      'Wynwood': [
        { 
          name: `Wynwood Artistic Bistro`, 
          vicinity: `Wynwood, NW 2nd Ave`, 
          rating: 4.7, 
          user_ratings_total: 478,
          types: ['restaurant', 'bistro'],
          price_level: 3,
          place_id: 'mock-wynwood-1'
        },
        { 
          name: `Graffiti Coffee Co.`, 
          vicinity: `Wynwood, NW 24th St`, 
          rating: 4.8, 
          user_ratings_total: 512,
          types: ['cafe', 'coffee_shop'],
          price_level: 2,
          place_id: 'mock-wynwood-2'
        },
        { 
          name: `Art District Eatery`, 
          vicinity: `Wynwood, NW 26th St`, 
          rating: 4.5, 
          user_ratings_total: 348,
          types: ['restaurant', 'food'],
          price_level: 3,
          place_id: 'mock-wynwood-3'
        },
        { 
          name: `Creative Tech Space`, 
          vicinity: `Wynwood, NW 23rd St`, 
          rating: 4.3, 
          user_ratings_total: 187,
          types: ['tech', 'coworking'],
          price_level: 2,
          place_id: 'mock-wynwood-4'
        },
        { 
          name: `Wynwood Boutique Gallery`, 
          vicinity: `Wynwood, NW 25th St`, 
          rating: 4.6, 
          user_ratings_total: 267,
          types: ['retail', 'art'],
          price_level: 3,
          place_id: 'mock-wynwood-5'
        }
      ],
      'Little Havana': [
        { 
          name: `Calle Ocho Cuban Restaurant`, 
          vicinity: `Little Havana, SW 8th St`, 
          rating: 4.8, 
          user_ratings_total: 624,
          types: ['restaurant', 'cuban'],
          price_level: 2,
          place_id: 'mock-littlehavana-1'
        },
        { 
          name: `Café Cubano Auténtico`, 
          vicinity: `Little Havana, SW 12th Ave`, 
          rating: 4.7, 
          user_ratings_total: 412,
          types: ['cafe', 'coffee_shop'],
          price_level: 1,
          place_id: 'mock-littlehavana-2'
        },
        { 
          name: `Havana Nights Lounge`, 
          vicinity: `Little Havana, SW 9th St`, 
          rating: 4.6, 
          user_ratings_total: 345,
          types: ['restaurant', 'bar'],
          price_level: 2,
          place_id: 'mock-littlehavana-3'
        },
        { 
          name: `Traditional Cigar Shop`, 
          vicinity: `Little Havana, SW 10th Ave`, 
          rating: 4.9, 
          user_ratings_total: 298,
          types: ['retail', 'specialty'],
          price_level: 2,
          place_id: 'mock-littlehavana-4'
        },
        { 
          name: `Little Havana Dance Studio`, 
          vicinity: `Little Havana, SW 7th St`, 
          rating: 4.5, 
          user_ratings_total: 187,
          types: ['fitness', 'dance'],
          price_level: 2,
          place_id: 'mock-littlehavana-5'
        }
      ],
      'Miami Beach': [
        { 
          name: `Ocean Drive Seafood`, 
          vicinity: `Miami Beach, Ocean Drive`, 
          rating: 4.6, 
          user_ratings_total: 578,
          types: ['restaurant', 'seafood'],
          price_level: 4,
          place_id: 'mock-miamibeach-1'
        },
        { 
          name: `South Beach Café`, 
          vicinity: `Miami Beach, Collins Ave`, 
          rating: 4.4, 
          user_ratings_total: 423,
          types: ['cafe', 'coffee_shop'],
          price_level: 3,
          place_id: 'mock-miamibeach-2'
        },
        { 
          name: `Beachside Grill & Bar`, 
          vicinity: `Miami Beach, Ocean Blvd`, 
          rating: 4.7, 
          user_ratings_total: 612,
          types: ['restaurant', 'bar'],
          price_level: 3,
          place_id: 'mock-miamibeach-3'
        },
        { 
          name: `Designer Beach Boutique`, 
          vicinity: `Miami Beach, Lincoln Road`, 
          rating: 4.5, 
          user_ratings_total: 347,
          types: ['retail', 'clothing'],
          price_level: 4,
          place_id: 'mock-miamibeach-4'
        },
        { 
          name: `Beach Body Fitness`, 
          vicinity: `Miami Beach, Washington Ave`, 
          rating: 4.3, 
          user_ratings_total: 289,
          types: ['gym', 'fitness'],
          price_level: 3,
          place_id: 'mock-miamibeach-5'
        }
      ]
    };
    
    // Find the district in our mock data or default to Miami Beach
    const districtData = districtBusinesses[district] || districtBusinesses['Miami Beach'];
    
    // Filter based on business type if specified
    let filteredData = districtData;
    if (businessType === 'restaurant') {
      filteredData = districtData.filter(business => 
        business.types.includes('restaurant') || 
        business.types.includes('food') || 
        business.types.includes('bar')
      );
    } else if (businessType === 'coffee') {
      filteredData = districtData.filter(business => 
        business.types.includes('cafe') || 
        business.types.includes('coffee_shop')
      );
    } else if (businessType === 'retail') {
      filteredData = districtData.filter(business => 
        business.types.includes('retail') || 
        business.types.includes('shopping') || 
        business.types.includes('clothing')
      );
    } else if (businessType === 'tech') {
      filteredData = districtData.filter(business => 
        business.types.includes('tech') || 
        business.types.includes('business_center') || 
        business.types.includes('coworking')
      );
    } else if (businessType === 'fitness') {
      filteredData = districtData.filter(business => 
        business.types.includes('gym') || 
        business.types.includes('fitness') || 
        business.types.includes('dance')
      );
    }
    
    // If no matches after filtering, return all district data
    if (filteredData.length === 0) {
      filteredData = districtData;
    }
    
    return {
      results: filteredData,
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
    console.log('Yelp API key is not set or using demo key');
    // Return mock data for demonstration
    const district = location.split(',')[0];
    
    // Generate different reviews for each district
    const districtReviews = {
      'Downtown': [
        { name: `Downtown Prime Steakhouse`, location: { address1: `Downtown, Biscayne Blvd` }, rating: 4.8, review_count: 432,
          reviews: [
            { rating: 5, text: "Miglior bistecca che abbia mai mangiato a Miami. Servizio impeccabile." },
            { rating: 4, text: "Ottimo ambiente e cibo delizioso, un po' costoso ma ne vale la pena." }
          ]
        },
        { name: `Café Miami Centro`, location: { address1: `Downtown, Flagler St` }, rating: 4.3, review_count: 287,
          reviews: [
            { rating: 4, text: "Ottimo caffè e pasticceria fresca. Posto ideale per lavorare." },
            { rating: 3, text: "Buon caffè ma a volte troppo affollato." }
          ]
        },
        { name: `Urban Foodie`, location: { address1: `Downtown, NE 2nd Ave` }, rating: 4.5, review_count: 312,
          reviews: [
            { rating: 5, text: "Menu creativo e ottimi cocktail. L'atmosfera è fantastica." },
            { rating: 4, text: "Porzioni abbondanti e prezzi ragionevoli per la zona." }
          ]
        }
      ],
      'Brickell': [
        { name: `Brickell Haute Cuisine`, location: { address1: `Brickell, SE 8th St` }, rating: 4.9, review_count: 512,
          reviews: [
            { rating: 5, text: "Un'esperienza gastronomica straordinaria. Chef di classe mondiale." },
            { rating: 5, text: "Ogni piatto è un'opera d'arte. Servizio impeccabile." }
          ]
        },
        { name: `Financial District Coffee`, location: { address1: `Brickell, SW 7th St` }, rating: 4.6, review_count: 345,
          reviews: [
            { rating: 5, text: "Il miglior caffè specialty di Miami. Ambiente perfetto per incontri d'affari." },
            { rating: 4, text: "Ottimi dolci fatti in casa e caffè di qualità." }
          ]
        },
        { name: `Brickell Wine Bar`, location: { address1: `Brickell, Brickell Ave` }, rating: 4.7, review_count: 387,
          reviews: [
            { rating: 5, text: "Selezione di vini impressionante e tapas deliziose." },
            { rating: 4, text: "Atmosfera sofisticata e personale molto competente." }
          ]
        }
      ],
      'Wynwood': [
        { name: `Wynwood Artistic Bistro`, location: { address1: `Wynwood, NW 2nd Ave` }, rating: 4.7, review_count: 478,
          reviews: [
            { rating: 5, text: "Fusion di sapori incredibile in un ambiente artistico unico." },
            { rating: 4, text: "Ottima posizione tra le gallerie, cibo delizioso e presentazione creativa." }
          ]
        },
        { name: `Graffiti Coffee Co.`, location: { address1: `Wynwood, NW 24th St` }, rating: 4.8, review_count: 512,
          reviews: [
            { rating: 5, text: "Il caffè più cool di Miami! Arredamento incredibile e miscele uniche." },
            { rating: 5, text: "Baristi esperti e atmosfera artistica. Da non perdere a Wynwood." }
          ]
        },
        { name: `Art District Eatery`, location: { address1: `Wynwood, NW 26th St` }, rating: 4.5, review_count: 348,
          reviews: [
            { rating: 5, text: "Menu innovativo che cambia spesso. Ogni visita è un'esperienza nuova." },
            { rating: 4, text: "Ottimo per pranzo durante la visita delle gallerie." }
          ]
        }
      ],
      'Little Havana': [
        { name: `Calle Ocho Cuban Restaurant`, location: { address1: `Little Havana, SW 8th St` }, rating: 4.8, review_count: 624,
          reviews: [
            { rating: 5, text: "L'autentica cucina cubana a Miami! Ropa vieja y mojo da sogno." },
            { rating: 5, text: "Esperienza culturale completa con musica dal vivo y cibo straordinario." }
          ]
        },
        { name: `Café Cubano Auténtico`, location: { address1: `Little Havana, SW 12th Ave` }, rating: 4.7, review_count: 412,
          reviews: [
            { rating: 5, text: "Il miglior café cubano della città, proprio come a L'Avana." },
            { rating: 4, text: "Atmosfera tradizionale y pasticceria casalinga deliziosa." }
          ]
        },
        { name: `Havana Nights Lounge`, location: { address1: `Little Havana, SW 9th St` }, rating: 4.6, review_count: 345,
          reviews: [
            { rating: 5, text: "Ottimi mojitos y musica latina dal vivo. Serata perfetta!" },
            { rating: 4, text: "Menu autentico y ottimi cocktail in un'atmosfera vibrante." }
          ]
        }
      ],
      'Miami Beach': [
        { name: `Ocean Drive Seafood`, location: { address1: `Miami Beach, Ocean Drive` }, rating: 4.6, review_count: 578,
          reviews: [
            { rating: 5, text: "Pesce freschissimo e vista mozzafiato sull'oceano." },
            { rating: 4, text: "Ottima posizione, cibo delizioso anche se un po' turistico." }
          ]
        },
        { name: `South Beach Café`, location: { address1: `Miami Beach, Collins Ave` }, rating: 4.4, review_count: 423,
          reviews: [
            { rating: 4, text: "Ottimo posto per colazione e people watching." },
            { rating: 3, text: "Buon caffè ma servizio a volte lento nelle ore di punta." }
          ]
        },
        { name: `Beachside Grill & Bar`, location: { address1: `Miami Beach, Ocean Blvd` }, rating: 4.7, review_count: 612,
          reviews: [
            { rating: 5, text: "Cocktail fantastici e ottimo menu per cena con vista sulla spiaggia." },
            { rating: 4, text: "Atmosfera vivace e cibo delizioso. Perfetto per una serata a Miami Beach." }
          ]
        }
      ]
    };
    
    // Find the district in our mock data or default to Miami Beach
    const districtData = districtReviews[district] || districtReviews['Miami Beach'];
    
    return {
      businesses: districtData
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
        { name: `${district} Fine Dining`, location: { address1: `${district}, Ocean Drive` }, rating: 4.5, review_count: 236,
          reviews: [{ rating: 5, text: "Amazing food and atmosphere!" }, { rating: 4, text: "Great service, will come back!" }] },
        { name: `${district} Café`, location: { address1: `${district}, Collins Avenue` }, rating: 4.2, review_count: 187,
          reviews: [{ rating: 4, text: "Great coffee and pastries" }, { rating: 4, text: "Nice place to work from" }] },
        { name: `The ${district} Grill`, location: { address1: `${district}, Washington Ave` }, rating: 4.7, review_count: 452,
          reviews: [{ rating: 5, text: "Best steak in town!" }, { rating: 5, text: "Outstanding service and food" }] },
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
        let reviewHighlight = null;
        
        if (yelpMatch && yelpMatch.reviews) {
          const reviews = yelpMatch.reviews;
          const totalReviews = reviews.length;
          
          if (totalReviews > 0) {
            const positiveReviews = reviews.filter((r: any) => r.rating >= 4).length;
            const neutralReviews = reviews.filter((r: any) => r.rating === 3).length;
            const negativeReviews = reviews.filter((r: any) => r.rating <= 2).length;
            
            sentiments = {
              positive: Math.round((positiveReviews / totalReviews) * 100),
              neutral: Math.round((neutralReviews / totalReviews) * 100),
              negative: Math.round((negativeReviews / totalReviews) * 100)
            };
            
            // Make sure they sum to 100%
            const sum = sentiments.positive + sentiments.neutral + sentiments.negative;
            if (sum !== 100) {
              const diff = 100 - sum;
              sentiments.positive += diff; // Adjust positive to make sum 100%
            }
            
            // Get a review highlight from positive reviews if available
            const positiveReview = reviews.find((r: any) => r.rating >= 4);
            reviewHighlight = positiveReview ? positiveReview.text : null;
          } else {
            // Default sentiment based on overall rating
            sentiments = getSentimentFromRating(place.rating);
          }
        } else {
          // Default sentiment distribution based on rating
          sentiments = getSentimentFromRating(place.rating);
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
          reviewHighlight: reviewHighlight
        };
      });
      
      console.log(`Combined ${combinedResults.length} results for ${district} (${businessType})`);
      return combinedResults;
    }
    
    // If either API call failed, return null
    return null;
  } catch (error) {
    console.error('Error combining competitor data:', error);
    return null;
  }
};

// Helper function for sentiment calculation
function getSentimentFromRating(rating: number) {
  if (rating >= 4.5) {
    return { positive: 75, neutral: 20, negative: 5 };
  } else if (rating >= 4.0) {
    return { positive: 65, neutral: 25, negative: 10 };
  } else if (rating >= 3.5) {
    return { positive: 55, neutral: 30, negative: 15 };
  } else if (rating >= 3.0) {
    return { positive: 45, neutral: 35, negative: 20 };
  } else {
    return { positive: 30, neutral: 30, negative: 40 };
  }
}
