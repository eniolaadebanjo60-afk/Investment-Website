import './About.css'
import useScrollAnimation from '../hooks/useScrollAnimation'
import useCountUp from '../hooks/useCountUp'

const team = [
  { name: 'Daniel Kross', role: 'CEO & Founder', image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
  { name: 'Sarah Mensah', role: 'Chief Investment Officer', image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80" },
  { name: 'James Okafor', role: 'Head of Security', image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" },
]

const About = () => {
  const [heroRef, heroVisible] = useScrollAnimation()
  const [missionRef, missionVisible] = useScrollAnimation()
  const [statsRef, statsVisible] = useScrollAnimation()
  const [teamRef, teamVisible] = useScrollAnimation()

  const assets = useCountUp(120, statsVisible)
  const investors = useCountUp(15000, statsVisible)
  const countries = useCountUp(30, statsVisible)

  return (
    <div className="about">

      <section className="about-hero">
        <div ref={heroRef} className={`fade-up ${heroVisible ? 'visible' : ''}`}>
          <h1>About <span>VaultX</span></h1>
          <p>We are a team of crypto experts and financial professionals committed to making digital asset investment accessible to everyone.</p>
        </div>
      </section>

      <section className="about-mission">
        <div ref={missionRef} className={`mission-text fade-left ${missionVisible ? 'visible' : ''}`}>
          <h2>Our Mission</h2>
          <p>At VaultX, our mission is simple — help everyday people grow their wealth through smart, secure crypto investments. We believe financial freedom should not be reserved for the wealthy few.</p>
          <p>Since our founding, we have managed over $120M in assets and served over 15,000 investors across the globe.</p>
        </div>
        <div ref={statsRef} className={`mission-stats fade-right ${statsVisible ? 'visible' : ''}`}>
          <div className="m-stat">
            <h3>2019</h3>
            <p>Year Founded</p>
          </div>
          <div className="m-stat">
            <h3>${assets}M+</h3>
            <p>Assets Managed</p>
          </div>
          <div className="m-stat">
            <h3>{investors.toLocaleString()}+</h3>
            <p>Investors</p>
          </div>
          <div className="m-stat">
            <h3>{countries}+</h3>
            <p>Countries</p>
          </div>
        </div>
      </section>

      <section className="about-team">
        <h2>Meet The Team</h2>
        <p className="section-sub">The people behind VaultX's success.</p>
        <div ref={teamRef} className="team-grid">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`team-card fade-up delay-${i + 1} ${teamVisible ? 'visible' : ''}`}
            >
              <div className="team-avatar">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default About