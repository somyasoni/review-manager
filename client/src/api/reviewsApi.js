import axios from 'axios'

const BASE = 'http://localhost:5000/api'

const api = axios.create({ baseURL: BASE })

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const getReviews = () =>
  api.get('/reviews').then(r => r.data)

export const seedReviews = () =>
  api.post('/reviews/seed').then(r => r.data)

export const generateReply = (reviewText, businessName, author, rating) =>
  api.post('/reviews/generate-reply', {
    reviewText, businessName, author, rating
  }).then(r => r.data)

export const markReplied = (reviewId) =>
  api.post('/reviews/mark-replied', { reviewId }).then(r => r.data)