import api from './axios'

export const enroll = (studentId, courseId) => {
  return api.post('/enrollments', { studentId, courseId })
}