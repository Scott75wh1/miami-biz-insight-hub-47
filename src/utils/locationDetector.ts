
import { MIAMI_DISTRICTS } from "@/components/competitor/constants";

// Function to identify district based on address and location data
export async function identifyDistrict(address: string, placesData: any, apiKey: string): Promise<string | null> {
  console.log(`Identifying district for address: ${address}`);
  
  // Default to null if we can't determine
  if (!placesData || !address) {
    return null;
  }
  
  try {
    // Define keywords that might appear in addresses for each district
    const districtKeywords: Record<string, string[]> = {
      'Downtown': ['downtown', 'biscayne blvd', 'flagler', 'miami ave', 'ne 1st', 'nw 1st'],
      'Brickell': ['brickell', 'sw 8th st', 'se 8th st', 'sw 7th st', 'brickell ave'],
      'Wynwood': ['wynwood', 'nw 2nd ave', 'nw 24th', 'nw 26th', 'nw 29th', 'art district'],
      'Little Havana': ['little havana', 'calle ocho', 'sw 8th', 'flagler', 'cuban'],
      'Miami Beach': ['miami beach', 'south beach', 'ocean dr', 'collins ave', 'lincoln rd'],
      'North Miami': ['north miami', 'ne 125th', 'ne 123rd', 'ne 135th', 'ne 8th', 'ne 6th', 'biscayne blvd'],
      'Coral Gables': ['coral gables', 'miracle mile', 'ponce de leon', 'granada'],
      'Coconut Grove': ['coconut grove', 'grand ave', 'main hwy', 'bayshore'],
      'Design District': ['design district', 'ne 39th', 'ne 40th', 'ne 2nd ave', 'buena vista'],
      'Edgewater': ['edgewater', 'ne 30th', 'ne 31st', 'biscayne blvd'],
      'Midtown': ['midtown', 'ne 36th', 'ne 35th', 'nw 34th'],
    };
  
    // First, check if the address directly contains district keywords
    const lowerAddress = address.toLowerCase();
    
    for (const [district, keywords] of Object.entries(districtKeywords)) {
      for (const keyword of keywords) {
        if (lowerAddress.includes(keyword.toLowerCase())) {
          console.log(`District identified from address keywords: ${district}`);
          return district;
        }
      }
    }
    
    // Second, check if Google Places result has district information
    if (placesData?.results && placesData.results[0]) {
      const placeResult = placesData.results[0];
      
      // Check address components if available
      if (placeResult.address_components) {
        for (const component of placeResult.address_components) {
          const value = component.long_name.toLowerCase();
          
          for (const [district, keywords] of Object.entries(districtKeywords)) {
            for (const keyword of keywords) {
              if (value.includes(keyword.toLowerCase())) {
                console.log(`District identified from place address components: ${district}`);
                return district;
              }
            }
          }
          
          // Explicitly check for North Miami
          if (value === "north miami") {
            console.log(`District explicitly identified as North Miami`);
            return "North Miami";
          }
        }
      }
      
      // Check formatted address
      if (placeResult.formatted_address) {
        const formattedAddress = placeResult.formatted_address.toLowerCase();
        
        for (const [district, keywords] of Object.entries(districtKeywords)) {
          for (const keyword of keywords) {
            if (formattedAddress.includes(keyword.toLowerCase())) {
              console.log(`District identified from formatted address: ${district}`);
              return district;
            }
          }
        }
        
        // Explicitly check for North Miami in formatted address
        if (formattedAddress.includes("north miami")) {
          console.log(`District explicitly identified as North Miami from formatted address`);
          return "North Miami";
        }
      }
      
      // Check if we have geometry/location to determine nearest district
      if (placeResult.geometry && placeResult.geometry.location) {
        const lat = placeResult.geometry.location.lat;
        const lng = placeResult.geometry.location.lng;
        
        // North Miami coordinates check (more precise)
        if (lat > 25.88 && lat < 25.91 && lng > -80.19 && lng < -80.17) {
          console.log('Location coordinates indicate North Miami');
          return 'North Miami';
        }
      }
      
      // Check place name explicitly
      if (placeResult.name && placeResult.name.toLowerCase().includes("north miami")) {
        console.log(`Place name indicates North Miami`);
        return "North Miami";
      }
    }
    
    // If we still can't determine the district, check if any district name appears in the place name or vicinity
    if (placesData?.results && placesData.results[0]) {
      const placeName = placesData.results[0].name || '';
      const vicinity = placesData.results[0].vicinity || '';
      const combinedText = `${placeName} ${vicinity}`.toLowerCase();
      
      for (const district of MIAMI_DISTRICTS) {
        if (combinedText.includes(district.toLowerCase())) {
          console.log(`District identified from place name/vicinity: ${district}`);
          return district;
        }
      }
      
      // Final check specifically for North Miami
      if (combinedText.includes("north miami")) {
        console.log(`Combined text indicates North Miami`);
        return "North Miami";
      }
    }
    
    console.log('Could not identify district with high confidence');
    return null;
  } catch (error) {
    console.error('Error identifying district:', error);
    return null;
  }
}
