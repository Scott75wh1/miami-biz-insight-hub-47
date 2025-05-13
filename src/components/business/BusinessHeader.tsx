
import React from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

interface BusinessHeaderProps {
  name: string;
  address: string;
  district: string;
  type: string;
}

export const BusinessHeader: React.FC<BusinessHeaderProps> = ({
  name,
  address,
  district,
  type
}) => {
  // Format business type for display
  const formatBusinessType = (type: string) => {
    return type.replace('_', ' ').split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription className="mt-1 flex items-center">
          <MapPin className="mr-1 h-4 w-4" />
          {address}
        </CardDescription>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Badge variant="outline" className="ml-2">
          {formatBusinessType(type)}
        </Badge>
        <Badge variant="secondary" className="ml-2">
          {district}
        </Badge>
      </div>
    </div>
  );
};
