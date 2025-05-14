
import { BusinessType } from "@/components/BusinessTypeSelector";
import { Competitor } from "../types";

// Mock data for competitors
const mockCompetitors = {
  "Downtown": {
    "restaurant": [
      {
        id: "downtown-restaurant-1",
        name: "Downtown Bistro",
        type: "Restaurant",
        location: "123 Main St, Downtown",
        priceLevel: "$$",
        rating: 4.5,
        reviews: 120,
        sentiments: { positive: 75, neutral: 15, negative: 10 },
        strengths: ["Great food", "Nice ambiance"],
        reviewHighlight: "The pasta was amazing!",
      },
      {
        id: "downtown-restaurant-2",
        name: "Pizza Place",
        type: "Restaurant",
        location: "456 Elm St, Downtown",
        priceLevel: "$",
        rating: 4.2,
        reviews: 150,
        sentiments: { positive: 70, neutral: 20, negative: 10 },
        strengths: ["Affordable prices", "Quick service"],
        reviewHighlight: "Best pizza in town!",
      },
    ],
    "coffee_shop": [
      {
        id: "downtown-coffee-1",
        name: "Coffee Corner",
        type: "Coffee Shop",
        location: "789 Oak St, Downtown",
        priceLevel: "$",
        rating: 4.6,
        reviews: 180,
        sentiments: { positive: 80, neutral: 15, negative: 5 },
        strengths: ["Excellent coffee", "Cozy atmosphere"],
        reviewHighlight: "Perfect place to start the day!",
      },
    ],
  },
  "Brickell": {
    "restaurant": [
      {
        id: "brickell-restaurant-1",
        name: "Brickell Grill",
        type: "Restaurant",
        location: "987 Pine St, Brickell",
        priceLevel: "$$$",
        rating: 4.7,
        reviews: 200,
        sentiments: { positive: 85, neutral: 10, negative: 5 },
        strengths: ["High-end dining", "Great service"],
        reviewHighlight: "Exceptional dining experience!",
      },
      {
        id: "brickell-restaurant-2",
        name: "Sushi Bar",
        type: "Restaurant",
        location: "654 Maple St, Brickell",
        priceLevel: "$$",
        rating: 4.3,
        reviews: 130,
        sentiments: { positive: 72, neutral: 18, negative: 10 },
        strengths: ["Fresh sushi", "Modern decor"],
        reviewHighlight: "The sushi was incredibly fresh!",
      },
    ],
    "coffee_shop": [
      {
        id: "brickell-coffee-1",
        name: "Luxury Coffee",
        type: "Coffee Shop",
        location: "321 Cedar St, Brickell",
        priceLevel: "$$",
        rating: 4.8,
        reviews: 220,
        sentiments: { positive: 90, neutral: 5, negative: 5 },
        strengths: ["Premium coffee", "Stylish setting"],
        reviewHighlight: "Best coffee in Brickell!",
      },
    ],
  },
  "Wynwood": {
    "restaurant": [
      {
        id: "wynwood-restaurant-1",
        name: "Wynwood Eats",
        type: "Restaurant",
        location: "543 Oak St, Wynwood",
        priceLevel: "$$",
        rating: 4.4,
        reviews: 160,
        sentiments: { positive: 73, neutral: 17, negative: 10 },
        strengths: ["Creative menu", "Artistic vibe"],
        reviewHighlight: "The food was so creative and tasty!",
      },
      {
        id: "wynwood-restaurant-2",
        name: "Burger Joint",
        type: "Restaurant",
        location: "876 Pine St, Wynwood",
        priceLevel: "$",
        rating: 4.1,
        reviews: 140,
        sentiments: { positive: 68, neutral: 22, negative: 10 },
        strengths: ["Delicious burgers", "Casual atmosphere"],
        reviewHighlight: "Great burgers at a great price!",
      },
    ],
    "coffee_shop": [
      {
        id: "wynwood-coffee-1",
        name: "Artisan Coffee",
        type: "Coffee Shop",
        location: "210 Maple St, Wynwood",
        priceLevel: "$$",
        rating: 4.7,
        reviews: 190,
        sentiments: { positive: 82, neutral: 13, negative: 5 },
        strengths: ["Unique coffee blends", "Cool decor"],
        reviewHighlight: "Love the unique coffee blends!",
      },
    ],
  },
  "Little Havana": {
    "restaurant": [
      {
        id: "little-havana-restaurant-1",
        name: "Havana Grill",
        type: "Restaurant",
        location: "321 Elm St, Little Havana",
        priceLevel: "$$",
        rating: 4.6,
        reviews: 170,
        sentiments: { positive: 78, neutral: 12, negative: 10 },
        strengths: ["Authentic Cuban food", "Live music"],
        reviewHighlight: "The best Cuban food I've ever had!",
      },
      {
        id: "little-havana-restaurant-2",
        name: "Cuban Cafe",
        type: "Restaurant",
        location: "654 Oak St, Little Havana",
        priceLevel: "$",
        rating: 4.3,
        reviews: 155,
        sentiments: { positive: 71, neutral: 19, negative: 10 },
        strengths: ["Great coffee", "Friendly staff"],
        reviewHighlight: "The coffee is amazing!",
      },
    ],
    "coffee_shop": [
      {
        id: "little-havana-coffee-1",
        name: "Cuban Coffee Shop",
        type: "Coffee Shop",
        location: "987 Maple St, Little Havana",
        priceLevel: "$",
        rating: 4.5,
        reviews: 185,
        sentiments: { positive: 79, neutral: 16, negative: 5 },
        strengths: ["Traditional Cuban coffee", "Vibrant atmosphere"],
        reviewHighlight: "The best Cuban coffee in town!",
      },
    ],
  },
  "Miami Beach": {
    "restaurant": [
      {
        id: "miami-beach-restaurant-1",
        name: "Beachfront Bistro",
        type: "Restaurant",
        location: "123 Ocean Dr, Miami Beach",
        priceLevel: "$$$",
        rating: 4.8,
        reviews: 210,
        sentiments: { positive: 86, neutral: 9, negative: 5 },
        strengths: ["Ocean view", "Excellent seafood"],
        reviewHighlight: "The view is stunning!",
      },
      {
        id: "miami-beach-restaurant-2",
        name: "Seafood Grill",
        type: "Restaurant",
        location: "456 Collins Ave, Miami Beach",
        priceLevel: "$$",
        rating: 4.4,
        reviews: 165,
        sentiments: { positive: 74, neutral: 16, negative: 10 },
        strengths: ["Fresh seafood", "Lively atmosphere"],
        reviewHighlight: "The seafood was incredibly fresh!",
      },
    ],
    "coffee_shop": [
      {
        id: "miami-beach-coffee-1",
        name: "Beach Coffee",
        type: "Coffee Shop",
        location: "789 Ocean Dr, Miami Beach",
        priceLevel: "$$",
        rating: 4.6,
        reviews: 195,
        sentiments: { positive: 81, neutral: 14, negative: 5 },
        strengths: ["Great coffee", "Beachfront location"],
        reviewHighlight: "Perfect coffee with a view!",
      },
    ],
  },
};

