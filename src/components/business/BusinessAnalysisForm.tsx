
import React from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin } from 'lucide-react';

const formSchema = z.object({
  businessName: z.string().min(3, {
    message: "Il nome dell'attività deve contenere almeno 3 caratteri",
  }),
  businessAddress: z.string().min(5, {
    message: "L'indirizzo deve essere completo",
  }),
});

export type BusinessFormValues = z.infer<typeof formSchema>;

interface BusinessAnalysisFormProps {
  isAnalyzing: boolean;
  onSubmit: (values: BusinessFormValues) => void;
}

const BusinessAnalysisForm = ({ isAnalyzing, onSubmit }: BusinessAnalysisFormProps) => {
  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      businessAddress: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome dell'Attività</FormLabel>
              <FormControl>
                <Input 
                  placeholder="es. Pizzeria Napoli, Tech Solutions, ecc." 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Inserisci il nome completo della tua attività
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="businessAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Indirizzo</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="es. 123 Ocean Drive, Miami Beach, FL 33139" 
                    className="pl-8"
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormDescription>
                Inserisci l'indirizzo completo della tua attività
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isAnalyzing} className="w-full">
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analisi in corso...
            </>
          ) : "Analizza la mia attività"}
        </Button>
      </form>
    </Form>
  );
};

export default BusinessAnalysisForm;
