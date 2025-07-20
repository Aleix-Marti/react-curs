import { Link } from 'react-router-dom'
import Fighter from '@components/Fighter'
import { Info, PowerIcon } from '@assets/assets'


export default function Card( { info, selected, onSelect } ) {




  return (
    <div className={`character ${selected ? 'selected' : ''}`}>
      <Fighter info={info} />
      <Link className='more-info' to={`/fighter/${info.id}`}><Info /></Link>
      <button onClick={onSelect}>
        {selected ? 'Unselect' : 'Select'}
        </button>
        {selected && <PowerIcon />}

    </div>
  )
}