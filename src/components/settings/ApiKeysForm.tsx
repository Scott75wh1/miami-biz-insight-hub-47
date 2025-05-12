
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
}

export const apiFormSchema = formSchema;

export const ApiKeysForm = ({ form, onSubmit }: ApiKeysFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <FormField
          control={form.control}
          name="googlePlacesApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Google Places API Key</FormLabel>
              <FormControl>
                <Input placeholder="Inserisci la tua API key di Google Places" {...field} />
              </FormControl>
              <FormDescription>
                Utilizzata per cercare e visualizzare informazioni sui luoghi a Miami.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="censusGovApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Census.gov API Key</FormLabel>
              <FormControl>
                <Input placeholder="Inserisci la tua API key di Census.gov" {...field} />
              </FormControl>
              <FormDescription>
                Utilizzata per accedere ai dati demografici di Miami.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="yelpApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yelp API Key</FormLabel>
              <FormControl>
                <Input placeholder="Inserisci la tua API key di Yelp" {...field} />
              </FormControl>
              <FormDescription>
                Utilizzata per l'analisi dei competitor tramite le recensioni di Yelp.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="googleTrendsApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Google Trends API Key</FormLabel>
              <FormControl>
                <Input placeholder="Inserisci la tua API key di Google Trends" {...field} />
              </FormControl>
              <FormDescription>
                Utilizzata per analizzare i trend di mercato a Miami.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="openAIApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OpenAI API Key</FormLabel>
              <FormControl>
                <Input placeholder="Inserisci la tua API key di OpenAI" {...field} />
              </FormControl>
              <FormDescription>
                Utilizzata dall'assistente AI per interpretare e contestualizzare i dati.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit">Salva Impostazioni</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
