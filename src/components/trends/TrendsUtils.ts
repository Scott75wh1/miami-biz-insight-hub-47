
import { BusinessType } from '@/components/BusinessTypeSelector';

interface TrendItem {
  label: string;
  value: number;
}

interface Category {
  name: string;
  growth: string;
  color: string;
}

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
const getBaseKeywords = (type: BusinessType): string[] => {
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

// Get growing categories based on business type and district
export const getGrowingCategories = (type: BusinessType, district: string = 'Miami Beach'): Category[] => {
  // Get base categories by business type
  const baseCategories = getBaseCategoriesByType(type);
  
  // Get district-specific categories
  const districtCategories = getDistrictSpecificCategories(type, district);
  
  // Combine and return unique categories (prioritizing district-specific ones)
  const combinedCategories = [...districtCategories];
  
  // Add base categories that don't overlap with district ones
  baseCategories.forEach(baseCategory => {
    if (!combinedCategories.some(c => c.name === baseCategory.name)) {
      combinedCategories.push(baseCategory);
    }
  });
  
  // Return top 4 categories
  return combinedCategories.slice(0, 4);
};

// Base categories by business type
const getBaseCategoriesByType = (type: BusinessType): Category[] => {
  switch (type) {
    case 'restaurant':
      return [
        { name: 'Cucina Fusion', growth: '+27%', color: 'bg-miami-teal text-white' },
        { name: 'Ristoranti Vegani', growth: '+22%', color: 'bg-miami-blue text-white' },
        { name: 'Cucina Mediterranea', growth: '+18%', color: 'bg-miami-coral text-white' },
        { name: 'Pizzerie Artigianali', growth: '+15%', color: 'bg-miami-navy text-white' },
      ];
    case 'coffee_shop':
      return [
        { name: 'Cold Brew', growth: '+31%', color: 'bg-miami-teal text-white' },
        { name: 'Coffee Shops Specializzati', growth: '+24%', color: 'bg-miami-blue text-white' },
        { name: 'Caffè Biologico', growth: '+18%', color: 'bg-miami-coral text-white' },
        { name: 'Brunch Spot', growth: '+16%', color: 'bg-miami-navy text-white' },
      ];
    default:
      return [
        { name: 'E-commerce', growth: '+24%', color: 'bg-miami-teal text-white' },
        { name: 'Servizi Digitali', growth: '+18%', color: 'bg-miami-blue text-white' },
        { name: 'Attività Sostenibili', growth: '+15%', color: 'bg-miami-coral text-white' },
        { name: 'Franchising', growth: '+12%', color: 'bg-miami-navy text-white' },
      ];
  }
};

// District-specific categories
const getDistrictSpecificCategories = (type: BusinessType, district: string): Category[] => {
  // Capitalize district name for display
  const displayDistrict = district.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
    
  switch (district.toLowerCase()) {
    case 'wynwood':
      if (type === 'restaurant') {
        return [
          { name: `Ristoranti Fusion ${displayDistrict}`, growth: '+33%', color: 'bg-miami-teal text-white' },
          { name: 'Food Trucks', growth: '+29%', color: 'bg-miami-blue text-white' },
        ];
      } else if (type === 'coffee_shop') {
        return [
          { name: `Caffetterie Artiste ${displayDistrict}`, growth: '+38%', color: 'bg-miami-teal text-white' },
          { name: 'Bar Specializzati', growth: '+25%', color: 'bg-miami-blue text-white' },
        ];
      }
      return [
        { name: `Attività Artistiche ${displayDistrict}`, growth: '+34%', color: 'bg-miami-teal text-white' },
        { name: 'Pop-up Shops', growth: '+26%', color: 'bg-miami-blue text-white' },
      ];
      
    case 'brickell':
      if (type === 'restaurant') {
        return [
          { name: `Ristoranti Gourmet ${displayDistrict}`, growth: '+28%', color: 'bg-miami-teal text-white' },
          { name: 'Sushi Bar', growth: '+24%', color: 'bg-miami-blue text-white' },
        ];
      } else if (type === 'coffee_shop') {
        return [
          { name: `Business Café ${displayDistrict}`, growth: '+32%', color: 'bg-miami-teal text-white' },
          { name: 'Third Wave Coffee', growth: '+27%', color: 'bg-miami-blue text-white' },
        ];
      }
      return [
        { name: `Servizi B2B ${displayDistrict}`, growth: '+29%', color: 'bg-miami-teal text-white' },
        { name: 'Fintech', growth: '+33%', color: 'bg-miami-blue text-white' },
      ];
      
    case 'miami beach':
    default:
      if (type === 'restaurant') {
        return [
          { name: `Ristoranti Vista Mare ${displayDistrict}`, growth: '+26%', color: 'bg-miami-teal text-white' },
          { name: 'Cucina Latino-Americana', growth: '+23%', color: 'bg-miami-blue text-white' },
        ];
      } else if (type === 'coffee_shop') {
        return [
          { name: `Beach Cafés ${displayDistrict}`, growth: '+25%', color: 'bg-miami-teal text-white' },
          { name: 'Juice & Smoothie Bars', growth: '+21%', color: 'bg-miami-blue text-white' },
        ];
      }
      return [
        { name: `Attività Turistiche ${displayDistrict}`, growth: '+22%', color: 'bg-miami-teal text-white' },
        { name: 'Boutique di Lusso', growth: '+19%', color: 'bg-miami-blue text-white' },
      ];
  }
};
