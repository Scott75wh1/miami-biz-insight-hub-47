
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  input: string;
  isProcessing: boolean;
  currentRequestId: string | null;
}

export interface Suggestion {
  forType: string;
  text: string;
  label?: string; // Added optional label property
}
