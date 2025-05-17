
import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    // Funzione per verificare la dimensione dello schermo
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    // Verificare al caricamento iniziale
    checkScreenSize();

    // Aggiungere un listener per ricontrollare se la dimensione della finestra cambia
    window.addEventListener('resize', checkScreenSize);

    // Rimuovere l'event listener quando il componente viene smontato
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return { isMobile, isTablet, isDesktop: !isMobile && !isTablet };
}
