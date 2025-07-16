import { Link, useLocation } from 'react-router-dom'
import homeIcon from '@assets/home.svg'

function Navbar() {

  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="home-icon"><img src={homeIcon} /></Link>
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
      <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
      <Link to="/characters" className={location.pathname === '/characters' ? 'active' : ''}>Characters</Link>
    </nav>
  )

}

export default Navbar