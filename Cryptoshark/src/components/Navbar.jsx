import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to='/'><span className="logo-vault">CryptoShar</span><span className="logo-x">K</span></NavLink>
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
    </nav>
  )
}

export default Navbar