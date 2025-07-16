import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from '@pages/Home'
import About from '@pages/About'
import Characters from '@pages/Characters'
import SingleCharacter from './pages/SingleCharacter'
import Navbar from '@components/Navbar'

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
        <Route path="/character/:id" element={<SingleCharacter />} />
      </Routes>
      </>
    </Router>
  )
}

export default App
