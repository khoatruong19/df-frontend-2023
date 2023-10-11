import axiosClient from '../lib/axiosClient'
import { LoginInput, LoginResponse } from '../utils/types'

const authService = {
  login: (data: LoginInput) =>
    axiosClient.post<{ data: LoginResponse }>('/auth/login', data),
  me: () => axiosClient.get<{ data: LoginResponse }>('/me'),
}

export default authService
