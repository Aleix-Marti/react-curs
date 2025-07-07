import { useState, useEffect, useRef } from 'react'
import './App.css'
import { getTotalItems, getRaces, getAllCharacters, getByRace } from '@services/services.js'
import Character from './components/Character/Character'

function App() {
  // const [count, setCount] = useState(0)
  const [races, setRaces] = useState([])
  const [filter, setFilter] = useState('all')
  const [characters, setCharacters] = useState([])
  const charName = useRef('');
  
  useEffect( () => {
    const getData = async () => {
      const totalItems = await getTotalItems();
      const allRaces = await getRaces(totalItems);
      setRaces([...allRaces]);
    }

    getData();
    
  }, [])

  useEffect( () => {
    const filterCharacters = async () => {
      console.log('filter: ',filter)
      if ( filter === 'all' ) {
        const { items } = await getAllCharacters();
        setCharacters(items)
      } else {
        const filtered = await getByRace(filter);
        setCharacters(filtered)
      }
    }
    filterCharacters()
  }, [filter]) 


  useEffect(() => {
  console.log('Characters actualitzat:', characters);
}, [characters]);

  return (
    <>
      <section className="filters">
        <ul class="races">
          {/* {races && races.map( race => <button>{race}</button>)} */}
          {races && races.map( (race, index) => {
            let raceValue = race.toLowerCase().split(' ').join('-');
            return(
              <li key={index}>
                <label htmlFor={`race-${raceValue}`}>{race}</label>
                <input id={`race-${raceValue}`} type="radio" name="races" value={race} onChange={ e => setFilter(e.target.value)} />
              </li>
            )
            } 
          )}
          <li>
            <label htmlFor={`race-all`}>All</label>
            <input id={`race-all`} type="radio" name="races" value="all" onChange={ e => setFilter(e.target.value)} defaultChecked={filter === 'all'}/>
          </li>
        </ul>
      </section>  
      {/* <input ref={charName} onChange={filterByName}></input> */}
      <section className="characters">
          {characters && characters.map( character => {
            // return( <div key={character.id}>{character.name}</div> )
            return( <Character key={character.id} character={character} />)
          })}
      </section>
    </>
  )
}

export default App
