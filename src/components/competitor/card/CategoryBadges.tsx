
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CategoryBadgesProps {
  category?: string | string[];
  limit?: number;
  className?: string;
}

export const CategoryBadges: React.FC<CategoryBadgesProps> = ({
  category,
  limit = 3,
  className = '',
}) => {
  if (!category) return null;
  
  const categories = Array.isArray(category) ? category : [category];
  
  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {categories.slice(0, limit).map((cat, idx) => (
        <Badge key={idx} variant="outline" className="text-xs">
          {cat}
        </Badge>
      ))}
    </div>
  );
};
