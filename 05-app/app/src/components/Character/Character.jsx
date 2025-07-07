import './characters.css'
import { useEffect, useState } from 'react';
import { Info, PowerIcon } from '@assets/assets.jsx';
import Power from '@components/Power/Power.jsx';

export default function Character( {character} ) {

  const [selected, setSelected] = useState(false);

  useEffect( () => {
    console.log(character)
  }, [selected])

  return (
    <div onClick={() => setSelected(!selected)} key={character.id} className={`character ${(character.race).toLowerCase()} ${selected ? 'selected' : ''}`}>
      <Info />
      <img src={character.image} alt={character.name} />
      {/* <h2>{character.name}{selected && <PowerIcon />}</h2> */}
      <h2>{character.name}{selected && <Power />}</h2>
      <div className="info">
        <p>Race: {character.race}</p>
        <p>Ki: {character.ki}</p>
      </div>
      {/* {selected && <button>Upgrade</button>} */}
    </div>
  )
}