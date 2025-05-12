
// API utility functions for Google Places API

export const fetchFromPlacesApi = async (query: string, apiKey: string, location: string) => {
  // Skip real API call if using demo key
  if (!apiKey || apiKey === 'demo-key') {
    console.log(`[API Simulation] Fetching places from Google API for: ${query} in ${location}`);
    return null;
  }
  
  try {
    console.log(`Making real API call to Google Places API for: ${query} in ${location}`);
    
    // Build the actual Google Places API URL
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}&location=${encodeURIComponent(location)}`;
    
    // Use a proxy to avoid CORS issues in the browser
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
    
    // Make the actual API call
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`Google Places API returned status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Google Places API returned data:', data);
    
    return data;
  } catch (error) {
    console.error('Error fetching from Google Places API:', error);
    throw error;
  }
};
