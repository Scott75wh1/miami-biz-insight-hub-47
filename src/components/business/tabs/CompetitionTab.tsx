
import React, { useEffect, useState } from 'react';
import { Building, Award, ThumbsUp, ThumbsDown } from 'lucide-react';

interface CompetitionTabProps {
  competitionAnalysis: string;
  district: string;
  yelpBusinesses?: any[];
}

export const CompetitionTab: React.FC<CompetitionTabProps> = ({
  competitionAnalysis,
  district,
  yelpBusinesses
}) => {
  // Local state to track the last district
  const [lastDistrict, setLastDistrict] = useState<string>(district);
  
  // Debug logs when the component updates
  useEffect(() => {
    console.log(`[CompetitionTab] Rendered for district: ${district}`);
    console.log(`[CompetitionTab] Competition businesses data:`, yelpBusinesses?.length || 0);
    console.log(`[CompetitionTab] Sample business data:`, yelpBusinesses?.[0] || 'No businesses');
    
    // Update local state when district changes
    if (district !== lastDistrict) {
      console.log(`[CompetitionTab] District changed from ${lastDistrict} to ${district}`);
      setLastDistrict(district);
    }
  }, [district, yelpBusinesses, lastDistrict]);
  
  // Normalize the district name to handle "North Miami" correctly
  const normalizedDistrict = district.toLowerCase().includes('north miami') ? 'North Miami' : district;
  
  return (
    <div>
      <div className="flex items-center mb-3">
        <Building className="mr-2 h-5 w-5 text-orange-500" />
        <h3 className="font-medium text-lg">Analisi della Concorrenza</h3>
      </div>
      <div className="p-4 bg-muted rounded-md">
        <p>{competitionAnalysis}</p>
      </div>
      
      {yelpBusinesses && yelpBusinesses.length > 0 ? (
        <div className="mt-6">
          <h4 className="text-md font-medium mb-3">Principali concorrenti nella zona di {normalizedDistrict}</h4>
          <div className="space-y-4">
            {yelpBusinesses.slice(0, 5).map((business: any, index: number) => (
              <div key={`${district}-${business.name}-${index}`} className="border rounded-md p-4 bg-white shadow-sm">
                <div className="font-medium flex justify-between items-center mb-2">
                  <span className="text-primary">{business.name}</span>
                  <span className="text-amber-500 flex items-center">
                    {business.rating} <Award className="h-3 w-3 ml-1" />
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mb-3">{business.location?.address1 || 'Indirizzo non disponibile'}</div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm font-medium">Punti di Forza</span>
                    </div>
                    <ul className="text-xs space-y-1 ml-6">
                      {business.reviews && business.reviews.length > 0 
                        ? (
                            <li>• {business.reviews[0].text.split('.')[0]}.</li>
                          )
                        : (
                            <>
                              <li>• Valutazione: {business.rating}/5</li>
                              <li>• {business.review_count} recensioni</li>
                              <li>• Posizione strategica nel quartiere</li>
                            </>
                          )
                      }
                    </ul>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <ThumbsDown className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm font-medium">Punti Deboli</span>
                    </div>
                    <ul className="text-xs space-y-1 ml-6">
                      <li>• Orari di apertura limitati</li>
                      <li>• Scarsa presenza sui social media</li>
                      <li>• Parcheggio limitato</li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm italic mt-4">Nessuna informazione disponibile sui concorrenti in {normalizedDistrict}</p>
      )}
      
      <p className="text-sm text-muted-foreground mt-3">
        Basato sui dati di competitor simili nell'area {normalizedDistrict}
      </p>
    </div>
  );
};
