'use client'
import {
  Button,
  Card,
  TextInput
} from 'flowbite-react'
import { motion, useAnimation } from 'framer-motion'
import { FormEvent, useState } from 'react'
import { IconType } from 'react-icons'
import { FaEquals, FaPlus } from 'react-icons/fa6'
import { UpgradeModal } from '../components/UpgradeModal'

export const CommonOperationForm = ({
  handleNumbers,
  icon,
  multiple,
  single
} : {
  handleNumbers: (firstNumber: number, secondNumber: number) => Promise<string>
  icon: IconType,
  multiple?: boolean,
  single?: boolean
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [firstNumber, setFirstNumber] = useState('')
  const [secondNumber, setSecondNumber] = useState('')
  const [result, setResult] = useState('')
  const controls = useAnimation()

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await controls.start({ scale: 0.95 })
    const res = await handleNumbers(parseInt(firstNumber), parseInt(secondNumber))
    setResult(res)
    await controls.start({ scale: 1.05 })
    await controls.start({ scale: 1 })
  }

  return (
    <article>
      <div className='flex flex-col md:flex-row justify-center items-start gap-10'>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <TextInput
              type="number"
              placeholder="Enter your first number"
              required
              shadow
              sizing='lg'
              value={firstNumber}
              onChange={(e) => setFirstNumber(e.target.value)}
            />
          </div>
          {!single && <div>
            <TextInput
              type="number"
              placeholder="Enter your second number"
              icon={icon}
              required={!single}
              shadow
              sizing='lg'
              value={secondNumber}
              onChange={(e) => setSecondNumber(e.target.value)}
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
    </article>
  )
}
