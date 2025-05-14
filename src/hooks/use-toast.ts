
import * as React from "react";
import { createContext, useContext } from "react";
import { toast as sonnerToast, type ToastT } from "sonner";

type ToastProps = React.ComponentProps<typeof ToastT>;
type ToastActionElement = React.ReactElement<unknown>;

type ToastOptions = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive" | "success";
  duration?: number;
};

type ToastContextType = {
  toast: (opts: ToastOptions) => void;
  dismiss: (id: number | string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  console.log("Toast provider rendered");

  const toast = React.useCallback(
    ({ title, description, variant, action, ...props }: ToastOptions) => {
      return sonnerToast(title, {
        description,
        action,
        ...props,
      });
    },
    []
  );

  const dismiss = React.useCallback((toastId: number | string) => {
    sonnerToast.dismiss(toastId);
  }, []);

  const value = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

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

