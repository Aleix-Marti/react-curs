import React, { useEffect, useRef, useState } from 'react';

const CharacterMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('Inicialitzant mapa...');

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
      
      setCharacters(data);
      setStatus(`${data.length} personatges carregats`);
      
    } catch (err) {
      console.error('Error en obtenir els personatges:', err);
      setError(err.message);
      setStatus('Error en carregar les dades');
    } finally {
      setLoading(false);
    }
  };

  // Inicialitzar el mapa
  useEffect(() => {
    // Només inicialitzar si no existeix ja
    if (!mapInstanceRef.current && mapRef.current) {
      // Carregar Leaflet CSS dinàmicament
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);

      // Carregar Leaflet JS dinàmicament
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      
      script.onload = () => {
        // Inicialitzar el mapa quan Leaflet s'hagi carregat
        mapInstanceRef.current = window.L.map(mapRef.current).setView([40.0, 0.0], 2);
        
        // Afegir capa de tessel·les
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18
        }).addTo(mapInstanceRef.current);
        
        // Crear grup de marcadors
        markersGroupRef.current = window.L.layerGroup().addTo(mapInstanceRef.current);
        
        setStatus('Mapa inicialitzat correctament');
        
        // Carregar personatges inicials
        fetchCharacters();
      };
      
      document.head.appendChild(script);
    }

    // Cleanup en desmuntar el component
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Crear contingut del popup
  const createPopupContent = (character) => {
    const {
      img = '',
      name = 'Sense nom',
      attack = 0,
      deffense = 0,
      latitude = 0,
      longitude = 0,
      description = 'Sense descripció'
    } = character;
    
    return `
      <div style="max-width: 280px; font-family: Arial, sans-serif;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          ${img ? `<img src="${img}" alt="${name}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid #3b82f6;" onerror="this.style.display='none'">` : ''}
          <h3 style="margin: 0; font-size: 18px; color: #333;">${name}</h3>
        </div>
        
        <div style="display: flex; gap: 20px; justify-content: space-between; margin: 12px 0; padding: 8px; background: #f8f9fa; border-radius: 4px;">
          <div style="text-align: center; flex: 1;">
            <div style="font-size: 12px; color: #666; margin-bottom: 2px;">Atac</div>
            <div style="font-size: 16px; font-weight: bold; color: #dc3545;">${attack}</div>
          </div>
          <div style="text-align: center; flex: 1;">
            <div style="font-size: 12px; color: #666; margin-bottom: 2px;">Defensa</div>
            <div style="font-size: 16px; font-weight: bold; color: #28a745;">${deffense}</div>
          </div>
        </div>
        
        <div style="font-size: 14px; color: #555; line-height: 1.4; margin: 12px 0;">
          ${description}
        </div>
        
        <div style="font-size: 12px; color: #888; text-align: center; margin-top: 12px; padding-top: 8px; border-top: 1px solid #eee;">
          📍 ${parseFloat(latitude).toFixed(4)}, ${parseFloat(longitude).toFixed(4)}
        </div>
      </div>
    `;
  };

  // Actualitzar marcadors quan canvien els personatges
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current || !window.L) return;

    // Netejar marcadors existents
    markersGroupRef.current.clearLayers();

    if (characters.length === 0) return;

    let validCharacters = 0;
    const bounds = [];

    characters.forEach(character => {
      const lat = parseFloat(character.latitude);
      const lng = parseFloat(character.longitude);
      
      // Validar coordenades
      if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        console.warn(`Coordenades invàlides per ${character.name}:`, { lat, lng });
        return;
      }

      // Crear marcador
      const marker = window.L.marker([lat, lng], {
        title: character.name || 'Personatge sense nom'
      });

      // Afegir popup
      const popupContent = createPopupContent(character);
      marker.bindPopup(popupContent, {
        maxWidth: 320
      });

      // Afegir al grup i als bounds
      markersGroupRef.current.addLayer(marker);
      bounds.push([lat, lng]);
      validCharacters++;
    });

    // Ajustar vista si hi ha marcadors vàlids
    if (bounds.length > 0) {
      mapInstanceRef.current.fitBounds(bounds, {
        padding: [20, 20],
        maxZoom: 10
      });
      setStatus(`${validCharacters} personatges mostrats al mapa`);
    } else {
      setStatus('No s\'han trobat personatges amb coordenades vàlides');
    }
  }, [characters]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🗺️ Mapa de Personatges (React + Leaflet)</h1>
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
      
      <div 
        ref={mapRef} 
        style={styles.map}
      />
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
  map: {
    width: '100%',
    height: '600px'
  }
};

export default CharacterMap;