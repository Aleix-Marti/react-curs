const ENDPOINT = 'https://dragonball-api.com/api/characters';

export const getTotalItems = async () => {
  const resp = await fetch( ENDPOINT );
  const data = await resp.json();
  const totalItems = data.meta.totalItems;
  // console.log( 'num items: ', totalItems)
  return totalItems;
}

export const getRaces = async ( limit ) => {
  const fetchRaces = await fetch(`${ENDPOINT}?limit=${limit}`);
  const data = await fetchRaces.json();
  // console.log(data.items);
  const races = data.items.map( character => character.race ) // extreure només "race"
  const singleRaces = [...new Set(races)] // nou array sense duplicats
  return singleRaces;
}

export const getByRace = async ( race ) => {
  console.log(`${ENDPOINT}?race=${race}`);
  const resp = await fetch(`${ENDPOINT}?race=${race}`);
  const data = await resp.json();
  return data;
}


export const getAllCharacters = async () => {
  const all = await getTotalItems();
  const resp = await fetch(`${ENDPOINT}?limit=${all}`);
  const data = await resp.json();
  return data;
}