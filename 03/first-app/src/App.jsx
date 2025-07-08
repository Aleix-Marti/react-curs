import { useState } from 'react'
import './App.css'
import { cards } from './cards'

const Card = ({ card }) => {

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active)
  }

  return(
      <li onClick={handleClick} className={`card ${active ? 'active' : '' }`}>
        <h2>{card.name}</h2>
        <img src={card.image} alt="" />
        <p>Attack: {card.attack}</p>
        <p>Defense: {card.defense}</p>
        <p>Ki: {card.ki}</p>
      </li>
    )
}

function App() {


  return (
    <>
      <h1>Hello React!</h1>
      <section className="section-cards">
        <ul className="cards">
        {
          cards.map( (card, index) => {
            return(
              <Card 
                key={index}
                card={card}
              />
            )
          })
        }
        </ul>
      </section>
    </>
  )
}

export default App
