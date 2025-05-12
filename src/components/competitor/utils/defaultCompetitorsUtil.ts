
import { BusinessType } from '@/components/BusinessTypeSelector';
import { Competitor } from '../CompetitorCard';

/**
 * Generates default competitor data based on business type, district and cuisine
 */
export const getDefaultCompetitors = (type: BusinessType, district: string, cuisine?: string): Competitor[] => {
  const districtPrefix = district.replace(' ', '').toLowerCase();
  const timestamp = Date.now(); // Add timestamp to ensure different data each time
  
  switch (type) {
    case 'restaurant':
      if (cuisine) {
        return [
          { 
            name: `${district} ${cuisine} ${districtPrefix}${timestamp % 100}`, 
            type: `Ristorante ${cuisine}`, 
            location: district, 
            rating: 4.5 + (Math.random() * 0.5), 
            reviews: 400 + Math.floor(Math.random() * 200), 
            priceLevel: '$$$',
            sentiments: {
              positive: 70 + Math.floor(Math.random() * 10),
              neutral: 20 + Math.floor(Math.random() * 10),
              negative: 5 + Math.floor(Math.random() * 5)
            },
            reviewHighlight: `Una delle migliori esperienze di cucina ${cuisine} a Miami!`
          },
          { 
            name: `${cuisine} ${district} ${districtPrefix}${(timestamp + 1) % 100}`, 
            type: `Ristorante ${cuisine}`, 
            location: district, 
            rating: 4.2 + (Math.random() * 0.6), 
            reviews: 300 + Math.floor(Math.random() * 150), 
            priceLevel: '$$$',
            sentiments: {
              positive: 65 + Math.floor(Math.random() * 10),
              neutral: 25 + Math.floor(Math.random() * 10),
              negative: 5 + Math.floor(Math.random() * 5)
            },
            reviewHighlight: `Cucina ${cuisine} autentica, ingredienti di prima qualità.`
          },
          { 
            name: `${district} ${cuisine} Express ${districtPrefix}${(timestamp + 2) % 100}`, 
            type: `Ristorante ${cuisine} Casual`, 
            location: district, 
            rating: 4.0 + (Math.random() * 0.5), 
            reviews: 250 + Math.floor(Math.random() * 100), 
            priceLevel: '$$',
            sentiments: {
              positive: 60 + Math.floor(Math.random() * 10),
              neutral: 30 + Math.floor(Math.random() * 5),
              negative: 5 + Math.floor(Math.random() * 10)
            },
            reviewHighlight: `Ottimo rapporto qualità-prezzo per cucina ${cuisine}.`
          },
        ];
      }
      
      // Default restaurant data without cuisine specification
      return [
        { 
          name: `${district} Fine Dining ${districtPrefix}${timestamp % 100}`, 
          type: 'Ristorante', 
          location: district, 
          rating: 4.5 + (Math.random() * 0.5), 
          reviews: 400 + Math.floor(Math.random() * 200), 
          priceLevel: '$$$',
          sentiments: {
            positive: 70 + Math.floor(Math.random() * 10),
            neutral: 20 + Math.floor(Math.random() * 10),
            negative: 5 + Math.floor(Math.random() * 5)
          },
          reviewHighlight: "Una delle migliori esperienze culinarie a Miami!"
        },
        { 
          name: `${district} Trattoria ${districtPrefix}${(timestamp + 1) % 100}`, 
          type: 'Ristorante Italiano', 
          location: district, 
          rating: 4.2 + (Math.random() * 0.6), 
          reviews: 300 + Math.floor(Math.random() * 150), 
          priceLevel: '$$$',
          sentiments: {
            positive: 65 + Math.floor(Math.random() * 10),
            neutral: 25 + Math.floor(Math.random() * 10),
            negative: 5 + Math.floor(Math.random() * 5)
          },
          reviewHighlight: "Pasta fatta in casa eccezionale, atmosfera autentica."
        },
        { 
          name: `${district} Taqueria ${districtPrefix}${(timestamp + 2) % 100}`, 
          type: 'Ristorante Messicano', 
          location: district, 
          rating: 4.0 + (Math.random() * 0.5), 
          reviews: 250 + Math.floor(Math.random() * 100), 
          priceLevel: '$$',
          sentiments: {
            positive: 60 + Math.floor(Math.random() * 10),
            neutral: 30 + Math.floor(Math.random() * 5),
            negative: 5 + Math.floor(Math.random() * 10)
          },
          reviewHighlight: "I migliori tacos della zona, salse fatte in casa."
        },
      ];
    case 'coffee_shop':
      return [
        { 
          name: `Café ${district} ${districtPrefix}${timestamp % 100}`, 
          type: 'Caffetteria', 
          location: district, 
          rating: 4.5 + (Math.random() * 0.4), 
          reviews: 200 + Math.floor(Math.random() * 100), 
          priceLevel: '$$',
          sentiments: {
            positive: 70 + Math.floor(Math.random() * 10),
            neutral: 20 + Math.floor(Math.random() * 10),
            negative: 5 + Math.floor(Math.random() * 5)
          },
          reviewHighlight: "Caffè di qualità e ottimi dolci fatti in casa."
        },
        { 
          name: `${district} Coffee Corner ${districtPrefix}${(timestamp + 1) % 100}`, 
          type: 'Specialty Coffee', 
          location: district, 
          rating: 4.3 + (Math.random() * 0.5), 
          reviews: 180 + Math.floor(Math.random() * 80), 
          priceLevel: '$$',
          sentiments: {
            positive: 67 + Math.floor(Math.random() * 10),
            neutral: 23 + Math.floor(Math.random() * 10),
            negative: 5 + Math.floor(Math.random() * 5)
          },
          reviewHighlight: "Miscele di caffè uniche, baristi competenti."
        },
        { 
          name: `${district} Morning Brew ${districtPrefix}${(timestamp + 2) % 100}`, 
          type: 'Caffetteria & Bakery', 
          location: district, 
          rating: 4.2 + (Math.random() * 0.4), 
          reviews: 280 + Math.floor(Math.random() * 120), 
          priceLevel: '$$',
          sentiments: {
            positive: 63 + Math.floor(Math.random() * 10),
            neutral: 27 + Math.floor(Math.random() * 5),
            negative: 5 + Math.floor(Math.random() * 10)
          },
          reviewHighlight: "Ottima colazione e ambiente perfetto per lavorare."
        },
      ];
    default:
      return [
        { 
          name: `${district} Business A ${districtPrefix}${timestamp % 100}`, 
          type: type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1), 
          location: district, 
          rating: 4.3 + (Math.random() * 0.4), 
          reviews: 220 + Math.floor(Math.random() * 100), 
          priceLevel: '$$$',
          sentiments: {
            positive: 65 + Math.floor(Math.random() * 10),
            neutral: 25 + Math.floor(Math.random() * 10),
            negative: 5 + Math.floor(Math.random() * 5)
          },
          reviewHighlight: "Servizio eccellente e prodotti di qualità."
        },
        { 
          name: `${district} Business B ${districtPrefix}${(timestamp + 1) % 100}`, 
          type: type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1), 
          location: district, 
          rating: 4.1 + (Math.random() * 0.4), 
          reviews: 190 + Math.floor(Math.random() * 80), 
          priceLevel: '$$',
          sentiments: {
            positive: 60 + Math.floor(Math.random() * 10),
            neutral: 30 + Math.floor(Math.random() * 5),
            negative: 5 + Math.floor(Math.random() * 10)
          },
          reviewHighlight: "Ottimo rapporto qualità-prezzo."
        },
        { 
          name: `${district} Business C ${districtPrefix}${(timestamp + 2) % 100}`, 
          type: type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1), 
          location: district, 
          rating: 4.4 + (Math.random() * 0.4), 
          reviews: 160 + Math.floor(Math.random() * 60), 
          priceLevel: '$$$',
          sentiments: {
            positive: 67 + Math.floor(Math.random() * 10),
            neutral: 28 + Math.floor(Math.random() * 5),
            negative: 5 + Math.floor(Math.random() * 5)
          },
          reviewHighlight: "Staff competente e servizio impeccabile."
        },
      ];
  }
};
