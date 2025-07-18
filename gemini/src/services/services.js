import axios from 'axios';

const API_KEY = la_teva_clau_api;
// const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

export const generateTripPlan = async (tripDetails) => {
  try {
    const { destination, duration, budget, interests, travelStyle } = tripDetails;
    
    // Construir un prompt ric per a Gemini
    const prompt = `Actua com un expert en planificació de viatges i crea un itinerari detallat per a:
    
    Destinació: ${destination}
    Durada: ${duration} dies
    Pressupost: ${budget}
    Interessos: ${interests}
    Estil de viatge: ${travelStyle}
    
    Proporciona un itinerari dia per dia amb:
    1. Activitats recomanades
    2. Llocs per menjar
    3. Allotjament suggerit
    4. Tips locals
    5. Estimació de costos aproximats
    
    Formata la resposta de manera clara i organitzada amb markdown.`;
    
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Comprovem la resposta i gestionem diferents formats possibles
    if (response.data && response.data.candidates && response.data.candidates[0]) {
      if (response.data.candidates[0].content && response.data.candidates[0].content.parts) {
        return response.data.candidates[0].content.parts[0].text;
      } else if (response.data.candidates[0].text) {
        return response.data.candidates[0].text;
      }
    }
    
    throw new Error('Format de resposta inesperat');
    
  } catch (error) {
    console.error('Error al generar el pla de viatge:', error);
    
    // Proporcionar més detalls sobre l'error
    if (error.response) {
      // Error de la resposta del servidor
      console.error('Detalls de l\'error del servidor:', error.response.data);
      throw new Error(`Error API (${error.response.status}): ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      // No s'ha rebut resposta
      throw new Error('No s\'ha rebut resposta del servidor. Comprova la teva connexió.');
    } else {
      // Error en configurar la sol·licitud
      throw new Error(`Error en la sol·licitud: ${error.message}`);
    }
  }
};