
// Servizio di logging centralizzato per tracciare le chiamate API

interface LogEntry {
  timestamp: string;
  service: string;
  endpoint: string;
  parameters: any;
  response?: any;
  error?: any;
  duration?: number;
}

class APILogger {
  private logs: LogEntry[] = [];
  private static instance: APILogger;
  private startTimes: Map<number, number> = new Map();
  private maxLogs: number = 100; // Limita il numero di log per evitare problemi di memoria

  private constructor() {}

  public static getInstance(): APILogger {
    if (!APILogger.instance) {
      APILogger.instance = new APILogger();
    }
    return APILogger.instance;
  }

  logAPICall(service: string, endpoint: string, parameters: any): number {
    const logIndex = this.logs.length;
    const startTime = performance.now();
    
    this.startTimes.set(logIndex, startTime);
    
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      service,
      endpoint,
      parameters
    };
    
    console.log(`[API Call] ${service}:${endpoint}`, parameters);
    
    // Limitiamo il numero di log memorizzati
    if (this.logs.length >= this.maxLogs) {
      this.logs.shift(); // Rimuove il log più vecchio
    }
    
    this.logs.push(entry);
    return logIndex;
  }

  logAPIResponse(logIndex: number, response: any): void {
    if (this.logs[logIndex]) {
      const endTime = performance.now();
      const startTime = this.startTimes.get(logIndex) || endTime;
      const duration = endTime - startTime;
      
      this.logs[logIndex].response = response;
      this.logs[logIndex].duration = Math.round(duration);
      
      console.log(
        `[API Response] ${this.logs[logIndex].service}:${this.logs[logIndex].endpoint} (${duration.toFixed(1)}ms)`, 
        response
      );
      
      this.startTimes.delete(logIndex);
    }
  }

  logAPIError(logIndex: number, error: any): void {
    if (this.logs[logIndex]) {
      const endTime = performance.now();
      const startTime = this.startTimes.get(logIndex) || endTime;
      const duration = endTime - startTime;
      
      this.logs[logIndex].error = this.formatError(error);
      this.logs[logIndex].duration = Math.round(duration);
      
      console.error(
        `[API Error] ${this.logs[logIndex].service}:${this.logs[logIndex].endpoint} (${duration.toFixed(1)}ms)`, 
        error
      );
      
      this.startTimes.delete(logIndex);
    }
  }
  
  private formatError(error: any): any {
    // Formatta l'errore in modo più leggibile e utile per il debug
    if (!error) return { message: 'Unknown error' };
    
    return {
      message: error.message || 'No error message',
      stack: error.stack ? error.stack.split('\n').slice(0, 3).join('\n') : null,
      code: error.code,
      status: error.status,
      ...(error.response ? { 
        statusText: error.response.statusText,
        responseData: error.response.data 
      } : {})
    };
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
    this.startTimes.clear();
    console.log('[API Logger] Logs cleared');
  }

  downloadLogs(): void {
    const logsJson = JSON.stringify(this.logs, null, 2);
    const blob = new Blob([logsJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `api-logs-${new Date().toISOString().replace(/:/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export const apiLogger = APILogger.getInstance();
