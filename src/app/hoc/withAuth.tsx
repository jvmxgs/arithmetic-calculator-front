import { useAppContext } from '@/context/AppContext'
import { Spinner } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import { ComponentType, useEffect } from 'react'

interface WithAuthProps {
}

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent = (props: P & WithAuthProps) => {
    console.log('Loaded withAuth - - - - - - - - - -')
    const router = useRouter()
    const { user, setUser, setToken } = useAppContext()

    useEffect(() => {
      const storedToken = localStorage.getItem('token')

      if (!storedToken) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        console.log('No token')
        router.replace('/login')
        return
      }

      const storedUser = JSON.parse(localStorage.getItem('user') ?? '{}')
      setUser(storedUser)
      setToken(storedToken)
    }, [])

    if (user === null) {
      return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-50">
          <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
      )
    }

    return <WrappedComponent {...props} />
  }

  return WithAuthComponent
}

export default withAuth
