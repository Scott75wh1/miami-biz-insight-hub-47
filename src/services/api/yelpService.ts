
import { handleApiError } from './handleError';

export const fetchYelpData = async (apiKey: string, term: string, location: string = 'Miami, FL') => {
  if (!apiKey || apiKey === 'demo-key') {
    console.log('Yelp API key is not set or using demo key');
    // Return mock data for demonstration
    const district = location.split(',')[0];
    
    // Generate different reviews for each district
    const districtReviews = {
      'Downtown': [
        { name: `Downtown Prime Steakhouse`, location: { address1: `Downtown, Biscayne Blvd` }, rating: 4.8, review_count: 432,
          reviews: [
            { rating: 5, text: "Miglior bistecca che abbia mai mangiato a Miami. Servizio impeccabile." },
            { rating: 4, text: "Ottimo ambiente e cibo delizioso, un po' costoso ma ne vale la pena." }
          ]
        },
        { name: `Café Miami Centro`, location: { address1: `Downtown, Flagler St` }, rating: 4.3, review_count: 287,
          reviews: [
            { rating: 4, text: "Ottimo caffè e pasticceria fresca. Posto ideale per lavorare." },
            { rating: 3, text: "Buon caffè ma a volte troppo affollato." }
          ]
        },
        { name: `Urban Foodie`, location: { address1: `Downtown, NE 2nd Ave` }, rating: 4.5, review_count: 312,
          reviews: [
            { rating: 5, text: "Menu creativo e ottimi cocktail. L'atmosfera è fantastica." },
            { rating: 4, text: "Porzioni abbondanti e prezzi ragionevoli per la zona." }
          ]
        }
      ],
      'Brickell': [
        { name: `Brickell Haute Cuisine`, location: { address1: `Brickell, SE 8th St` }, rating: 4.9, review_count: 512,
          reviews: [
            { rating: 5, text: "Un'esperienza gastronomica straordinaria. Chef di classe mondiale." },
            { rating: 5, text: "Ogni piatto è un'opera d'arte. Servizio impeccabile." }
          ]
        },
        { name: `Financial District Coffee`, location: { address1: `Brickell, SW 7th St` }, rating: 4.6, review_count: 345,
          reviews: [
            { rating: 5, text: "Il miglior caffè specialty di Miami. Ambiente perfetto per incontri d'affari." },
            { rating: 4, text: "Ottimi dolci fatti in casa e caffè di qualità." }
          ]
        },
        { name: `Brickell Wine Bar`, location: { address1: `Brickell, Brickell Ave` }, rating: 4.7, review_count: 387,
          reviews: [
            { rating: 5, text: "Selezione di vini impressionante e tapas deliziose." },
            { rating: 4, text: "Atmosfera sofisticata e personale molto competente." }
          ]
        }
      ],
      'Wynwood': [
        { name: `Wynwood Artistic Bistro`, location: { address1: `Wynwood, NW 2nd Ave` }, rating: 4.7, review_count: 478,
          reviews: [
            { rating: 5, text: "Fusion di sapori incredibile in un ambiente artistico unico." },
            { rating: 4, text: "Ottima posizione tra le gallerie, cibo delizioso e presentazione creativa." }
          ]
        },
        { name: `Graffiti Coffee Co.`, location: { address1: `Wynwood, NW 24th St` }, rating: 4.8, review_count: 512,
          reviews: [
            { rating: 5, text: "Il caffè più cool di Miami! Arredamento incredibile e miscele uniche." },
            { rating: 5, text: "Baristi esperti e atmosfera artistica. Da non perdere a Wynwood." }
          ]
        },
        { name: `Art District Eatery`, location: { address1: `Wynwood, NW 26th St` }, rating: 4.5, review_count: 348,
          reviews: [
            { rating: 5, text: "Menu innovativo che cambia spesso. Ogni visita è un'esperienza nuova." },
            { rating: 4, text: "Ottimo per pranzo durante la visita delle gallerie." }
          ]
        }
      ],
      'Little Havana': [
        { name: `Calle Ocho Cuban Restaurant`, location: { address1: `Little Havana, SW 8th St` }, rating: 4.8, review_count: 624,
          reviews: [
            { rating: 5, text: "L'autentica cucina cubana a Miami! Ropa vieja y mojo da sogno." },
            { rating: 5, text: "Esperienza culturale completa con musica dal vivo y cibo straordinario." }
          ]
        },
        { name: `Café Cubano Auténtico`, location: { address1: `Little Havana, SW 12th Ave` }, rating: 4.7, review_count: 412,
          reviews: [
            { rating: 5, text: "Il miglior café cubano della città, proprio come a L'Avana." },
            { rating: 4, text: "Atmosfera tradizionale y pasticceria casalinga deliziosa." }
          ]
        },
        { name: `Havana Nights Lounge`, location: { address1: `Little Havana, SW 9th St` }, rating: 4.6, review_count: 345,
          reviews: [
            { rating: 5, text: "Ottimi mojitos y musica latina dal vivo. Serata perfetta!" },
            { rating: 4, text: "Menu autentico y ottimi cocktail in un'atmosfera vibrante." }
          ]
        }
      ],
      'Miami Beach': [
        { name: `Ocean Drive Seafood`, location: { address1: `Miami Beach, Ocean Drive` }, rating: 4.6, review_count: 578,
          reviews: [
            { rating: 5, text: "Pesce freschissimo e vista mozzafiato sull'oceano." },
            { rating: 4, text: "Ottima posizione, cibo delizioso anche se un po' turistico." }
          ]
        },
        { name: `South Beach Café`, location: { address1: `Miami Beach, Collins Ave` }, rating: 4.4, review_count: 423,
          reviews: [
            { rating: 4, text: "Ottimo posto per colazione e people watching." },
            { rating: 3, text: "Buon caffè ma servizio a volte lento nelle ore di punta." }
          ]
        },
        { name: `Beachside Grill & Bar`, location: { address1: `Miami Beach, Ocean Blvd` }, rating: 4.7, review_count: 612,
          reviews: [
            { rating: 5, text: "Cocktail fantastici e ottimo menu per cena con vista sulla spiaggia." },
            { rating: 4, text: "Atmosfera vivace e cibo delizioso. Perfetto per una serata a Miami Beach." }
          ]
        }
      ]
    };
    
    // Find the district in our mock data or default to Miami Beach
    const districtData = districtReviews[district] || districtReviews['Miami Beach'];
    
    return {
      businesses: districtData
    };
  }
  
  try {
    // In a real implementation, we would use the actual Yelp API
    console.log(`Fetching Yelp data for: ${term} in ${location}`);
    
    // Extract district from location for more realistic names
    const district = location.split(',')[0];
    
    // For now we'll still use mock data since we can't make actual API calls
    // In a real application, this would be a fetch to the Yelp API
    return {
      businesses: [
        { name: `${district} Fine Dining`, location: { address1: `${district}, Ocean Drive` }, rating: 4.5, review_count: 236,
          reviews: [{ rating: 5, text: "Amazing food and atmosphere!" }, { rating: 4, text: "Great service, will come back!" }] },
        { name: `${district} Café`, location: { address1: `${district}, Collins Avenue` }, rating: 4.2, review_count: 187,
          reviews: [{ rating: 4, text: "Great coffee and pastries" }, { rating: 4, text: "Nice place to work from" }] },
        { name: `The ${district} Grill`, location: { address1: `${district}, Washington Ave` }, rating: 4.7, review_count: 452,
          reviews: [{ rating: 5, text: "Best steak in town!" }, { rating: 5, text: "Outstanding service and food" }] },
      ]
    };
  } catch (error) {
    return handleApiError(error, 'Yelp');
  }
};
