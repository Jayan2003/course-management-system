import { useEffect, useState } from 'react'
import api from '../services/axios'

export default function MyStudentsPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/enrollments/instructor/students')
      .then(res => setStudents(res.data))
      .catch(() =>
        setError('Failed to load students.')
      )
      .finally(() => setLoading(false))
  }, [])

  const handleGradeChange = (index, value) => {
    const updated = [...students]

    updated[index].grade = value

    setStudents(updated)
  }

  const saveGrade = async (student) => {
    try {
      await api.put(
        `/enrollments/grade?studentId=${student.studentId}&courseId=${student.courseId}&grade=${student.grade}`
      )

      alert('Grade updated successfully!')
    } catch (err) {
      setError(
        err.response?.data ||
        'Failed to update grade.'
      )
    }
  }

  if (loading)
    return (
      <div className="spinner-wrapper">
        <div className="spinner" />
        <p>Loading students…</p>
      </div>
    )

  return (
    <div>
      <div className="page-header">
        <h2>My Students</h2>
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

          <p>
            No students enrolled yet.
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Grade</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s, index) => (
                <tr key={index}>
                  <td>{s.studentName}</td>

                  <td>{s.courseTitle}</td>

                  <td>
                    <input
                      type="number"
                      step="0.1"
                      value={s.grade || ''}
                      onChange={(e) =>
                        handleGradeChange(
                          index,
                          e.target.value
                        )
                      }
                      style={{
                        width: '80px'
                      }}
                    />
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => saveGrade(s)}
                    >
                      Save
                    </button>
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