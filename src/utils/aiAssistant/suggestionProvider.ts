
import { UserType } from '@/components/UserTypeSelector';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { Suggestion } from '@/types/chatTypes';

export const getSuggestions = (
  userType: UserType, 
  businessType: BusinessType,
  district: string
): Suggestion[] => {
  // Suggerimenti base per ogni tipo di utente
  const baseSuggestions: Suggestion[] = [
    { text: `Come posso migliorare la mia attività a ${district}?` },
    { text: `Quali sono i trend attuali nel settore ${businessType}?` },
  ];
  
  // Suggerimenti specifici per end user
  if (userType === 'end_user') {
    return [
      ...baseSuggestions,
      { text: `Consigli pratici per aumentare la clientela` },
      { text: `Come posso ottimizzare la mia presenza online?` },
      { text: `Suggerimenti per migliorare l'esperienza cliente` }
    ];
  }
  
  // Suggerimenti avanzati per marketer
  return [
    ...baseSuggestions,
    { text: `Analizza il target demografico a ${district} per ${businessType}` },
    { text: `Strategie di posizionamento competitivo a ${district}` },
    { text: `Quali KPI dovrei monitorare per il mio ${businessType}?` }
  ];
};
