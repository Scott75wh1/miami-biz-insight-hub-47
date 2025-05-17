
import { getMockData } from './index';

// Types for our dashboard data
export interface RevenueData {
  date: string;
  value: number;
}

export interface VisitorData {
  name: string; 
  value: number;
}

export interface CategoryData {
  name: string;
  value: number;
}

// Mock data
const mockRevenueData: RevenueData[] = [
  { date: 'Gen', value: 4200 },
  { date: 'Feb', value: 3800 },
  { date: 'Mar', value: 5000 },
  { date: 'Apr', value: 4700 },
  { date: 'Mag', value: 6300 },
];

const mockVisitorData: VisitorData[] = [
  { name: 'Miami Beach', value: 4000 },
  { name: 'Wynwood', value: 3500 },
  { name: 'Brickell', value: 5200 },
  { name: 'Downtown', value: 6500 },
  { name: 'Little Havana', value: 2400 },
];

const mockCategoryData: CategoryData[] = [
  { name: 'Ristoranti', value: 35 },
  { name: 'Caffè', value: 25 },
  { name: 'Negozi', value: 20 },
  { name: 'Servizi', value: 15 },
  { name: 'Altri', value: 5 },
];

// API functions
export async function fetchRevenueData(): Promise<RevenueData[]> {
  // In a real app, this would be a fetch call to your backend
  return getMockData(mockRevenueData);
}

export async function fetchVisitorData(): Promise<VisitorData[]> {
  return getMockData(mockVisitorData);
}

export async function fetchCategoryData(): Promise<CategoryData[]> {
  return getMockData(mockCategoryData);
}
