
import { CensusDataResponse } from '../types';

export const DOWNTOWN_CENSUS_DATA: CensusDataResponse = {
  population: 92368,
  median_age: 36.2,
  median_income: 58943,
  households: 40128,
  total_housing_units: 47500,
  district: "Downtown",
  location_name: "Downtown Miami",
  education: {
    high_school_or_higher_percent: 88,
    bachelors_or_higher_percent: 46
  },
  housing: {
    median_home_value: 450000,
    median_rent: 1780
  },
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
};
