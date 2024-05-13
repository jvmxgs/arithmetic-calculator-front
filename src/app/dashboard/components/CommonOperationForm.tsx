'use client'
import {
  TextInput,
  Button,
  Card
} from 'flowbite-react'
import { UpgradeModal } from '../components/UpgradeModal'
import { FaEquals, FaPlus } from 'react-icons/fa6'
import { useState, FormEvent } from 'react'
import { IconType } from 'react-icons'

export const CommonOperationForm = ({
  handleNumbers,
  icon,
  multiple
} : {
  handleNumbers: (firstNumber: number, secondNumber: number) => void
  icon: IconType,
  multiple?: boolean
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [firstNumber, setFirstNumber] = useState('')
  const [secondNumber, setSecondNumber] = useState('')

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleNumbers(parseInt(firstNumber), parseInt(secondNumber))
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
          <div>
            <TextInput
              type="number"
              placeholder="Enter your second number"
              icon={icon}
              required
              shadow
              sizing='lg'
              value={secondNumber}
              onChange={(e) => setSecondNumber(e.target.value)}
            />
          </div>
          { multiple && <Button type="button" size='md' outline onClick={handleOpenModal}><FaPlus className="mr-2 h-5 w-5" />Add number</Button> }
          <Button type="submit" size='xl'><FaEquals /></Button>
        </form>
        <Card className='w-full md:w-1/3'>
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Result:</h5>
          <h3 className="mb-4 text-4xl font-medium text-gray-800 dark:text-gray-400 min-w-40 text-center"> - </h3>
        </Card>
      </div>
      <UpgradeModal open={isModalOpen} onClose={handleCloseModal} />
    </article>
  )
}
