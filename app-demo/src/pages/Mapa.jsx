import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix per als icones de Leaflet en React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const CharacterMap = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('Llest per carregar personatges');
  const [mapCenter, setMapCenter] = useState([40.0, 0.0]);
  const [mapZoom, setMapZoom] = useState(2);

  // Funció per obtenir els personatges de l'API
  const fetchCharacters = async () => {
    try {
      setLoading(true);
      setError(null);
      setStatus('Carregant personatges...');
      
      const response = await fetch('https://retoolapi.dev/nJCkCJ/data');
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('La resposta no és un array vàlid');
      }
      
      // Filtrar personatges amb coordenades vàlides
      const validCharacters = data.filter(character => {
        const lat = parseFloat(character.latitude);
        const lng = parseFloat(character.longitude);
        return !isNaN(lat) && !isNaN(lng) && 
               lat >= -90 && lat <= 90 && 
               lng >= -180 && lng <= 180;
      });
      
      setCharacters(validCharacters);
      setStatus(`${validCharacters.length} personatges carregats (${data.length} total)`);
      
      // Ajustar el centre del mapa si hi ha personatges
      if (validCharacters.length > 0) {
        const avgLat = validCharacters.reduce((sum, char) => sum + parseFloat(char.latitude), 0) / validCharacters.length;
        const avgLng = validCharacters.reduce((sum, char) => sum + parseFloat(char.longitude), 0) / validCharacters.length;
        setMapCenter([avgLat, avgLng]);
        setMapZoom(4);
      }
      
    } catch (err) {
      console.error('Error en obtenir els personatges:', err);
      setError(err.message);
      setStatus('Error en carregar les dades');
    } finally {
      setLoading(false);
    }
  };

  // Carregar personatges al muntar el component
  useEffect(() => {
    fetchCharacters();
  }, []);

  // Component per al contingut del popup
  const CharacterPopup = ({ character }) => {
    const {
      img = '',
      name = 'Sense nom',
      attack = 0,
      deffense = 0,
      latitude = 0,
      longitude = 0,
      description = 'Sense descripció'
    } = character;

    return (
      <div style={{ maxWidth: '280px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          marginBottom: '12px' 
        }}>
          {img && (
            <img 
              src={img} 
              alt={name} 
              style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                objectFit: 'cover', 
                border: '2px solid #3b82f6' 
              }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
          <h3 style={{ margin: 0, fontSize: '18px', color: '#333' }}>{name}</h3>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          justifyContent: 'space-between', 
          margin: '12px 0', 
          padding: '8px', 
          background: '#f8f9fa', 
          borderRadius: '4px' 
        }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>Atac</div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#dc3545' }}>{attack}</div>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>Defensa</div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#28a745' }}>{deffense}</div>
          </div>
        </div>
        
        <div style={{ 
          fontSize: '14px', 
          color: '#555', 
          lineHeight: '1.4', 
          margin: '12px 0' 
        }}>
          {description}
        </div>
        
        <div style={{ 
          fontSize: '12px', 
          color: '#888', 
          textAlign: 'center', 
          marginTop: '12px', 
          paddingTop: '8px', 
          borderTop: '1px solid #eee' 
        }}>
          📍 {parseFloat(latitude).toFixed(4)}, {parseFloat(longitude).toFixed(4)}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🗺️ Mapa de Personatges (React Leaflet)</h1>
      </div>
      
      <div style={styles.controls}>
        <button 
          onClick={fetchCharacters}
          disabled={loading}
          style={loading ? styles.buttonDisabled : styles.button}
        >
          {loading ? '🔄 Carregant...' : '🔄 Actualitzar Dades'}
        </button>
        
        <div style={{
          ...styles.status,
          color: error ? '#dc3545' : loading ? '#007bff' : '#28a745'
        }}>
          {error ? `Error: ${error}` : status}
        </div>
      </div>
      
      <div style={styles.mapContainer}>
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={styles.map}
          key={`${mapCenter[0]}-${mapCenter[1]}-${mapZoom}`} // Force re-render when center changes
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={18}
          />
          
          {characters.map((character, index) => {
            const lat = parseFloat(character.latitude);
            const lng = parseFloat(character.longitude);
            
            return (
              <Marker 
                key={`${character.name}-${index}`}
                position={[lat, lng]}
                title={character.name || 'Personatge sense nom'}
              >
                <Popup maxWidth={320}>
                  <CharacterPopup character={character} />
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    background: '#3b82f6',
    color: 'white',
    padding: '20px',
    textAlign: 'center'
  },
  title: {
    margin: 0,
    fontSize: '24px'
  },
  controls: {
    padding: '15px 20px',
    background: '#f8f9fa',
    borderBottom: '1px solid #e9ecef',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px'
  },
  button: {
    background: '#28a745',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s'
  },
  buttonDisabled: {
    background: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '4px',
    cursor: 'not-allowed',
    fontSize: '14px'
  },
  status: {
    fontSize: '14px',
    fontWeight: '500'
  },
  mapContainer: {
    width: '100%',
    height: '600px'
  },
  map: {
    width: '100%',
    height: '100%'
  }
};

export default CharacterMap;