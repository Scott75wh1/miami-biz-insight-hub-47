
import { CensusDataResponse } from '../types';

export const BRICKELL_CENSUS_DATA: CensusDataResponse = {
  population: 34975,
  median_age: 34.1,
  median_income: 98752,
  households: 17456,
  total_housing_units: 20100,
  district: "Brickell",
  location_name: "Brickell, Miami",
  education: {
    high_school_or_higher_percent: 95,
    bachelors_or_higher_percent: 67
  },
  housing: {
    median_home_value: 680000,
    median_rent: 2450
  },
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
};
