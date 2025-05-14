
// Export interface for shared types
export interface TrendItem {
  label: string;
  value: number;
}

export interface Category {
  name: string;
  growth: string;
  color: string;
}

// Re-export functions from searchKeywords.ts
export { getSearchKeywords, getBaseKeywords } from './searchKeywords';

// Re-export functions from growingCategories.ts
export { 
  getGrowingCategories, 
  getBaseCategoriesByType, 
  getDistrictSpecificCategories 
} from './growingCategories';
