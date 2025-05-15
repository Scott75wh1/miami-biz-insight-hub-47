
import React from 'react';
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form,
} from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ApiKeyField } from './ApiKeyField';

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
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <ApiKeyField
          form={form}
          name="googlePlacesApiKey"
          label="Google Places API Key"
          description="Utilizzata per cercare e visualizzare informazioni sui luoghi a Miami."
          placeholder="Inserisci la tua API key di Google Places"
        />

        <ApiKeyField
          form={form}
          name="censusGovApiKey"
          label="Census.gov API Key"
          description="Utilizzata per accedere ai dati demografici di Miami."
          placeholder="Inserisci la tua API key di Census.gov"
        />

        <ApiKeyField
          form={form}
          name="yelpApiKey"
          label="Yelp API Key"
          description="Utilizzata per l'analisi dei competitor tramite le recensioni di Yelp."
          placeholder="Inserisci la tua API key di Yelp"
        />

        <ApiKeyField
          form={form}
          name="googleTrendsApiKey"
          label="Google Trends API Key"
          description="Utilizzata per analizzare i trend di mercato a Miami."
          placeholder="Inserisci la tua API key di Google Trends"
        />

        <ApiKeyField
          form={form}
          name="openAIApiKey"
          label="OpenAI API Key"
          description="Utilizzata dall'assistente AI per interpretare e contestualizzare i dati."
          placeholder="Inserisci la tua API key di OpenAI"
          type="password"
        />
        
        <DialogFooter>
          <Button type="submit">Salva Impostazioni</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
