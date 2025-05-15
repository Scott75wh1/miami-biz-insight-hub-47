
import { toast as toastPrimitive } from "@/components/ui/toast";

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export const useToast = () => {
  const toast = ({ title, description, variant = 'default' }: ToastProps) => {
    toastPrimitive({
      title,
      description,
      variant,
    });
  };
  
  return { toast };
};

export { toastPrimitive as toast } from "@/components/ui/toast";
export type { ToastActionElement } from "@/components/ui/toast";
