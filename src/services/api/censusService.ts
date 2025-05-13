
import { handleApiError } from './handleError';
import { fetchWithProxy } from './proxyService';
import { apiLogger } from '../logService';

export interface CensusDataResponse {
  population: number;
  median_age: number;
  median_income: number;
  households: number;
  demographics?: {
    age_distribution?: {
      under_18: number;
      age_18_to_34: number;
      age_35_to_64: number;
      age_65_plus: number;
    };
    race_distribution?: {
      white: number;
      black: number;
      asian: number;
      hispanic: number;
      other: number;
    };
    education?: {
      less_than_high_school: number;
      high_school: number;
      some_college: number;
      bachelors: number;
      graduate: number;
    };
    housing?: {
      owner_occupied: number;
      renter_occupied: number;
      vacancy_rate: number;
      median_home_value: number;
    };
    economic?: {
      unemployment_rate: number;
      poverty_rate: number;
      business_count: number;
      median_rent: number;
    };
    commute?: {
      work_location?: {
        within_district: number;
        other_district: number;
        outside_city: number;
      };
      transportation_mode?: {
        car: number;
        public_transport: number;
        walking: number;
        bicycle: number;
        work_from_home: number;
      };
    };
  };
}

// Mock data by district
const DISTRICT_CENSUS_DATA: Record<string, CensusDataResponse> = {
  "Downtown": {
    population: 92368,
    median_age: 36.2,
    median_income: 58943,
    households: 40128,
    demographics: {
      age_distribution: {
        under_18: 14,
        age_18_to_34: 38,
        age_35_to_64: 36,
        age_65_plus: 12
      },
      race_distribution: {
        white: 28,
        black: 15,
        asian: 7,
        hispanic: 45,
        other: 5
      },
      education: {
        less_than_high_school: 12,
        high_school: 18,
        some_college: 24,
        bachelors: 32,
        graduate: 14
      },
      housing: {
        owner_occupied: 31,
        renter_occupied: 53,
        vacancy_rate: 16,
        median_home_value: 450000
      },
      economic: {
        unemployment_rate: 4.8,
        poverty_rate: 18.2,
        business_count: 5843,
        median_rent: 1780
      },
      commute: {
        work_location: {
          within_district: 35,
          other_district: 45,
          outside_city: 20
        },
        transportation_mode: {
          car: 42,
          public_transport: 30,
          walking: 15,
          bicycle: 5,
          work_from_home: 8
        }
      }
    }
  },
  "Brickell": {
    population: 34975,
    median_age: 34.1,
    median_income: 98752,
    households: 17456,
    demographics: {
      age_distribution: {
        under_18: 9,
        age_18_to_34: 42,
        age_35_to_64: 38,
        age_65_plus: 11
      },
      race_distribution: {
        white: 32,
        black: 6,
        asian: 10,
        hispanic: 48,
        other: 4
      },
      education: {
        less_than_high_school: 5,
        high_school: 10,
        some_college: 18,
        bachelors: 42,
        graduate: 25
      },
      housing: {
        owner_occupied: 38,
        renter_occupied: 48,
        vacancy_rate: 14,
        median_home_value: 680000
      },
      economic: {
        unemployment_rate: 3.2,
        poverty_rate: 8.4,
        business_count: 3845,
        median_rent: 2450
      },
      commute: {
        work_location: {
          within_district: 45,
          other_district: 40,
          outside_city: 15
        },
        transportation_mode: {
          car: 38,
          public_transport: 25,
          walking: 20,
          bicycle: 7,
          work_from_home: 10
        }
      }
    }
  },
  "Wynwood": {
    population: 12467,
    median_age: 31.8,
    median_income: 64318,
    households: 5123,
    demographics: {
      age_distribution: {
        under_18: 12,
        age_18_to_34: 48,
        age_35_to_64: 32,
        age_65_plus: 8
      },
      race_distribution: {
        white: 26,
        black: 18,
        asian: 4,
        hispanic: 48,
        other: 4
      },
      education: {
        less_than_high_school: 14,
        high_school: 22,
        some_college: 26,
        bachelors: 28,
        graduate: 10
      },
      housing: {
        owner_occupied: 24,
        renter_occupied: 64,
        vacancy_rate: 12,
        median_home_value: 410000
      },
      economic: {
        unemployment_rate: 5.1,
        poverty_rate: 19.6,
        business_count: 1248,
        median_rent: 1950
      },
      commute: {
        work_location: {
          within_district: 30,
          other_district: 48,
          outside_city: 22
        },
        transportation_mode: {
          car: 40,
          public_transport: 20,
          walking: 25,
          bicycle: 10,
          work_from_home: 5
        }
      }
    }
  },
  "Little Havana": {
    population: 76815,
    median_age: 42.3,
    median_income: 38654,
    households: 31258,
    demographics: {
      age_distribution: {
        under_18: 18,
        age_18_to_34: 24,
        age_35_to_64: 40,
        age_65_plus: 18
      },
      race_distribution: {
        white: 12,
        black: 4,
        asian: 1,
        hispanic: 82,
        other: 1
      },
      education: {
        less_than_high_school: 28,
        high_school: 36,
        some_college: 20,
        bachelors: 12,
        graduate: 4
      },
      housing: {
        owner_occupied: 22,
        renter_occupied: 68,
        vacancy_rate: 10,
        median_home_value: 280000
      },
      economic: {
        unemployment_rate: 6.8,
        poverty_rate: 28.4,
        business_count: 2130,
        median_rent: 1260
      },
      commute: {
        work_location: {
          within_district: 55,
          other_district: 35,
          outside_city: 10
        },
        transportation_mode: {
          car: 50,
          public_transport: 35,
          walking: 10,
          bicycle: 3,
          work_from_home: 2
        }
      }
    }
  },
  "Miami Beach": {
    population: 88064,
    median_age: 40.1,
    median_income: 53482,
    households: 44834,
    demographics: {
      age_distribution: {
        under_18: 11,
        age_18_to_34: 32,
        age_35_to_64: 39,
        age_65_plus: 18
      },
      race_distribution: {
        white: 39,
        black: 4,
        asian: 2,
        hispanic: 53,
        other: 2
      },
      education: {
        less_than_high_school: 10,
        high_school: 18,
        some_college: 24,
        bachelors: 32,
        graduate: 16
      },
      housing: {
        owner_occupied: 36,
        renter_occupied: 42,
        vacancy_rate: 22,
        median_home_value: 520000
      },
      economic: {
        unemployment_rate: 4.2,
        poverty_rate: 14.8,
        business_count: 6230,
        median_rent: 1840
      },
      commute: {
        work_location: {
          within_district: 42,
          other_district: 38,
          outside_city: 20
        },
        transportation_mode: {
          car: 45,
          public_transport: 28,
          walking: 15,
          bicycle: 8,
          work_from_home: 4
        }
      }
    }
  }
};

