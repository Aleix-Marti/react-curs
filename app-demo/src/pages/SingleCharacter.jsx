import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Character from '@components/Character'
import { getSingleCharacter } from '@services/services' 


export default function SingleCharacter() {

  const [character, setCharacter] = useState({})
  const [transforms, setTransforms] = useState([])
  // const [description, setDescription] = useState('')
  const desc = useRef('')
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect( () => {

    const getChar = async () => {
      const char = await getSingleCharacter(id)
      setCharacter(char)
      const { description } = char;
      // setDescription(description)
      desc.current = description;
      const { transformations } = char;
      setTransforms(transformations);
    }

    getChar()

  }, [] )

  

  const goBack = () => {
    navigate(-1)
  }

  const doTransform = (newId) => {
    // console.log('transform!',newId)
    const newInfo = transforms.filter( t => t.id === newId )
    // console.log(newInfo)
    setCharacter(newInfo[0])
  }




  return (
    <>
      <section className="single-character">
        <Character info={character} description={desc.current}/>
        { transforms && transforms.map( transform => {
          return(
            <button key={transform.id} onClick={() => { doTransform(transform.id)}}>{transform.name}</button>
          )
        })}
        <button onClick={goBack}>Go back</button>
      </section>
    </>
  )
}