const mockCuisineRestaurants = {
  "Downtown": {
    "italian": [
      {
        id: "downtown-italian-1",
        name: "Italian Bistro Downtown",
        type: "Restaurant",
        location: "123 Via Veneto, Downtown",
        priceLevel: "$$",
        rating: 4.5,
        reviews: 120,
        sentiments: { positive: 75, neutral: 15, negative: 10 },
        strengths: ["Authentic pasta", "Romantic ambiance"],
        reviewHighlight: "The carbonara was divine!",
      },
    ],
  },
  "Brickell": {
    "italian": [
      {
        id: "brickell-italian-1",
        name: "Brickell Trattoria",
        type: "Restaurant",
        location: "987 SW 8th St, Brickell",
        priceLevel: "$$$",
        rating: 4.7,
        reviews: 200,
        sentiments: { positive: 85, neutral: 10, negative: 5 },
        strengths: ["Fine dining", "Extensive wine list"],
        reviewHighlight: "The osso buco was cooked to perfection!",
      },
    ],
  },
  "Wynwood": {
    "italian": [
      {
        id: "wynwood-italian-1",
        name: "Wynwood Osteria",
        type: "Restaurant",
        location: "543 NW 26th St, Wynwood",
        priceLevel: "$$",
        rating: 4.4,
        reviews: 160,
        sentiments: { positive: 73, neutral: 17, negative: 10 },
        strengths: ["Artisan pizzas", "Hip atmosphere"],
        reviewHighlight: "The pizza was a work of art!",
      },
    ],
  },
  "Little Havana": {
    "italian": [
      {
        id: "little-havana-italian-1",
        name: "Havana Ristorante",
        type: "Restaurant",
        location: "321 Calle Ocho, Little Havana",
        priceLevel: "$$",
        rating: 4.6,
        reviews: 170,
        sentiments: { positive: 78, neutral: 12, negative: 10 },
        strengths: ["Cuban-Italian fusion", "Lively music"],
        reviewHighlight: "The fusion dishes were surprisingly delicious!",
      },
    ],
  },
  "Miami Beach": {
    "italian": [
      {
        id: "miami-beach-italian-1",
        name: "Beachfront Pizzeria",
        type: "Restaurant",
        location: "123 Ocean Dr, Miami Beach",
        priceLevel: "$$$",
        rating: 4.8,
        reviews: 210,
        sentiments: { positive: 86, neutral: 9, negative: 5 },
        strengths: ["Ocean views", "Gourmet ingredients"],
        reviewHighlight: "The view was as good as the food!",
      },
    ],
  },
};

