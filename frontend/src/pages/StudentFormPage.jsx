import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as studentService from '../services/studentService'

export default function StudentFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [form, setForm] = useState({ name: '', email: '', age: '' })
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(isEditing)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEditing) return
    studentService.getById(id)
      .then(res => {
        const { name, email, age } = res.data
        setForm({ name, email, age: String(age) })
      })
      .catch(() => setError('Failed to load student.'))
      .finally(() => setFetchLoading(false))
  }, [id, isEditing])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const payload = { name: form.name, email: form.email, age: Number(form.age) }
    try {
      if (isEditing) {
        await studentService.update(id, payload)
      } else {
        await studentService.create(payload)
      }
      navigate('/students')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save student.')
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) return (
    <div className="spinner-wrapper">
      <div className="spinner" />
      <p>Loading student…</p>
    </div>
  )

  return (
    <div className="form-card">
      <h2>{isEditing ? 'Edit Student' : 'New Student'}</h2>
      <p className="form-subtitle">
        {isEditing ? "Update the student's details below." : 'Fill in the details to register a new student.'}
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
            maxLength={50}
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
        <div className="form-group">
          <label>Age</label>
          <input
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            placeholder="18 – 60"
            min={18}
            max={60}
            required
          />
        </div>
        <div className="form-actions">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Saving…' : 'Save Student'}
          </button>
          <button className="btn btn-secondary" type="button" onClick={() => navigate('/students')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
