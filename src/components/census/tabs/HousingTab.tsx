
import React from 'react';
import { CensusDataResponse } from '@/services/api/censusService';
import { StatBox, ProgressItem, formatNumber } from '../utils/CensusUtils';

interface HousingTabProps {
  censusData: CensusDataResponse;
}

const HousingTab: React.FC<HousingTabProps> = ({ censusData }) => {
  return (
    <div className="pt-4">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatBox 
          value={`$${formatNumber(censusData.demographics?.housing?.median_home_value || 0)}`} 
          label="Valore Mediano Casa" 
        />
        <StatBox 
          value={`${censusData.demographics?.housing?.vacancy_rate || 0}%`} 
          label="Tasso di Inoccupazione" 
        />
      </div>

      <h4 className="font-semibold mb-3">Proprietà degli Immobili</h4>
      {censusData.demographics?.housing && (
        <div className="space-y-3 mb-6">
          <ProgressItem 
            label="Occupata dai proprietari" 
            value={censusData.demographics.housing.owner_occupied} 
            color="bg-blue-500" 
          />
          <ProgressItem 
            label="Occupata da locatari" 
            value={censusData.demographics.housing.renter_occupied} 
            color="bg-amber-500" 
          />
          <ProgressItem 
            label="Vuota" 
            value={censusData.demographics.housing.vacancy_rate} 
            color="bg-gray-500" 
          />
        </div>
      )}
    </div>
  );
};

export default HousingTab;
