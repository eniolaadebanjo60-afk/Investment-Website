import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to='/'><span className="logo-vault">Vault</span><span className="logo-x">X</span></NavLink>
      </div>

      <ul className="navbar-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/plans">Plans</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>

      <div className="navbar-actions">
        <NavLink to="/login" className="btn-login">Login</NavLink>
        <NavLink to="/signup" className="btn-signup">Get Started</NavLink>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={menuOpen ? 'bar open' : 'bar'}></span>
        <span className={menuOpen ? 'bar open' : 'bar'}></span>
        <span className={menuOpen ? 'bar open' : 'bar'}></span>
      </div>


      {menuOpen && (
        <div className="mobile-menu">
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/plans" onClick={() => setMenuOpen(false)}>Plans</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
          <NavLink to="/signup" className="mobile-signup" onClick={() => setMenuOpen(false)}>Get Started</NavLink>
        </div>
      )}
    </nav>
  )
}

export default Navbar