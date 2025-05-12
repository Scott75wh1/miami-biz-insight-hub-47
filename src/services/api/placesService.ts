
import { handleApiError } from './handleError';

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
