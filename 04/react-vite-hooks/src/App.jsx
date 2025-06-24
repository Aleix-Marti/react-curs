import { useState } from 'react'
import './App.css'
import Pokemons from './components/Pokemons.jsx'


function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // setCount((prevCount) => prevCount + 1);
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Counter Component</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

function IncDec({oper}) {
  const [count, setCount] = useState(0);

  let operation = oper || 'inc';
  let buttonText = operation === 'inc' ? 'Increment' : 'Decrement';

  const incdec = () => {
    if (operation === 'inc') {
      setCount(count + 1);
    } else if (operation === 'dec') {
      setCount(count - 1);
    }
  }

  return (
    <div>
      <h2>IncDec Component</h2>
      <p>Count: {count}</p>
      <button onClick={incdec}>{buttonText}</button>
    </div>
  )
}


function ShowHide() {
  const [isVisible, setVisible] = useState(true);

  const toggleVisibility = () => {
    setVisible(!isVisible);
  }

  return (
    <div>
      <h2>Show/Hide</h2>
      <p className={isVisible ? 'visible' : 'invisible'}>Hello! Now you see me!</p>
      <button onClick={toggleVisibility}>{isVisible ? 'Hide' : 'Show'}</button>
      {isVisible && (
        <p>This text is conditionally rendered based on visibility.</p>
      )}
    </div>
  )
}

function FormName() {
  const [name, setName] = useState('');
  const [isError, setError] = useState(false);
  const [isValid, setValid] = useState(false);
  // let isValid = false;

  const checkForm = (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      setError(true);
      setValid(false);
      // isValid = false;
    } else {
      setError(false);
      setValid(true);
      // isValid = true;
    }

    console.log('is valid', isValid);

  }

  return(
    <form onSubmit={checkForm}>
      <label htmlFor="nom">Introdueix el teu nom:</label>
      <input type="text" name="" id="nom" value={name} onChange={(e) => { setValid(false); setName(e.target.value) }}/>
      {isError && (
        <p>Si us plau, revisa el teu nom</p>
      )}
      {(!isError && isValid) && (
        <p>Hola {name}</p>
      )}
      <button type="submit">Submit</button>
    </form>
  )
}



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Counter />
      <IncDec oper='inc' />
      <IncDec oper='dec' />
      <ShowHide />
      <FormName />
      <Pokemons />
    </>
  )
}

export default App
