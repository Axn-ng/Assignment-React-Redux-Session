import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

const api = axios.create({
  baseURL: BASE_URL,
})

export const getAllCourses = () => api.get('/posts')

export const getCourseById = (id) => api.get(`/posts/${id}`)