/**
 * Get default competitors based on district and business type
 */
export const getDefaultCompetitors = (district: string, businessType: BusinessType, cuisineType?: string): Competitor[] => {
  if (cuisineType && mockCuisineRestaurants[district] && mockCuisineRestaurants[district][cuisineType]) {
    return mockCuisineRestaurants[district][cuisineType];
  }
  return mockCompetitors[district]?.[businessType] || [];
};

/**
 * Load competitor data service - fetches and processes competitor data
 */
export const loadCompetitorData = async (
  businessType: BusinessType,
  selectedDistrict: string,
  apiKeys: any,
  cuisineType?: string,
  businessAddress?: string
): Promise<Competitor[]> => {
  try {
    // In a real implementation, this would call APIs using the provided API keys
    // and would filter competitors based on the businessAddress proximity
    // For now, we'll just return the mock data
    const competitors = getDefaultCompetitors(selectedDistrict, businessType, cuisineType);
    
    // If business address is provided, we can simulate filtering by proximity
    if (businessAddress) {
      console.log(`Filtering competitors near: ${businessAddress}`);
      // In a real implementation, this would use geolocation to filter by proximity
    }
    
    // Return the competitors
    return competitors;
  } catch (error) {
    console.error("Error loading competitor data:", error);
    // Return default competitors as fallback
    return getDefaultCompetitors(selectedDistrict, businessType, cuisineType);
  }
};

/**
 * Fetch competitors by district
 */
export const fetchCompetitorsByDistrict = (district: string, businessType: string, cuisineType?: string): Competitor[] => {
  try {
    // Fix the type casting issue - businessType as BusinessType
    const defaultCompetitors = getDefaultCompetitors(district, businessType as BusinessType, cuisineType);
    return defaultCompetitors;
  } catch (error) {
    console.error("Error fetching competitors:", error);
    return [];
  }
};

/**
 * Fetch competitor details by ID
 */
export const fetchCompetitorDetailsById = (competitorId: string, district: string, businessType: string): Competitor | null => {
  try {
    // Fix the type casting issue - businessType as BusinessType
    const competitors = getDefaultCompetitors(district, businessType as BusinessType);
    const competitor = competitors.find((c) => c.id === competitorId);
    return competitor || null;
  } catch (error) {
    console.error("Error fetching competitor details:", error);
    return null;
  }
};
