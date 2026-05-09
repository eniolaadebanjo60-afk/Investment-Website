import './Home.css'
import { BiLock, BiTrendingUp } from 'react-icons/bi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import useScrollAnimation from '../hooks/useScrollAnimation'
import useCountUp from '../hooks/useCountUp'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const faqs = [
  {
    question: 'How do I get started with VaultX?',
    answer: 'Simply create a free account, fund your balance and choose an investment plan that suits your goals. The whole process takes less than 5 minutes.',
  },
  {
    question: 'Is my money safe with VaultX?',
    answer: 'Yes. We use bank-grade encryption and multi-factor authentication to protect your assets. Our platform is monitored 24/7 by our security team.',
  },
  {
    question: 'How are returns calculated?',
    answer: 'Returns are calculated daily based on your chosen plan percentage. For example the Bronze plan earns 2% daily on your invested amount for 7 days.',
  },
  {
    question: 'How long does withdrawal take?',
    answer: 'Withdrawal requests are processed within 24 hours. Once approved the funds are sent directly to your registered wallet or bank account.',
  },
  {
    question: 'Can I invest in multiple plans?',
    answer: 'Yes! You can invest in as many plans as you want simultaneously as long as you have sufficient balance for each plan.',
  },
]


const testimonials = [
  {
    name: 'James Okafor',
    role: 'Small Business Owner',
    text: 'I started with the Bronze plan and within a week I could already see returns. VaultX is the real deal — simple, transparent and reliable.',
  },
  {
    name: 'Amara Diallo',
    role: 'Freelance Designer',
    text: 'I was skeptical at first but VaultX proved me wrong. The dashboard is easy to use and my Gold plan has been performing beyond expectations.',
  },
  {
    name: 'David Chen',
    role: 'Software Engineer',
    text: 'As someone who understands tech, I appreciate how clean and secure VaultX feels. My Platinum investment has been growing steadily every day.',
  },
]

const Home = () => {
  const [heroRef, heroVisible] = useScrollAnimation()
  const [featuresRef, featuresVisible] = useScrollAnimation()
  const [stepsRef, stepsVisible] = useScrollAnimation()
  const [ctaRef, ctaVisible] = useScrollAnimation()
  const [statsRef, statsVisible] = useScrollAnimation()
  const [testimonialsRef, testimonialsVisible] = useScrollAnimation()
  const [openFaq, setOpenFaq] = useState(null)
  const [faqRef, faqVisible] = useScrollAnimation()

  const assets = useCountUp(120, statsVisible)
  const investors = useCountUp(15000, statsVisible)
  const satisfaction = useCountUp(98, statsVisible)
  const rating = useCountUp(4.9, statsVisible)

  return (
    <div className="home">

      <section className="hero">
        <div ref={heroRef} className={`hero-text fade-up ${heroVisible ? 'visible' : ''}`}>
          <h1>Grow Your Wealth With <span>Crypto</span></h1>
          <p>VaultX gives you access to smart crypto investment plans designed to grow your money securely and consistently.</p>
          <div className="hero-buttons">
            <a href="/signup" className="btn-primary">Get Started</a>
            <a href="/plans" className="btn-outline">View Plans</a>
          </div>
        </div>
        <div ref={statsRef} className={`hero-stats fade-up ${statsVisible ? 'visible' : ''}`}>
          <div className="stat">
            <h3>${assets}M+</h3>
            <p>Assets Managed</p>
          </div>
          <div className="stat">
            <h3>{investors.toLocaleString()}+</h3>
            <p>Active Investors</p>
          </div>
          <div className="stat">
            <h3>{satisfaction}%</h3>
            <p>Satisfaction Rate</p>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose VaultX?</h2>
        <p className="section-sub">We make crypto investing simple, safe, and rewarding.</p>
        <div ref={featuresRef} className="features-grid">
          <div className={`feature-card fade-left ${featuresVisible ? 'visible' : ''}`}>
            <div className="feature-icon"><BiLock /></div>
            <h3>Bank-Grade Security</h3>
            <p>Your assets are protected with military-grade encryption and multi-factor authentication.</p>
          </div>
          <div className={`feature-card fade-up delay-2 ${featuresVisible ? 'visible' : ''}`}>
            <div className="feature-icon"><BiTrendingUp /></div>
            <h3>Consistent Returns</h3>
            <p>Our expert-managed plans deliver steady returns regardless of market conditions.</p>
          </div>
          <div className={`feature-card fade-right delay-3 ${featuresVisible ? 'visible' : ''}`}>
            <div className="feature-icon"><FontAwesomeIcon icon={faBolt} /></div>
            <h3>Instant Withdrawals</h3>
            <p>Access your funds anytime. No delays, no hidden fees, no stress.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <p className="section-sub">Start investing in three simple steps.</p>
        <div ref={stepsRef} className="steps">
          <div className={`step fade-left ${stepsVisible ? 'visible' : ''}`}>
            <div className="step-number">1</div>
            <h3>Create Account</h3>
            <p>Sign up in minutes with just your email and basic details.</p>
          </div>
          <div className="step-divider"></div>
          <div className={`step fade-up delay-2 ${stepsVisible ? 'visible' : ''}`}>
            <div className="step-number">2</div>
            <h3>Choose a Plan</h3>
            <p>Pick an investment plan that matches your goals and budget.</p>
          </div>
          <div className="step-divider"></div>
          <div className={`step fade-right delay-3 ${stepsVisible ? 'visible' : ''}`}>
            <div className="step-number">3</div>
            <h3>Watch It Grow</h3>
            <p>Track your returns in real time from your personal dashboard.</p>
          </div>
        </div>
      </section>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <p className="section-sub">Everything you need to know about VaultX.</p>
        <div ref={faqRef} className="faq-list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item fade-up delay-${i + 1} ${faqVisible ? 'visible' : ''}`}
            >
              <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <h4>{faq.question}</h4>
                <span>{openFaq === i ? '−' : '+'}</span>
              </div>
              {openFaq === i && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>


      <section className="testimonials">
        <h2>What Our Investors Say</h2>
        <p className="section-sub">Real people, real results.</p>
        <div ref={testimonialsRef} className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className={`testimonial-card fade-up delay-${i + 1} ${testimonialsVisible ? 'visible' : ''}`}>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                <div>
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
              <div className="testimonial-stars">
                {Array.from({length: 5}). map((_, i) =>
                <FontAwesomeIcon icon={faStar} key={1}/>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div ref={ctaRef} className={`fade-up ${ctaVisible ? 'visible' : ''}`}>
          <h2>Ready to Start Investing?</h2>
          <p>Join thousands of investors already growing their wealth with VaultX.</p>
          <a href="/signup" className="btn-primary">Create Free Account</a>
        </div>
      </section>

    </div>
  )
}

export default Home