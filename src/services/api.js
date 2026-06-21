import axios from 'axios'

const api = axios.create({
  // Senin Api url
  baseURL: '-',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export default api
