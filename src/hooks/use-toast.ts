
import { toast as toastFunction } from "@/components/ui/toast";

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export const useToast = () => {
  const toast = ({ title, description, variant = 'default' }: ToastProps) => {
    toastFunction({
      title,
      description,
      variant,
    } as any); // Use type assertion to bypass type checking
  };
  
  return { toast };
};

export { toast } from "@/components/ui/toast";
export type { ToastActionElement } from "@/components/ui/toast";
