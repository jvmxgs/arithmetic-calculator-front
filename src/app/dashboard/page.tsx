'use client'
import { Card } from 'flowbite-react'
import { motion } from 'framer-motion'

const Dashboard: React.FC = (user) => {
  console.log('dashboard + + + + + ')
  console.log(user)
  return (
    <main>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className='w-full md:w-1/3'
      >
        <Card className="max-w-sm">
          <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Your balance</h5>
          </div>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Credits</p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">fsad</div>
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </motion.div>
    </main>
  )
}

export default Dashboard
