import { Link, useNavigate } from 'react-router-dom'
import api from '../services/axios'

export default function Navbar({ toggleTheme, theme, setIsLoggedIn, setRole }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      localStorage.removeItem('loggedIn')
      localStorage.removeItem('userRole')
      setIsLoggedIn(false)
      setRole('')
      navigate('/login')
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="brand-icon">🎓</span>
          <span className="brand-text">EduTrack</span>
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/instructors">Instructors</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li>
          <button className="nav-theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </li>
        <li>
          <button className="nav-logout" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
