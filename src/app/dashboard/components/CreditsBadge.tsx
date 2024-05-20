import { Badge } from 'flowbite-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { VscDebugBreakpointLog } from 'react-icons/vsc'
import { useAppContext } from '../../../context/AppContext'

export const CreditsBadge = () => {
  console.log('Loaded CreditsBadge')
  const [counter, setCounter] = useState(0)

  const { user } = useAppContext()

  const handleCounter = () => {
    setCounter(counter + 1)

    if (counter > 3) {
      console.log('You clicked more than 3 times')
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.2 }}
      className="flex flex-wrap items-center cursor-pointer select-none"
      onClick={handleCounter}
    >
      <Badge icon={VscDebugBreakpointLog}>{ user?.credits }</Badge>
    </motion.div>
  )
}
