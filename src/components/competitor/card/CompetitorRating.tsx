
import React from 'react';
import { Star } from 'lucide-react';

interface CompetitorRatingProps {
  rating: number;
  reviews: number;
  review_count?: number;
  className?: string;
  showReviewCount?: boolean;
}

export const CompetitorRating: React.FC<CompetitorRatingProps> = ({
  rating,
  reviews,
  review_count,
  className = '',
  showReviewCount = true,
}) => {
  // Get rating color based on score
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3.5) return 'text-amber-500';
    return 'text-red-500';
  };
  
  const ratingColor = getRatingColor(rating);
  const reviewCount = reviews || review_count || 0;
  
  return (
    <div className={`flex items-center ${ratingColor} font-medium ${className}`}>
      <Star className="h-3 w-3 mr-1 fill-current" />
      <span>{rating}</span>
      {showReviewCount && (
        <span className="text-muted-foreground text-xs ml-1">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
