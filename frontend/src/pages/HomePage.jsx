import { Link } from "react-router-dom";

export default function HomePage() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("userRole");

  return (
    <div className="home">

      {/* ── Hero ── */}
      <div className="home-hero">
        <div className="home-logo">🎓</div>

        <h1>
          Welcome to{" "}
          <span className="gradient-cycle">
            EduTrack
          </span>
        </h1>

        <p className="home-subtitle">
          A modern academic management platform
          for students, instructors, and administrators.
        </p>
      </div>

      {/* ── Welcome ── */}
      {username && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <h2>
            Hello, {username} 👋
          </h2>
        </div>
      )}

      {/* ───────────────── ADMIN DASHBOARD ───────────────── */}
      {role === "Admin" && (
        <div
          className="home-cards"
          style={{
            justifyContent: "center",
          }}
        >
          <div className="home-card card-green">

            <span className="home-card-num">
              01
            </span>

            <div className="home-card-icon icon-green">
              📚
            </div>

            <span className="home-card-label">
              Course Management
            </span>

            <span className="home-card-desc">
              Create courses, assign instructors,
              and manage academic content.
            </span>

            <Link
              to="/courses"
              className="home-card-explore"
            >
              → Manage Courses
            </Link>
          </div>
        </div>
      )}

      {/* ───────────────── STUDENT DASHBOARD ───────────────── */}
      {role === "Student" && (
        <div className="home-cards">

          <div className="home-card card-green">

            <span className="home-card-num">
              01
            </span>

            <div className="home-card-icon icon-green">
              📚
            </div>

            <span className="home-card-label">
              Browse Courses
            </span>

            <span className="home-card-desc">
              Explore available courses and enroll
              in subjects assigned to instructors.
            </span>

            <Link
              to="/courses"
              className="home-card-explore"
            >
              → View Courses
            </Link>
          </div>

          <div className="home-card card-blue">

            <span className="home-card-num">
              02
            </span>

            <div className="home-card-icon icon-blue">
              📝
            </div>

            <span className="home-card-label">
              My Enrollments
            </span>

            <span className="home-card-desc">
              Track enrolled courses, grades,
              and academic progress.
            </span>

            <Link
              to="/my-enrollments"
              className="home-card-explore"
            >
              → View Enrollments
            </Link>
          </div>

        </div>
      )}

      {/* ───────────────── INSTRUCTOR DASHBOARD ───────────────── */}
      {role === "Instructor" && (
        <div className="home-cards">

          <div className="home-card card-orange">

            <span className="home-card-num">
              01
            </span>

            <div className="home-card-icon icon-orange">
              📖
            </div>

            <span className="home-card-label">
              My Courses
            </span>

            <span className="home-card-desc">
              View all courses assigned to you
              by the administrator.
            </span>

            <Link
              to="/my-courses"
              className="home-card-explore"
            >
              → View Courses
            </Link>
          </div>

          <div className="home-card card-blue">

            <span className="home-card-num">
              02
            </span>

            <div className="home-card-icon icon-blue">
              👨‍🎓
            </div>

            <span className="home-card-label">
              My Students
            </span>

            <span className="home-card-desc">
              View enrolled students and assign
              grades for your courses.
            </span>

            <Link
              to="/my-students"
              className="home-card-explore"
            >
              → Manage Students
            </Link>
          </div>

        </div>
      )}

      {/* ── Guest CTA ── */}
      {!token && (
        <div className="home-cta">

          <p>
            Ready to get started?
            Sign in to access the full dashboard.
          </p>

          <Link
            to="/login"
            className="btn btn-primary btn-cta"
          >
            Get Started → Login
          </Link>
        </div>
      )}
    </div>
  );
}