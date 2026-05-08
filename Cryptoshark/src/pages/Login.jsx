import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import useScrollAnimation from '../hooks/useScrollAnimation'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const [cardRef, cardVisible] = useScrollAnimation()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('vaultx_users') || '[]')
    const user = users.find(u => u.email === form.email && u.password === form.password)

    if (!user) {
      setError('Invalid email or password.')
      return
    }

    localStorage.setItem('vaultx_auth', JSON.stringify(user))
    navigate('/dashboard')
  }

  return (
    <div className="login">
      <div ref={cardRef} className={`login-card fade-up ${cardVisible ? 'visible' : ''}`}>
        <div className="login-logo">Vault<span>X</span></div>
        <h2>Welcome Back</h2>
        <p>Login to access your dashboard</p>

        {error && <div className="login-error">{error}</div>}

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

        <button onClick={handleLogin}>Login</button>

        <p className="login-footer">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  )
}

export default Login