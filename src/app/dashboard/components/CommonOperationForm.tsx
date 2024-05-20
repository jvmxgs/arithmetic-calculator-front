'use client'
import { useAppContext } from '@/context/AppContext'
import {
  Button,
  Card,
  TextInput,
  Toast,
  ToastToggle
} from 'flowbite-react'
import { motion, useAnimation } from 'framer-motion'
import { FormEvent, useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { FaEquals, FaPlus } from 'react-icons/fa6'
import { VscDebugBreakpointLog } from 'react-icons/vsc'
import { UpgradeModal } from '../components/UpgradeModal'

export const CommonOperationForm = ({
  handleNumbers,
  icon,
  errors,
  multiple,
  single
} : {
  handleNumbers: (firstNumber: string, secondNumber: string) => Promise<string>
  icon: IconType,
  errors: { [key: string]: string },
  multiple?: boolean,
  single?: boolean
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [firstNumber, setFirstNumber] = useState('')
  const [secondNumber, setSecondNumber] = useState('')
  const [inputErrors, setInputErrors] = useState<{ [key: string]: string }>({})
  const [result, setResult] = useState('')
  const controls = useAnimation()
  const context = useAppContext()

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  useEffect(() => {
    const newErrors: { [key: string]: string } = {}
    Object.values(errors).forEach((error) => {
      newErrors[error.path] = error.msg
    })
    setInputErrors(newErrors)
  }, [errors])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await controls.start({ scale: 0.95 })
    const res = await handleNumbers(firstNumber, secondNumber)
    setResult(res)
    await controls.start({ scale: 1.05 })
    await controls.start({ scale: 1 })
  }

  const handleBuyCoins = () => {
    context.setShowBuyCoins(false)
  }

  return (
    <article>
      <div className='flex flex-col md:flex-row justify-center items-start gap-10'>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <TextInput
              type="string"
              placeholder="Enter your first number"
              required
              shadow
              sizing='lg'
              value={firstNumber}
              onChange={(e) => setFirstNumber(e.target.value)}
              color={inputErrors.first_number ? 'failure' : 'gray'}
              helperText = {
                inputErrors.first_number
                  ? (
                      <span className="font-medium text-red-500">{inputErrors.first_number}</span>
                    )
                  : (
                      <></>
                    )
              }
            />
          </div>
          {!single && <div>
            <TextInput
              type="string"
              placeholder="Enter your second number"
              icon={icon}
              required={!single}
              shadow
              sizing='lg'
              value={secondNumber}
              onChange={(e) => setSecondNumber(e.target.value)}
              color={inputErrors.second_number ? 'failure' : 'gray'}
              helperText = {
                inputErrors.second_number
                  ? (
                      <span className="font-medium text-red-500">{inputErrors.second_number}</span>
                    )
                  : (
                      <></>
                    )
              }
            />
          </div>}
          { multiple && <Button type="button" size='md' outline onClick={handleOpenModal}><FaPlus className="mr-2 h-5 w-5" />Add number</Button> }
          <Button type="submit" size='xl'><FaEquals /></Button>
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
            <h3 className="mb-4 text-4xl font-medium text-gray-800 dark:text-gray-400 min-w-40 text-center text-balance"> { result } </h3>
          </Card>
        </motion.div>
      </div>
      <UpgradeModal open={isModalOpen} onClose={handleCloseModal} />
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
    </article>
  )
}
