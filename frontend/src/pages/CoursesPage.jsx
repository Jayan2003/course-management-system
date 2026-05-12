
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as courseService from '../services/courseService'
import * as enrollmentService from '../services/enrollmentService'

export default function CoursesPage({ role }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const isAdmin = role === 'Admin'
  const isStudent = role === 'Student'

  useEffect(() => {
    courseService.getAll()
      .then(res => setCourses(res.data))
      .catch(() =>
        setError('Failed to load courses. Make sure you are logged in.')
      )
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return

    try {
      await courseService.remove(id)

      setCourses(prev =>
        prev.filter(c => c.id !== id)
      )
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to delete course.'
      )
    }
  }

  const handleEnroll = async (courseId) => {
  try {
    await enrollmentService.enroll(courseId)

    alert('Enrolled successfully!')
  } catch (err) {
    setError(
      err.response?.data?.message ||
      'Enrollment failed.'
    )
  }
}
  if (loading)
    return (
      <div className="spinner-wrapper">
        <div className="spinner" />
        <p>Loading courses…</p>
      </div>
    )

  return (
    <div>
      <div className="page-header">
        <h2>Courses</h2>

        {isAdmin && (
          <Link
            to="/courses/new"
            className="btn btn-primary"
          >
            + Add Course
          </Link>
        )}
      </div>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠</span>
          {error}
        </div>
      )}

      {courses.length === 0 && !error ? (
        <div className="empty-state">
          <span className="empty-icon">📚</span>

          <p>
            No courses yet.
            Add your first course to get started.
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Hours</th>
                <th>Instructor</th>

                {(isAdmin || isStudent) && (
                  <th>Actions</th>
                )}
              </tr>
            </thead>

            <tbody>
              {courses.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.title}</td>
                  <td>{c.hours}</td>
                  <td>{c.instructorName}</td>

                  {(isAdmin || isStudent) && (
                    <td>
                      <div className="td-actions">

                        {isAdmin && (
                          <>
                            <Link
                              to={`/courses/${c.id}`}
                              className="btn btn-sm btn-success"
                            >
                              Edit
                            </Link>

                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(c.id)}
                            >
                              Delete
                            </button>
                          </>
                        )}

                        {isStudent && (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleEnroll(c.id)}
                          >
                            Enroll
                          </button>
                        )}

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
  )
}