
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="p-3 rounded-lg border bg-accent/50 border-accent/20 text-foreground">
      <div className="mb-1 text-xs text-muted-foreground">
        Assistente
      </div>
      <div className="flex space-x-2 items-center">
        <div className="animate-pulse flex space-x-1">
          <div className="h-2 w-2 bg-primary rounded-full"></div>
          <div className="h-2 w-2 bg-primary rounded-full animation-delay-200"></div>
          <div className="h-2 w-2 bg-primary rounded-full animation-delay-400"></div>
        </div>
        <span className="text-sm text-muted-foreground">Generando risposta...</span>
      </div>
    </div>
  );
};

export default TypingIndicator;
