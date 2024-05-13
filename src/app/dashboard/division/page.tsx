'use client'
import { Breadcrumb } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { CommonOperationForm } from '../components/CommonOperationForm'
import { FaDivide } from 'react-icons/fa6'

export default function () {
  const handleNumbers = (firstNumber: number, secondNumber: number) => {
    console.log(firstNumber)
    console.log(secondNumber)
  }

  return (
    <main className='flex flex-col gap-4'>
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/dashboard" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/dashboard/division">Division</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className='text-3xl font-semibold text-gray-900'>Division</h3>
      <CommonOperationForm handleNumbers={handleNumbers} icon={FaDivide} />
    </main>
  )
}
