import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import authService from '../services/auth'
import { LoginInput } from '../utils/types'
import { setToken } from '../utils/jwt'

type UseAuthProps = {
  setIsLogin: Dispatch<SetStateAction<boolean>>
  setEmail: Dispatch<SetStateAction<string>>
}

const useAuth = ({ setIsLogin, setEmail }: UseAuthProps) => {
  const router = useRouter()

  const login = async (value: LoginInput) => {
    try {
      const {
        data: { data: responseData },
      } = await authService.login(value)

      setIsLogin(true)
      setEmail(responseData.email)
      setToken(responseData.accessToken)
    } catch (error) {
      console.log(error)
    }
  }

  const logout = () => {
    setToken(null)
    setIsLogin(false)
    setEmail('')
    router.push('/login')
  }

  const me = async () => {
    try {
      const {
        data: { data: responseData },
      } = await authService.me()
      setIsLogin(true)
      setEmail(responseData.email)
      setToken(responseData.accessToken)
      return true
    } catch (error) {
      return false
    }
  }

  return { login, logout, me }
}

export default useAuth
