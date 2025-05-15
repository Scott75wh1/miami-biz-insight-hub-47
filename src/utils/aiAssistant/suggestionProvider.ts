
import { UserType } from '@/components/UserTypeSelector';
import { BusinessType } from '@/components/BusinessTypeSelector';

export interface Suggestion {
  forType: UserType;
  text: string;
}

export const getSuggestions = (
  userType: UserType,
  businessType: BusinessType,
  selectedDistrict: string
): Suggestion[] => {
  if (userType === 'end_user') {
    return [
      { forType: 'end_user', text: "Cosa vogliono i clienti in questa zona?" },
      { forType: 'end_user', text: `Come posso migliorare la mia attività ${businessType} a ${selectedDistrict}?` },
      { forType: 'end_user', text: "Quali sono i punti di forza della concorrenza?" },
      { forType: 'end_user', text: "Suggerisci 3 idee pratiche per aumentare i clienti" }
    ];
  } else {
    return [
      { forType: 'marketer', text: `Analizza la segmentazione demografica di ${selectedDistrict} per ${businessType}` },
      { forType: 'marketer', text: `Quali KPI dovrei monitorare per un'attività ${businessType}?` },
      { forType: 'marketer', text: `Compara le strategie di marketing dei top competitor a ${selectedDistrict}` },
      { forType: 'marketer', text: `Elabora una strategia SEO locale per ${selectedDistrict}` }
    ];
  }
};
