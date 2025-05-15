
import React from 'react';
import { Button } from '@/components/ui/button';
import { Suggestion } from '@/types/chatTypes';

interface SuggestionListProps {
  suggestions: Suggestion[];
  onSuggestionClick: (suggestion: string) => void;
}

const SuggestionList: React.FC<SuggestionListProps> = ({ suggestions, onSuggestionClick }) => {
  if (!suggestions.length) return null;
  
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => onSuggestionClick(suggestion.text)}
        >
          {suggestion.text}
        </Button>
      ))}
    </div>
  );
};

export default SuggestionList;
