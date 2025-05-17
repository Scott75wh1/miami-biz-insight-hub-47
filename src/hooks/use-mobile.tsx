
import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Funzione per verificare se la larghezza dello schermo è quella di un dispositivo mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificare al caricamento iniziale
    checkIfMobile();

    // Aggiungere un listener per ricontrollare se la dimensione della finestra cambia
    window.addEventListener('resize', checkIfMobile);

    // Rimuovere l'event listener quando il componente viene smontato
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return isMobile;
}
