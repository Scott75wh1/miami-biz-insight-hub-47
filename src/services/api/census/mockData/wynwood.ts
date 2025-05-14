
import { CensusDataResponse } from '../types';

export const WYNWOOD_CENSUS_DATA: CensusDataResponse = {
  population: 12467,
  median_age: 31.8,
  median_income: 64318,
  households: 5123,
  total_housing_units: 5800,
  district: "Wynwood",
  location_name: "Wynwood, Miami",
  education: {
    high_school_or_higher_percent: 86,
    bachelors_or_higher_percent: 38
  },
  housing: {
    median_home_value: 410000,
    median_rent: 1950
  },
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
};
