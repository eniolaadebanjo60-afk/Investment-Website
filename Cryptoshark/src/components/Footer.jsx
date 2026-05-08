import './Footer.css'
import { NavLink } from 'react-router-dom'
import { BiLogoWhatsapp, BiLogoFacebook, BiLogoInstagram, BiLogoTwitter, BiLogoTelegram } from 'react-icons/bi'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-brand">
          <div className="footer-logo">Vault<span>X</span></div>
          <p>Smart crypto investments for everyday people. Grow your wealth securely with VaultX.</p>
          <div className="footer-socials">
            <a href=""><BiLogoWhatsapp /></a>
            <a href=""><BiLogoInstagram /></a>
            <a href=""><BiLogoTwitter /></a>
            <a href=""><BiLogoFacebook /></a>
            <a href=""><BiLogoTelegram /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/plans">Plans</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        <div className="footer-links">
          <h4>Account</h4>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Get Started</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </div>

        <div className="footer-links">
          <h4>Contact</h4>
          <p>support@vaultx.com</p>
          <p>+1 (800) 123-4567</p>
          <p>123 Crypto Lane, New York, USA</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} VaultX. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer