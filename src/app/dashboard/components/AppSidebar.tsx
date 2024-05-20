'use client'
import {
  Sidebar
} from 'flowbite-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { FaAsterisk, FaDivide, FaSquareRootVariable } from 'react-icons/fa6'
import { HiChartPie, HiMinus, HiPlus, HiViewList } from 'react-icons/hi'
import { SidebarCta } from './SidebarCta'

export default function AppSidebar ({
  collapsed
}: {
  collapsed: boolean
}) {
  let collapsedStored!: boolean

  if (typeof window !== 'undefined') {
    collapsedStored = localStorage.getItem('sidebar-collapsed') === 'yes'
  }

  const [sidebarCollapsed, setSidebarCollapsed] = useState(collapsedStored)

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: HiChartPie },
    { name: 'Addition', path: '/dashboard/addition', icon: HiPlus },
    { name: 'Subtraction', path: '/dashboard/subtraction', icon: HiMinus },
    { name: 'Multiplication', path: '/dashboard/multiplication', icon: FaAsterisk },
    { name: 'Division', path: '/dashboard/division', icon: FaDivide },
    { name: 'Square Root', path: '/dashboard/sqrt', icon: FaSquareRootVariable },
    { name: 'Records', path: '/dashboard/records', icon: HiViewList }
  ]

  const rendered = useRef({ effect: false })

  useEffect(() => {
    if (!rendered.current.effect) {
      rendered.current.effect = true
      return
    }

    setSidebarCollapsed(!sidebarCollapsed)

    if (sidebarCollapsed) {
      localStorage.removeItem('sidebar-collapsed')
      return
    }

    localStorage.setItem('sidebar-collapsed', 'yes')
  }, [collapsed])

  return (
    <Sidebar collapsed={sidebarCollapsed} collapseBehavior='collapse' className='flex'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {menuItems.map((item, index) => (
          <Sidebar.Item
            as={Link}
            active={ usePathname() === item.path }
            href={ item.path }
            icon={item.icon}
            key={ index }
          >
            { item.name }
          </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      <SidebarCta />
    </Sidebar>
  )
}
