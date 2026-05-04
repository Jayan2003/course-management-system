import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as instructorService from '../services/instructorService'

export default function InstructorsPage({ role }) {
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const isAdmin = role === 'Admin'

  useEffect(() => {
    instructorService.getAll()
      .then(res => setInstructors(res.data))
      .catch(() => setError('Failed to load instructors. Make sure you are logged in.'))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this instructor?')) return
    try {
      await instructorService.remove(id)
      setInstructors(prev => prev.filter(i => i.id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete instructor.')
    }
  }

  if (loading) return (
    <div className="spinner-wrapper">
      <div className="spinner" />
      <p>Loading instructors…</p>
    </div>
  )

  return (
    <div>
      <div className="page-header">
        <h2>Instructors</h2>
        {isAdmin && <Link to="/instructors/new" className="btn btn-primary">+ Add Instructor</Link>}
      </div>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠</span>
          {error}
        </div>
      )}

      {instructors.length === 0 && !error ? (
        <div className="empty-state">
          <span className="empty-icon">🧑‍🏫</span>
          <p>No instructors yet. Add your first instructor to get started.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {instructors.map(i => (
                <tr key={i.id}>
                  <td>{i.id}</td>
                  <td>{i.name}</td>
                  {isAdmin && (
                    <td>
                      <div className="td-actions">
                        <Link to={`/instructors/${i.id}`} state={{ name: i.name }} className="btn btn-sm btn-success">Edit</Link>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(i.id)}>Delete</button>
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
