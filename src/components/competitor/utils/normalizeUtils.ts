
/**
 * Normalize a value to a string or undefined
 * 
 * @param value Any value to normalize
 * @returns Normalized string or undefined
 */
export const normalizeValue = (value: any): string | undefined => {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }
  // Handle objects with "_type" and "value" properties
  if (typeof value === 'object' && value !== null && '_type' in value && 'value' in value) {
    if (value.value === 'undefined' || value._type === 'undefined') {
      return undefined;
    }
    return String(value.value);
  }
  return String(value);
};
