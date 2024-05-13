import {
  Breadcrumb
} from 'flowbite-react'
import { HiHome } from 'react-icons/hi'

export const CommonHeader = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <main className='flex flex-col gap-4'>
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/dashboard" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/dashboard/subtraction">Subtraction</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className='text-3xl font-semibold text-gray-900'>Subtraction</h3>
      { children }
    </main>
  )
}
