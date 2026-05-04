import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as courseService from '../services/courseService'
import * as instructorService from '../services/instructorService'

export default function CourseFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [form, setForm] = useState({ title: '', hours: '', instructorId: '' })
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(isEditing)
  const [error, setError] = useState('')

  useEffect(() => {
    instructorService.getAll()
      .then(res => setInstructors(res.data))
      .catch(() => setError('Failed to load instructors.'))
  }, [])

  useEffect(() => {
    if (!isEditing) return
    courseService.getById(id)
      .then(res => {
        const { title, hours, instructorId } = res.data
        setForm({ title, hours: String(hours), instructorId: String(instructorId) })
      })
      .catch(() => setError('Failed to load course.'))
      .finally(() => setFetchLoading(false))
  }, [id, isEditing])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const payload = {
      title: form.title,
      hours: Number(form.hours),
      instructorId: Number(form.instructorId),
    }
    try {
      if (isEditing) {
        await courseService.update(id, payload)
      } else {
        await courseService.create(payload)
      }
      navigate('/courses')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save course.')
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) return (
    <div className="spinner-wrapper">
      <div className="spinner" />
      <p>Loading course…</p>
    </div>
  )

  return (
    <div className="form-card">
      <h2>{isEditing ? 'Edit Course' : 'New Course'}</h2>
      <p className="form-subtitle">
        {isEditing ? 'Update the course details below.' : 'Fill in the details to add a course to the catalogue.'}
      </p>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Course title"
            maxLength={150}
            required
          />
        </div>
        <div className="form-group">
          <label>Hours</label>
          <input
            name="hours"
            type="number"
            value={form.hours}
            onChange={handleChange}
            placeholder="1 – 200"
            min={1}
            max={200}
            required
          />
        </div>
        <div className="form-group">
          <label>Instructor</label>
          <select name="instructorId" value={form.instructorId} onChange={handleChange} required>
            <option value="">Select an instructor</option>
            {instructors.map(i => (
              <option key={i.id} value={i.id}>{i.name}</option>
            ))}
          </select>
        </div>
        <div className="form-actions">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Saving…' : 'Save Course'}
          </button>
          <button className="btn btn-secondary" type="button" onClick={() => navigate('/courses')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
