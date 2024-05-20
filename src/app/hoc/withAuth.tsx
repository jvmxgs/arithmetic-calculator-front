import { Spinner } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import { ComponentType, useEffect, useState } from 'react'

interface WithAuthProps {
  user: {
    credits: string,
    first_name: string,
    last_name: string,
    email: string
  },
  token: string
}

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent = (props: P & WithAuthProps) => {
    const router = useRouter()
    const [user, setUser] = useState(null)

    useEffect(() => {
      const token = localStorage.getItem('token')

      if (!token) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        console.log('No token')
        router.replace('/login')
        return
      }

      const storedUser = JSON.parse(localStorage.getItem('user') ?? '{}')
      setUser(storedUser)
      console.log(user)
    }, [])

    if (user === null) {
      return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-50">
          <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
      )
    }

    return <WrappedComponent {...props} user={ user } />
  }

  return WithAuthComponent
}

export default withAuth
