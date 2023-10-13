import axios from 'axios'
import { getToken } from '../utils/jwt'

const BASE_URL = 'https://develop-api.bookstore.dwarvesf.com/api/v1'

const axiosClient = axios.create({
  baseURL: BASE_URL,
})

axiosClient.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosClient
