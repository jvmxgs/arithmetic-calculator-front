'use client'
import { updateUserContext } from '@/app/utils/updateContext'
import { useAppContext } from '@/context/AppContext'
import { Breadcrumb, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiHome } from 'react-icons/hi'
import { get } from '../../services/service'

export default function () {
  const context = useAppContext()
  const [records, setRecords] = useState([])

  const handleSubmit = async (): Promise<void> => {
    const result = await get(context.token, '/records')

    console.log(result.user)

    updateUserContext(result.user, context)

    setRecords(result.records)
  }

  useEffect(() => {
    handleSubmit()
  }, [])

  return (
    <main className='flex flex-col gap-4'>
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/dashboard" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/dashboard/addition">Records</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className='text-3xl font-semibold text-gray-900 dark:text-gray-100 pb-8'>Records</h3>
      <article>
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableHeadCell>Operation</TableHeadCell>
              <TableHeadCell>Amount</TableHeadCell>
              <TableHeadCell>User Balance</TableHeadCell>
              <TableHeadCell>Response</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {records.map((item, index) => (
                <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    { item.operation.type }
                  </TableCell>
                  <TableCell>{ item.operation?.cost }</TableCell>
                  <TableCell>{ item.user_balance }</TableCell>
                  <TableCell>{ item.operation_response }</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </article>
    </main>
  )
}
