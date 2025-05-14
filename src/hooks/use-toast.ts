
import { useState } from "react"

import type { ToastActionElement, ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 5
export const TOAST_REMOVE_DELAY = 1000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function generateId() {
  return (count++).toString()
}

// To prevent duplicate toasts
let previousToastId: string | null = null
let previousToastTimestamp: number = 0
const DUPLICATE_TOAST_TIMEOUT = 3000 // 3 seconds

export function useToast() {
  const [state, setState] = useState<{
    toasts: ToasterToast[]
  }>({
    toasts: [],
  })

  function toast(props: Omit<ToasterToast, "id">) {
    // Check for duplicate toast prevention
    const now = Date.now()
    const toastHash = `${props.title}-${props.description}` // Simple hashing of toast content
    
    if (previousToastId && 
        previousToastHash === toastHash && 
        (now - previousToastTimestamp) < DUPLICATE_TOAST_TIMEOUT) {
      // Skip creating duplicate toast if the same content was shown within the timeout
      return { id: previousToastId, dismiss: () => dismiss(previousToastId) }
    }
    
    const id = generateId()
    const newToast = { id, ...props }

    // Store for duplicate prevention
    previousToastId = id
    previousToastHash = toastHash
    previousToastTimestamp = now

    setState((state) => {
      const nextToasts = [...state.toasts]
      const maxToasts = TOAST_LIMIT

      // Remove the oldest toasts if we exceed the limit
      if (nextToasts.length >= maxToasts) {
        nextToasts.splice(0, nextToasts.length - maxToasts + 1)
      }

      return {
        ...state,
        toasts: [...nextToasts, newToast],
      }
    })

    return {
      id,
      dismiss: () => dismiss(id),
    }
  }

  function update(id: string, props: ToasterToast) {
    if (id === previousToastId) {
      // Update the previous toast reference
      previousToastHash = `${props.title}-${props.description}`
    }

    setState((state) => ({
      ...state,
      toasts: state.toasts.map((t) => (t.id === id ? { ...t, ...props } : t)),
    }))
  }

  function dismiss(id: string) {
    setState((state) => ({
      ...state,
      toasts: state.toasts.map((t) =>
        t.id === id
          ? {
              ...t,
              open: false,
            }
          : t
      ),
    }))
  }

  function remove(id: string) {
    setState((state) => ({
      ...state,
      toasts: state.toasts.filter((t) => t.id !== id),
    }))
  }

  return {
    toasts: state.toasts,
    toast,
    update,
    dismiss,
    remove,
  }
}

// Additional variable needed for duplicate toast prevention
let previousToastHash: string = '';
