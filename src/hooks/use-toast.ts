
import { useToast as useHookToast } from "@/components/ui/use-toast";

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export const useToast = () => {
  const { toast: hookToast } = useHookToast();
  
  const toast = ({ title, description, variant = 'default' }: ToastProps) => {
    hookToast({
      title,
      description,
      variant
    });
  };
  
  return { toast };
};

export { toast } from "@/components/ui/use-toast";
