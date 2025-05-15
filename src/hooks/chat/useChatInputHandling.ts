
import { useState } from 'react';

export const useChatInputHandling = () => {
  const [input, setInput] = useState('');
  
  // Handle input change
  const handleInputChange = (value: string) => {
    setInput(value);
  };
  
  // Handle suggestion click
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
