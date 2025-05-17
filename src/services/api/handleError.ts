
import { toast } from '@/hooks/use-toast';

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: any;
  status?: number;
  errorType?: string;
  service?: string;
  timestamp?: string;
  usingMockData?: boolean;
  trends?: any[]; // Added to match TrendsDataResponse
  district?: string; // Added to match TrendsDataResponse
}

/**
 * Gestisce gli errori delle API in modo uniforme in tutta l'applicazione
 */
export function handleApiError(error: any, serviceName: string = 'API'): ApiErrorResponse {
  console.error(`Errore in ${serviceName}:`, error);
  
  // Determina il messaggio di errore più appropriato
  let message = '';
  let status = error.status || 500;
  
  if (error.message) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = `Si è verificato un errore durante la comunicazione con ${serviceName}`;
  }
  
  // Condizionalmente mostra un toast per errori critici
  if (status >= 500 || error.isCritical) {
    toast({
      title: `Errore ${serviceName}`,
      description: message,
      variant: "destructive",
    });
  }
  
  // Create an object with all required fields to match both API error response interfaces
  return {
    success: false,
    message,
    error,
    status,
    errorType: error.errorType || 'api_error',
    service: serviceName,
    timestamp: new Date().toISOString(),
    usingMockData: false
  };
}

/**
 * Verifica se una risposta è un errore API
 */
export function isApiError(response: any): response is ApiErrorResponse {
  return response && response.success === false && typeof response.message === 'string';
}
