
import { useState, useEffect } from 'react';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { Competitor } from './CompetitorCard';
import { loadCompetitorData } from './services/competitorDataService';
import { getDefaultCompetitors } from './utils/defaultCompetitorsUtil';
import { useCompetitorToasts } from './hooks/useCompetitorToasts';

export const useCompetitorData = (
  businessType: BusinessType, 
  selectedDistrict: string,
  apiKeys: any,
  isLoaded: boolean,
  cuisineType?: string
) => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    showSuccessToast,
    showDefaultDataToast,
    showAIAnalysisToast,
    showErrorToast
  } = useCompetitorToasts();
  
  // Load competitor data function with AI analysis
  const fetchCompetitorData = async () => {
    if (!isLoaded || !selectedDistrict) return;
    
    setIsLoading(true);
    
    try {
      // Use the service to load and enhance competitor data
      const competitorData = await loadCompetitorData(
        businessType, 
        selectedDistrict, 
        apiKeys,
        cuisineType
      );
      
      if (competitorData) {
        setCompetitors(competitorData);
        
        if (competitorData === getDefaultCompetitors(businessType, selectedDistrict, cuisineType)) {
          showDefaultDataToast();
        } else {
          showSuccessToast(businessType, selectedDistrict);
        }
        
        showAIAnalysisToast();
      } else {
        // Fallback to default data
        const defaultData = getDefaultCompetitors(businessType, selectedDistrict, cuisineType);
        setCompetitors(defaultData);
        showDefaultDataToast();
      }
    } catch (error) {
      console.error('Error loading competitor data:', error);
      
      // Use default data if there's an error
      const defaultData = getDefaultCompetitors(businessType, selectedDistrict, cuisineType);
      setCompetitors(defaultData);
      showErrorToast();
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when business type, district, or cuisine type changes
  useEffect(() => {
    console.log(`Business type changed to: ${businessType}, Cuisine: ${cuisineType}`);
    if (isLoaded) {
      // Clear previous data
      setCompetitors([]);
      fetchCompetitorData();
    }
  }, [businessType, cuisineType, isLoaded]);
  
  // Load data when district changes
  useEffect(() => {
    console.log(`District changed to: ${selectedDistrict}`);
    if (isLoaded) {
      // Clear previous data
      setCompetitors([]);
      fetchCompetitorData();
    }
  }, [selectedDistrict, isLoaded]);

  return {
    competitors,
    isLoading
  };
};
