
import React from 'react';
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle } from "lucide-react";
import { SettingsFormValues } from "./ApiKeysForm";

interface ApiKeyFieldProps {
  form: UseFormReturn<SettingsFormValues>;
  name: keyof SettingsFormValues;
  label: string;
  description: string;
  placeholder: string;
  type?: string;
}

export const ApiKeyField = ({ 
  form, 
  name, 
  label, 
  description, 
  placeholder,
  type = "text" 
}: ApiKeyFieldProps) => {
  // Helper function to check if a key is a demo key
  const isDemoKey = (key: string) => !key || key === 'demo-key';
  
  // Function to validate key format (simplistic validation)
  const isValidKeyFormat = (key: string, service: string) => {
    if (isDemoKey(key)) return false;
    
    // Very basic validation patterns
    if (service === 'openAIApiKey' && !key.startsWith('sk-')) {
      return false;
    }
    
    return key.length > 10;
  };
  
  // Custom validation for API keys
  const getKeyValidationState = (key: string, service: string) => {
    if (isDemoKey(key)) return { valid: false, message: "Utilizzando chiave demo" };
    if (!isValidKeyFormat(key, service)) return { valid: false, message: "Formato chiave non valido" };
    return { valid: true, message: "Chiave valida" };
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const validation = getKeyValidationState(field.value, name);
        return (
          <FormItem>
            <FormLabel className="flex items-center justify-between">
              {label}
              {field.value && (
                validation.valid ? 
                  <span className="text-xs flex items-center text-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {validation.message}
                  </span> : 
                  <span className="text-xs flex items-center text-amber-600">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {validation.message}
                  </span>
              )}
            </FormLabel>
            <FormControl>
              <Input 
                placeholder={placeholder} 
                {...field} 
                className={field.value && !isDemoKey(field.value) ? "border-green-300 focus:border-green-500" : ""}
                type={type}
              />
            </FormControl>
            <FormDescription>
              {description}
            </FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
