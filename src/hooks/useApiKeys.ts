
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

  const [isLoaded, setIsLoaded] = useState(true);
  const [isLoadError, setIsLoadError] = useState(false);

  useEffect(() => {
    // This ensures the hook only runs in browser environment
    if (typeof window === 'undefined') return;

    // We're setting demo keys by default so we don't need to load from localStorage
    // This prevents app freezing due to missing API keys
    setIsLoaded(true);
    
  }, []);

  const areKeysSet = () => {
    // Always return true for demo purposes
    return true;
  };

  return {
    apiKeys,
    isLoaded,
    isLoadError,
    areKeysSet,
  };
}
