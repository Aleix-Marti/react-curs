import { useState, useEffect } from 'react';

const POKEMONS_API = 'https://pokeapi.co/api/v2/pokemon?limit=10';

function Pokemons() {
  const [loading, setLoading] = useState(true)
  const [pokemons, setPokemons] = useState([])
  const [offset, setOffset] = useState(0)
  const [error, setError] = useState(null)

  const randomOffset = () => {
    const random = Math.floor(Math.random() * 1392)
    setOffset(random)
  }

  useEffect( () => {

    // fetch(POKEMONS_API)
    //   .then( res => res.json())
    //   .then( data => {
    //     console.log(data)
    //   })
    
    const fetchPokemons = async () => {
      try {
        setLoading(true)
        // const response = await fetch(POKEMONS_API)
        const response = await fetch(`${POKEMONS_API}&offset=${offset}`)
        const data = await response.json()
        console.log('llisat inicial:', data)

        // const allPromises = data.results.map( async promise => {
        //   const getPromise = await fetch(promise.url)
        //   const pokemon = await getPromise.json()
        //   console.log(promise.name, promise.url)
        //   console.log(pokemon)
        //   return pokemon
        // })

        const allPokemons = data.results.map( pokemon => fetch(pokemon.url).then( poke => poke.json() ))
        // console.log(allPokemons)
        
        const allPokemonDetails = await Promise.all(allPokemons)
        console.log(allPokemonDetails)

        const processedPokemons = allPokemonDetails.map(pokemon => ({
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types.map(type => type.type.name),
          sprite: pokemon.sprites.front_default
        }));

        setPokemons(processedPokemons)


      } catch {
        setError('Error fetching pokemons')
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemons();

  }, [offset])

  return (
    <main>
      {loading && (<p>Loading...</p>)}
      {error && (<p>{error}</p>)}
      <button onClick={randomOffset}>Get Pokemons</button>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {pokemons && pokemons.map((pokemon, index) => (
          <div key={index} style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h2>{pokemon.name}</h2>
            <img 
              src={pokemon.sprite} 
              alt={pokemon.name}
              style={{ width: '100px', height: '100px' }}
            />
            <p>Types: {pokemon.types.join(', ')}</p>
          </div>
        ))}
      </section>
    </main>
  )
  

}

export default Pokemons;