import { useState } from 'react'
import api from '../services/axios'

export default function GradesPage() {
  const [studentId, setStudentId] = useState('')
  const [courseId, setCourseId] = useState('')
  const [grade, setGrade] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setMessage('')
    setError('')

    try {
      await api.put(
        `/enrollments/grade?studentId=${studentId}&courseId=${courseId}&grade=${grade}`
      )

      setMessage('Grade updated successfully!')

      setStudentId('')
      setCourseId('')
      setGrade('')
    } catch (err) {
      setError(
        err.response?.data ||
        'Failed to update grade.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-card">
      <h2>Assign Grades</h2>

      <p className="form-subtitle">
        Instructors can assign grades to enrolled students.
      </p>

      {message && (
        <div className="alert alert-success">
          <span className="alert-icon">✓</span>
          {message}
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student ID</label>

          <input
            type="number"
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Course ID</label>

          <input
            type="number"
            value={courseId}
            onChange={e => setCourseId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Grade</label>

          <input
            type="number"
            step="0.1"
            value={grade}
            onChange={e => setGrade(e.target.value)}
            required
          />
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Submit Grade'}
        </button>
      </form>
    </div>
  )
}