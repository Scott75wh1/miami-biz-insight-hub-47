
import { handleApiError } from './handleError';
import { fetchPlacesData } from './placesService';
import { fetchYelpData } from './yelpService';

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

// Combined data from Google Places and Yelp
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
    return handleApiError(error, 'Competitor Data');
  }
};
