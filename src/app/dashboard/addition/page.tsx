'use client'
import { Breadcrumb } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { CommonOperationForm } from '../components/CommonOperationForm'
import { FaPlus } from 'react-icons/fa'

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
        <Breadcrumb.Item href="/dashboard/addition">Addition</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className='text-3xl font-semibold text-gray-900'>Addition</h3>
      <CommonOperationForm handleNumbers={handleNumbers} icon={FaPlus} multiple />
    </main>
  )
}
