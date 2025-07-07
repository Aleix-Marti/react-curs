import { useState } from 'react';
import './character.css';


export default function Character( {character} ) {

  const [selected, setSelected] = useState(false);

  return (
    <div onClick={() => setSelected(!selected)} key={character.id} className={`character ${(character.race).toLowerCase()} ${selected ? 'selected' : ''}`}>
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <div className="info">
        <p>Race: {character.race}</p>
        <p>Ki: {character.ki}</p>
      </div>
    </div>
  )
}