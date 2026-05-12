
import { Link, useNavigate } from "react-router-dom";
import api from "../services/axios";

export default function Navbar({ toggleTheme, theme, setIsLoggedIn, setRole }) {
  const navigate = useNavigate();

  const role = localStorage.getItem("userRole");
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userRole");
      localStorage.removeItem("username");

      setIsLoggedIn(false);
      setRole("");

      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="brand-icon">🎓</span>
          <span className="brand-text">EduTrack</span>
        </Link>
      </div>

      <ul className="navbar-links">
        {/* HOME */}
        {isLoggedIn && (
          <li>
            <Link to="/">Home</Link>
          </li>
        )}

        {/* ADMIN NAVBAR */}
        {role === "Admin" && (
          <>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
          </>
        )}

        {/* STUDENT NAVBAR */}
        {role === "Student" && (
          <>
            <li>
              <Link to="/courses">Courses</Link>
            </li>

            <li>
              <Link to="/my-enrollments">My Enrollments</Link>
            </li>
          </>
        )}

        {/* INSTRUCTOR NAVBAR */}
        {role === "Instructor" && (
          <>
            <li>
              <Link to="/my-courses">My Courses</Link>
            </li>

            <li>
              <Link to="/my-students">My Students</Link>
            </li>

            
          </>
        )}

        {/* LOGIN / REGISTER */}
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}

        {/* THEME BUTTON */}
        <li>
          <button
            className="nav-theme-toggle"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </li>

        {/* LOGOUT */}
        {isLoggedIn && (
          <li>
            <button className="nav-logout" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
