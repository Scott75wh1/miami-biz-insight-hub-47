
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { Suggestion } from '@/types/chatTypes';

interface SuggestionListProps {
  suggestions: Suggestion[];
  onSuggestionClick: (suggestion: string) => void;
}

const SuggestionList: React.FC<SuggestionListProps> = ({ suggestions, onSuggestionClick }) => {
  if (suggestions.length === 0) return null;
  
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-2">Suggerimenti:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSuggestionClick(suggestion.text)}
            className="text-xs flex items-center gap-1"
          >
            <Sparkles className="h-3 w-3 text-primary" />
            {suggestion.label || suggestion.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionList;
