'use client'
import { AxiosError } from 'axios'
import { Button, Card, Checkbox, Label, TextInput, Toast } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { HiX } from 'react-icons/hi'
import axios from '../utils/axiosConfig'

export default function () {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowToast(false)

    try {
      const response = await axios.post('/login', { email, password })

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        router.push('/dashboard')
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        localStorage.removeItem('token')
        setShowToast(true)
        setToastMessage(error.response.data.message)
      }
    }
  }

  return (
    <article className='flex flex-col h-screen justify-center items-center gap-2'>
      <Link href='/'>
        <Image
          src="/logo.png"
          alt="Vercel Logo"
          className="dark:invert pb-3"
          width={300}
          height={71}
          priority
        />
      </Link>
      <Card>
      <h3 className='text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Login</h3>
        {showToast && (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiX className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{ toastMessage }</div>
            <Toast.Toggle />
          </Toast>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password" required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit">Submit</Button>
        </form>
        <p className='text-sm'>
          Don't have an account?&nbsp;
          <a href="/register" className="text-cyan-600 hover:underline dark:text-cyan-500">
            Register
          </a>
        </p>
      </Card>
    </article>
  )
}
