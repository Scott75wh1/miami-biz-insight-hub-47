
import { CensusDataResponse } from './types';

// Mock data by district
export const DISTRICT_CENSUS_DATA: Record<string, CensusDataResponse> = {
  "Downtown": {
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
  },
  "Brickell": {
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
  },
  "Wynwood": {
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
  },
  "Little Havana": {
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
  },
  "Miami Beach": {
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
  }
};

// Generic Miami data for when a specific district is not found
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
