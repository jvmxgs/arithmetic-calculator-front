'use client'
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

export default function () {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [token, setToken] = useState<null | string | undefined>(undefined)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token')
      setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    if (token === undefined) {
      return
    }

    if (token !== null) {
      router.push('/dashboard')
    }
  }, [token, router])

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== repeatPassword) {
      alert("Passwords don't match")
      return
    }

    router.push('/dashboard')
  }

  return (
    <article className='dark:bg-gray-900 flex flex-col h-screen justify-center items-center gap-2'>
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
      <h3 className='text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Register</h3>
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleRegister}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              shadow
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="first_name" value="First Name" />
            </div>
            <TextInput
              id="first_name"
              type="text"
              placeholder="First Name"
              required
              shadow
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="last_name" value="Last Name" />
            </div>
            <TextInput
              id="last_name"
              type="text"
              placeholder="Last Name"
              required
              shadow
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="Password"
              required
              shadow
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password" value="Repeat password" />
            </div>
            <TextInput
              id="repeat-password"
              type="password"
              placeholder="Repeat password"
              required
              shadow
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              color="failure"
              helperText={
                <>
                  <span className="font-medium">Oops!</span> Passwords don't match!
                </>
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="agree" />
            <Label htmlFor="agree" className="flex">
              I agree with the&nbsp;
              <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                terms and conditions
              </Link>
            </Label>
          </div>
          <Button type="submit">Register new account</Button>
        </form>
        <p className='text-sm'>
          Already have an account?&nbsp;
          <Link href="/login" className="text-cyan-600 hover:underline dark:text-cyan-500">
            Log in
          </Link>
        </p>
      </Card>
    </article>
  )
}
