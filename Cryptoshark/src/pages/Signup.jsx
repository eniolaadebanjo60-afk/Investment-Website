import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'
import useScrollAnimation from '../hooks/useScrollAnimation'

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const [cardRef, cardVisible] = useScrollAnimation()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSignup = () => {
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }

    const users = JSON.parse(localStorage.getItem('vaultx_users') || '[]')
    const exists = users.find(u => u.email === form.email)

    if (exists) {
      setError('An account with this email already exists.')
      return
    }

    const newUser = {
      name: form.name,
      email: form.email,
      password: form.password,
      balance: 0,
      investments: [],
      joined: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem('vaultx_users', JSON.stringify(users))
    localStorage.setItem('vaultx_auth', JSON.stringify(newUser))
    navigate('/dashboard')
  }

  return (
    <div className="signup">
      <div ref={cardRef} className={`signup-card fade-up ${cardVisible ? 'visible' : ''}`}>
        <div className="signup-logo">Vault<span>X</span></div>
        <h2>Create Account</h2>
        <p>Start growing your wealth today</p>

        {error && <div className="signup-error">{error}</div>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirm"
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={handleChange}
        />

        <button onClick={handleSignup}>Create Account</button>

        <p className="signup-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  )
}

export default Signup