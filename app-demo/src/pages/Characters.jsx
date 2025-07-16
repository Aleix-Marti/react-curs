import { useState, useEffect } from 'react'
import { getCharacters } from '@services/services.js'
import Card from '@components/Card.jsx'
import '@/App.css'

function Characters() {
  const [characters, setCharacters] = useState([])
  const [fighters, setFighters] = useState([])


  useEffect( () => {      
    
    const getData = async () => {
      const allChars = await getCharacters()
      setCharacters( allChars )
    }
    
    getData()
    

  }, [])

  const selectCard = (character) => {
    // console.log('select')
    // Comprovar si ja està seleccionat
    const isAlreadySelected = fighters.some(f => f.id === character.id)
    
    if (isAlreadySelected) {
      // Si ja està seleccionat, el treiem
      setFighters(fighters => fighters.filter(f => f.id !== character.id))
    } else if (fighters.length < 2) {
      // Si no està seleccionat i hi ha espai, l'afegim
      setFighters(fighters => [...fighters, character])
    }
  }

  

  return (
    <>
      <h1>DBZ Fighters</h1>

      <section className="fighters">
        {fighters.length == 1 && <p>{fighters[0].name} vs ??</p>}
        {fighters.length == 2 && <p>{fighters[0].name} vs {fighters[1].name}</p>}
      </section>

      <section className="characters">
        {characters.map( character => {
          return (
            <Card 
              key={character.id} 
              info={character}
              onSelect={ () => {selectCard(character)} }
              selected={ fighters.some( f => f.id === character.id ) }
            />
          )
        })}
      </section>
    </>
  )
}

export default Characters
