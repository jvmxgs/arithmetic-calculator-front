'use client'
import { Card } from 'flowbite-react'

export default function () {
  const user = JSON.parse(localStorage.getItem('user') ?? '{}')

  return (
    <main>
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
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{ user?.credits }</div>
              </div>
            </li>
          </ul>
        </div>
      </Card>
    </main>
  )
}
