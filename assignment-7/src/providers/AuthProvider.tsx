/* eslint-disable react-hooks/exhaustive-deps */
import { usePathname, useRouter } from 'next/navigation'
import {
  ReactNode,
  useContext,
  useState,
  createContext,
  useEffect,
  useMemo,
} from 'react'
import useAuth from '../hooks/useAuth'

type AuthContextValues = {
  isLogin: boolean
  email: string
  avatar: string
} & ReturnType<typeof useAuth>

const defaultAuthContextValues: AuthContextValues = {
  isLogin: false,
  email: '',
  avatar: '',
  login: async () => {},
  logout: () => ({}) as never,
  me: async () => false,
}

const AuthContext = createContext(defaultAuthContextValues)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')
  const router = useRouter()
  const pathname = usePathname()

  const authUtils = useAuth({ setIsLogin, setEmail, setAvatar })

  const value = useMemo(
    () => ({ isLogin, email, avatar, ...authUtils }),
    [isLogin, email, avatar, authUtils],
  )

  useEffect(() => {
    if (isLogin && pathname === '/login') router.push('/')
  }, [isLogin, router, pathname])

  useEffect(() => {
    const checkStillLogin = async () => {
      const stillLogin = await authUtils.me()
      if (!stillLogin) {
        router.replace('/login')
      }
    }
    checkStillLogin()
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => useContext(AuthContext)

export { useAuthContext }

export default AuthProvider
