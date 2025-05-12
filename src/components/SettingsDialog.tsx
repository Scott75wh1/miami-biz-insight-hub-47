
import React, { useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Settings, KeyRound } from "lucide-react";
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
    resolver: zodResolver(apiFormSchema),
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
        
        <ApiKeysInfo useDemoKeys={useDemoKeys} />
        <ApiKeysForm form={form} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
