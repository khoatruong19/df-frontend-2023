import { Dispatch, SetStateAction } from 'react'
import { redirect } from 'next/navigation'
import authService from '../services/auth'
import { LoginInput } from '../utils/types'
import { setToken } from '../utils/jwt'

type UseAuthProps = {
  setIsLogin: Dispatch<SetStateAction<boolean>>
  setEmail: Dispatch<SetStateAction<string>>
}

const useAuth = ({ setIsLogin, setEmail }: UseAuthProps) => {
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
    redirect('/login')
  }

  return { login, logout }
}

export default useAuth
