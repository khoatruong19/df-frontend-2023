import { usePathname, useRouter } from 'next/navigation'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  createContext,
  useEffect,
  useMemo,
} from 'react'

type AuthContextValues = {
  isLogin: boolean
  setIsLogin: Dispatch<SetStateAction<boolean>>
}

const defaultAuthContextValues: AuthContextValues = {
  isLogin: false,
  setIsLogin: () => {},
}

const AuthContext = createContext(defaultAuthContextValues)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const value = useMemo(() => ({ isLogin, setIsLogin }), [])

  useEffect(() => {
    if (!isLogin) {
      router.push('login')
      return
    }

    if (pathname === '/login') router.push('/')
  }, [isLogin, router])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => useContext(AuthContext)

export { useAuthContext }

export default AuthProvider
