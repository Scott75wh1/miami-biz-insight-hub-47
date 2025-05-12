
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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const keys = {
      googlePlaces: localStorage.getItem('googlePlacesApiKey') || '',
      censusGov: localStorage.getItem('censusGovApiKey') || '',
      yelp: localStorage.getItem('yelpApiKey') || '',
      googleTrends: localStorage.getItem('googleTrendsApiKey') || '',
      openAI: localStorage.getItem('openAIApiKey') || '',
    };
    
    setApiKeys(keys);
    setIsLoaded(true);
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
    areKeysSet,
  };
}
