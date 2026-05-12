import { useEffect, useState } from 'react'
import api from '../services/axios'

export default function MyCoursesPage() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/enrollments/instructor/courses')
      .then(res => setCourses(res.data))
      .catch(() =>
        setError('Failed to load courses.')
      )
      .finally(() => setLoading(false))
  }, [])

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
        <h2>My Courses</h2>
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
            No courses assigned yet.
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Course</th>
                <th>Hours</th>
              </tr>
            </thead>

            <tbody>
              {courses.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.title}</td>
                  <td>{c.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}