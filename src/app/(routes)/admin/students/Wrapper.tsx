'use client'

import React from 'react'
import CourseHeader from '../components/CourseHeader'
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { UserType } from '@/types'
import { DataTable } from '@/components/ui/table-data-students'

const Students = ({ students }: { students: UserType[] }) => {
  const columns: ColumnDef<UserType>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'user',
      accessorKey: 'user',
      header: 'User',
      cell: ({ row }) => {
        const user = {
          username: row.original.username,
        }
        return <h3 className='font-bold'>{user.username}</h3>
      },
    },
    {
      id: 'email',
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => {
        const email = row.original.email
        return <h4 className='text-sm'>{email}</h4>
      },
    },
    {
      id: 'date',
      accessorKey: 'createdAt',
      header: 'Registration Date',
      cell: ({ row }) => {
        const date = row.original.createdAt
        return (
          <h4 className='text-sm font-light'>
            <span className='hidden lg:block'>
              {format(date, 'MMMM dd, yyyy h:mm a')}
            </span>
            <span className='hidden max-lg:block'>
              {date.toLocaleDateString()}
            </span>
          </h4>
        )
      },
    },
    {
      id: 'courses',
      accessorKey: 'courses',
      header: 'Courses Taken',
      cell: ({ row }) => {
        const coursesTaken = row.original.courses.length
        return <h3 className='text-sm font-semibold'>{coursesTaken}</h3>
      },
    },
    {
      id: 'Details',
      accessorKey: '',
      cell: ({ row }) => {
        const id = row.original.id
        return (
          <Link
            href={`/admin/students/${id}`}
            className='text-sm font-semibold px-10 py-2 rounded-full bg-[#B1C3F7] text-lightblue'
          >
            Details
          </Link>
        )
      },
    },
  ]

  return (
    <div className='w-full'>
      <CourseHeader page='Students' />
      <div className='w-full mt-[200px] max-lg:mt-[280px] flex flex-col items-center gap-6 p-10 max-lg:p-5 max-md:p-4 max-sm:p-2.5'>
        <div className='w-full h-[1px] bg-[#B9B0B0B2]' />
        <DataTable columns={columns} data={students} />
      </div>
    </div>
  )
}

export default Students
