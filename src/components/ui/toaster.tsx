
import * as React from "react"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const [toasts, setToasts] = React.useState<any[]>([]);

  // Add custom useToast hook logic directly in the component
  // This is a workaround for circular dependency issues
  React.useEffect(() => {
    // Listen for toast events
    const handleToast = (event: CustomEvent<any>) => {
      const { toast } = event.detail;
      if (toast) {
        // Generate a unique id for the toast
        setToasts((prevToasts) => [
          ...prevToasts, 
          { ...toast, id: Math.random().toString(36).slice(2) }
        ]);
      }
    };

    document.addEventListener("toast", handleToast as EventListener);
    return () => document.removeEventListener("toast", handleToast as EventListener);
  }, []);

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
