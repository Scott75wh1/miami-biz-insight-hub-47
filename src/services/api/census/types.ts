
// Define types for census API responses
export interface CensusDataResponse {
  population: number;
  median_age: number;
  median_income: number;
  households: number;
  total_housing_units: number; // Adding this field to fix the error
  district: string;
  location_name: string;
  education: {
    high_school_or_higher_percent: number;
    bachelors_or_higher_percent: number;
  };
  housing: {
    median_home_value: number;
    median_rent: number;
  };
  errorMessage?: string; // Optional field for error messages
}
