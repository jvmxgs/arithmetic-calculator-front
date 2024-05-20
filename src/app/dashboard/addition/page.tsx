'use client'
import { Breadcrumb } from 'flowbite-react'
import { FaPlus } from 'react-icons/fa'
import { HiHome } from 'react-icons/hi'
import axios from '../../utils/axiosConfig'
import { CommonOperationForm } from '../components/CommonOperationForm'

export default function () {
  const handleNumbers = async (firstNumber: number, secondNumber: number): Promise<string> => {
    try {
      const token = localStorage.getItem('token') ?? ''
      const response = await axios.post(
        '/addition',
        {
          first_number: firstNumber,
          second_number: secondNumber
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      return response.data.data.result
    } catch (e) {
      return 'Something went wrong'
    }
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
