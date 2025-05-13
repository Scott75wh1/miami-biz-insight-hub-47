
import React from 'react';
import { CensusDataResponse } from '@/services/api/censusService';
import { formatNumber } from '../utils/CensusUtils';

interface OverviewTabProps {
  censusData: CensusDataResponse;
  selectedDistrict: string;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ censusData, selectedDistrict }) => {
  return (
    <div className="pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Panoramica Demografica</h4>
          <p className="text-sm mb-4">
            Il distretto di {selectedDistrict} ha una popolazione di {formatNumber(censusData.population)} abitanti, 
            con un'età mediana di {censusData.median_age} anni. La distribuzione etnica è 
            prevalentemente {censusData.demographics?.race_distribution?.hispanic && censusData.demographics.race_distribution.hispanic > 30 ? "ispanica" : "varia"}, 
            con un reddito mediano di ${formatNumber(censusData.median_income)} annui.
          </p>

          <h4 className="font-semibold mb-3">Tendenze Economiche</h4>
          <p className="text-sm">
            L'economia di {selectedDistrict} è caratterizzata da 
            {censusData.demographics?.economic?.unemployment_rate && censusData.demographics.economic.unemployment_rate < 5 
              ? " bassi livelli di disoccupazione" 
              : " sfide occupazionali"}, 
            con un tasso di disoccupazione del {censusData.demographics?.economic?.unemployment_rate || 0}%. 
            Il distretto ospita circa {formatNumber(censusData.demographics?.economic?.business_count || 0)} attività commerciali.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Situazione Abitativa</h4>
          <p className="text-sm mb-4">
            Il valore mediano degli immobili in {selectedDistrict} è di ${formatNumber(censusData.demographics?.housing?.median_home_value || 0)}, 
            con un tasso di occupazione da parte dei proprietari del {censusData.demographics?.housing?.owner_occupied || 0}%. 
            Il costo mediano dell'affitto è di ${formatNumber(censusData.demographics?.economic?.median_rent || 0)} mensili.
          </p>

          <h4 className="font-semibold mb-3">Livello di Istruzione</h4>
          <p className="text-sm">
            Il {censusData.demographics?.education?.bachelors || 0 + (censusData.demographics?.education?.graduate || 0)}% dei residenti 
            possiede almeno una laurea. Il {censusData.demographics?.education?.less_than_high_school || 0}% non ha completato 
            la scuola superiore.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
