
import { BusinessType } from "@/components/BusinessTypeSelector";
import { Competitor } from "../types";

/**
 * Get default competitors for a given district and business type
 */
export const getDefaultCompetitors = (
  businessType: BusinessType,
  district: string,
  cuisineType?: string
): Competitor[] => {
  // Simple default data for demonstration
  const defaultCompetitors: Competitor[] = [
    {
      id: `${district.toLowerCase()}-${businessType}-1`,
      name: `${district} ${businessType.charAt(0).toUpperCase() + businessType.slice(1)}`,
      type: businessType === "coffee_shop" ? "Coffee Shop" : "Restaurant",
      location: `123 Main St, ${district}`,
      priceLevel: "$$",
      rating: 4.2,
      reviews: 150,
      sentiments: { positive: 75, neutral: 15, negative: 10 },
      strengths: ["Good location", "Fair prices"],
      reviewHighlight: "A decent place in the area"
    },
    {
      id: `${district.toLowerCase()}-${businessType}-2`,
      name: `${district} ${businessType === "coffee_shop" ? "Cafe" : "Diner"}`,
      type: businessType === "coffee_shop" ? "Coffee Shop" : "Restaurant",
      location: `456 Oak St, ${district}`,
      priceLevel: "$$",
      rating: 3.8,
      reviews: 120,
      sentiments: { positive: 65, neutral: 20, negative: 15 },
      strengths: ["Quick service", "Friendly staff"],
      reviewHighlight: "Great service but average food"
    }
  ];

  if (cuisineType) {
    return [
      {
        id: `${district.toLowerCase()}-${cuisineType}-1`,
        name: `${district} ${cuisineType.charAt(0).toUpperCase() + cuisineType.slice(1)} Restaurant`,
        type: "Restaurant",
        location: `789 Cuisine St, ${district}`,
        priceLevel: "$$",
        rating: 4.4,
        reviews: 180,
        sentiments: { positive: 80, neutral: 10, negative: 10 },
        strengths: ["Authentic cuisine", "Great ambiance"],
        reviewHighlight: `Best ${cuisineType} food in ${district}`
      }
    ];
  }

  return defaultCompetitors;
};
