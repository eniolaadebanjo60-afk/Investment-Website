import './Plans.css'

const plans = [
  {
    name: 'Bronze',
    min: '$100',
    daily: '2%',
    duration: '7 Days',
    total: '14%',
    color: '#cd7f32',
  },
  {
    name: 'Silver',
    min: '$500',
    daily: '4%',
    duration: '14 Days',
    total: '56%',
    color: '#a8a9ad',
  },
  {
    name: 'Gold',
    min: '$1,000',
    daily: '6%',
    duration: '21 Days',
    total: '126%',
    color: '#ffd700',
    popular: true,
  },
  {
    name: 'Platinum',
    min: '$5,000',
    daily: '10%',
    duration: '30 Days',
    total: '300%',
    color: '#e5e4e2',
  },
]

const Plans = () => {
  return (
    <div className="plans">
      <div className="plans-header">
        <h1>Investment Plans</h1>
        <p>Choose a plan that fits your goals. All plans are managed by our crypto experts.</p>
      </div>

      <div className="plans-grid">
        {plans.map((plan) => (
          <div className={`plan-card ${plan.popular ? 'popular' : ''}`} key={plan.name}>
            {plan.popular && <div className="popular-badge">Most Popular</div>}
            <h2>{plan.name}</h2>
            <div className="plan-details">
              <div className="plan-detail">
                <span>Minimum</span>
                <strong>{plan.min}</strong>
              </div>
              <div className="plan-detail">
                <span>Daily Return</span>
                <strong>{plan.daily}</strong>
              </div>
              <div className="plan-detail">
                <span>Duration</span>
                <strong>{plan.duration}</strong>
              </div>
              <div className="plan-detail">
                <span>Total Return</span>
                <strong>{plan.total}</strong>
              </div>
            </div>
            <a href="/signup" className={`plan-btn ${plan.popular ? 'plan-btn-popular' : ''}`}>
              Get Started
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Plans