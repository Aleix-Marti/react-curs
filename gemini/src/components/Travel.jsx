import React, { useState } from 'react';
import { MapPin, Calendar, Users, DollarSign, Send, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";


const Travel = () => {

  const GEMINI_API_KEY = la_teva_api_key

  const [formData, setFormData] = useState({
    destination: '',
    duration: '',
    budget: '',
    travelers: '',
    interests: '',
    season: '',
    accommodation: ''
  });
  
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePrompt = () => {
    return `Actua com un expert en viatges i crea una recomanació personalitzada de viatge amb la següent informació:

    Destinació: ${formData.destination}
    Durada: ${formData.duration}
    Pressupost: ${formData.budget}
    Nombre de viatgers: ${formData.travelers}
    Interessos: ${formData.interests}
    Època de l'any: ${formData.season}
    Tipus d'allotjament: ${formData.accommodation}

    Proporciona una recomanació detallada que inclogui:
    1. Activitats principals recomanades
    2. Llocs d'interès imprescindibles
    3. Suggeriments gastronòmics
    4. Consells pràctics per al viatge
    5. Estimació de costos aproximats
    6. Millor època per visitar (si és rellevant)

    Fes la resposta en català i sigues específic i pràctic.`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecommendation('');

    try {
      const prompt = generatePrompt();
      
      // Opció 1: Usant l'SDK oficial de Google (RECOMANAT)
      // import { GoogleGenAI } from "@google/genai";
      
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      const recommendation = response.text;
      setRecommendation(recommendation);

      
      // Opció 2: Usant fetch directament
      /*
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_API_KEY', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });
      
      const data = await response.json();
      const recommendation = data.candidates[0].content.parts[0].text;
      */
      
      // Simulació de resposta per a la demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (err) {
      setError('Error al generar la recomanació. Torna-ho a intentar.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="text-blue-600" />
            Recomanador de Viatges
          </h1>
          <p className="text-gray-600">Descobreix el teu proper destí amb l'ajuda d'Intel·ligència Artificial</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Formulari */}
          <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dades del viatge</h2>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  Destinació
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="Ex: Barcelona, París, Tokyo..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4" />
                  Durada del viatge
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecciona durada</option>
                  <option value="1-2 dies">1-2 dies</option>
                  <option value="3-5 dies">3-5 dies</option>
                  <option value="1 setmana">1 setmana</option>
                  <option value="2 setmanes">2 setmanes</option>
                  <option value="1 mes o més">1 mes o més</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4" />
                  Nombre de viatgers
                </label>
                <select
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecciona nombre</option>
                  <option value="1">1 persona</option>
                  <option value="2">2 persones</option>
                  <option value="3-4">3-4 persones</option>
                  <option value="5+">5 o més</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4" />
                  Pressupost aproximat
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecciona pressupost</option>
                  <option value="Econòmic (menys de 500€)">Econòmic (menys de 500€)</option>
                  <option value="Mitjà (500-1500€)">Mitjà (500-1500€)</option>
                  <option value="Alt (1500-3000€)">Alt (1500-3000€)</option>
                  <option value="Luxe (més de 3000€)">Luxe (més de 3000€)</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Interessos principals
                </label>
                <input
                  type="text"
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  placeholder="Ex: història, gastronomia, natura, art..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Època de l'any
                </label>
                <select
                  name="season"
                  value={formData.season}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecciona època</option>
                  <option value="Primavera">Primavera</option>
                  <option value="Estiu">Estiu</option>
                  <option value="Tardor">Tardor</option>
                  <option value="Hivern">Hivern</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Tipus d'allotjament preferit
                </label>
                <select
                  name="accommodation"
                  value={formData.accommodation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecciona allotjament</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Apartament">Apartament</option>
                  <option value="Hostal">Hostal</option>
                  <option value="Casa rural">Casa rural</option>
                  <option value="Camping">Camping</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Generant recomanació...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Generar recomanació
                  </>
                )}
              </button>
            </div>
          </div>
          </form>

          {/* Resultats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">La teva recomanació</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
                <span className="ml-3 text-gray-600">Generant la teva recomanació personalitzada...</span>
              </div>
            )}

            {recommendation && (
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                  {recommendation}
                </pre>
              </div>
            )}

            {!loading && !recommendation && !error && (
              <div className="text-center py-12 text-gray-500">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Omple el formulari i genera la teva recomanació personalitzada!</p>
              </div>
            )}
          </div>
        </div>

        {/* Instruccions per integrar amb Gemini */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Instruccions per integrar amb Gemini API</h3>
          <div className="text-sm text-yellow-700 space-y-2">
            <p><strong>Opció A - SDK oficial (RECOMANAT):</strong></p>
            <p>1. Instal·la: <code className="bg-yellow-100 px-1 rounded">npm install @google/genai</code></p>
            <p>2. Descomenta l'Opció 1 al codi (línia 45-55)</p>
            <p>3. Afegeix la teva clau d'API</p>
            <p><strong>Opció B - Fetch directe:</strong></p>
            <p>1. Descomenta l'Opció 2 al codi (línia 57-70)</p>
            <p>2. Afegeix la teva clau d'API a la URL</p>
            <p><strong>En tots dos casos:</strong> Elimina la simulació de resposta (línia 75-105)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Travel;