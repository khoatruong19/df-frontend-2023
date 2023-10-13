import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import { deleteToken, setToken } from '../utils/jwt'
import * as authService from '../generated/auth/auth'
import * as userService from '../generated/user/user'
import { LoginRequest } from '../generated/model'

type UseAuthProps = {
  setIsLogin: Dispatch<SetStateAction<boolean>>
  setEmail: Dispatch<SetStateAction<string>>
  setAvatar: Dispatch<SetStateAction<string>>
}

const useAuth = ({ setIsLogin, setEmail, setAvatar }: UseAuthProps) => {
  const router = useRouter()

  const login = async (value: LoginRequest) => {
    try {
      const { data } = await authService.login(value)
      if (!data) throw Error('Login failed!')

      setToken(data.accessToken)
      await me()
    } catch (error) {
      if (error.response.data) return alert(error.response.data.message)
      console.log(error)
    }
  }

  const setAuthValues = (isLogin = false, email = '', avatar = '') => {
    setIsLogin(isLogin)
    setEmail(email)
    setAvatar(avatar)
  }

  const logout = () => {
    deleteToken()
    setAuthValues()
    router.replace('/login')
  }

  const me = async () => {
    try {
      const { data } = await userService.getMe()
      if (!data) throw Error('Get user info failed!')

      setAuthValues(true, data.email, data.avatar)
      setToken(localStorage.getItem('token') ?? '')
      return true
    } catch (error) {
      return false
    }
  }

  return { login, logout, me }
}

export default useAuth
