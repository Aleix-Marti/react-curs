export default function MapPopup({ character }) {
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
    <>
      <style jsx>{`
        .popup-container {
          max-width: 280px;
          font-family: Arial, sans-serif;
        }

        .header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .character-image {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #3b82f6;
          object-position: top;
        }

        .character-name {
          margin: 0;
          font-size: 18px;
          color: #333;
        }

        .stats-container {
          display: flex;
          gap: 20px;
          justify-content: space-between;
          margin: 12px 0;
          padding: 8px;
          background: #f8f9fa;
          border-radius: 4px;
        }

        .stat {
          text-align: center;
          flex: 1;
        }

        .stat-label {
          font-size: 12px;
          color: #666;
          margin-bottom: 2px;
        }

        .stat-value {
          font-size: 16px;
          font-weight: bold;
        }

        .attack-value {
          color: #dc3545;
        }

        .defense-value {
          color: #28a745;
        }

        .description {
          font-size: 14px;
          color: #555;
          line-height: 1.4;
          margin: 12px 0;
        }

        .coordinates {
          font-size: 12px;
          color: #888;
          text-align: center;
          margin-top: 12px;
          padding-top: 8px;
          border-top: 1px solid #eee;
        }
      `}</style>

      <div className="popup-container">
        <div className="header">
          {img && (
            <img 
              src={img} 
              alt={name} 
              className="character-image"
            />
          )}
          <h3 className="character-name">{name}</h3>
        </div>
        
        <div className="stats-container">
          <div className="stat">
            <div className="stat-label">Atac</div>
            <div className="stat-value attack-value">{attack}</div>
          </div>
          <div className="stat">
            <div className="stat-label">Defensa</div>
            <div className="stat-value defense-value">{deffense}</div>
          </div>
        </div>
        
        <div className="description">
          {description}
        </div>
        
        <div className="coordinates">
          📍 {parseFloat(latitude).toFixed(4)}, {parseFloat(longitude).toFixed(4)}
        </div>
      </div>
    </>
  );
};