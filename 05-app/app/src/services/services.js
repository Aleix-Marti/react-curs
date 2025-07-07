const ENDPOINT = 'https://dragonball-api.com/api/characters';

// opció then
// export const getCharacters = () => {
//   return fetch(ENDPOINT)
//       .then((response) => response.json())
//       .then((data) => {
//         // setCharacters(data.items);
//         // setNext(data.links.next);
//         return [data.items, data.links.next]
//       })
// }

export const getCharacters = async (page) => {
  
  // opció async/await
  const response = await fetch( page ? page : ENDPOINT );
  const data = await response.json();
  //retornar data i mantenir l'estat setCharacters fora de la lògica del servei
  // return [data.items, data.links.next];
  return data;
}