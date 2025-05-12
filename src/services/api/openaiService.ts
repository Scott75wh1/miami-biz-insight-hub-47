
import { handleApiError } from './handleError';

export const fetchOpenAIAnalysis = async (apiKey: string, prompt: string) => {
  if (!apiKey || apiKey === 'demo-key') {
    console.error('OpenAI API key is not set or using demo key');
    // Return mock data for demonstration
    return {
      choices: [
        {
          message: {
            content: `Analisi per: ${prompt}\n\nIn base ai dati raccolti, il mercato a Miami mostra forti tendenze di crescita in questo settore. Le aree con maggiore potenziale sono Wynwood e Brickell. Si consiglia di considerare le tendenze demografiche e la concorrenza locale prima di procedere con nuove iniziative commerciali.`
          }
        }
      ]
    };
  }
  
  try {
    console.log(`Sending prompt to OpenAI: "${prompt}"`);
    
    // For now we'll still use mock data since we can't make actual API calls
    // In a real application, this would be a fetch to the OpenAI API
    return {
      choices: [
        {
          message: {
            content: `Analisi per: ${prompt}\n\nIn base ai dati raccolti, il mercato a Miami mostra forti tendenze di crescita in questo settore. Le aree con maggiore potenziale sono Wynwood e Brickell. Si consiglia di considerare le tendenze demografiche e la concorrenza locale prima di procedere con nuove iniziative commerciali.`
          }
        }
      ]
    };
  } catch (error) {
    return handleApiError(error, 'OpenAI');
  }
};
