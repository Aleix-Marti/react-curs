import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// v1 import allCharacters from './mocks/characters.json'
import Character from './components/Character/Character.jsx'

// v2 use service
import { getCharacters } from './services/services.js'


function App() {

  // v1 const characters = allCharacters.items;

  const [characters, setCharacters] = useState([]);
  const [next, setNext] = useState(null);
  const [page, setPage] = useState(1);
  // const currentPage = useRef(1);

  // useEffect( async () => { no pot ser async, s'ha de cridar una funció asíncrona a dins
  useEffect(() => {
    const response = async () => {
      // const [chars, nextPage] = await getCharacters(next)
      const {items, links} = await getCharacters(next)
      if ( page == 1) {
        // setCharacters(chars);
        setCharacters(items);
      } else {
        setCharacters( prevCharacters => [...prevCharacters, ...items])
        // setCharacters(items);

        /**
        setCharacters rep una funció en lloc d'un valor directe
        Aquesta funció rep com a paràmetre el valor actual de l'estat (prevCharacters)
        La funció retorna el nou valor que volem establir

        Spread operator (...)
        ...prevCharacters expandeix tots els elements de l'array actual
        ...chars expandeix tots els elements del nou array que volem afegir

        Resultat
        Crea un nou array que conté tots els personatges anteriors + els nous
         */
      }
      // setNext(nextPage);
      setNext(links.next);
    }
    response()

  }, [page])

  const loadMore = () => {
    // currentPage.current = currentPage.current + 1;
    // console.log(currentPage.current)
    setPage(page+1)
  }

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

  

  return (
    <>
      <section className="characters">
        {characters.map((character) => (
          <Character key={character.id} character={character} />
        ))}
      </section>
      <section className="pagination">
        { next && <button onClick={loadMore}>Load More</button>}
      </section>
      <section className="fighters">
        
      </section>
    </>
  )
}

export default App
