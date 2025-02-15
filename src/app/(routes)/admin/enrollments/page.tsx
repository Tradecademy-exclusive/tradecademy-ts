'use client'

import { DataTable } from '@/components/ui/table-data'
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
import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'
import { format } from 'date-fns'
import { useState } from 'react'
import OpacityBackground from '@/components/opacityBackground'
import CreateEnroll from '../components/CreateEnroll'
import { IoCloseOutline } from 'react-icons/io5'
import { GrTrophy } from 'react-icons/gr'
import { toast } from 'react-toastify'
import Image from 'next/image'
import axios from 'axios'
import { useContext } from 'react'
import { AdminContext } from '../AdminProvider'

const Enrollments = () => {
  const { courses, enrollments } = useContext(AdminContext)
  const [enrollOpen, setEnrollOpen] = useState<boolean>(false)
  const [successOpen, setSuccessOpen] = useState<boolean>(false)

  const updateStatus = async (
    enroll: EnrollType,
    status: 'Approved' | 'Cancelled'
  ) => {
    try {
      const { user, courseId, id } = enroll
      const { data } = await axios.put('/api/admin/enroll', {
        email: user.email,
        courseId,
        id,
        status,
      })

      if (data.updatedEnroll) {
        toast.error('Enroll has been updated', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
      toast.error('Something went wrong.', {
        icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
      })
    }
  }

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
            <h4 className='text-sm max-lg:hidden'>{user.email}</h4>
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
            <span className='hidden lg:block'>
              {format(date, 'MMMM dd, yyyy h:mm a')}
            </span>
            <span className='max-lg:block hidden'>
              {date.toLocaleDateString()}
            </span>
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
              {enrollment.status === 'Pending' && (
                <DropdownMenu>
                  <DropdownMenuTrigger className='text-sm mt-1 px-2'>
                    Update Status
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => updateStatus(enrollment, 'Approved')}
                      className='text-green-600'
                    >
                      Approved
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => updateStatus(enrollment, 'Cancelled')}
                      className='text-[#F44337]'
                    >
                      Cancelled
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className='w-full p-10 max-lg:p-5 max-md:p-4 max-sm:p-2.5'>
      <OpacityBackground
        opened={enrollOpen || successOpen}
        close={() => {
          setEnrollOpen(false)
          setSuccessOpen(false)
        }}
      />
      <CreateEnroll
        opened={enrollOpen}
        setOpened={setEnrollOpen}
        courses={courses!}
        setSuccessOpen={setSuccessOpen}
      />

      <div
        className={`w-[500px] fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-[10px] flex flex-col items-start p-10 z-[999] gap-6 transition-all duration-300 ${
          successOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className='flex justify-end w-full'>
          <IoCloseOutline
            onClick={() => setSuccessOpen(false)}
            className='text-2xl text-gray-600 cursor-pointer'
          />
        </div>
        <div className='w-full flex flex-col items-center gap-4'>
          <GrTrophy className='text-6xl text-lightblue' />
          <h3 className='text-2xl font-medium'>Success!</h3>
          <p className='text-[15px] text-gray-500'>
            The Student Enrollment Request has been submitted
          </p>
          <p className='text-[15px] text-gray-500 mt-5 text-center'>
            Now, as default enrollments are pending you will need to mark the
            Order as &quot;Approved&quot; manually, Only after that, the
            students will get access to the course.
          </p>

          <button
            onClick={() => window.location.reload()}
            className='bg-lightblue text-white mt-8 px-4 py-1.5 rounded-[5px]'
          >
            Refresh Page
          </button>
        </div>
      </div>

      <CourseHeader page='Enrollment' />
      <div className='w-full mt-[200px] max-lg:mt-[280px] rounded-[15px] flex flex-col items-center gap-5 border border-[#B9B0B0B2]'>
        <div className='w-full flex items-center justify-between px-10 py-5 border-b border-[#B9B0B0B2]'>
          <div className='flex items-center gap-5'>
            <h2 className='text-xl font-bold'>Enrollment</h2>
            <button
              onClick={() => setEnrollOpen(true)}
              className='bg-lightblue text-white px-2 py-2 rounded-[5px] flex items-center gap-1 text-sm'
            >
              <FiPlus className='text-2xl' />
              Enroll a student
            </button>
          </div>
        </div>
        <DataTable columns={columns} data={enrollments!} courses={courses!} />
      </div>
    </div>
  )
}

export default Enrollments
