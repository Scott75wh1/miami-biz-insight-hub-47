
import { useState } from 'react';

export const useChatInputHandling = () => {
  const [input, setInput] = useState('');
  
  const handleInputChange = (value: string) => {
    setInput(value);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };
  
  return {
    input,
    setInput,
    handleInputChange,
    handleSuggestionClick
  };
};
