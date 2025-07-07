import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './characters.css'

// v1 import allCharacters from './mocks/characters.json'
import Character from './components/Character.jsx'

// v2 use service
import { getCharacters } from './services/services.js'

const ENDPOINT = 'https://dragonball-api.com/api/characters';

function App() {

  // v1 const characters = allCharacters.items;

  const [characters, setCharacters] = useState([]);
  const [next, setNext] = useState(null);

  // v1 useEffect
  // useEffect(() => { // evitar bucle infinit, només s'executa una vegada
  //   // fetch('https://dragonball-api.com/api/characters')
  //   fetch(ENDPOINT)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCharacters(data.items);
  //       setNext(data.links.next);
  //     })
  // }, [])

  // v1 alternativa amb async/await
  // crida amb async/await
  // useEffect( () => {
  //   async function getCharacters() {
  //     const data = await fetch(ENDPOINT);
  //     const json = await data.json()
  //     setCharacters(json.items)
  //   }
  //   getCharacters()
  // }, [])
  

  return (
    <>
      <section className="characters">
        {characters.map((character) => (
          <Character key={character.id} character={character} />
        ))}
      </section>
      <section className="pagination">
        { next && <button onClick={nextPage}>Next</button>}
      </section>
      <section className="fighters">
        
      </section>
    </>
  )
}

export default App
