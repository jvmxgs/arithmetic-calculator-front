'use client'
import { post } from '@/app/services/service'
import { updateUserContext } from '@/app/utils/updateContext'
import { useAppContext } from '@/context/AppContext'
import { Breadcrumb } from 'flowbite-react'
import { FaDivide } from 'react-icons/fa6'
import { HiHome } from 'react-icons/hi'
import { CommonOperationForm } from '../components/CommonOperationForm'

export default function () {
  const context = useAppContext()

  const handleNumbers = async (firstNumber: number, secondNumber: number): Promise<string> => {
    const result = await post(context.token, '/division', {
      first_number: firstNumber,
      second_number: secondNumber
    })

    updateUserContext(result.user, context)

    return result.result
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
