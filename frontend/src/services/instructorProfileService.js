import api from './axios'

export const getByInstructor = (id) => {
  return api.get(`/instructorprofiles/${id}`)
}

export const createProfile = (data) => {
  return api.post('/instructorprofiles', data)
}