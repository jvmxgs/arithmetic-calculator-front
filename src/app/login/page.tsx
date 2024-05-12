'use client'
import Image from 'next/image'
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function () {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you can add your login logic
    // For simplicity, let's just redirect to a dashboard page
    router.push('/dashboard')
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
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
