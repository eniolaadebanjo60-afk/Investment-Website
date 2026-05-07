import { useState, useEffect } from 'react'
import './Admin.css'

const ADMIN_PASSWORD = 'Banjo@2003'

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [users, setUsers] = useState([])
  const [withdrawals, setWithdrawals] = useState([])
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (authenticated) {
      const u = JSON.parse(localStorage.getItem('vaultx_users') || '[]')
      const w = JSON.parse(localStorage.getItem('vaultx_withdrawals') || '[]')
      setUsers(u)
      setWithdrawals(w)
    }
  }, [authenticated])

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password.')
    }
  }

  const handleWithdrawalAction = (index, action) => {
    const updated = [...withdrawals]
    updated[index].status = action === 'approve' ? 'Approved' : 'Rejected'
    setWithdrawals(updated)
    localStorage.setItem('vaultx_withdrawals', JSON.stringify(updated))
  }

  const totalBalance = users.reduce((sum, u) => sum + (u.balance || 0), 0)
  const totalInvestments = users.reduce((sum, u) => sum + (u.investments?.length || 0), 0)
  const pendingWithdrawals = withdrawals.filter(w => w.status === 'Pending').length

  if (!authenticated) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <div className="admin-logo">Vault<span>X</span> Admin</div>
          <h2>Admin Access</h2>
          <p>Enter your admin password to continue</p>
          {error && <div className="admin-error">{error}</div>}
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin">

      {/* Top Bar */}
      <div className="admin-topbar">
        <div className="admin-logo">Vault<span>X</span> Admin</div>
        <button className="admin-logout" onClick={() => setAuthenticated(false)}>Logout</button>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>Users</button>
        <button className={activeTab === 'withdrawals' ? 'active' : ''} onClick={() => setActiveTab('withdrawals')}>Withdrawals</button>
      </div>

      <div className="admin-body">

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="admin-overview">
            <div className="admin-stat-card">
              <p>Total Users</p>
              <h2>{users.length}</h2>
            </div>
            <div className="admin-stat-card">
              <p>Total Balance</p>
              <h2>${totalBalance.toLocaleString()}</h2>
            </div>
            <div className="admin-stat-card">
              <p>Total Investments</p>
              <h2>{totalInvestments}</h2>
            </div>
            <div className="admin-stat-card">
              <p>Pending Withdrawals</p>
              <h2>{pendingWithdrawals}</h2>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className="admin-section-title">All Users</h2>
            {users.length === 0 ? (
              <p className="admin-empty">No users registered yet.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Balance</th>
                    <th>Investments</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={i}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>${(u.balance || 0).toLocaleString()}</td>
                      <td>{u.investments?.length || 0}</td>
                      <td>{new Date(u.joined).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Withdrawals Tab */}
        {activeTab === 'withdrawals' && (
          <div>
            <h2 className="admin-section-title">Withdrawal Requests</h2>
            {withdrawals.length === 0 ? (
              <p className="admin-empty">No withdrawal requests yet.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map((w, i) => (
                    <tr key={i}>
                      <td>{w.name}</td>
                      <td>{w.email}</td>
                      <td>${w.amount.toLocaleString()}</td>
                      <td>{w.date}</td>
                      <td className={
                        w.status === 'Approved' ? 'status-approved' :
                        w.status === 'Rejected' ? 'status-rejected' :
                        'status-pending'
                      }>{w.status}</td>
                      <td>
                        {w.status === 'Pending' && (
                          <div className="admin-actions">
                            <button className="approve-btn" onClick={() => handleWithdrawalAction(i, 'approve')}>Approve</button>
                            <button className="reject-btn" onClick={() => handleWithdrawalAction(i, 'reject')}>Reject</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default Admin