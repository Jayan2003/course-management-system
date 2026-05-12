import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as studentService from "../services/studentService";
import * as courseService from "../services/courseService";
import * as enrollmentService from "../services/enrollmentService";
export default function StudentsPage({ role }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [error, setError] = useState("");
  const isAdmin = role === "Admin";

  useEffect(() => {
    studentService
      .getAll()
      .then((res) => setStudents(res.data))
      .catch(() =>
        setError("Failed to load students. Make sure you are logged in."),
      )
      .finally(() => setLoading(false));
    courseService.getAll().then((res) => setCourses(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await studentService.remove(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete student.");
    }
  };
  const handleEnroll = async (studentId) => {
    const courseId = selectedCourse[studentId];

    if (!courseId) {
      alert("Please select a course");
      return;
    }

    try {
      await enrollmentService.enroll(studentId, courseId);
      alert("Student enrolled successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Enrollment failed");
    }
  };

  if (loading)
    return (
      <div className="spinner-wrapper">
        <div className="spinner" />
        <p>Loading students…</p>
      </div>
    );

  return (
    <div>
      <div className="page-header">
        <h2>Students</h2>
        {isAdmin && (
          <Link to="/students/new" className="btn btn-primary">
            + Add Student
          </Link>
        )}
      </div>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠</span>
          {error}
        </div>
      )}

      {students.length === 0 && !error ? (
        <div className="empty-state">
          <span className="empty-icon">👨‍🎓</span>
          <p>No students yet. Add your first student to get started.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>

                  {isAdmin && (
                    <td>
                      <div className="td-actions">
                        <Link
                          to={`/students/${s.id}`}
                          className="btn btn-sm btn-success"
                        >
                          Edit
                        </Link>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(s.id)}
                        >
                          Delete
                        </button>

                        {/* 🔥 Enrollment UI */}
                        <select
                          value={selectedCourse[s.id] || ""}
                          onChange={(e) =>
                            setSelectedCourse((prev) => ({
                              ...prev,
                              [s.id]: e.target.value,
                            }))
                          }
                        >
                          <option value="">Select course</option>
                          {courses.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.title}
                            </option>
                          ))}
                        </select>

                        <button
                          className="btn btn-sm"
                          onClick={() => handleEnroll(s.id)}
                        >
                          Enroll
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
