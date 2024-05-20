'use client'
import { updateUserContext } from '@/app/utils/updateContext'
import { useAppContext } from '@/context/AppContext'
import { Breadcrumb, Button, Card } from 'flowbite-react'
import { motion, useAnimation } from 'framer-motion'
import { FormEvent, useState } from 'react'
import { HiHome } from 'react-icons/hi'
import { post } from '../../services/service'

export default function () {
  const controls = useAnimation()
  const context = useAppContext()
  const [result, setResult] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const result = await post(context.token, '/random-string', {})

    updateUserContext(result.user, context)

    setResult(result.result)
  }

  return (
    <main className='flex flex-col gap-4'>
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/dashboard" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/dashboard/addition">Random string</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className='text-3xl font-semibold text-gray-900 dark:text-gray-100 pb-8'>Random string</h3>
      <article>
      <div className='flex flex-col md:flex-row justify-center items-start gap-10'>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Button type="submit" size='xl'>Generate</Button>
        </form>
        <motion.div
          animate={controls}
          transition={{ duration: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.1 }}
          className='w-full md:w-1/3'
        >
          <Card className='w-full'>
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Result:</h5>
            <h3 className="mb-4 text-2xl font-medium text-gray-800 dark:text-gray-400 min-w-40 text-center whitespace-nowrap text-overflow-ellipsis"> { result } </h3>
          </Card>
        </motion.div>
      </div>
    </article>
    </main>
  )
}
