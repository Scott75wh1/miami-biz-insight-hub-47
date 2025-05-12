
// Error handler for API requests
export const handleApiError = (error: any, serviceName: string) => {
  console.error(`Error in ${serviceName} API call:`, error);
  return null;
};
