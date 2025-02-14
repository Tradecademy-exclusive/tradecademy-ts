'use client'

import { EnrollType, UserType } from '@/types'
import CourseHeader from '../../components/CourseHeader'
import { ReactNode, useState } from 'react'
import { GraduationCap } from 'lucide-react'
import { GrTrophy } from 'react-icons/gr'
import { FaFlag } from 'react-icons/fa6'
import { IoNewspaperOutline } from 'react-icons/io5'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IoIosArrowDown } from 'react-icons/io'
import { format } from 'date-fns'
import React from 'react'
import { FaCheck } from 'react-icons/fa'
import Image from 'next/image'

const Card = ({
  count,
  progress,
  icon,
}: {
  count: number
  progress: string
  icon: ReactNode
}) => {
  return (
    <div className='w-full bg-[#e4ebf3] rounded-[12px] p-6 flex items-center gap-3.5'>
      <div className='w-[55px] h-[55px] rounded-full bg-[#99B2FA] flex items-center justify-center'>
        {icon}
      </div>
      <div className='flex flex-col gap-0.5'>
        <h5 className='font-semibold'>{count}</h5>
        <span className='text-sm'>{progress}</span>
      </div>
    </div>
  )
}

const StudentWrapper = ({
  student,
  enrollments,
}: {
  student: UserType
  enrollments: EnrollType[]
}) => {
  const [openRowId, setOpenRowId] = useState<string | null>(null)

  const lessonsByCourse = enrollments.map((enroll) => ({
    title: enroll.course.title,
    course: enroll.course,
    date: enroll.createdAt,
    chapters: enroll.course.chapters,
    lessons: enroll.course.chapters.flatMap((chapter) => chapter.lessons || []),
  }))

  const courseCompleted = lessonsByCourse.filter(
    (course) =>
      course.lessons.length > 0 &&
      course.lessons.every(
        (lesson) =>
          lesson.completed?.some((complete) => complete.id === student.id) ||
          false
      )
  )

  const totalLessons = lessonsByCourse.reduce(
    (count, course) => count + (course.lessons?.length || 0),
    0
  )

  return (
    <div className='p-10 max-lg:p-5 max-md:p-4 max-sm:p-2.5'>
      <CourseHeader page='Students' />
      <div className='mt-[200px] max-lg:mt-[280px] w-full flex flex-col items-start gap-8 border-t border-[#B9B0B0B2] p-4'>
        <div className='flex items-center gap-5'>
          <div className='min-w-[70px] max-w-[70px] h-[70px] rounded-full relative overflow-hidden'>
            <Image
              src={student.picture || '/default_image.png'}
              fill
              alt='student image'
              className='object-cover'
            />
          </div>
          <div className='flex gap-5 items-end flex-wrap'>
            <div className='flex flex-col items-start gap-1'>
              <h3 className='font-semibold text-lg'>{student.username}</h3>
              <span className='text-sm'>
                Email: <span className='font-medium'>{student.email}</span>
              </span>
            </div>
            <span className='text-sm'>
              Registered at:{' '}
              <span className='font-medium'>
                {student.createdAt.toDateString()}
              </span>
            </span>
            <span className='text-sm'>
              IP address: <span className='font-medium'>{student.IP}</span>
            </span>
          </div>
        </div>
        <div className='w-full grid grid-cols-4 gap-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1'>
          <Card
            progress='Enrolled Courses'
            count={student.courses.length}
            icon={<GraduationCap className='text-white h-7 w-7' />}
          />
          <Card
            progress='Completed Courses'
            count={courseCompleted.length}
            icon={<GrTrophy className='text-white text-[23px]' />}
          />
          <Card
            progress='In Progress Courses'
            count={student.courses.length - courseCompleted.length}
            icon={<FaFlag className='text-white text-[23px]' />}
          />
          <Card
            progress='Total Lessons'
            count={totalLessons}
            icon={<IoNewspaperOutline className='text-white text-[23px]' />}
          />
        </div>

        <div className='w-full flex flex-col items-start gap-3.5'>
          <h4 className='text-lg font-semibold'>Course</h4>
          <Table className='border-spacing-4'>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead className='max-lg:hidden'>Enroll Date</TableHead>
                <TableHead>Lesson</TableHead>
                <TableHead>Quiz</TableHead>
                <TableHead>Assigments</TableHead>
                <TableHead className='max-sm:hidden'>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lessonsByCourse.map((course) => {
                const completed = course.lessons.filter((lesson) =>
                  lesson.completed.some(
                    (complete) => complete.id === student.id
                  )
                )
                const completePercent =
                  (completed.length / course.lessons.length) * 100
                const isOpen = openRowId === course.course.id

                return (
                  <React.Fragment key={course.course.id}>
                    <TableRow className=''>
                      <TableCell className='font-medium'>
                        {course.title}
                      </TableCell>
                      <TableCell className='font-medium max-lg:hidden'>
                        {format(course.date, 'MMMM d, yyyy h:mma')}
                      </TableCell>
                      <TableCell className='font-medium'>
                        {completed.length}/{course.lessons.length}
                      </TableCell>

                      <TableCell className='font-medium'>0/0</TableCell>
                      <TableCell className='font-medium'>0/0</TableCell>
                      <TableCell className='max-sm:hidden'>
                        <div className='flex items-center gap-3'>
                          <div className='w-[100px] bg-[#D9D9D9] h-[6px] rounded-full flex items-start'>
                            <div
                              className='h-full bg-lightblue rounded-full'
                              style={{ width: `${completePercent}%` }}
                            />
                          </div>
                          <span className='font-medium'>
                            {completePercent || 0}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <IoIosArrowDown
                          className={`text-[#595454B2] text-xl cursor-pointer transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          onClick={() =>
                            setOpenRowId(isOpen ? null : course.course.id)
                          }
                        />
                      </TableCell>
                    </TableRow>

                    {isOpen && (
                      <TableRow className={`bg-gray-100`}>
                        <TableCell colSpan={7}>
                          <div className='p-4 flex items-center justify-between gap-4'>
                            <div className='flex flex-col items-start gap-3'>
                              <h5 className='font-semibold'>Lessons</h5>
                              <ul className='mt-2 space-y-1'>
                                {course.chapters
                                  .sort((a, b) => a.chapter - b.chapter)
                                  .map((chapter) => {
                                    return chapter.lessons
                                      .sort((a, b) => a.order - b.order)
                                      .map((lesson) => {
                                        const isCompleted =
                                          lesson.completed.some(
                                            (complete) =>
                                              complete.id === student.id
                                          )
                                        return (
                                          <li
                                            key={lesson.id}
                                            className='flex items-center gap-2'
                                          >
                                            <div
                                              className={`w-[17px] h-[17px] rounded-full flex items-center justify-center ${
                                                isCompleted
                                                  ? 'bg-lightblue'
                                                  : 'bg-gray-200'
                                              }`}
                                            >
                                              {isCompleted && (
                                                <FaCheck className='text-[12px] text-white' />
                                              )}
                                            </div>
                                            <span className='font-medium text-slate-700'>
                                              {chapter.chapter}.{lesson.order}{' '}
                                              {lesson.title}
                                            </span>
                                          </li>
                                        )
                                      })
                                  })}
                              </ul>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default StudentWrapper
