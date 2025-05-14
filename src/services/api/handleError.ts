
// Error handler for API requests
export const handleApiError = (error: any, serviceName: string) => {
  console.error(`Error in ${serviceName} API call:`, error);
  
  // Add more detailed logging for business analysis services
  if (serviceName.includes('Business') || serviceName.includes('Analysis')) {
    console.error('Details:', {
      message: error.message,
      code: error.code,
      stack: error.stack?.slice(0, 500) // Limit stack trace length
    });
  }
  
  return null;
};
