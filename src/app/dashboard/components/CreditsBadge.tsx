import { Badge } from 'flowbite-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { VscDebugBreakpointLog } from 'react-icons/vsc'

export const CreditsBadge = ({ credits }: {credits: string}) => {
  console.log('Loaded CreditsBadge')
  console.log(credits)
  const [counter, setCounter] = useState(0)

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
      <Badge icon={VscDebugBreakpointLog}>{ credits }</Badge>
    </motion.div>
  )
}
