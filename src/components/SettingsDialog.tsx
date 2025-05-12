import React, { useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Settings, KeyRound, Info, AlertCircle } from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";

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
    if (typeof window === 'undefined') return {
      googlePlacesApiKey: '',
      censusGovApiKey: '',
      yelpApiKey: '',
      googleTrendsApiKey: '',
      openAIApiKey: '',
    };
    
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

  // Update form values when dialog opens
  useEffect(() => {
    if (open) {
      form.reset(getSavedApiKeys());
    }
  }, [open, form]);

  function onSubmit(data: SettingsFormValues) {
    // Salva le API keys nel localStorage
    localStorage.setItem('googlePlacesApiKey', data.googlePlacesApiKey);
    localStorage.setItem('censusGovApiKey', data.censusGovApiKey);
    localStorage.setItem('yelpApiKey', data.yelpApiKey);
    localStorage.setItem('googleTrendsApiKey', data.googleTrendsApiKey);
    localStorage.setItem('openAIApiKey', data.openAIApiKey);
    
    toast({
      title: "Impostazioni salvate",
      description: "Le API keys sono state salvate con successo. Ricarica la pagina per applicare le modifiche.",
    });
    
    setOpen(false);
  }

  // Function to use demo keys
  const useDemoKeys = () => {
    form.setValue('googlePlacesApiKey', 'demo-key');
    form.setValue('censusGovApiKey', 'demo-key');
    form.setValue('yelpApiKey', 'demo-key');
    form.setValue('googleTrendsApiKey', 'demo-key');
    form.setValue('openAIApiKey', 'demo-key');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Impostazioni API">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <KeyRound className="h-5 w-5 mr-2" />
            Impostazioni API
          </DialogTitle>
          <DialogDescription>
            Configura le API keys per i servizi esterni. Queste chiavi sono salvate localmente nel tuo browser.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md mb-4">
          <div className="flex items-center mb-2">
            <Info className="h-5 w-5 mr-2" />
            <p className="font-medium">Informazione sui dati</p>
          </div>
          <p className="text-sm">
            Per questa demo, puoi usare il valore "demo-key" per tutte le API key. 
            L'app mostrerà dati simulati, ma sarà possibile vedere come funziona l'interfaccia.
          </p>
          <Alert variant="warning" className="mt-3 bg-amber-100 border-amber-300">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs font-medium">
              Per visualizzare dati reali, devi ottenere API key valide dai seguenti servizi:
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
                <li><a href="https://developers.google.com/maps/documentation/places/web-service/overview" target="_blank" rel="noopener noreferrer" className="underline">Google Places API</a></li>
                <li><a href="https://www.census.gov/data/developers/about.html" target="_blank" rel="noopener noreferrer" className="underline">Census.gov API</a></li>
                <li><a href="https://www.yelp.com/developers" target="_blank" rel="noopener noreferrer" className="underline">Yelp Fusion API</a></li>
                <li><a href="https://developers.google.com/trends/api/quickstart" target="_blank" rel="noopener noreferrer" className="underline">Google Trends API</a></li>
                <li><a href="https://platform.openai.com/" target="_blank" rel="noopener noreferrer" className="underline">OpenAI API</a></li>
              </ul>
            </AlertDescription>
          </Alert>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-3"
            onClick={useDemoKeys}
          >
            Usa chiavi demo
          </Button>
        </div>
        
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
