import { PricingCardItem } from '@/app/components/PricingCardItem'
import {
  Button,
  Modal
} from 'flowbite-react'

export const UpgradeModal = ({ open, onClose } : { open: boolean, onClose: () => void }) => {
  return (
    <Modal
      show={open}
      position='center'
      onClose={onClose}
    >
      <Modal.Header>Upgrade now!</Modal.Header>
      <Modal.Body>
        <div className="space-y-6 p-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Upgrade your account now to unlock premium features and enhance your experience with Arithmetic Calculator:
          </p>
          <ul className='flex flex-col gap-2'>
            <PricingCardItem title='2000 credits' />
            <PricingCardItem title='Exponential and logarithmic functions' />
            <PricingCardItem title='Trigonometric functions (sine, cosine, tangent)' />
            <PricingCardItem title='History of recent calculations' />
            <PricingCardItem title='Customizable themes for the calculator interface' />
            <PricingCardItem title='Graphing calculator functionality' />
            <PricingCardItem title='Work with multiple numbers' />
            <PricingCardItem title='24×7 phone & email support' />
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button>Upgrade</Button>
        <Button color="gray" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
