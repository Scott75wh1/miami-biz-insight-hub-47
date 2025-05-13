
import React from 'react';
import { CensusDataResponse } from '@/services/api/censusService';
import { StatBox, formatNumber } from '../utils/CensusUtils';

interface EconomyTabProps {
  censusData: CensusDataResponse;
}

const EconomyTab: React.FC<EconomyTabProps> = ({ censusData }) => {
  return (
    <div className="pt-4">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatBox 
          value={`${censusData.demographics?.economic?.unemployment_rate || 0}%`} 
          label="Tasso di Disoccupazione" 
        />
        <StatBox 
          value={`${censusData.demographics?.economic?.poverty_rate || 0}%`} 
          label="Tasso di Povertà" 
        />
      </div>

      <h4 className="font-semibold mb-3">Economia Locale</h4>
      {censusData.demographics?.economic && (
        <div className="space-y-6 mb-6">
          <div>
            <div className="flex justify-between mb-1">
              <span>Numero di Imprese</span>
              <span>{formatNumber(censusData.demographics.economic.business_count)}</span>
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              Attività commerciali registrate nel distretto
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span>Affitto Mediano</span>
              <span>${formatNumber(censusData.demographics.economic.median_rent)}/mese</span>
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              Costo medio di locazione nel distretto
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EconomyTab;
