
// Servizio di logging centralizzato per tracciare le chiamate API

interface LogEntry {
  timestamp: string;
  service: string;
  endpoint: string;
  parameters: any;
  response?: any;
  error?: any;
}

class APILogger {
  private logs: LogEntry[] = [];
  private static instance: APILogger;

  private constructor() {}

  public static getInstance(): APILogger {
    if (!APILogger.instance) {
      APILogger.instance = new APILogger();
    }
    return APILogger.instance;
  }

  logAPICall(service: string, endpoint: string, parameters: any): number {
    const logIndex = this.logs.length;
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      service,
      endpoint,
      parameters
    };
    
    console.log(`[API Call] ${service}:${endpoint}`, parameters);
    this.logs.push(entry);
    return logIndex;
  }

  logAPIResponse(logIndex: number, response: any): void {
    if (this.logs[logIndex]) {
      this.logs[logIndex].response = response;
      console.log(`[API Response] ${this.logs[logIndex].service}:${this.logs[logIndex].endpoint}`, response);
    }
  }

  logAPIError(logIndex: number, error: any): void {
    if (this.logs[logIndex]) {
      this.logs[logIndex].error = error;
      console.error(`[API Error] ${this.logs[logIndex].service}:${this.logs[logIndex].endpoint}`, error);
    }
  }

  getLogs(): LogEntry[] {
    return this.logs;
  }

  clearLogs(): void {
    this.logs = [];
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
