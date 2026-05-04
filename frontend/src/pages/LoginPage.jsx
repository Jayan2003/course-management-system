import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/axios";

export default function LoginPage({ setIsLoggedIn, setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { username, password });
      const userRole = res.data.role;

      localStorage.setItem("username", username);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userRole", userRole);

      setIsLoggedIn(true);
      setRole(userRole);
      navigate("/");
    } catch {
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">🎓</div>
          <h2>Sign in to EduTrack</h2>
          <p>Enter your credentials to continue</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              justifyContent: "center",
              marginTop: "0.5rem",
            }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p
          style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem" }}
        >
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "var(--accent)" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
