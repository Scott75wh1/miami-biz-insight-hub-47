
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  googlePlacesApiKey: z.string().min(1, "L'API Key di Google Places è richiesta"),
  censusGovApiKey: z.string().min(1, "L'API Key di Census.gov è richiesta"),
  yelpApiKey: z.string().min(1, "L'API Key di Yelp è richiesta"),
  googleTrendsApiKey: z.string().min(1, "L'API Key di Google Trends è richiesta"),
  openAIApiKey: z.string().min(1, "L'API Key di OpenAI è richiesta"),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export function SettingsDialog() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  
  // Recupera le API key salvate in localStorage
  const getSavedApiKeys = () => {
    if (typeof window === 'undefined') return {};
    
    const savedKeys = {
      googlePlacesApiKey: localStorage.getItem('googlePlacesApiKey') || '',
      censusGovApiKey: localStorage.getItem('censusGovApiKey') || '',
      yelpApiKey: localStorage.getItem('yelpApiKey') || '',
      googleTrendsApiKey: localStorage.getItem('googleTrendsApiKey') || '',
      openAIApiKey: localStorage.getItem('openAIApiKey') || '',
    };
    
    return savedKeys;
  };

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getSavedApiKeys(),
  });

  function onSubmit(data: SettingsFormValues) {
    // Salva le API keys nel localStorage
    localStorage.setItem('googlePlacesApiKey', data.googlePlacesApiKey);
    localStorage.setItem('censusGovApiKey', data.censusGovApiKey);
    localStorage.setItem('yelpApiKey', data.yelpApiKey);
    localStorage.setItem('googleTrendsApiKey', data.googleTrendsApiKey);
    localStorage.setItem('openAIApiKey', data.openAIApiKey);
    
    toast({
      title: "Impostazioni salvate",
      description: "Le API keys sono state salvate con successo",
    });
    
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Impostazioni API">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Impostazioni API</DialogTitle>
          <DialogDescription>
            Configura le API keys per i servizi esterni. Queste chiavi sono salvate localmente nel tuo browser.
          </DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}
