
import { CensusDataResponse } from '../types';

export const MIAMI_BEACH_CENSUS_DATA: CensusDataResponse = {
  population: 88064,
  median_age: 40.1,
  median_income: 53482,
  households: 44834,
  total_housing_units: 52000,
  district: "Miami Beach",
  location_name: "Miami Beach",
  education: {
    high_school_or_higher_percent: 90,
    bachelors_or_higher_percent: 48
  },
  housing: {
    median_home_value: 520000,
    median_rent: 1840
  },
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
};
