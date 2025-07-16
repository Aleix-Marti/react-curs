import { Link } from 'react-router-dom'
import Character from '@components/Character'
import { useState } from 'react';


// export default function Card( { info, onSelect } ) {
export default function Card( { info, selected, onSelect } ) {

  // const [selected, setSelected] = useState(false)



  return (
    <div className={`character ${(info.race).toLowerCase()} ${selected ? 'selected' : ''}`}>
      <Character info={info} />
      <Link className='more-info' to={`/character/${info.id}`}> More info </Link>
      {/* <button onClick={() => setSelected(!selected)}>{selected ? 'Unselect' : 'Select'}</button> */}
      <button onClick={onSelect}>{selected ? 'Unselect' : 'Select'}</button>

    </div>
  )
}