'use client'
import { post } from '@/app/services/service'
import { updateUserContext } from '@/app/utils/updateContext'
import { useAppContext } from '@/context/AppContext'
import { Breadcrumb } from 'flowbite-react'
import { FaMinus } from 'react-icons/fa'
import { HiHome } from 'react-icons/hi'
import { CommonOperationForm } from '../components/CommonOperationForm'

export default function () {
  const context = useAppContext()

  const handleNumbers = async (firstNumber: number, secondNumber: number): Promise<string> => {
    const result = await post(context.token, '/subtraction', {
      first_number: firstNumber,
      second_number: secondNumber
    })

    updateUserContext(result.data.user, result.newToken, context)

    return result.data.result
  }

  return (
    <main className='flex flex-col gap-4'>
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/dashboard" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/dashboard/subtraction">Subtraction</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className='text-3xl font-semibold text-gray-900'>Subtraction</h3>
      <CommonOperationForm handleNumbers={handleNumbers} icon={FaMinus} title='Subtraction' multiple />
    </main>
  )
}
