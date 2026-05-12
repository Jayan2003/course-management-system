
import api from './axios'

export const enroll = (courseId) =>
  api.post(`/enrollments/${courseId}`)