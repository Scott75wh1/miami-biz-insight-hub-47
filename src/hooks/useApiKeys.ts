
import { useState, useEffect } from 'react';

interface ApiKeys {
  googlePlaces: string;
  censusGov: string;
  yelp: string;
  googleTrends: string;
  openAI: string;
}

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    googlePlaces: '',
    censusGov: '',
    yelp: '',
    googleTrends: '',
    openAI: '',
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadError, setIsLoadError] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const keys = {
        googlePlaces: localStorage.getItem('googlePlacesApiKey') || '',
        censusGov: localStorage.getItem('censusGovApiKey') || '',
        yelp: localStorage.getItem('yelpApiKey') || '',
        googleTrends: localStorage.getItem('googleTrendsApiKey') || '',
        openAI: localStorage.getItem('openAIApiKey') || '',
      };
      
      setApiKeys(keys);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading API keys:', error);
      setIsLoadError(true);
    }
  }, []);

  const areKeysSet = () => {
    return (
      apiKeys.googlePlaces !== '' &&
      apiKeys.censusGov !== '' &&
      apiKeys.yelp !== '' &&
      apiKeys.googleTrends !== '' &&
      apiKeys.openAI !== ''
    );
  };

  return {
    apiKeys,
    isLoaded,
    isLoadError,
    areKeysSet,
  };
}
