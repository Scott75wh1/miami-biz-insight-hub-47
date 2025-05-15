
import React, { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Settings, KeyRound, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ApiKeysInfo } from "@/components/settings/ApiKeysInfo";
import { ApiKeysForm, apiFormSchema, SettingsFormValues } from "@/components/settings/ApiKeysForm";
import { ApiConnectionTester } from "@/components/settings/ApiConnectionTester";

export function SettingsDialog() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [isTestingKey, setIsTestingKey] = useState(false);
  
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
    resolver: zodResolver(apiFormSchema),
    defaultValues: getSavedApiKeys(),
  });

  // Update form values when dialog opens
  useEffect(() => {
    if (open) {
      form.reset(getSavedApiKeys());
    }
  }, [open, form]);

  // Function to test an API key
  const testApiKey = async (serviceName: string, apiKey: string): Promise<boolean> => {
    setIsTestingKey(true);
    
    try {
      // For this implementation, we'll do a simple validation based on key format
      // In a real app, you would make a test API call here
      let isValid = false;
      
      // Simple validation based on key format
      if (serviceName === 'openAIApiKey') {
        isValid = apiKey.startsWith('sk-') && apiKey.length > 20;
      } else {
        isValid = apiKey.length > 10 && apiKey !== 'demo-key';
      }
      
      // Simulate API test delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (isValid) {
        toast({
          title: "Test API riuscito",
          description: `La chiave API per ${serviceName} è valida.`,
        });
      } else {
        toast({
          title: "Test API fallito",
          description: `La chiave API per ${serviceName} non sembra essere valida.`,
          variant: "destructive",
        });
      }
      
      return isValid;
    } catch (error) {
      toast({
        title: "Errore durante il test",
        description: `Non è stato possibile verificare la chiave API per ${serviceName}.`,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsTestingKey(false);
    }
  };

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
    
    // Auto-reload the page to apply API key changes
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    
    setOpen(false);
  }

  // Function to use demo keys
  const useDemoKeys = () => {
    form.setValue('googlePlacesApiKey', 'demo-key');
    form.setValue('censusGovApiKey', 'demo-key');
    form.setValue('yelpApiKey', 'demo-key');
    form.setValue('googleTrendsApiKey', 'demo-key');
    form.setValue('openAIApiKey', 'demo-key');
    
    toast({
      title: "Chiavi demo impostate",
      description: "Tutte le API keys sono state impostate su 'demo-key'. Salva per applicare le modifiche.",
    });
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
        
        <ApiKeysInfo useDemoKeys={useDemoKeys} />
        <ApiKeysForm 
          form={form} 
          onSubmit={onSubmit} 
          testApiKey={testApiKey}
        />
        
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Test di connessione API</h3>
          <ApiConnectionTester />
        </div>
        
        <div className="text-xs text-muted-foreground mt-4 flex items-center">
          <p>
            <span className="font-medium inline-flex items-center">
              <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
              Stato API: Demo
            </span>{' '}
            - Puoi usare l'app con dati demo senza configurare API keys.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
