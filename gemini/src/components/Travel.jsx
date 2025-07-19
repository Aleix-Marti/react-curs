import React, { useState } from 'react';
import { MapPin, Calendar, Users, DollarSign, Send, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";


const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
    padding: '16px'
  },
  wrapper: {
    maxWidth: '1024px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  titleIcon: {
    color: '#2563eb'
  },
  subtitle: {
    color: '#6b7280'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '24px',
    '@media (minWidth: 768px)': {
      gridTemplateColumns: '1fr 1fr'
    }
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    padding: '24px'
  },
  cardTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '24px'
  },
  formGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px'
  },
  labelIcon: {
    width: '16px',
    height: '16px'
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    outline: 'none'
  },
  inputFocus: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
  },
  select: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    outline: 'none'
  },
  button: {
    width: '100%',
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  buttonHover: {
    backgroundColor: '#1d4ed8'
  },
  buttonDisabled: {
    opacity: '0.5',
    cursor: 'not-allowed'
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid white',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  errorBox: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px'
  },
  errorText: {
    color: '#b91c1c'
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 0'
  },
  loadingSpinner: {
    width: '32px',
    height: '32px',
    border: '2px solid #2563eb',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  loadingText: {
    marginLeft: '12px',
    color: '#6b7280'
  },
  recommendationBox: {
    backgroundColor: '#eff6ff',
    borderRadius: '8px',
    padding: '16px',
    border: '1px solid #bfdbfe'
  },
  recommendationText: {
    whiteSpace: 'pre-wrap',
    fontSize: '14px',
    color: '#374151',
    fontFamily: 'inherit',
    lineHeight: '1.5'
  },
  emptyState: {
    textAlign: 'center',
    padding: '48px 0',
    color: '#9ca3af'
  },
  emptyIcon: {
    width: '48px',
    height: '48px',
    margin: '0 auto 16px auto',
    color: '#d1d5db'
  },
  instructionsBox: {
    marginTop: '32px',
    backgroundColor: '#fefce8',
    border: '1px solid #fde047',
    borderRadius: '8px',
    padding: '24px'
  },
  instructionsTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#a16207',
    marginBottom: '8px'
  },
  instructionsContent: {
    fontSize: '14px',
    color: '#a16207',
    lineHeight: '1.5'
  },
  instructionsParagraph: {
    marginBottom: '8px'
  },
  code: {
    backgroundColor: '#fef3c7',
    padding: '2px 4px',
    borderRadius: '4px',
    fontFamily: 'monospace'
  }
};

// CSS per a animacions i media queries
const cssAnimations = `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (min-width: 768px) {
  .grid-responsive {
    grid-template-columns: 1fr 1fr !important;
  }
}

.button-hover:hover {
  background-color: #1d4ed8 !important;
}

.input-focus:focus {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
}
`;

const Travel = () => {
  const GEMINI_API_KEY = 'la_teva_api_key'

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
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <div style={styles.header}>
            <h1 style={styles.title}>
              <Sparkles style={styles.titleIcon} />
              Recomanador de Viatges
            </h1>
            <p style={styles.subtitle}>Descobreix el teu proper destí amb l'ajuda d'Intel·ligència Artificial</p>
          </div>

          <div style={{...styles.grid}} className="grid-responsive">
            {/* Formulari */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Dades del viatge</h2>
              
              <div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <MapPin style={styles.labelIcon} />
                    Destinació
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="Ex: Barcelona, París, Tokyo..."
                    style={styles.input}
                    className="input-focus"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <Calendar style={styles.labelIcon} />
                    Durada del viatge
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    style={styles.select}
                    className="input-focus"
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

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <Users style={styles.labelIcon} />
                    Nombre de viatgers
                  </label>
                  <select
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleInputChange}
                    style={styles.select}
                    className="input-focus"
                    required
                  >
                    <option value="">Selecciona nombre</option>
                    <option value="1">1 persona</option>
                    <option value="2">2 persones</option>
                    <option value="3-4">3-4 persones</option>
                    <option value="5+">5 o més</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <DollarSign style={styles.labelIcon} />
                    Pressupost aproximat
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    style={styles.select}
                    className="input-focus"
                    required
                  >
                    <option value="">Selecciona pressupost</option>
                    <option value="Econòmic (menys de 500€)">Econòmic (menys de 500€)</option>
                    <option value="Mitjà (500-1500€)">Mitjà (500-1500€)</option>
                    <option value="Alt (1500-3000€)">Alt (1500-3000€)</option>
                    <option value="Luxe (més de 3000€)">Luxe (més de 3000€)</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Interessos principals
                  </label>
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleInputChange}
                    placeholder="Ex: història, gastronomia, natura, art..."
                    style={styles.input}
                    className="input-focus"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Època de l'any
                  </label>
                  <select
                    name="season"
                    value={formData.season}
                    onChange={handleInputChange}
                    style={styles.select}
                    className="input-focus"
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

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Tipus d'allotjament preferit
                  </label>
                  <select
                    name="accommodation"
                    value={formData.accommodation}
                    onChange={handleInputChange}
                    style={styles.select}
                    className="input-focus"
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
                  type="button"
                  disabled={loading}
                  onClick={handleSubmit}
                  style={{
                    ...styles.button,
                    ...(loading ? styles.buttonDisabled : {})
                  }}
                  className={!loading ? "button-hover" : ""}
                >
                  {loading ? (
                    <>
                      <div style={styles.spinner}></div>
                      Generant recomanació...
                    </>
                  ) : (
                    <>
                      <Send style={{ width: '16px', height: '16px' }} />
                      Generar recomanació
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Resultats */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>La teva recomanació</h2>
              
              {error && (
                <div style={styles.errorBox}>
                  <p style={styles.errorText}>{error}</p>
                </div>
              )}

              {loading && (
                <div style={styles.loadingContainer}>
                  <div style={styles.loadingSpinner}></div>
                  <span style={styles.loadingText}>Generant la teva recomanació personalitzada...</span>
                </div>
              )}

              {recommendation && (
                <div style={styles.recommendationBox}>
                  <pre style={styles.recommendationText}>
                    {recommendation}
                  </pre>
                </div>
              )}

              {!loading && !recommendation && !error && (
                <div style={styles.emptyState}>
                  <Sparkles style={styles.emptyIcon} />
                  <p>Omple el formulari i genera la teva recomanació personalitzada!</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Travel;