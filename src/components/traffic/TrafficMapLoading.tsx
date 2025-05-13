
import React from 'react';
import { Loader2 } from 'lucide-react';

export const TrafficMapLoading: React.FC = () => {
  return (
    <div className="flex h-full items-center justify-center bg-gray-100">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      <span className="ml-2">Caricamento della mappa...</span>
    </div>
  );
};
