
import { CensusDataResponse } from '../types';
import { DOWNTOWN_CENSUS_DATA } from './downtown';
import { BRICKELL_CENSUS_DATA } from './brickell';
import { WYNWOOD_CENSUS_DATA } from './wynwood';
import { LITTLE_HAVANA_CENSUS_DATA } from './littleHavana';
import { MIAMI_BEACH_CENSUS_DATA } from './miamiBeach';
import { GENERIC_MIAMI_DATA } from './genericMiami';

// Update the mock data to include additional district-level data
export const DISTRICT_CENSUS_DATA: Record<string, any> = {
  "Downtown": {
    ...DOWNTOWN_CENSUS_DATA,
    demographics: DOWNTOWN_CENSUS_DATA.demographics || {},
    economics: {
      median_income: DOWNTOWN_CENSUS_DATA.median_income,
      unemployment_rate: DOWNTOWN_CENSUS_DATA.demographics?.economic?.unemployment_rate || 5.5,
      jobs: 120000,
      business_count: DOWNTOWN_CENSUS_DATA.demographics?.economic?.business_count || 3500,
      economic_growth: 3.2,
      main_industry: "Finance",
      industry_distribution: {
        "Finance": 35,
        "Tourism": 25,
        "Tech": 20,
        "Retail": 15,
        "Other": 5
      }
    },
    education: {
      high_school_or_higher_percent: DOWNTOWN_CENSUS_DATA.education.high_school_or_higher_percent,
      bachelors_or_higher_percent: DOWNTOWN_CENSUS_DATA.education.bachelors_or_higher_percent,
      bachelor_degree: DOWNTOWN_CENSUS_DATA.demographics?.education?.bachelors || 40,
      high_school_diploma: DOWNTOWN_CENSUS_DATA.demographics?.education?.high_school || 30,
      advanced_degree: DOWNTOWN_CENSUS_DATA.demographics?.education?.graduate || 20, 
      public_schools: 12,
      private_schools: 5,
      universities: 2,
      education_level_distribution: {
        "Less than High School": 5,
        "High School": 20,
        "Some College": 25,
        "Bachelor's": 35,
        "Graduate": 15
      }
    },
    housing: {
      median_home_value: DOWNTOWN_CENSUS_DATA.housing.median_home_value,
      median_rent: DOWNTOWN_CENSUS_DATA.housing.median_rent,
      median_home_price: DOWNTOWN_CENSUS_DATA.housing.median_home_value,
      housing_units: DOWNTOWN_CENSUS_DATA.total_housing_units,
      ownership_rate: 40,
      rental_rate: 60,
      price_growth: 4.5,
      housing_type_distribution: {
        "Apartment": 65,
        "Condo": 25,
        "Single Family": 5,
        "Townhouse": 4,
        "Other": 1
      }
    }
  },
  "Brickell": {
    ...BRICKELL_CENSUS_DATA,
    demographics: BRICKELL_CENSUS_DATA.demographics || {},
    economics: {
      median_income: BRICKELL_CENSUS_DATA.median_income,
      unemployment_rate: BRICKELL_CENSUS_DATA.demographics?.economic?.unemployment_rate || 3.2,
      jobs: 95000,
      business_count: BRICKELL_CENSUS_DATA.demographics?.economic?.business_count || 3845,
      economic_growth: 4.8,
      main_industry: "Finance",
      industry_distribution: {
        "Finance": 45,
        "Legal": 20,
        "Tech": 15,
        "Retail": 10,
        "Other": 10
      }
    },
    education: {
      high_school_or_higher_percent: BRICKELL_CENSUS_DATA.education.high_school_or_higher_percent,
      bachelors_or_higher_percent: BRICKELL_CENSUS_DATA.education.bachelors_or_higher_percent,
      bachelor_degree: BRICKELL_CENSUS_DATA.demographics?.education?.bachelors || 42,
      high_school_diploma: BRICKELL_CENSUS_DATA.demographics?.education?.high_school || 10,
      advanced_degree: BRICKELL_CENSUS_DATA.demographics?.education?.graduate || 25,
      public_schools: 5,
      private_schools: 7,
      universities: 1,
      education_level_distribution: {
        "Less than High School": 5,
        "High School": 10, 
        "Some College": 18,
        "Bachelor's": 42,
        "Graduate": 25
      }
    },
    housing: {
      median_home_value: BRICKELL_CENSUS_DATA.housing.median_home_value,
      median_rent: BRICKELL_CENSUS_DATA.housing.median_rent,
      median_home_price: BRICKELL_CENSUS_DATA.housing.median_home_value,
      housing_units: BRICKELL_CENSUS_DATA.total_housing_units,
      ownership_rate: 38,
      rental_rate: 48,
      price_growth: 5.2,
      housing_type_distribution: {
        "Condo": 75,
        "Apartment": 20,
        "Townhouse": 3,
        "Single Family": 1,
        "Other": 1
      }
    }
  },
  "Wynwood": {
    ...WYNWOOD_CENSUS_DATA,
    demographics: WYNWOOD_CENSUS_DATA.demographics || {},
    economics: {
      median_income: WYNWOOD_CENSUS_DATA.median_income,
      unemployment_rate: WYNWOOD_CENSUS_DATA.demographics?.economic?.unemployment_rate || 5.1,
      jobs: 25000,
      business_count: WYNWOOD_CENSUS_DATA.demographics?.economic?.business_count || 1248,
      economic_growth: 6.5,
      main_industry: "Arts & Entertainment",
      industry_distribution: {
        "Arts & Entertainment": 30,
        "Food Service": 25,
        "Retail": 20,
        "Tech": 15,
        "Other": 10
      }
    },
    education: {
      high_school_or_higher_percent: WYNWOOD_CENSUS_DATA.education.high_school_or_higher_percent,
      bachelors_or_higher_percent: WYNWOOD_CENSUS_DATA.education.bachelors_or_higher_percent,
      bachelor_degree: WYNWOOD_CENSUS_DATA.demographics?.education?.bachelors || 28,
      high_school_diploma: WYNWOOD_CENSUS_DATA.demographics?.education?.high_school || 22,
      advanced_degree: WYNWOOD_CENSUS_DATA.demographics?.education?.graduate || 10,
      public_schools: 4,
      private_schools: 2,
      universities: 0,
      education_level_distribution: {
        "Less than High School": 14,
        "High School": 22,
        "Some College": 26,
        "Bachelor's": 28,
        "Graduate": 10
      }
    },
    housing: {
      median_home_value: WYNWOOD_CENSUS_DATA.housing.median_home_value,
      median_rent: WYNWOOD_CENSUS_DATA.housing.median_rent,
      median_home_price: WYNWOOD_CENSUS_DATA.housing.median_home_value,
      housing_units: WYNWOOD_CENSUS_DATA.total_housing_units,
      ownership_rate: 24,
      rental_rate: 64,
      price_growth: 7.8,
      housing_type_distribution: {
        "Apartment": 55,
        "Converted Warehouse": 20,
        "Condo": 15,
        "Townhouse": 5,
        "Single Family": 5
      }
    }
  },
  "Little Havana": {
    ...LITTLE_HAVANA_CENSUS_DATA,
    demographics: LITTLE_HAVANA_CENSUS_DATA.demographics || {},
    // Add missing properties to match the expected structure
    economics: {
      median_income: LITTLE_HAVANA_CENSUS_DATA.median_income,
      unemployment_rate: 6.2,
      jobs: 18000,
      business_count: 1500,
      economic_growth: 2.5,
      main_industry: "Food Service",
      industry_distribution: {
        "Food Service": 35,
        "Retail": 30,
        "Tourism": 15,
        "Services": 15,
        "Other": 5
      }
    },
    education: {
      high_school_or_higher_percent: LITTLE_HAVANA_CENSUS_DATA.education.high_school_or_higher_percent,
      bachelors_or_higher_percent: LITTLE_HAVANA_CENSUS_DATA.education.bachelors_or_higher_percent,
      bachelor_degree: 15,
      high_school_diploma: 45,
      advanced_degree: 5,
      public_schools: 8,
      private_schools: 3,
      universities: 0,
      education_level_distribution: {
        "Less than High School": 25,
        "High School": 45,
        "Some College": 15,
        "Bachelor's": 10,
        "Graduate": 5
      }
    },
    housing: {
      median_home_value: LITTLE_HAVANA_CENSUS_DATA.housing.median_home_value,
      median_rent: LITTLE_HAVANA_CENSUS_DATA.housing.median_rent,
      median_home_price: LITTLE_HAVANA_CENSUS_DATA.housing.median_home_value,
      housing_units: LITTLE_HAVANA_CENSUS_DATA.total_housing_units,
      ownership_rate: 30,
      rental_rate: 70,
      price_growth: 3.5,
      housing_type_distribution: {
        "Single Family": 40,
        "Apartment": 35,
        "Duplex": 15,
        "Small Multi-Family": 8,
        "Other": 2
      }
    }
  },
  "Miami Beach": {
    ...MIAMI_BEACH_CENSUS_DATA,
    demographics: MIAMI_BEACH_CENSUS_DATA.demographics || {},
    economics: {
      median_income: MIAMI_BEACH_CENSUS_DATA.median_income,
      unemployment_rate: 4.8,
      jobs: 65000,
      business_count: 3200,
      economic_growth: 3.8,
      main_industry: "Tourism",
      industry_distribution: {
        "Tourism": 45,
        "Food Service": 25,
        "Entertainment": 15,
        "Retail": 10,
        "Other": 5
      }
    },
    education: {
      high_school_or_higher_percent: MIAMI_BEACH_CENSUS_DATA.education.high_school_or_higher_percent,
      bachelors_or_higher_percent: MIAMI_BEACH_CENSUS_DATA.education.bachelors_or_higher_percent,
      bachelor_degree: 35,
      high_school_diploma: 30,
      advanced_degree: 15,
      public_schools: 6,
      private_schools: 4,
      universities: 1,
      education_level_distribution: {
        "Less than High School": 10,
        "High School": 30,
        "Some College": 25,
        "Bachelor's": 25,
        "Graduate": 10
      }
    },
    housing: {
      median_home_value: MIAMI_BEACH_CENSUS_DATA.housing.median_home_value,
      median_rent: MIAMI_BEACH_CENSUS_DATA.housing.median_rent,
      median_home_price: MIAMI_BEACH_CENSUS_DATA.housing.median_home_value,
      housing_units: MIAMI_BEACH_CENSUS_DATA.total_housing_units,
      ownership_rate: 35,
      rental_rate: 55,
      price_growth: 4.0,
      housing_type_distribution: {
        "Condo": 60,
        "Apartment": 25,
        "Single Family": 10,
        "Historic Home": 3,
        "Other": 2
      }
    }
  }
};

// Export the generic Miami data
export { GENERIC_MIAMI_DATA };
