'use client'
import { updateUserContext } from '@/app/utils/updateContext'
import { useAppContext } from '@/context/AppContext'
import { Breadcrumb } from 'flowbite-react'
import { FaPlus } from 'react-icons/fa'
import { HiHome } from 'react-icons/hi'
import { post } from '../../services/service'
import { CommonOperationForm } from '../components/CommonOperationForm'

export default function () {
  const context = useAppContext()

  const handleNumbers = async (firstNumber: number, secondNumber: number): Promise<string> => {
    const result = await post(context.token, '/addition', {
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
        <Breadcrumb.Item href="/dashboard/addition">Addition</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className='text-3xl font-semibold text-gray-900'>Addition</h3>
      <CommonOperationForm handleNumbers={handleNumbers} icon={FaPlus} title='Addition' multiple />
    </main>
  )
}
