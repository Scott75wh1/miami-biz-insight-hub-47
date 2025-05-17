
import React from 'react';
import { Star } from 'lucide-react';

interface Review {
  rating: number;
  text: string;
}

interface CompetitorReviewsProps {
  reviews?: Review[];
}

export const CompetitorReviews: React.FC<CompetitorReviewsProps> = ({ reviews }) => {
  if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
    return <p className="text-sm text-muted-foreground">Nessuna recensione disponibile</p>;
  }

  return (
    <div className="space-y-2">
      {reviews.map((review, idx) => (
        <div key={idx} className="bg-muted/30 p-2 rounded">
          <div className="flex items-center mb-1">
            {Array(Math.floor(review.rating || 4)).fill(0).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-xs italic">{review.text}</p>
        </div>
      ))}
    </div>
  );
};
