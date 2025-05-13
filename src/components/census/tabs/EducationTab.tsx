
import React from 'react';
import { CensusDataResponse } from '@/services/api/censusService';
import { ProgressItem } from '../utils/CensusUtils';

interface EducationTabProps {
  censusData: CensusDataResponse;
}

const EducationTab: React.FC<EducationTabProps> = ({ censusData }) => {
  return (
    <div className="pt-4">
      <h4 className="font-semibold mb-4">Livelli di Istruzione</h4>
      {censusData.demographics?.education && (
        <div className="space-y-4">
          <ProgressItem 
            label="Meno del diploma di scuola superiore" 
            value={censusData.demographics.education.less_than_high_school} 
            color="bg-red-400" 
          />
          <ProgressItem 
            label="Diploma di scuola superiore" 
            value={censusData.demographics.education.high_school} 
            color="bg-amber-400" 
          />
          <ProgressItem 
            label="Alcuni studi universitari" 
            value={censusData.demographics.education.some_college} 
            color="bg-blue-400" 
          />
          <ProgressItem 
            label="Laurea triennale" 
            value={censusData.demographics.education.bachelors} 
            color="bg-green-400" 
          />
          <ProgressItem 
            label="Laurea magistrale o superiore" 
            value={censusData.demographics.education.graduate} 
            color="bg-purple-400" 
          />
        </div>
      )}
    </div>
  );
};

export default EducationTab;
