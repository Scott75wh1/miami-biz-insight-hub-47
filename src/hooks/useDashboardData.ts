
import { useQuery } from '@tanstack/react-query';
import { 
  fetchRevenueData, 
  fetchVisitorData,
  fetchCategoryData,
  RevenueData,
  VisitorData,
  CategoryData
} from '@/api/dashboardData';

export function useRevenueData() {
  return useQuery({
    queryKey: ['revenue'],
    queryFn: fetchRevenueData
  });
}

export function useVisitorData() {
  return useQuery({
    queryKey: ['visitors'],
    queryFn: fetchVisitorData
  });
}

export function useCategoryData() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategoryData
  });
}
