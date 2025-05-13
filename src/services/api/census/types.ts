
// Type definitions for Census API data

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
