import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Plan from './pages/Plans'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import Admin from './pages/Admin'
import Profile from './pages/Profile'
import Spinner from './components/Spinner'

const Layout = ({ children }) => {
  const location = useLocation()
  const hideBars = location.pathname === '/dashboard' ||
                   location.pathname === '/admin' ||
                   location.pathname === '/profile'
  return (
    <>
      {!hideBars && <Navbar />}
       {children}
      {!hideBars && <Footer />}
    </>
  )
}

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Spinner />

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plan />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App