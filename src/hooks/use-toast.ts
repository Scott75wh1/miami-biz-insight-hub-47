
import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Toast,
  ToastActionElement,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export const ToastContext = React.createContext<{
  toast: ({ title, description, action, ...props }: {
    title?: React.ReactNode
    description?: React.ReactNode
    action?: ToastActionElement
    variant?: "default" | "destructive"
    id?: string
  }) => void
  dismiss: (toastId?: string) => void
}>({
  toast: () => {},
  dismiss: () => {},
})

interface ToastProps {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  variant?: "default" | "destructive"
  id?: string
}

export function useToast() {
  const { toast, dismiss } = React.useContext(ToastContext)

  return {
    toast,
    dismiss,
  }
}

export function Toaster() {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const { toast, dismiss } = React.useMemo(() => {
    const add = (data: ToastProps) => {
      const id = crypto.randomUUID()
      setToasts((prev) => [...prev, { ...data, id }])
      return id
    }

    const dismiss = (toastId?: string) => {
      setToasts((prev) =>
        toastId
          ? prev.filter((toast) => toast.id !== toastId)
          : prev.slice(0, -1)
      )
    }

    return {
      toast: (data: ToastProps) => add(data),
      dismiss,
    }
  }, [])

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      <ToastProvider>
        {toasts.map(({ id, title, description, action, variant, ...props }) => (
          <Toast key={id} {...props} variant={variant}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}
