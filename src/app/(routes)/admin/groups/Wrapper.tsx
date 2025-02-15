'use client'

import { GroupType } from '@/types'
import CourseHeader from '../components/CourseHeader'
import { DataTableGroups } from '@/components/ui/table-data-groups'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { LuPlus } from 'react-icons/lu'
import { useContext, useState } from 'react'
import OpacityBackground from '@/components/opacityBackground'
import ManageGroup from '../components/ManageGroup'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { AdminContext } from '../AdminProvider'

const GroupsWrapper = ({ groups }: { groups: GroupType[] }) => {
  const { courses } = useContext(AdminContext)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [groupUpdateId, setGroupUpdateId] = useState<string>('')

  const totalLessons = courses.reduce((acc, course) => {
    return (
      acc +
      course.chapters.reduce((total, chapter) => {
        return total + chapter.lessons.length
      }, 0)
    )
  }, 0)

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
      header: 'Group',
      cell: ({ row }) => {
        return <h3 className='font-bold'>{row.original.name}</h3>
      },
    },
    {
      accessorKey: 'Date From/Until',
      header: 'Date From/Until',
      cell: ({ row }) => {
        const dateFrom = row.original.dateFrom
          .toLocaleDateString()
          .replaceAll('/', '-')
        const dateUntil = row.original.dateUntil
          .toLocaleDateString()
          .replaceAll('/', '-')
        return (
          <h4 className='text-sm'>
            {dateFrom} to {dateUntil}
          </h4>
        )
      },
    },
    {
      id: 'Progress',
      accessorKey: 'Progress',
      header: 'Progress',
      cell: ({ row }) => {
        const totalCompleted = row.original.students.reduce((acc, student) => {
          return acc + student.completed.length
        }, 0)
        const percentage =
          (totalCompleted * 100) / (totalLessons * row.original.students.length)
        return (
          <div className='flex items-center gap-3'>
            <div className='w-[120px] h-[6px] rounded-full bg-[#D9D9D9] flex items-start justify-start overflow-hidden'>
              <div
                className='h-full rounded-full'
                style={{
                  width: `${percentage}%`,
                  background: row.original.color,
                }}
              />
            </div>
            <span className='font-medium'>
              {Number(percentage.toFixed(0)) || 0}%
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'Students',
      header: 'Students',
      cell: ({ row }) => {
        const studentsCount = row.original.students.length
        return <h4 className='text-sm font-medium'>{studentsCount}</h4>
      },
    },
    {
      id: 'Update',
      accessorKey: '',
      cell: ({ row }) => {
        const id = row.original.id
        return (
          <BiDotsHorizontalRounded
            onClick={() => setGroupUpdateId(id)}
            className='cursor-pointer text-4xl text-[#8B8787]'
          />
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
            href={`/admin/groups/${id}`}
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
        opened={modalOpen || !!groupUpdateId}
        close={() => {
          setModalOpen(false)
          setGroupUpdateId('')
        }}
      />
      <ManageGroup opened={modalOpen} setOpened={setModalOpen} />
      <ManageGroup updateId={groupUpdateId} setUpdateId={setGroupUpdateId} />
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
