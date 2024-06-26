'use client'
import { useAppContext } from '@/context/AppContext'
import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand
} from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import withAuth from '../hoc/withAuth'
import AppSidebar from './components/AppSidebar'
import { CreditsBadge } from './components/CreditsBadge'

interface ProtectedLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  const router = useRouter()
  const { user } = useAppContext()

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleClose = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return router.push('/')
  }

  return (
    <main className='h-screen flex flex-col overflow-hidden'>
      <Navbar fluid>
        <div className='flex gap-4'>
          <HiMenu className="h-8 w-8 cursor-pointer text-gray-500" onClick={handleClose} />
          <NavbarBrand href="/dashboard">
            <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="Arithmetic Calculator Logo" />
          </NavbarBrand>
        </div>
        <div className="flex md:order-2 gap-4">
          <DarkThemeToggle />
          <CreditsBadge />
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">{ `${user?.first_name} ${user?.last_name}` }</span>
              <span className="block truncate text-sm font-medium">{ user?.email }</span>
            </DropdownHeader>
            <DropdownItem>Settings</DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={handleSignOut}>Sign out</DropdownItem>
          </Dropdown>
        </div>
      </Navbar>
      <section className='flex-grow flex overflow-hidden dark:bg-gray-900'>
        <AppSidebar collapsed={sidebarCollapsed} />
        <article className='overflow-y-auto w-full'>
          <section className='m-4 p-8 rounded-md shadow-none dark:text-white'>
            {children}
          </section>
        </article>
      </section>
    </main>
  )
}

export default withAuth(DashboardLayout)
