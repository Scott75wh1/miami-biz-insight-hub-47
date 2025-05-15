
// Define types for census API responses
export interface CensusDataResponse {
  population: number;
  median_age: number;
  median_income: number;
  households: number;
  total_housing_units: number;
  district: string;
  location_name: string;
  education: {
    high_school_or_higher_percent: number;
    bachelors_or_higher_percent: number;
    bachelor_degree?: number;
    high_school_diploma?: number;
    advanced_degree?: number;
    public_schools?: number;
    private_schools?: number;
    universities?: number;
    education_level_distribution?: {
      [key: string]: number;
    };
  };
  housing: {
    median_home_value: number;
    median_rent: number;
    median_home_price?: number;
    housing_units?: number;
    ownership_rate?: number;
    rental_rate?: number;
    price_growth?: number;
    housing_type_distribution?: {
      [key: string]: number;
    };
  };
  // Demographics nested object with optional fields
  demographics?: {
    gender_distribution?: {
      male: number;
      female: number;
    };
    population_density?: number;
    population_growth?: number;
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
    economic?: {
      unemployment_rate: number;
      poverty_rate: number;
      business_count: number;
      median_rent: number;
    };
    housing?: {
      owner_occupied: number;
      renter_occupied: number;
      vacancy_rate: number;
      median_home_value: number;
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
  // Add economics field that CensusDetail page expects
  economics?: {
    median_income: number;
    unemployment_rate: number;
    jobs: number;
    business_count: number;
    economic_growth: number;
    main_industry: string;
    industry_distribution: {
      [key: string]: number;
    };
  };
  errorMessage?: string; // Optional field for error messages
}
