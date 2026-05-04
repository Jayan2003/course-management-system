import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as instructorService from '../services/instructorService'

export default function InstructorFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [form, setForm] = useState({ name: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(isEditing)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEditing) return
    instructorService.getById(id)
      .then(res => {
        const { name, email } = res.data
        setForm({ name, email })
      })
      .catch(() => setError('Failed to load instructor.'))
      .finally(() => setFetchLoading(false))
  }, [id, isEditing])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const payload = { name: form.name, email: form.email }
    try {
      if (isEditing) {
        await instructorService.update(id, payload)
      } else {
        await instructorService.create(payload)
      }
      navigate('/instructors')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save instructor.')
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) return (
    <div className="spinner-wrapper">
      <div className="spinner" />
      <p>Loading instructor…</p>
    </div>
  )

  return (
    <div className="form-card">
      <h2>{isEditing ? 'Edit Instructor' : 'New Instructor'}</h2>
      <p className="form-subtitle">
        {isEditing ? "Update the instructor's details below." : 'Fill in the details to register a new instructor.'}
      </p>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            maxLength={100}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@example.com"
            required
          />
        </div>
        <div className="form-actions">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Saving…' : 'Save Instructor'}
          </button>
          <button className="btn btn-secondary" type="button" onClick={() => navigate('/instructors')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
