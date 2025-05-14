
import { CensusDataResponse } from '../types';

export const LITTLE_HAVANA_CENSUS_DATA: CensusDataResponse = {
  population: 76815,
  median_age: 42.3,
  median_income: 38654,
  households: 31258,
  total_housing_units: 34500,
  district: "Little Havana",
  location_name: "Little Havana, Miami",
  education: {
    high_school_or_higher_percent: 72,
    bachelors_or_higher_percent: 16
  },
  housing: {
    median_home_value: 280000,
    median_rent: 1260
  },
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
};
