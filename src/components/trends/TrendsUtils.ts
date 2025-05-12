
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

// Get search keywords based on business type
export const getSearchKeywords = (type: BusinessType): string[] => {
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

// Get growing categories based on business type
export const getGrowingCategories = (type: BusinessType): Category[] => {
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
