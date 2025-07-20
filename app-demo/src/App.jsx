import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from '@pages/Home'
import About from '@pages/About'
import Characters from '@pages/Characters'
import CustomFighters from '@pages/CustomFighters'
import SingleCharacter from './pages/SingleCharacter'
import SingleFighter from './pages/SingleFighter'
import Navbar from '@components/Navbar'
import FighterForm from '@pages/FighterForm'
import NewFighter from '@pages/NewFighter'
import Mapa from '@pages/Mapa'

function App() {

  // const [path, setPath] = useState(window.location.pathname)

  // return (
  //   <>
  //     { path === '/' && <Home /> }
  //     { path === '/about' && <About />}
  //   </>
  // )

  return (
    <Router>
      <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/customfighters" element={<CustomFighters />} />
        <Route path="/character/:id" element={<SingleCharacter />} />
        <Route path="/fighter/:id" element={<SingleFighter />} />
        {/* <Route path="/new" element={<NewFighter />} /> */}
        <Route path="/new" element={<FighterForm />} />
        <Route path="/edit/:id" element={<FighterForm />} />
        <Route path="/map" element={<Mapa />} />
      </Routes>
      </>
    </Router>
  )
}

export default App
