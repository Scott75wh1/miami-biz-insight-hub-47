
import { BusinessType } from '@/components/BusinessTypeSelector';

// Get search keywords based on business type and district
export const getSearchKeywords = (type: BusinessType, district: string = 'Miami Beach'): string[] => {
  // Base keywords by business type
  const baseKeywords = getBaseKeywords(type);
  
  // Add district-specific keywords
  return baseKeywords.map(keyword => 
    keyword.includes(district.toLowerCase()) ? keyword : `${keyword} ${district.toLowerCase()}`
  );
};

// Base keywords by business type
export const getBaseKeywords = (type: BusinessType): string[] => {
  switch (type) {
    case 'restaurant':
      return ['restaurants miami beach', 'italian restaurants miami', 'latin food downtown miami', 'food trucks wynwood'];
    case 'coffee_shop':
      return ['coffee shop wynwood', 'specialty coffee miami', 'cafe brickell', 'breakfast downtown miami'];
    case 'retail':
      return ['shopping centers miami', 'vintage shops wynwood', 'sustainable fashion miami', 'luxury boutiques'];
    case 'tech':
      return ['tech startups miami', 'coworking brickell', 'tech hub florida', 'fintech miami'];
    case 'fitness':
      return ['gyms miami beach', 'yoga studios brickell', 'outdoor fitness miami', 'crossfit miami'];
    default:
      return ['businesses miami', 'commercial activities florida', 'new businesses miami', 'startups florida'];
  }
};
