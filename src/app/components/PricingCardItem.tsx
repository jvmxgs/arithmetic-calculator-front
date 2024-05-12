import { FaCheckCircle } from 'react-icons/fa'

export function PricingCardItem ({ title, locked }: { title:string, locked?:boolean }) {
  const liClasses = locked ? 'line-through decoration-gray-500' : ''
  const iconClasses = locked ? 'text-gray-400 dark:text-gray-500' : 'text-cyan-600 dark:text-cyan-500'
  const spanClasses = locked ? '' : 'dark:text-gray-400'

  return (
    <li className={`flex space-x-3 ${liClasses}`}>
      <FaCheckCircle className={ iconClasses }/>
      <span className={`text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ${spanClasses}`}>{ title }</span>
    </li>
  )
}
