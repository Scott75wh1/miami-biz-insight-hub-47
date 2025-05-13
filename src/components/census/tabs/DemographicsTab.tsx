
import React from 'react';
import { CensusDataResponse } from '@/services/api/censusService';
import { StatBox, ProgressItem, formatNumber } from '../utils/CensusUtils';

interface DemographicsTabProps {
  censusData: CensusDataResponse;
}

const DemographicsTab: React.FC<DemographicsTabProps> = ({ censusData }) => {
  return (
    <div className="pt-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatBox value={formatNumber(censusData.population)} label="Popolazione" />
        <StatBox value={censusData.median_age} label="Età Mediana" />
        <StatBox value={`$${formatNumber(censusData.median_income)}`} label="Reddito Mediano" />
        <StatBox value={formatNumber(censusData.households)} label="Nuclei Familiari" />
      </div>

      <h4 className="font-semibold mb-3">Distribuzione per Età</h4>
      {censusData.demographics?.age_distribution && (
        <div className="space-y-3 mb-6">
          <ProgressItem 
            label="Sotto i 18 anni" 
            value={censusData.demographics.age_distribution.under_18} 
            color="bg-blue-400" 
          />
          <ProgressItem 
            label="18-34 anni" 
            value={censusData.demographics.age_distribution.age_18_to_34} 
            color="bg-green-400" 
          />
          <ProgressItem 
            label="35-64 anni" 
            value={censusData.demographics.age_distribution.age_35_to_64} 
            color="bg-amber-400" 
          />
          <ProgressItem 
            label="65+ anni" 
            value={censusData.demographics.age_distribution.age_65_plus} 
            color="bg-red-400" 
          />
        </div>
      )}

      <h4 className="font-semibold mb-3">Distribuzione Etnica</h4>
      {censusData.demographics?.race_distribution && (
        <div className="space-y-3">
          <ProgressItem 
            label="Bianchi" 
            value={censusData.demographics.race_distribution.white} 
            color="bg-gray-400" 
          />
          <ProgressItem 
            label="Afroamericani" 
            value={censusData.demographics.race_distribution.black} 
            color="bg-gray-600" 
          />
          <ProgressItem 
            label="Asiatici" 
            value={censusData.demographics.race_distribution.asian} 
            color="bg-yellow-500" 
          />
          <ProgressItem 
            label="Ispanici" 
            value={censusData.demographics.race_distribution.hispanic} 
            color="bg-orange-400" 
          />
          <ProgressItem 
            label="Altri" 
            value={censusData.demographics.race_distribution.other} 
            color="bg-purple-400" 
          />
        </div>
      )}
    </div>
  );
};

export default DemographicsTab;
