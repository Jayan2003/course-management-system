import api from './axios'

export const getAll = () => api.get('/instructors')
export const getById = (id) => api.get(`/instructors/${id}`)
export const create = (data) => api.post('/instructors', data)
export const update = (id, data) => api.put(`/instructors/${id}`, data)
export const remove = (id) => api.delete(`/instructors/${id}`)
