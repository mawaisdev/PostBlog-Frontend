import axios from 'axios'
const baseURL: string = import.meta.env.VITE_BASE_URL
export default axios.create({
  baseURL,
})

export const axiosPrivate = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
