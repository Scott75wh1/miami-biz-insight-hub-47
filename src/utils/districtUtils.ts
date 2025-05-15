
import { MIAMI_DISTRICTS } from '@/components/competitor/constants';

/**
 * Ottiene il distretto corrente dall'URL o dal localStorage
 */
export function getCurrentDistrict(): string {
  // Prima tenta di ottenere dal localStorage
  try {
    const storedDistrict = localStorage.getItem('selectedDistrict');
    if (storedDistrict) {
      return storedDistrict;
    }
  } catch (e) {
    console.warn("Could not read from localStorage:", e);
  }
  
  // Check if the URL contains a district parameter
  const urlParams = new URLSearchParams(window.location.search);
  const districtParam = urlParams.get('district');
  
  if (districtParam && MIAMI_DISTRICTS.includes(districtParam)) {
    return districtParam;
  }
  
  // Use path segments for district-specific pages like /census/:district
  const pathSegments = window.location.pathname.split('/');
  if (pathSegments[1] === 'census' && pathSegments[2]) {
    const pathDistrict = pathSegments[2];
    if (MIAMI_DISTRICTS.includes(pathDistrict)) {
      return pathDistrict;
    }
  }
  
  // Default to Miami Beach
  return "Miami Beach";
}

/**
 * Aggiorna l'URL con il distretto selezionato senza ricaricare la pagina
 */
export function updateDistrictInUrl(district: string): void {
  const url = new URL(window.location.href);
  url.searchParams.set('district', district);
  window.history.replaceState({}, '', url);
}

/**
 * Normalizza il nome del distretto per garantire compatibilità
 */
export function normalizeDistrictName(district: string): string {
  if (!district) return "Miami Beach";
  
  // Pulisce il nome e verifica se esiste
  const normalizedName = district.trim();
  if (MIAMI_DISTRICTS.includes(normalizedName)) {
    return normalizedName;
  }
  
  // Cerca corrispondenze parziali
  const lowerDistrict = normalizedName.toLowerCase();
  for (const validDistrict of MIAMI_DISTRICTS) {
    if (validDistrict.toLowerCase().includes(lowerDistrict) ||
        lowerDistrict.includes(validDistrict.toLowerCase())) {
      return validDistrict;
    }
  }
  
  // Default
  return "Miami Beach";
}
