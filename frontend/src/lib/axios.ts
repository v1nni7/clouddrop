import axios from 'axios'
import { parseCookies } from 'nookies'

export default function getAPIClient() {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
  })

  instance.interceptors.request.use(async (config) => {
    const { 'clouddrop.token': token } = parseCookies()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  return instance
}
