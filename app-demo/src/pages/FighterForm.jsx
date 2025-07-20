import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addFighter, updateFighter, getSingleFighter } from '@services/services.js';

const CharacterForm = () => {
  const { id } = useParams(); // Si hi ha ID, estem editant
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    img: '',
    name: '',
    attack: '',
    deffense: '',
    latitude: '',
    longitude: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [loadingData, setLoadingData] = useState(isEditing);

  // Carregar dades del personatge si estem editant
  useEffect(() => {
    if (isEditing) {
      const loadFighterData = async () => {
        try {
          setLoadingData(true);
          const characterData = await getSingleFighter(id);
          setFormData({
            img: characterData.img || '',
            name: characterData.name || '',
            attack: characterData.attack?.toString() || '',
            deffense: characterData.deffense?.toString() || '',
            latitude: characterData.latitude?.toString() || '',
            longitude: characterData.longitude?.toString() || '',
            description: characterData.description || ''
          });
        } catch (error) {
          setMessage('Error en carregar les dades del personatge');
          console.error('Error:', error);
        } finally {
          setLoadingData(false);
        }
      };

      loadFighterData();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');

    try {
      // Convertir els valors numèrics
      const dataToSend = {
        ...formData,
        attack: parseInt(formData.attack),
        deffense: parseInt(formData.deffense),
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude)
      };

      let response;
      if (isEditing) {
        response = await updateFighter(id, dataToSend);
      } else {
        response = await addFighter(dataToSend);
      }

      if (response.ok) {
        const result = await response.json();
        setMessage(isEditing ? 'Personatge actualitzat correctament!' : 'Personatge creat correctament!');
        console.log('Resposta:', result);
        
        // Si estem creant, resetegem el formulari
        if (!isEditing) {
          setFormData({
            img: '',
            name: '',
            attack: '',
            deffense: '',
            latitude: '',
            longitude: '',
            description: ''
          });
        }

        // Opcional: navegar de tornada després d'un temps
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        setMessage(`Error en ${isEditing ? 'actualitzar' : 'crear'} el personatge`);
      }
    } catch (error) {
      setMessage('Error de connexió: ' + error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loadingData) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading Fighter...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        {isEditing ? 'Editar Personatge' : 'Crear Nou Personatge'}
      </h2>
      
      <div style={styles.form}>
        <div style={styles.field}>
          <label htmlFor="img" style={styles.label}>
            URL de la imatge
          </label>
          <input
            type="url"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="https://exemple.com/imatge.jpg"
          />
        </div>

        <div style={styles.field}>
          <label htmlFor="name" style={styles.label}>
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Nom del personatge"
          />
        </div>

        <div style={styles.row}>
          <div style={styles.halfField}>
            <label htmlFor="attack" style={styles.label}>
              Atac
            </label>
            <input
              type="number"
              id="attack"
              name="attack"
              value={formData.attack}
              onChange={handleChange}
              required
              min="0"
              max="100"
              style={styles.input}
              placeholder="39"
            />
          </div>

          <div style={styles.halfField}>
            <label htmlFor="deffense" style={styles.label}>
              Defensa
            </label>
            <input
              type="number"
              id="deffense"
              name="deffense"
              value={formData.deffense}
              onChange={handleChange}
              required
              min="0"
              max="100"
              style={styles.input}
              placeholder="64"
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.halfField}>
            <label htmlFor="latitude" style={styles.label}>
              Latitud
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              required
              step="0.000001"
              style={styles.input}
              placeholder="26.0"
            />
          </div>

          <div style={styles.halfField}>
            <label htmlFor="longitude" style={styles.label}>
              Longitud
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              required
              step="0.000001"
              style={styles.input}
              placeholder="20.0"
            />
          </div>
        </div>

        <div style={styles.field}>
          <label htmlFor="description" style={styles.label}>
            Descripció
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            style={styles.textarea}
            placeholder="Descripció del personatge..."
          />
        </div>

        <div style={styles.buttonContainer}>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={loading ? styles.buttonDisabled : styles.button}
          >
            {loading ? 
              (isEditing ? 'Actualitzant...' : 'Creant...') : 
              (isEditing ? 'Actualitzar Personatge' : 'Crear Personatge')
            }
          </button>

          <button
            onClick={handleCancel}
            disabled={loading}
            style={styles.cancelButton}
          >
            Cancel·lar
          </button>
        </div>

        {message && (
          <div style={message.includes('Error') ? styles.messageError : styles.messageSuccess}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    textAlign: 'center',
    color: '#374151'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column'
  },
  halfField: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  row: {
    display: 'flex',
    gap: '16px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '4px'
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  },
  buttonContainer: {
    display: 'flex',
    gap: '12px'
  },
  button: {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    outline: 'none'
  },
  buttonDisabled: {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: '#9ca3af',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'not-allowed',
    outline: 'none'
  },
  cancelButton: {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    outline: 'none'
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#6b7280',
    padding: '48px'
  },
  messageSuccess: {
    padding: '12px',
    backgroundColor: '#dcfce7',
    color: '#166534',
    borderRadius: '6px',
    textAlign: 'center',
    fontSize: '14px'
  },
  messageError: {
    padding: '12px',
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    borderRadius: '6px',
    textAlign: 'center',
    fontSize: '14px'
  }
};

export default CharacterForm;