'use client'
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  DarkThemeToggle,
  Sidebar
} from 'flowbite-react'
import { SidebarCta } from './components/SidebarCta'
import { HiPlus, HiMinus, HiChartPie, HiViewList, HiMenu } from 'react-icons/hi'
import { FaDivide, FaAsterisk, FaSquareRootVariable } from 'react-icons/fa6'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(sidebarCollapsed)

  useEffect(() => {
    const collapsed = localStorage.getItem('sidebar-collapsed') === 'yes'
    setSidebarCollapsed(collapsed)
  }, [])

  const handleClose = () => {
    setIsCollapsed(!isCollapsed)

    if (isCollapsed) {
      localStorage.removeItem('sidebar-collapsed')
      return
    }

    localStorage.setItem('sidebar-collapsed', 'yes')
  }

  const handleSignOut = () => {
    router.push('/')
  }

  return (
    <main className='h-screen flex flex-col overflow-hidden'>
      <Navbar fluid>
        <div className='flex gap-4'>
          <HiMenu className="h-8 w-8 cursor-pointer text-gray-500" onClick={handleClose} />
          <NavbarBrand href="/">
            <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="Arithmetic Calculator Logo" />
          </NavbarBrand>
        </div>
        <div className="flex md:order-2 gap-4">
          <DarkThemeToggle />
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
            <DropdownItem>Settings</DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={handleSignOut}>Sign out</DropdownItem>
          </Dropdown>
        </div>
      </Navbar>
      <section className='flex-grow flex overflow-hidden dark:bg-gray-900'>
        <Sidebar collapsed={isCollapsed} collapseBehavior='collapse' className='flex'>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/dashboard" icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item href="/dashboard/addition" icon={HiPlus}>
                Addition
              </Sidebar.Item>
              <Sidebar.Item href="/dashboard/subtraction" icon={HiMinus}>
                Subtraction
              </Sidebar.Item>
              <Sidebar.Item href="/dashboard/multiplication" icon={FaAsterisk}>
                Multiplication
              </Sidebar.Item>
              <Sidebar.Item href="/dashboard/division" icon={FaDivide}>
                Division
              </Sidebar.Item>
              <Sidebar.Item href="/dashboard/square-root" icon={FaSquareRootVariable}>
                Square Root
              </Sidebar.Item>
              <Sidebar.Item href="/dashboard/records" icon={HiViewList}>
                Records
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
          <SidebarCta />
        </Sidebar>
        <article className='overflow-y-auto w-full'>
          <section className='m-4 p-8 rounded-md shadow-none dark:text-white'>
            {children}
          </section>
        </article>
      </section>
    </main>
  )
}
