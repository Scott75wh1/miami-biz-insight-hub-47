
import { CensusDataResponse } from '../types';
import { DOWNTOWN_CENSUS_DATA } from './downtown';
import { BRICKELL_CENSUS_DATA } from './brickell';
import { WYNWOOD_CENSUS_DATA } from './wynwood';
import { LITTLE_HAVANA_CENSUS_DATA } from './littleHavana';
import { MIAMI_BEACH_CENSUS_DATA } from './miamiBeach';
import { GENERIC_MIAMI_DATA } from './genericMiami';

// Create a centralized district data map
export const DISTRICT_CENSUS_DATA: Record<string, CensusDataResponse> = {
  "Downtown": DOWNTOWN_CENSUS_DATA,
  "Brickell": BRICKELL_CENSUS_DATA,
  "Wynwood": WYNWOOD_CENSUS_DATA,
  "Little Havana": LITTLE_HAVANA_CENSUS_DATA,
  "Miami Beach": MIAMI_BEACH_CENSUS_DATA
};

// Export the generic Miami data
export { GENERIC_MIAMI_DATA };
