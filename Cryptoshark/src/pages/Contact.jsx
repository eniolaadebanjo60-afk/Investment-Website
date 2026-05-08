import { useState } from 'react'
import './Contact.css'
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BiLogoWhatsapp, BiLogoFacebook, BiLogoInstagram, BiLogoTwitter, BiLogoTelegram } from 'react-icons/bi'
import useScrollAnimation from '../hooks/useScrollAnimation'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const [heroRef, heroVisible] = useScrollAnimation()
  const [infoRef, infoVisible] = useScrollAnimation()
  const [formRef, formVisible] = useScrollAnimation()
  const [socialRef, socialVisible] = useScrollAnimation()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    const contacts = JSON.parse(localStorage.getItem('vaultx_contacts') || '[]')
    contacts.push({ ...form, date: new Date().toISOString() })
    localStorage.setItem('vaultx_contacts', JSON.stringify(contacts))
    setSubmitted(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="contact">

      <section className="contact-hero">
        <div ref={heroRef} className={`fade-up ${heroVisible ? 'visible' : ''}`}>
          <h1>Get In <span>Touch</span></h1>
          <p>Have questions? Our team is ready to help you 24/7.</p>
        </div>
      </section>

      <section className="contact-body">

        <div ref={infoRef} className={`contact-info fade-left ${infoVisible ? 'visible' : ''}`}>
          <div className="info-card">
            <div className="info-icon"><FontAwesomeIcon icon={faEnvelope} /></div>
            <h3>Email Us</h3>
            <p>support@vaultx.com</p>
          </div>
          <div className="info-card">
            <div className="info-icon"><FontAwesomeIcon icon={faPhone} /></div>
            <h3>Call Us</h3>
            <p>+1 (800) 123-4567</p>
          </div>
          <div className="info-card">
            <div className="info-icon"><FontAwesomeIcon icon={faLocationDot} /></div>
            <h3>Office</h3>
            <p>123 Crypto Lane, New York, USA</p>
          </div>
        </div>

        <div ref={formRef} className={`contact-form fade-right ${formVisible ? 'visible' : ''}`}>
          {submitted ? (
            <div className="success-message">
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <div className="form">
              <h2>Send a Message</h2>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={form.message}
                onChange={handleChange}
              />
              <button onClick={handleSubmit}>Send Message</button>
            </div>
          )}
        </div>

      </section>

      <div ref={socialRef} className={`extra-contact fade-up ${socialVisible ? 'visible' : ''}`}>
        <h1>You Can Also Reach Out to us via:</h1>
        <div className='social-icon'>
          <a href=''><BiLogoWhatsapp /></a>
          <a href=''><BiLogoInstagram /></a>
          <a href=''><BiLogoTwitter /></a>
          <a href=''><BiLogoFacebook /></a>
          <a href=''><BiLogoTelegram /></a>
        </div>
      </div>

    </div>
  )
}

export default Contact