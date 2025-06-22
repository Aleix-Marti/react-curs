
import { useState } from "react";
import { cards } from "./cards.js";

const Card = ({ card }) => {

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    console.log("Card clicked");
  }

  console.log("Card props", card);

  return(
    <div onClick = {handleClick} className={`card ${active ? 'active' : ''}`}>
      {/* My first card. My state is {active ? 'active' : 'inactive'}. */}
      <h2>{card.name}</h2>
      <img src={card.image} alt="" />
      <p>Attack: {card.attack}</p>
      <p>Defense: {card.defense}</p>
      <p>Ki: {card.ki}</p>
    </div>
  )
}

function MyApp({name}) {
  console.log("cards", cards);
  return(
    <>
      <h1>Hello React, and hello {name}</h1>
      {/* <Card></Card> */}
      <div className="cards">
        {cards.map((card, index) => {
          return (
            <Card 
              key={index}
              card={card} />
          )
        })}
      </div>
    </>
  )
}

export default MyApp