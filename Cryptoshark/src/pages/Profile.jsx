import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

    
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('vaultx_auth') || 'null')
    if (!auth) {
      navigate('/login')
      return
    }
    setUser(auth)
    setForm({ name: auth.name, email: auth.email, password: '', confirm: '' })
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUpdate = () => {
    setError('')
    setSuccess('')

    if (!form.name || !form.email) {
      setError('Name and email are required.')
      return
    }

    if (form.password && form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }

    const updatedUser = {
      ...user,
      name: form.name,
      email: form.email,
      password: form.password || user.password,
    }

    localStorage.setItem('vaultx_auth', JSON.stringify(updatedUser))
    const users = JSON.parse(localStorage.getItem('vaultx_users') || '[]')
    const updatedUsers = users.map(u => u.email === user.email ? updatedUser : u)
    localStorage.setItem('vaultx_users', JSON.stringify(updatedUsers))

    setUser(updatedUser)
    setSuccess('Profile updated successfully!')
    setForm({ ...form, password: '', confirm: '' })
  }

  const hideBars = location.pathname === '/dashboard' || 
                 location.pathname === '/admin' || 
                 location.pathname === '/profile'
  if (!user) return null

  return (
    <div className="profile">
      <div className="profile-topbar">
        <div className="profile-logo">Vault<span>X</span></div>
        <div className="profile-nav">
          <button onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>
        </div>
      </div>

      <div className="profile-body">
        <div className="profile-card">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <span>Member since {new Date(user.joined).toLocaleDateString()}</span>
        </div>

        <div className="profile-form">
          <h2>Update Profile</h2>

          {error && <div className="profile-error">{error}</div>}
          {success && <div className="profile-success">{success}</div>}

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <label>New Password <span>(leave blank to keep current)</span></label>
          <input
            type="password"
            name="password"
            placeholder="New password"
            value={form.password}
            onChange={handleChange}
          />

          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirm"
            placeholder="Confirm new password"
            value={form.confirm}
            onChange={handleChange}
          />

          <button onClick={handleUpdate}>Save Changes</button>
        </div>
      </div>
    </div>
  )
}

export default Profile