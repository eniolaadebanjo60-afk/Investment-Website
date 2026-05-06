import './About.css'

const team = [
  { name: 'Daniel Kross', role: 'CEO & Founder', emoji: '👨🏽‍💼' },
  { name: 'Sarah Mensah', role: 'Chief Investment Officer', emoji: '👩🏽‍💼' },
  { name: 'James Okafor', role: 'Head of Security', emoji: '👨🏾‍💻' },
]

const About = () => {
  return (
    <div className="about">

      <section className="about-hero">
        <h1>About <span>CryptoShark</span></h1>
        <p>We are a team of crypto experts and financial professionals committed to making digital asset investment accessible to everyone.</p>
      </section>

      <section className="about-mission">
        <div className="mission-text">
          <h2>Our Mission</h2>
          <p>At CryptoShark, our mission is simple — help everyday people grow their wealth through smart, secure crypto investments. We believe financial freedom should not be reserved for the wealthy few.</p>
          <p>Since our founding, we have managed over $120M in assets and served over 15,000 investors across the globe.</p>
        </div>
        <div className="mission-stats">
          <div className="m-stat">
            <h3>2019</h3>
            <p>Year Founded</p>
          </div>
          <div className="m-stat">
            <h3>$120M+</h3>
            <p>Assets Managed</p>
          </div>
          <div className="m-stat">
            <h3>15,000+</h3>
            <p>Investors</p>
          </div>
          <div className="m-stat">
            <h3>30+</h3>
            <p>Countries</p>
          </div>
        </div>
      </section>

      <section className="about-team">
        <h2>Meet The Team</h2>
        <p className="section-sub">The people behind VaultX's success.</p>
        <div className="team-grid">
          {team.map((member) => (
            <div className="team-card" key={member.name}>
              <div className="team-avatar">{member.emoji}</div>
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