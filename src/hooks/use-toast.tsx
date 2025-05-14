
import * as React from "react";
import { createContext, useContext } from "react";
import { toast as sonnerToast } from "sonner";

type ToastActionElement = React.ReactElement<unknown>;

type ToastOptions = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive" | "success";
  duration?: number;
};

interface Toast extends ToastOptions {
  id: string | number;
}

type ToastContextType = {
  toast: (opts: ToastOptions) => void;
  dismiss: (id: number | string) => void;
  toasts: Toast[];
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  console.log("Toast provider rendered");
  
  // State to track active toasts
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = React.useCallback(
    ({ title, description, variant, action, ...props }: ToastOptions) => {
      const id = sonnerToast(title, {
        description,
        action,
        ...props,
        onDismiss: (toastId) => {
          setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
        },
      });
      
      // Add toast to our local state
      setToasts((prev) => [
        ...prev,
        { id, title, description, variant, action, ...props },
      ]);
      
      return id;
    },
    []
  );

  const dismiss = React.useCallback((toastId: number | string) => {
    sonnerToast.dismiss(toastId);
    setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
  }, []);

  const value = React.useMemo(
    () => ({ toast, dismiss, toasts }),
    [toast, dismiss, toasts]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    console.warn(
      "useToast was used outside of ToastProvider. A dummy implementation will be used."
    );
    return {
      toast: (opts: ToastOptions) => {
        console.warn("Toast attempted outside provider:", opts);
        return sonnerToast(opts.title, {
          description: opts.description,
          action: opts.action,
        });
      },
      dismiss: (id: number | string) => sonnerToast.dismiss(id),
      toasts: [] as Toast[],
    };
  }

  return context;
}

// Export the toast function directly for use in non-component code
export const toast = (opts: ToastOptions) => {
  console.log("Direct toast called:", opts);
  return sonnerToast(opts.title, {
    description: opts.description,
    action: opts.action,
  });
};
