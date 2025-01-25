'use client'

import { DataTableDemo } from '@/components/ui/table-data'
import CourseHeader from '../components/CourseHeader'
import { EnrollType } from '@/types'
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

const Enrollments = ({ enrollments }: { enrollments: EnrollType[] }) => {
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
            <h3 className='font-semibold'>{user.username}</h3>
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
        return <div>{date.toLocaleDateString()}</div>
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
      cell: ({ row }) => <div>{row.getValue('status')}</div>,
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
                onClick={() =>
                  navigator.clipboard.writeText(
                    enrollment.user?.username || 'N/A'
                  )
                }
              >
                Copy username
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View user details</DropdownMenuItem>
              <DropdownMenuItem>View course details</DropdownMenuItem>
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
        <DataTableDemo columns={columns} data={enrollments} />
      </div>
    </div>
  )
}

export default Enrollments
