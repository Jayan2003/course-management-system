import { Link } from "react-router-dom";

export default function HomePage() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  return (
    <div className="home">
      {/* ── Hero ── */}
      <div className="home-hero">
        <div className="home-logo">🎓</div>
        <h1>
          Welcome to <span className="gradient-cycle">EduTrack</span>
        </h1>
        <p className="home-subtitle">
          A modern platform for managing students, courses, and instructors —
          all in one place.
        </p>
        <div className="home-badges">
          <span className="home-badge">📦 3 Modules</span>
          <span className="home-badge">⚡ Full CRUD</span>
          <span className="home-badge">🔒 JWT Secured</span>
        </div>
      </div>
      {username && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2>Hello, {username} 👋</h2>
        </div>
      )}
      {/* ── Cards ── */}
      <div className="home-cards">
        <div className="home-card card-blue">
          <span className="home-card-num">01</span>
          <div className="home-card-icon icon-blue">👨‍🎓</div>
          <span className="home-card-label">Students</span>
          <span className="home-card-desc">
            Register students, update their profiles, and manage enrolments
            across courses.
          </span>
          <Link to="/students" className="home-card-explore">
            → Explore
          </Link>
        </div>

        <div className="home-card card-green">
          <span className="home-card-num">02</span>
          <div className="home-card-icon icon-green">📚</div>
          <span className="home-card-label">Courses</span>
          <span className="home-card-desc">
            Browse the course catalogue, assign instructors, and track credit
            hours.
          </span>
          <Link to="/courses" className="home-card-explore">
            → Explore
          </Link>
        </div>

        <div className="home-card card-orange">
          <span className="home-card-num">03</span>
          <div className="home-card-icon icon-orange">🧑‍🏫</div>
          <span className="home-card-label">Instructors</span>
          <span className="home-card-desc">
            Manage instructor records, profiles, and their course assignments.
          </span>
          <Link to="/instructors" className="home-card-explore">
            → Explore
          </Link>
        </div>
      </div>

      {/* ── CTA ── */}
      
      {!token && (
        <div className="home-cta">
          <p>Ready to get started? Sign in to access the full dashboard.</p>
          <Link to="/login" className="btn btn-primary btn-cta">
            Get Started → Login
          </Link>
        </div>
      )}
    </div>
  );
}
