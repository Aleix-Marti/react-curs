import { useState, useEffect } from 'react'
import { getCustomFighters } from '@services/services.js'
import FighterCard from '@components/FighterCard.jsx'
import '@/App.css'

function CustomFighters() {
  const [characters, setCharacters] = useState([])
  const [fighters, setFighters] = useState([])
  const [winner, setWinner] = useState('')


  useEffect( () => {      
    const getData = async () => {
      const allChars = await getCustomFighters()
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

  const fight = () => {
    if ( fighters[0].attack > fighters[1].deffense ) {
      setWinner(fighters[0].name)
    } else {
      setWinner(fighters[1].name)
    }
  }

  

  return (
    <>
      <h1>My Fighters</h1>

              

      <section className="fighters">
        {fighters.length == 1 && <p>{fighters[0].name} vs ??</p>}
        {fighters.length == 2 && (
          <>
            <p>{fighters[0].name} vs {fighters[1].name}</p>
            <button onClick={fight}>Fight</button>
          </>
        )}
        {winner && <p>{winner} wins!</p>}
        
      </section>

      <section className="characters">
        {characters.map( character => {
          return (
            <FighterCard 
              key={character.id} 
              info={character}
              onSelect={ () => {selectCard(character)} }
              selected={ fighters.some( f => f.id === character.id ) }
              iconcolor={'#000'}
            />
          )
        })}
      </section>
    </>
  )
}

export default CustomFighters
