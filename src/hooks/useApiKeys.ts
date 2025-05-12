
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
    googlePlaces: 'demo-key',
    censusGov: 'demo-key',
    yelp: 'demo-key',
    googleTrends: 'demo-key',
    openAI: 'demo-key',
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadError, setIsLoadError] = useState(false);

  useEffect(() => {
    // This ensures the hook only runs in browser environment
    if (typeof window === 'undefined') return;

    try {
      // Load API keys from localStorage
      const loadedKeys: ApiKeys = {
        googlePlaces: localStorage.getItem('googlePlacesApiKey') || 'demo-key',
        censusGov: localStorage.getItem('censusGovApiKey') || 'demo-key',
        yelp: localStorage.getItem('yelpApiKey') || 'demo-key',
        googleTrends: localStorage.getItem('googleTrendsApiKey') || 'demo-key',
        openAI: localStorage.getItem('openAIApiKey') || 'demo-key',
      };

      setApiKeys(loadedKeys);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading API keys from localStorage:', error);
      setIsLoadError(true);
      setIsLoaded(true); // We still mark as loaded, but with an error
    }
  }, []);

  const areKeysSet = () => {
    // Check if any key is not the demo key
    return Object.values(apiKeys).some(key => key !== 'demo-key');
  };
  
  const isUsingRealData = () => {
    // Check if we're using real data (not demo keys)
    return Object.values(apiKeys).every(key => key !== 'demo-key');
  };

  return {
    apiKeys,
    isLoaded,
    isLoadError,
    areKeysSet,
    isUsingRealData,
  };
}
