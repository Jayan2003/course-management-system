
import { useEffect, useState } from 'react'
import api from '../services/axios'

export default function MyEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/enrollments/my')
      .then(res => setEnrollments(res.data))
      .catch(() =>
        setError('Failed to load enrollments.')
      )
      .finally(() => setLoading(false))
  }, [])

  if (loading)
    return (
      <div className="spinner-wrapper">
        <div className="spinner" />
        <p>Loading enrollments…</p>
      </div>
    )

  return (
    <div>
      <div className="page-header">
        <h2>My Enrollments & Grades</h2>
      </div>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠</span>
          {error}
        </div>
      )}

      {enrollments.length === 0 && !error ? (
        <div className="empty-state">
          <span className="empty-icon">📚</span>

          <p>
            You are not enrolled in any courses yet.
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Hours</th>
                <th>Instructor</th>
                <th>Enroll Date</th>
                <th>Grade</th>
              </tr>
            </thead>

            <tbody>
              {enrollments.map((e, index) => (
                <tr key={index}>
                  <td>{e.courseTitle}</td>

                  <td>{e.hours}</td>

                  <td>{e.instructor}</td>

                  <td>
                    {new Date(e.enrollDate)
                      .toLocaleDateString()}
                  </td>

                  <td>
                    {e.grade != null
                      ? e.grade
                      : 'Not graded yet'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}