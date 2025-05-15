
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  isError?: boolean;
}

export interface Suggestion {
  text: string;
  category?: string;
}

export interface ChatState {
  messages: Message[];
  input: string;
  isProcessing: boolean;
  activeMessageId: string | null;
  error: string | null;
}
