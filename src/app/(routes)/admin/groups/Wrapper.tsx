'use client'

import { GroupType } from '@/types'
import CourseHeader from '../components/CourseHeader'
import { DataTableGroups } from '@/components/ui/table-data-groups'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { format } from 'date-fns'
import { LuPlus } from 'react-icons/lu'
import { useState } from 'react'
import OpacityBackground from '@/components/opacityBackground'
import ManageGroup from '../components/ManageGroup'

const GroupsWrapper = ({ groups }: { groups: GroupType[] }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const columns: ColumnDef<GroupType>[] = [
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
      id: 'group',
      accessorKey: 'name',
      header: 'group',
      cell: ({ row }) => {
        return <h3 className='font-bold'>{row.original.name}</h3>
      },
    },
    {
      id: 'Date from/until',
      accessorKey: 'Date from/until',
      header: 'Date from/until',
      cell: ({ row }) => {
        const dateFrom = row.original.createdAt.toDateString()
        return <h4 className='text-sm'>{dateFrom}</h4>
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
    <div>
      <CourseHeader page='Groups' />
      <OpacityBackground
        opened={modalOpen}
        close={() => {
          setModalOpen(false)
        }}
      />
      <ManageGroup opened={modalOpen} setOpened={setModalOpen} />
      <div className='w-full mt-[200px] max-lg:mt-[280px] p-10 max-lg:p-5 max-md:p-4 max-sm:p-2.5 flex flex-col items-start gap-6'>
        <div className='w-full h-[2px] bg-[#F0F0F0]' />
        <div className='w-full flex flex-col items-end gap-1'>
          <DataTableGroups columns={columns} data={groups} />
          <button
            onClick={() => setModalOpen(true)}
            className='bg-[#B1C3F7] text-lightblue font-medium text-[15px] px-7 py-2 rounded-full flex items-center gap-2'
          >
            <LuPlus className='text-xl' />
            Add Group
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupsWrapper
