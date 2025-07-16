import axios from 'axios'

const BASE_URL = 'https://dragonball-api.com/api/characters'

export const getCharacters = () => {

  return fetch(BASE_URL)
    .then( response => response.json() )
    .then( data => {
      // console.log(data)
      // return data.items
      const { items } = data
      return items
    })

}

export const getCharactersAxios = () => {
  return axios.get(BASE_URL)
    .then(response => {
      console.log(response.data)
      const { items } = response.data
      return items
    })
}

export const getCharactersAxios2 = async () => {
  const response = await axios.get(BASE_URL)
  console.log(response.data)
  const { items } = response.data
  return items
}

export const getCharacters2 = async () => {

  const response = await fetch(BASE_URL)
  const data_2 = await response.json()
  // console.log(data_2)
  return data_2.items
  const { items } = data_2
  return items

}



export const getSingleCharacter = async ( id ) => {

  const response = await fetch(`${BASE_URL}/${id}`)
  const data = await response.json()
  // console.log(data)
  return data

}

export const getSingleCharacter2 = async ( id ) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`)
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error('Error fetching characters:', error.message)
    return { data: null, error: error.message }
  }

}