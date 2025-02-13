'use client'

import { CourseType, GroupType } from '@/types'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import CourseHeader from '../../components/CourseHeader'
import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'
import OpacityBackground from '@/components/opacityBackground'
import AddStudent from '../../components/AddStudent'
import { useState } from 'react'

interface GroupWrapperProps {
  group: GroupType
  courses: CourseType[]
}

const GroupWrapper = ({ group, courses }: GroupWrapperProps) => {
  const [groupId, setGroupId] = useState<string>('')

  const totalLessons = courses.reduce((acc, course) => {
    return (
      acc +
      course.chapters.reduce((total, chapter) => {
        return total + chapter.lessons.length
      }, 0)
    )
  }, 0)

  return (
    <div>
      <CourseHeader page={group.name} />
      <OpacityBackground opened={!!groupId} close={() => setGroupId('')} />
      <AddStudent groupId={groupId} setGroupId={setGroupId} group={group} />
      <div className='w-full flex flex-col items-start gap-7 p-10 max-lg:p-5 max-md:p-4 max-sm:p-2.5 mt-[200px] max-lg:mt-[280px]'>
        <div className='w-full h-[2px] bg-[#c9c5c550]' />
        <Table className='border-separate border-spacing-y-4 h-full max-md:border-spacing-y-2'>
          <TableHeader>
            <TableRow>
              <TableHead className='font-semibold'>Names</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {group.students.map((student) => {
              const coursePercentage = Number(
                ((student.courses.length / courses.length) * 100).toFixed(0)
              )

              const completedPercentage = Number(
                ((student.completed.length / totalLessons) * 100).toFixed(0)
              )

              return (
                <TableRow key={student.id}>
                  <TableCell className='font-semibold'>
                    {student.username}
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-3.5'>
                      <div className='h-[5px] w-[105px] rounded-full bg-[#D9D9D9] overflow-hidden flex items-center justify-start'>
                        <div
                          className='h-full rounded-full'
                          style={{
                            width: `${coursePercentage}%`,
                            background: group.color,
                          }}
                        />
                      </div>
                      <span className='text-sm font-medium'>
                        {student.courses.length}/{courses.length}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-3.5'>
                      <div className='h-[5px] w-[105px] rounded-full bg-[#D9D9D9] overflow-hidden flex items-center justify-start'>
                        <div
                          className='h-full rounded-full'
                          style={{
                            width: `${completedPercentage}%`,
                            background: group.color,
                          }}
                        />
                      </div>
                      <span className='text-sm font-medium'>
                        {completedPercentage}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/students/${student.id}`}
                      className='text-[15px] px-9 py-2 rounded-full font-semibold text-lightblue bg-[#B1C3F7]'
                    >
                      Details
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <div className='w-full flex items-center justify-end'>
          <button
            onClick={() => setGroupId(group.id)}
            className='bg-[#B1C3F7] text-lightblue px-9 py-2 text-[15px] flex items-center gap-1.5 rounded-full font-semibold'
          >
            <FiPlus className='text-xl' />
            Add Student
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupWrapper
