import './Home.css'
import { BiLock } from 'react-icons/bi'
import { BiTrendingUp } from 'react-icons/bi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faChartLine, faBolt } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  return (
    <div className="home">

      <section className="hero">
        <div className="hero-text">
          <h1>Grow Your Wealth With <span>Crypto</span></h1>
          <p>CryptoShark gives you access to smart crypto investment plans designed to grow your money securely and consistently.</p>
          <div className="hero-buttons">
            <a href="/signup" className="btn-primary">Get Started</a>
            <a href="/plans" className="btn-outline">View Plans</a>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <h3>$120M+</h3>
            <p>Assets Managed</p>
          </div>
          <div className="stat">
            <h3>15,000+</h3>
            <p>Active Investors</p>
          </div>
          <div className="stat">
            <h3>98%</h3>
            <p>Satisfaction Rate</p>
          </div>
          <div className="stat">
            <h3>4.9★</h3>
            <p>User Rating</p>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose CryptoShark?</h2>
        <p className="section-sub">We make crypto investing simple, safe, and rewarding.</p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><BiLock/></div>
            <h3>Bank-Grade Security</h3>
            <p>Your assets are protected with military-grade encryption and multi-factor authentication.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><BiTrendingUp/></div>
            <h3>Consistent Returns</h3>
            <p>Our expert-managed plans deliver steady returns regardless of market conditions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FontAwesomeIcon icon={faBolt}/></div>
            <h3>Instant Withdrawals</h3>
            <p>Access your funds anytime. No delays, no hidden fees, no stress.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <p className="section-sub">Start investing in three simple steps.</p>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Account</h3>
            <p>Sign up in minutes with just your email and basic details.</p>
          </div>
          <div className="step-divider"></div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Choose a Plan</h3>
            <p>Pick an investment plan that matches your goals and budget.</p>
          </div>
          <div className="step-divider"></div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Watch It Grow</h3>
            <p>Track your returns in real time from your personal dashboard.</p>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <h2>Ready to Start Investing?</h2>
        <p>Join thousands of investors already growing their wealth with VaultX.</p>
        <a href="/signup" className="btn-primary">Create Free Account</a>
      </section>

    </div>
  )
}

export default Home