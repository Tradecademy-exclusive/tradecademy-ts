'use client'

import { DataTable } from '@/components/ui/table-data'
import CourseHeader from '../components/CourseHeader'
import { CourseType, EnrollType } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { formatToEuro } from '@/lib/utils'
import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'
import { format } from 'date-fns'

const Enrollments = ({
  enrollments,
  courses,
}: {
  enrollments: EnrollType[]
  courses: CourseType[]
}) => {
  const columns: ColumnDef<EnrollType>[] = [
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
      accessorKey: 'user',
      header: 'User',
      cell: ({ row }) => {
        const user = row.original.user
        return (
          <div className='flex flex-col items-start'>
            <h3 className='font-bold'>{user.username}</h3>
            <h4 className='text-sm'>{user.email}</h4>
          </div>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'))
        return (
          <div className='text-[13px]'>
            {format(date, 'MMMM dd, yyyy h:mm a')}
          </div>
        )
      },
    },
    {
      accessorKey: 'course',
      header: 'Course',
      cell: ({ row }) => {
        const course = row.original.course
        return <div>{course?.title || 'N/A'}</div>
      },
    },
    {
      accessorKey: 'course.price',
      header: ({ column }) => (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const course = row.original.course
        return (
          <div>{`${formatToEuro(course.discountedPrice || course.price)}`}</div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div
          className={`${
            row.getValue('status') === 'Pending'
              ? 'text-gray-600'
              : row.getValue('status') === 'Approved'
              ? 'text-[#24A147]'
              : 'text-[#F44337]'
          }`}
        >
          {row.getValue('status')}
        </div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const enrollment = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(enrollment.id)}
              >
                Copy Enroll ID
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/admin/enrollments/manage?id=${enrollment.id}`}>
                  Manage Enroll
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/admin/students/${enrollment.user.id}`}>
                  View student details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/admin/courses/?id=${enrollment.course.id}`}>
                  View course details
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className='w-full p-10'>
      <CourseHeader page='Enrollment' />
      <div className='w-full translate-y-[200px] rounded-[15px] flex flex-col items-center gap-5 border border-[#B9B0B0B2]'>
        <div className='w-full flex items-center justify-between px-10 py-5 border-b border-[#B9B0B0B2]'>
          <div className='flex items-center gap-5'>
            <h2 className='text-xl font-bold'>Enrollment</h2>
            <Link
              href='/admin/enrollments/enroll'
              className='bg-lightblue text-white px-2 py-2 rounded-[5px] flex items-center gap-1 text-sm'
            >
              <FiPlus className='text-2xl' />
              Enroll a student
            </Link>
          </div>
        </div>
        <DataTable columns={columns} data={enrollments} courses={courses} />
      </div>
    </div>
  )
}

export default Enrollments
