
// Import from toast.tsx
import { type ToastActionElement, ToastProps as ToastPrimitiveProps } from "@/components/ui/toast"

// Define our own ToastProps 
export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

// Create a proper hook implementation
export const useToast = () => {
  const toast = ({ title, description, variant = 'default' }: ToastProps) => {
    // Import at call-time to avoid circular dependencies
    const { toast: hookToast } = require("@/components/ui/toast") as {
      toast: (props: ToastPrimitiveProps) => void
    }
    
    hookToast({
      title,
      description,
      variant
    });
  };
  
  return { toast };
};

export type { ToastActionElement } from "@/components/ui/toast";
