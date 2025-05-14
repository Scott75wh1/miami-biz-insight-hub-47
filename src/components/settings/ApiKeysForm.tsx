
import React from 'react';
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";

const formSchema = z.object({
  googlePlacesApiKey: z.string().min(1, "L'API Key di Google Places è richiesta"),
  censusGovApiKey: z.string().min(1, "L'API Key di Census.gov è richiesta"),
  yelpApiKey: z.string().min(1, "L'API Key di Yelp è richiesta"),
  googleTrendsApiKey: z.string().min(1, "L'API Key di Google Trends è richiesta"),
  openAIApiKey: z.string().min(1, "L'API Key di OpenAI è richiesta"),
});

export type SettingsFormValues = z.infer<typeof formSchema>;

interface ApiKeysFormProps {
  form: UseFormReturn<SettingsFormValues>;
  onSubmit: (data: SettingsFormValues) => void;
  testApiKey?: (service: string, key: string) => Promise<boolean>;
}

export const apiFormSchema = formSchema;

export const ApiKeysForm = ({ form, onSubmit, testApiKey }: ApiKeysFormProps) => {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <FormField
          control={form.control}
          name="googlePlacesApiKey"
          render={({ field }) => {
            const validation = getKeyValidationState(field.value, 'googlePlacesApiKey');
            return (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                Google Places API Key
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
                  placeholder="Inserisci la tua API key di Google Places" 
                  {...field}
                  className={field.value && !isDemoKey(field.value) ? "border-green-300 focus:border-green-500" : ""}
                />
              </FormControl>
              <FormDescription>
                Utilizzata per cercare e visualizzare informazioni sui luoghi a Miami.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}}
        />
        <FormField
          control={form.control}
          name="censusGovApiKey"
          render={({ field }) => {
            const validation = getKeyValidationState(field.value, 'censusGovApiKey');
            return (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                Census.gov API Key
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
                  placeholder="Inserisci la tua API key di Census.gov" 
                  {...field} 
                  className={field.value && !isDemoKey(field.value) ? "border-green-300 focus:border-green-500" : ""}
                />
              </FormControl>
              <FormDescription>
                Utilizzata per accedere ai dati demografici di Miami.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}}
        />
        <FormField
          control={form.control}
          name="yelpApiKey"
          render={({ field }) => {
            const validation = getKeyValidationState(field.value, 'yelpApiKey');
            return (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                Yelp API Key
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
                  placeholder="Inserisci la tua API key di Yelp" 
                  {...field} 
                  className={field.value && !isDemoKey(field.value) ? "border-green-300 focus:border-green-500" : ""}
                />
              </FormControl>
              <FormDescription>
                Utilizzata per l'analisi dei competitor tramite le recensioni di Yelp.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}}
        />
        <FormField
          control={form.control}
          name="googleTrendsApiKey"
          render={({ field }) => {
            const validation = getKeyValidationState(field.value, 'googleTrendsApiKey');
            return (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                Google Trends API Key
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
                  placeholder="Inserisci la tua API key di Google Trends" 
                  {...field}
                  className={field.value && !isDemoKey(field.value) ? "border-green-300 focus:border-green-500" : ""}
                />
              </FormControl>
              <FormDescription>
                Utilizzata per analizzare i trend di mercato a Miami.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}}
        />
        <FormField
          control={form.control}
          name="openAIApiKey"
          render={({ field }) => {
            const validation = getKeyValidationState(field.value, 'openAIApiKey');
            return (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                OpenAI API Key
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
                  placeholder="Inserisci la tua API key di OpenAI" 
                  {...field}
                  className={field.value && !isDemoKey(field.value) ? "border-green-300 focus:border-green-500" : ""}
                  type="password"
                />
              </FormControl>
              <FormDescription>
                Utilizzata dall'assistente AI per interpretare e contestualizzare i dati.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}}
        />
        <DialogFooter>
          <Button type="submit">Salva Impostazioni</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