export const fetchCensusData = async (apiKey: string, location: string = 'Miami') => {
  const logIndex = apiLogger.logAPICall('Census.gov API', 'fetchCensusData', { location, apiKey: apiKey ? 'provided' : 'not-provided' });
  
  if (!apiKey || apiKey === 'demo-key') {
    console.log('Census.gov API key is not set or using demo key');
    // Return mock data for demonstration
    
    // If location is one of our specific districts, return the detailed data for that district
    if (DISTRICT_CENSUS_DATA[location]) {
      apiLogger.logAPIResponse(logIndex, { status: 'MOCK_DATA', data: DISTRICT_CENSUS_DATA[location] });
      return DISTRICT_CENSUS_DATA[location];
    }
    
    // Otherwise return generic Miami data
    const mockData = {
      population: 442241,
      median_age: 40.1,
      median_income: 44268,
      households: 186860
    };
    apiLogger.logAPIResponse(logIndex, { status: 'MOCK_DATA', data: mockData });
    return mockData;
  }
  
  try {
    console.log(`Attempting to fetch real census data for: ${location}`);
    
    // Get the state and county from location (basic implementation)
    const state = 'FL'; // Florida for Miami
    const county = 'Miami-Dade County';
    
    // Example Census API call for American Community Survey data
    // This is a simplified example - real implementation would need proper Census API endpoints
    const url = `https://api.census.gov/data/2019/acs/acs5?get=B01003_001E,B01002_001E,B19013_001E,B11001_001E&for=county:${county}&in=state:${state}&key=${apiKey}`;
    
    try {
      const data = await fetchWithProxy(url);
      apiLogger.logAPIResponse(logIndex, { status: 'SUCCESS', data });
      
      if (data && Array.isArray(data) && data.length >= 2) {
        // Parse the Census API response (typically returns arrays)
        // First row is headers, second row is data
        const [headers, values] = data;
        
        return {
          population: parseInt(values[0]) || 442241,
          median_age: parseFloat(values[1]) || 40.1,
          median_income: parseInt(values[2]) || 44268,
          households: parseInt(values[3]) || 186860
        };
      } else {
        const error = new Error('Invalid response format from Census API');
        apiLogger.logAPIError(logIndex, { status: 'INVALID_FORMAT', error: error.message, response: data });
        throw error;
      }
    } catch (error) {
      console.error('Error with Census API call, using mock data instead:', error);
      apiLogger.logAPIError(logIndex, { status: 'API_ERROR', error });
      
      // Fall back to mock data if API call fails
      // If location is one of our specific districts, return the detailed data for that district
      if (DISTRICT_CENSUS_DATA[location]) {
        return DISTRICT_CENSUS_DATA[location];
      }
      
      // Otherwise return generic Miami data
      return {
        population: 442241,
        median_age: 40.1,
        median_income: 44268,
        households: 186860
      };
    }
  } catch (error) {
    apiLogger.logAPIError(logIndex, { status: 'GENERAL_ERROR', error });
    return handleApiError(error, 'Census.gov');
  }
};

export const fetchDistrictCensusData = async (apiKey: string, district: string): Promise<CensusDataResponse> => {
  const logIndex = apiLogger.logAPICall('Census.gov API', 'fetchDistrictCensusData', { district, apiKey: apiKey ? 'provided' : 'not-provided' });
  
  try {
    // In a real implementation, we would make specific API calls for each district
    // For now, we'll use our mock data
    if (DISTRICT_CENSUS_DATA[district]) {
      apiLogger.logAPIResponse(logIndex, { status: 'MOCK_DATA', data: DISTRICT_CENSUS_DATA[district] });
      return DISTRICT_CENSUS_DATA[district];
    }
    
    // If not found, get general data
    const generalData = await fetchCensusData(apiKey, 'Miami');
    apiLogger.logAPIResponse(logIndex, { status: 'MOCK_DATA', data: generalData });
    return generalData;
  } catch (error) {
    apiLogger.logAPIError(logIndex, { status: 'GENERAL_ERROR', error });
    return handleApiError(error, 'Census.gov');
  }
};
