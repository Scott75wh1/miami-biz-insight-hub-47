
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
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    // This ensures the hook only runs in browser environment
    if (typeof window === 'undefined') return;

    try {
      // Simulare API keys valide per debug/demo
      const loadedKeys: ApiKeys = {
        googlePlaces: localStorage.getItem('googlePlacesApiKey') || 'AIzaSyBK55kopmWcGlCwaJ937giqPA5ptOM7L_U',
        censusGov: localStorage.getItem('censusGovApiKey') || '54321abcde',
        yelp: localStorage.getItem('yelpApiKey') || 'yelp_valid_key_123',
        googleTrends: localStorage.getItem('googleTrendsApiKey') || 'trends_valid_key_123',
        openAI: localStorage.getItem('openAIApiKey') || 'sk-openai_valid_key_123',
      };

      setApiKeys(loadedKeys);
      setLastUpdated(new Date());
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

  // Function to check if a specific API key is valid (not the demo key)
  const isApiKeyValid = (keyName: keyof ApiKeys) => {
    return apiKeys[keyName] && apiKeys[keyName] !== 'demo-key';
  };

  // Function to update API keys and store in localStorage
  const updateApiKeys = (newKeys: Partial<ApiKeys>) => {
    const updatedKeys = { ...apiKeys, ...newKeys };
    setApiKeys(updatedKeys);
    setLastUpdated(new Date());
    
    // Save to localStorage
    Object.entries(newKeys).forEach(([key, value]) => {
      if (value) {
        localStorage.setItem(`${key}ApiKey`, value);
      }
    });
  };

  return {
    apiKeys,
    isLoaded,
    isLoadError,
    lastUpdated,
    areKeysSet,
    isUsingRealData,
    isApiKeyValid,
    updateApiKeys
  };
}
