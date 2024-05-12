'use client'
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Badge,
  Sidebar
} from 'flowbite-react'

import { HiPlus, HiChartPie, HiViewList, HiMenu } from 'react-icons/hi'
import { useState, useEffect } from 'react'

export default function DashboardLayout ({
  children
}: {
  children: React.ReactNode
}) {
  // const sidebarCollapsed = localStorage.getItem('sidebar-collapsed') === 'yes'
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

  return (
    <main className='min-h-screen'>
      <Navbar fluid rounded>
        <div className='flex gap-4'>
          <HiMenu className="h-8 w-8 cursor-pointer text-gray-500" onClick={handleClose} />
          <NavbarBrand href="/">
            <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="Arithmetic Calculator Logo" />
          </NavbarBrand>
        </div>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">name@flowbite.com</span>
            </DropdownHeader>
            <DropdownItem>Dashboard</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Earnings</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Sign out</DropdownItem>
          </Dropdown>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink href="#" active>
            Home
          </NavbarLink>
          <NavbarLink href="#">About</NavbarLink>
          <NavbarLink href="#">Services</NavbarLink>
          <NavbarLink href="#">Pricing</NavbarLink>
          <NavbarLink href="#">Contact</NavbarLink>
        </NavbarCollapse>
      </Navbar>
      <section className='flex bg-red-600'>
        <Sidebar collapsed={isCollapsed} className='h-full'>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiPlus}>
                New Operation
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiViewList}>
                Records
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
          <Sidebar.CTA>
            <div className="mb-3 flex items-center">
              <Badge color="warning">Beta</Badge>
              <button
                aria-label="Close"
                className="-m-1.5 ml-auto inline-flex h-6 w-6 rounded-lg bg-gray-100 p-1 text-cyan-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                type="button"
              >
                <svg
                  aria-hidden
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="mb-3 text-sm text-cyan-900 dark:text-gray-400">
              Hire me now!
            </div>
            <a
              className="text-sm text-cyan-900 underline hover:text-cyan-800 dark:text-gray-400 dark:hover:text-gray-300"
              href="#"
            >
              Contact me!
            </a>
          </Sidebar.CTA>
        </Sidebar>
        <section className='bg-amber-400 w-full'>
          {children}
        </section>
      </section>
    </main>
  )
}
