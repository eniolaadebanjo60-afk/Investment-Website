import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import Toast from '../components/Toast'
import useToast from '../hooks/useToast'
import { BsRocketTakeoff } from 'react-icons/bs'


const plans = [
  { name: 'Bronze', min: 100, daily: 2, duration: 7 },
  { name: 'Silver', min: 500, daily: 4, duration: 14 },
  { name: 'Gold', min: 1000, daily: 6, duration: 21 },
  { name: 'Platinum', min: 5000, daily: 10, duration: 30 },
]

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [showFund, setShowFund] = useState(false)
  const [fundAmount, setFundAmount] = useState('')
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const navigate = useNavigate()
  const { toast, showToast, hideToast } = useToast()


  const updateUserInStorage = (updatedUser) => {
    localStorage.setItem('vaultx_auth', JSON.stringify(updatedUser))
    const users = JSON.parse(localStorage.getItem('vaultx_users') || '[]')
    const updatedUsers = users.map(u => u.email === updatedUser.email ? updatedUser : u)
    localStorage.setItem('vaultx_users', JSON.stringify(updatedUsers))
  }

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('vaultx_auth') || 'null')
    if (!auth) {
      navigate('/login')
      return
    }

    let updatedUser = { ...auth }
    let roiEarned = 0

    if (updatedUser.investments && updatedUser.investments.length > 0) {
      updatedUser.investments = updatedUser.investments.map((inv) => {
        if (typeof inv === 'string') return inv

        const start = new Date(inv.startDate)
        const today = new Date()
        const daysPassed = Math.floor((today - start) / (1000 * 60 * 60 * 24))
        const daysToProcess = Math.min(daysPassed, inv.duration) - inv.daysProcessed

        if (daysToProcess > 0) {
          const earned = (inv.amount * (inv.daily / 100)) * daysToProcess
          roiEarned += earned
          return { ...inv, daysProcessed: inv.daysProcessed + daysToProcess }
        }

        return inv
      })
    }

    if (roiEarned > 0) {
      updatedUser.balance = parseFloat((updatedUser.balance + roiEarned).toFixed(2))
      const tx = {
        type: 'ROI',
        plan: 'Daily Returns',
        amount: 0,
        returns: roiEarned.toFixed(2),
        date: new Date().toLocaleDateString(),
      }
      const existingTx = JSON.parse(localStorage.getItem(`vaultx_tx_${auth.email}`) || '[]')
      const updatedTx = [tx, ...existingTx]
      localStorage.setItem(`vaultx_tx_${auth.email}`, JSON.stringify(updatedTx))
      setTransactions(updatedTx)
      updateUserInStorage(updatedUser)
    } else {
      const tx = JSON.parse(localStorage.getItem(`vaultx_tx_${auth.email}`) || '[]')
      setTransactions(tx)
    }

    setUser(updatedUser)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('vaultx_auth')
    navigate('/login')
  }

  const handleInvest = (plan) => {
    if (user.balance < plan.min) {
      showToast(`You need at least $${plan.min} to invest in the $${plan.name} plan.`, 'error')
      return
    }

    const newInvestment = {
      plan: plan.name,
      amount: plan.min,
      daily: plan.daily,
      duration: plan.duration,
      startDate: new Date().toISOString(),
      daysProcessed: 0,
    }

    const tx = {
      type: 'Investment',
      plan: plan.name,
      amount: plan.min,
      returns: '-',
      date: new Date().toLocaleDateString(),
    }

    const updatedTx = [tx, ...transactions]
    const updatedUser = {
      ...user,
      balance: user.balance - plan.min,
      investments: [...(user.investments || []), newInvestment],
    }

    updateUserInStorage(updatedUser)
    localStorage.setItem(`vaultx_tx_${user.email}`, JSON.stringify(updatedTx))
    setUser(updatedUser)
    setTransactions(updatedTx)
  }

  const handleWithdraw = () => {
    if (user.balance <= 0) {
      showToast('You have no balance to withdraw.', 'error')
      return
    }
    setShowWithdraw(true)
  }

  if (!user) return null

  const hasInvestments = user.investments && user.investments.filter(inv => typeof inv === 'object').length > 0

  return (
    <div className="dashboard">

      <div className="dash-topbar">
        <div className="dash-logo">Vault<span>X</span></div>
        <div className="dash-user">
          <span>👋 Welcome, {user.name}</span>
          <button className="profile-btn" onClick={() => navigate('/profile')}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="dash-body">
        <div className="dash-balance">
          <div className="balance-card">
            <p>Total Balance</p>
            <h1>${user.balance.toLocaleString()}</h1>
            <span>Available for investment</span>
            <div className="balance-actions">
              <button className="fund-btn" onClick={() => setShowFund(true)}>+ Fund Account</button>
              <button className="withdraw-btn" onClick={handleWithdraw}>Withdraw</button>
            </div>
          </div>
          <div className="balance-card secondary">
            <p>Total Investments</p>
            <h1>{user.investments?.filter(inv => typeof inv === 'object').length || 0}</h1>
            <span>Active plans</span>
          </div>
          <div className="balance-card secondary">
            <p>Member Since</p>
            <h1>{new Date(user.joined).getFullYear()}</h1>
            <span>{new Date(user.joined).toLocaleDateString()}</span>
          </div>
        </div>

        {user.balance === 0 && !hasInvestments && (
          <div className="empty-state">
            <div className="empty-icon"><BsRocketTakeoff/></div>
            <h2>Welcome to VaultX, {user.name.split(' ')[0]}!</h2>
            <p>You're all set! Fund your account to start investing and growing your wealth.</p>
            <button onClick={() => setShowFund(true)}>+ Fund Account Now</button>
          </div>
        )}

        {hasInvestments && (
          <div className="dash-section">
            <h2>Active Investments</h2>
            <div className="active-investments">
              {user.investments
                .filter(inv => typeof inv === 'object')
                .map((inv, i) => {
                  const daysRemaining = inv.duration - inv.daysProcessed
                  const progress = Math.min((inv.daysProcessed / inv.duration) * 100, 100)
                  return (
                    <div className="active-inv-card" key={i}>
                      <div className="active-inv-header">
                        <h3>{inv.plan} Plan</h3>
                        <span className={daysRemaining <= 0 ? 'badge-done' : 'badge-active'}>
                          {daysRemaining <= 0 ? 'Completed' : 'Active'}
                        </span>
                      </div>
                      <div className="active-inv-details">
                        <div>
                          <p>Invested</p>
                          <strong>${inv.amount.toLocaleString()}</strong>
                        </div>
                        <div>
                          <p>Daily Return</p>
                          <strong>{inv.daily}%</strong>
                        </div>
                        <div>
                          <p>Duration</p>
                          <strong>{inv.duration} Days</strong>
                        </div>
                        <div>
                          <p>Days Left</p>
                          <strong>{daysRemaining <= 0 ? 'Done' : `${daysRemaining} Days`}</strong>
                        </div>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                      </div>
                      <p className="progress-label">{Math.floor(progress)}% Complete</p>
                    </div>
                  )
                })}
            </div>
          </div>
        )}

        <div className="dash-section">
          <h2>Investment Plans</h2>
          <div className="dash-plans">
            {plans.map((plan) => (
              <div className="dash-plan-card" key={plan.name}>
                <h3>{plan.name}</h3>
                <p>Min: <strong>${plan.min.toLocaleString()}</strong></p>
                <p>Daily: <strong>{plan.daily}%</strong></p>
                <p>Duration: <strong>{plan.duration} Days</strong></p>
                <button onClick={() => handleInvest(plan)}>Invest Now</button>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-section">
          <h2>Transaction History</h2>
          {transactions.length === 0 ? (
            <p className="no-tx">No transactions yet. Start investing!</p>
          ) : (
            <table className="tx-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>Returns</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => (
                  <tr key={i}>
                    <td>{tx.type}</td>
                    <td>{tx.plan}</td>
                    <td>${tx.amount.toLocaleString()}</td>
                    <td className="tx-returns">+${tx.returns}</td>
                    <td>{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="dash-section">
          <h2>Withdrawal Requests</h2>
          {JSON.parse(localStorage.getItem('vaultx_withdrawals') || '[]')
            .filter(r => r.email === user.email).length === 0 ? (
            <p className="no-tx">No withdrawal requests yet.</p>
          ) : (
            <table className="tx-table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {JSON.parse(localStorage.getItem('vaultx_withdrawals') || '[]')
                  .filter(r => r.email === user.email)
                  .map((r, i) => (
                    <tr key={i}>
                      <td>${r.amount.toLocaleString()}</td>
                      <td>{r.date}</td>
                      <td className="status-pending">{r.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>

      </div>

      {showFund && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Fund Account</h2>
            <p>Enter the amount you want to add to your balance.</p>
            <input
              type="number"
              placeholder="Enter amount ($)"
              value={fundAmount}
              onChange={(e) => setFundAmount(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="modal-cancel" onClick={() => setShowFund(false)}>Cancel</button>
              <button className="modal-confirm" onClick={() => {
                if (!fundAmount || fundAmount <= 0) return
                const updatedUser = { ...user, balance: user.balance + parseFloat(fundAmount) }
                const tx = {
                  type: 'Deposit',
                  plan: '-',
                  amount: parseFloat(fundAmount),
                  returns: '-',
                  date: new Date().toLocaleDateString(),
                }
                const updatedTx = [tx, ...transactions]
                updateUserInStorage(updatedUser)
                localStorage.setItem(`vaultx_tx_${user.email}`, JSON.stringify(updatedTx))
                setUser(updatedUser)
                setTransactions(updatedTx)
                setFundAmount('')
                setShowFund(false)
              }}>Add Funds</button>
            </div>
          </div>
        </div>
      )}

      {showWithdraw && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Withdraw Funds</h2>
            <p>Enter the amount you want to withdraw. Requests are processed within 24 hours.</p>
            <input
              type="number"
              placeholder="Enter amount ($)"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="modal-cancel" onClick={() => setShowWithdraw(false)}>Cancel</button>
              <button className="modal-confirm" onClick={() => {
                if (!withdrawAmount || withdrawAmount <= 0) return
                if (parseFloat(withdrawAmount) > user.balance) {
                  showToast('Insufficient balance.', 'error')
                  return
                }
                const amount = parseFloat(withdrawAmount)
                const request = {
                  name: user.name,
                  email: user.email,
                  amount: amount,
                  date: new Date().toLocaleDateString(),
                  status: 'Pending',
                }
                const requests = JSON.parse(localStorage.getItem('vaultx_withdrawals') || '[]')
                requests.push(request)
                localStorage.setItem('vaultx_withdrawals', JSON.stringify(requests))
                const updatedUser = { ...user, balance: parseFloat((user.balance - amount).toFixed(2)) }
                const tx = {
                  type: 'Withdrawal',
                  plan: '-',
                  amount: amount,
                  returns: '-',
                  date: new Date().toLocaleDateString(),
                }
                const updatedTx = [tx, ...transactions]
                updateUserInStorage(updatedUser)
                localStorage.setItem(`vaultx_tx_${user.email}`, JSON.stringify(updatedTx))
                setUser(updatedUser)
                setTransactions(updatedTx)
                setShowWithdraw(false)
                setWithdrawAmount('')
                showToast('Withdrawal request sent. Our team will process it within 24 hours.', 'info')
              }}>Submit Request</button>
            </div>
          </div>
        </div>
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

    </div>
  )
}

export default Dashboard