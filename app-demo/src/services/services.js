import axios from 'axios'

const BASE_URL_DBZ = 'https://dragonball-api.com/api/characters'

const FIGHTERS_URL = 'https://retoolapi.dev/nJCkCJ/data'

export const getCharacters = () => {

  return fetch(BASE_URL_DBZ)
    .then( response => response.json() )
    .then( data => {
      // console.log(data)
      // return data.items
      const { items } = data
      return items
    })

}

export const getCharactersAxios = () => {
  return axios.get(BASE_URL_DBZ)
    .then(response => {
      console.log(response.data)
      const { items } = response.data
      return items
    })
}

export const getCharactersAxios2 = async () => {
  const response = await axios.get(BASE_URL_DBZ)
  console.log(response.data)
  const { items } = response.data
  return items
}

export const getCharacters2 = async () => {

  const response = await fetch(BASE_URL_DBZ)
  const data_2 = await response.json()
  // console.log(data_2)
  return data_2.items
  const { items } = data_2
  return items

}



export const getSingleCharacter = async ( id ) => {

  const response = await fetch(`${BASE_URL_DBZ}/${id}`)
  const data = await response.json()
  // console.log(data)
  return data

}

export const getSingleCharacter2 = async ( id ) => {
  try {
    const response = await fetch(`${BASE_URL_DBZ}/${id}`)
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error('Error fetching characters:', error.message)
    return { data: null, error: error.message }
  }

}


export const addCharacter = async ( dataToSend ) => {
  const response = await fetch(FIGHTERS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      console.log(response)
  
  // const result = await response.json();
  // console.log(result)

  
  
  return response
}

export const addFighter = async ( dataToSend ) => {
  const response = await fetch(FIGHTERS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      console.log(response)
  
  // const result = await response.json();
  // console.log(result)

  
  
  return response
}

export const addCharacterAxios = async (dataToSend) => {
  try {
    const response = await axios.post(FIGHTERS_URL, dataToSend, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response;
  } catch (error) {
    console.error('Error adding character:', error);
    throw error;
  }
}



export const getCustomFighters = async () => {

  const response = await fetch(FIGHTERS_URL)
  const data = await response.json()
  return data

}


export const getSingleFighter = async ( id ) => {

  const response = await fetch(`${FIGHTERS_URL}/${id}`)
  const data = await response.json()
  // console.log(data)
  return data

}


export const updateFighter = async ( id, dataToSend ) => {
  const response = await fetch(`${FIGHTERS_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend)
  });
  
  return response
}


export const deleteFighter = async ( id ) => {
  const response = await fetch(`${FIGHTERS_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  return response
}
