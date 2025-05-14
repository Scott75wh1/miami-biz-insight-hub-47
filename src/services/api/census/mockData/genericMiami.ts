
import { CensusDataResponse } from '../types';

export const GENERIC_MIAMI_DATA: CensusDataResponse = {
  population: 442241,
  median_age: 40.1,
  median_income: 44268,
  households: 186860,
  total_housing_units: 205000,
  district: "Miami",
  location_name: "Miami, FL",
  education: {
    high_school_or_higher_percent: 84,
    bachelors_or_higher_percent: 35
  },
  housing: {
    median_home_value: 380000,
    median_rent: 1550
  }
};
