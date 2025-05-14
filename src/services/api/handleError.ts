
export const handleApiError = (error: any, serviceName: string) => {
  const errorMessage = error?.message || 'Unknown error occurred';
  const errorDetails = {
    timestamp: new Date().toISOString(),
    service: serviceName,
    message: errorMessage,
    stack: error?.stack,
    status: error?.response?.status || 'unknown'
  };
  
  console.error(`Error with ${serviceName} API:`, errorDetails);
  
  // Return a standardized error response
  return {
    error: true,
    errorType: 'API_CONNECTION_ERROR',
    service: serviceName,
    message: `Failed to connect to ${serviceName} API: ${errorMessage}`,
    timestamp: new Date().toISOString(),
    // Include mock data flag to indicate this is not real data
    usingMockData: true
  };
};

// Helper to check API responses for common issues
export const validateApiResponse = (data: any, serviceName: string) => {
  if (!data) {
    console.warn(`Empty response from ${serviceName} API, using mock data`);
    return false;
  }
  
  if (data.error) {
    console.warn(`Error in ${serviceName} API response:`, data.error);
    return false;
  }
  
  return true;
};
