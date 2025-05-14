
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Aggiungiamo un handler per gli errori globali per facilitare il debug
window.addEventListener('error', (event) => {
  console.error('Errore globale catturato:', event.error);
});

console.log("Avvio dell'applicazione...");

createRoot(document.getElementById("root")!).render(<App />);
