'use client'
import { updateUserContext } from '@/app/utils/updateContext'
import { useAppContext } from '@/context/AppContext'
import { Breadcrumb, Button, Card, Toast, ToastToggle } from 'flowbite-react'
import { motion, useAnimation } from 'framer-motion'
import { FormEvent, useState } from 'react'
import { HiHome } from 'react-icons/hi'
import { VscDebugBreakpointLog } from 'react-icons/vsc'
import { post } from '../../services/service'

export default function () {
  const controls = useAnimation()
  const context = useAppContext()
  const [result, setResult] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const result = await post(context.token, '/random-string', {})

    if (result.message === 'Insuficient credits!') {
      context.setShowBuyCoins(true)
      return
    }

    updateUserContext(result.user, context)

    setResult(result.result)
  }

  const handleBuyCoins = () => {
    context.setShowBuyCoins(false)
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
    {context.showBuyCoins && <Toast className='absolute top-6 right-6'>
        <div className="flex items-start">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-900 dark:text-cyan-300">
            <VscDebugBreakpointLog className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Buy more credits</span>
            <div className="mb-2 text-sm font-normal">You don't have enough credits</div>
            <div className="flex gap-2">
              <div className="w-auto">
                <Button size="xs">Buy more</Button>
              </div>
              <div className="w-auto">
                <Button color="light" size="xs" onClick={handleBuyCoins}>
                  Not now
                </Button>
              </div>
            </div>
          </div>
          <ToastToggle onDismiss={() => context.setShowBuyCoins(false)} />
        </div>
      </Toast>}
    </main>
  )
}
