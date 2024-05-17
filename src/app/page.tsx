'use client'
import {
  Avatar,
  Button,
  DarkThemeToggle,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle
} from 'flowbite-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AppFooter } from './components/AppFooter'
import { PricingCard } from './components/PricingCard'
import { PricingCardItem } from './components/PricingCardItem'

export default function Home () {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState<null | string>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token')
      setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    if (token !== null) {
      setIsLoggedIn(true)
    }
  }, [token])

  const handleSignOut = () => {
    setToken(null)
    setIsLoggedIn(false)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return router.push('/')
  }
  return (
    <main className="min-h-screen">
      <Navbar fluid className='bg-gray-50 sticky top-0'>
        <div className='flex gap-4'>
          <NavbarBrand href="/">
            <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="Arithmetic Calculator Logo" />
          </NavbarBrand>
        </div>
        <div className="flex md:order-2 gap-4">
          <DarkThemeToggle />
          {isLoggedIn
            ? (
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                  }
                >
                  <DropdownHeader>
                    <span className="block text-sm">Bonnie Green</span>
                    <span className="block truncate text-sm font-medium">name@example.com</span>
                  </DropdownHeader>
                  <DropdownItem href='/dashboard'>Dashboard</DropdownItem>
                  <DropdownDivider />
                  <DropdownItem onClick={handleSignOut}>Sign out</DropdownItem>
                </Dropdown>
              )
            : (
                <div className='flex gap-2'>
                  <Button href='/login'>Login</Button>
                  <Button href='/register' outline>Sign up</Button>
                </div>
              )
          }
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink href="#home">Home</NavbarLink>
          <NavbarLink href="#about">About</NavbarLink>
          <NavbarLink href="#pricing">Pricing</NavbarLink>
        </NavbarCollapse>
      </Navbar>
      <article id='home' className="w-full">
        <section className="bg-white dark:bg-gray-700 h-screen p-4">
          <div className="container md:h-full mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
            <div className="text-gray-900 dark:text-white md:basis-1/2 text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-bold">Welcome to Arithmetic Calculator</h1>
                <p className="mt-4">Perform calculations and manage your credits with ease</p>
            </div>
            <div className='md:basis-1/2 flex justify-center'>
              <Image
                alt='Maths'
                width='400'
                height='400'
                src='/mathematics.png'
              />
            </div>
          </div>
        </section>
        <section id="about" className="bg-gray-200 dark:bg-gray-800 md:h-screen flex flex-col justify-center items-center p-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">About Us</h2>
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
            <div className='md:basis-1/2 flex justify-center'>
              <Image
                alt='Maths'
                width='400'
                height='400'
                src='/learning.png'
              />
            </div>
            <div className="text-gray-900 text-md md:text-lg dark:text-white md:basis-1/2">
              <p>We provide an easy-to-use interface for performing basic mathematical calculations like addition, subtraction, multiplication, and division. Additionally, you can generate random strings and even calculate square roots.</p>
            </div>
          </div>
        </section>
        <section id="pricing" className="bg-white dark:bg-gray-700 dark:text-white text-gray-900 w-full py-16">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 dark:text-white">Our Pricing Plans</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <PricingCard title='Basic Plan' price='49'>
                <PricingCardItem title='500 credits' />
                <PricingCardItem title='Addition' />
                <PricingCardItem title='Subtraction' />
                <PricingCardItem title='Multiplication' />
                <PricingCardItem title='Division' />
                <PricingCardItem title='Square root' />
                <PricingCardItem title='Exponential and logarithmic functions' locked />
                <PricingCardItem title='Trigonometric functions (sine, cosine, tangent)' locked />
                <PricingCardItem title='Work with multiple numbers' locked />
                <PricingCardItem title='History of recent calculations' locked />
                <PricingCardItem title='Customizable themes for the calculator interface' locked />
                <PricingCardItem title='Graphing calculator functionality' locked />
                <PricingCardItem title='24×7 phone & email support' locked />
              </PricingCard>
              <PricingCard title='Standard Plan' price='99'>
                <PricingCardItem title='1200 credits' />
                <PricingCardItem title='Addition' />
                <PricingCardItem title='Subtraction' />
                <PricingCardItem title='Multiplication' />
                <PricingCardItem title='Division' />
                <PricingCardItem title='Square root' />
                <PricingCardItem title='Exponential and logarithmic functions' />
                <PricingCardItem title='Trigonometric functions (sine, cosine, tangent)' />
                <PricingCardItem title='Work with multiple numbers' />
                <PricingCardItem title='History of recent calculations' locked />
                <PricingCardItem title='Customizable themes for the calculator interface' locked />
                <PricingCardItem title='Graphing calculator functionality' locked />
                <PricingCardItem title='24×7 phone & email support' />
              </PricingCard>
              <PricingCard title='Premium Plan' price='149'>
                <PricingCardItem title='2000 credits' />
                <PricingCardItem title='Addition' />
                <PricingCardItem title='Subtraction' />
                <PricingCardItem title='Multiplication' />
                <PricingCardItem title='Division' />
                <PricingCardItem title='Square root' />
                <PricingCardItem title='Exponential and logarithmic functions' />
                <PricingCardItem title='Trigonometric functions (sine, cosine, tangent)' />
                <PricingCardItem title='Work with multiple numbers' />
                <PricingCardItem title='History of recent calculations' />
                <PricingCardItem title='Customizable themes for the calculator interface' />
                <PricingCardItem title='Graphing calculator functionality' />
                <PricingCardItem title='24×7 phone & email support' />
              </PricingCard>
            </div>
          </div>
        </section>
        <AppFooter/>
      </article>
    </main>
  )
}
