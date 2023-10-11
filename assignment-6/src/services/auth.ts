import axiosClient from '../lib/axiosClient'
import { LoginInput, LoginResponse } from '../utils/types'

const authService = {
  login: (data: LoginInput) =>
    axiosClient.post<{ data: LoginResponse }>('/auth/login', data),
}

export default authService
