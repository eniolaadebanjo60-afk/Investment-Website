import './Spinner.css'

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-logo">Vault<span>X</span></div>
      <div className="spinner"></div>
    </div>
  )
}

export default Spinner