import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthContext } from '../providers/AuthProvider'

const useCheckAuth = () => {
  const { isLogin } = useAuthContext()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLogin) {
      router.push('login')
      return
    }

    if (pathname === '/login') router.push('/')
  }, [isLogin, router])
}

export default useCheckAuth
