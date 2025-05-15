
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  );
};

export default TypingIndicator;
