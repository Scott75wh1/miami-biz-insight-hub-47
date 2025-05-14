
import React, { useEffect } from 'react';
import { CensusDataResponse } from '@/services/api/censusService';
import { StatBox, ProgressItem, formatNumber } from '../utils/CensusUtils';
import { Car, Building, Route, MapPin } from 'lucide-react';

interface DemographicsTabProps {
  censusData: CensusDataResponse;
  key?: string; // Aggiungiamo una prop key opzionale per forzare il re-render
}

const DemographicsTab: React.FC<DemographicsTabProps> = ({ censusData }) => {
  useEffect(() => {
    // Log per debugging
    console.log('DemographicsTab rendering with data:', censusData);
  }, [censusData]);

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
        <div className="space-y-3 mb-6">
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

      {censusData.demographics?.commute?.work_location && (
        <>
          <div className="flex items-center mb-3">
            <Building className="mr-2 h-5 w-5 text-muted-foreground" />
            <h4 className="font-semibold">Origin-Destination (OD) del lavoro</h4>
          </div>
          <div className="space-y-3 mb-6">
            <ProgressItem 
              label="All'interno del distretto" 
              value={censusData.demographics.commute.work_location.within_district} 
              color="bg-green-500" 
            />
            <ProgressItem 
              label="Altri distretti della città" 
              value={censusData.demographics.commute.work_location.other_district} 
              color="bg-blue-500" 
            />
            <ProgressItem 
              label="Fuori città" 
              value={censusData.demographics.commute.work_location.outside_city} 
              color="bg-amber-500" 
            />
          </div>
        </>
      )}

      {censusData.demographics?.commute?.transportation_mode && (
        <>
          <div className="flex items-center mb-3">
            <Route className="mr-2 h-5 w-5 text-muted-foreground" />
            <h4 className="font-semibold">Modalità di trasporto casa-lavoro</h4>
          </div>
          <div className="space-y-3">
            <ProgressItem 
              label="Automobile" 
              value={censusData.demographics.commute.transportation_mode.car} 
              color="bg-gray-500" 
            />
            <ProgressItem 
              label="Trasporto pubblico" 
              value={censusData.demographics.commute.transportation_mode.public_transport} 
              color="bg-blue-500" 
            />
            <ProgressItem 
              label="A piedi" 
              value={censusData.demographics.commute.transportation_mode.walking} 
              color="bg-green-500" 
            />
            <ProgressItem 
              label="Bicicletta" 
              value={censusData.demographics.commute.transportation_mode.bicycle} 
              color="bg-orange-400" 
            />
            <ProgressItem 
              label="Lavoro da casa" 
              value={censusData.demographics.commute.transportation_mode.work_from_home} 
              color="bg-purple-400" 
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DemographicsTab;
