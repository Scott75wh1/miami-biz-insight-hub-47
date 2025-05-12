
import React from 'react';

interface PlaceData {
  name: string;
  vicinity: string;
  rating: number;
}

interface PlaceResultsListProps {
  places: PlaceData[];
  address: string;
}

const PlaceResultsList: React.FC<PlaceResultsListProps> = ({ places, address }) => {
  return (
    <div className="mt-4 bg-white/80 p-3 rounded-md">
      <h4 className="font-medium mb-2 text-sm">Risultati per {address}</h4>
      <ul className="space-y-2 text-sm">
        {places.map((place, idx) => (
          <li key={idx} className="border-b pb-2">
            <div className="font-medium">{place.name}</div>
            <div className="text-xs text-muted-foreground">{place.vicinity}</div>
            <div className="text-xs">Rating: {place.rating}/5</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceResultsList;
