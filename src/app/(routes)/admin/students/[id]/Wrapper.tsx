'use client'

import { EnrollType, UserType } from '@/types'
import CourseHeader from '../../components/CourseHeader'
import Image from 'next/image'
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
  const [openRowId, setOpenRowId] = useState('')
  const lessonsByCourse = enrollments.map((enroll) => ({
    title: enroll.course.title,
    course: enroll.course,
    date: enroll.createdAt,
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
    <div className='p-10 max-lg:p-5 max-md:p-4 max-sm:p-2.5 '>
      <CourseHeader page='Students' />
      <div className='mt-[200px] max-lg:mt-[280px] w-full flex flex-col items-start gap-8 border-t border-[#B9B0B0B2] p-4'>
        <div className='w-full flex items-center gap-4'>
          <div className='flex items-center gap-5'>
            <div className='relative w-[60px] h-[60px] rounded-full overflow-hidden'>
              <Image
                src={student.picture || '/default_image.png'}
                alt='user profile picture'
                fill
                className='object-cover'
              />
            </div>
            <div className='flex flex-col items-start gap-0.5'>
              <h3 className='text-lg font-bold'>{student.username}</h3>
              <div className='flex items-center gap-5'>
                <p className='text-[15px]'>
                  Email: <span className='font-medium'>{student.email}</span>
                </p>
                <p className='text-[15px]'>
                  Registered At:{' '}
                  <span className='font-medium'>
                    {student.createdAt.toDateString()}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full grid grid-cols-4 gap-5'>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Enroll Date</TableHead>
                <TableHead>Lesson</TableHead>
                <TableHead>Quiz</TableHead>
                <TableHead>Assigment</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lessonsByCourse.map((course) => {
                const completed = course.lessons.filter((lesson) => {
                  return lesson.completed.some(
                    (complete) => complete.id === student.id
                  )
                })
                const completePercent =
                  (completed.length / course.lessons.length) * 100
                return (
                  <TableRow key={course.title} className='relative'>
                    <TableCell className='font-medium'>
                      {course.title}
                    </TableCell>
                    <TableCell className='font-medium'>
                      {format(course.date, 'MMMM d, yyyy h:mma')}
                    </TableCell>
                    <TableCell className='font-medium'>
                      {completed.length}/{course.lessons.length}
                    </TableCell>
                    <TableCell className='font-medium'>0/0</TableCell>
                    <TableCell className='font-medium'>0/0</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <div className='w-[100px] bg-[#D9D9D9] h-[6px] rounded-full flex items-start'>
                          <div
                            className='h-full bg-lightblue rounded-full'
                            style={{
                              width: `${completePercent}%`,
                            }}
                          />
                        </div>
                        <span className='font-medium'>
                          {completePercent || 0}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <IoIosArrowDown
                        className={`text-[#595454B2] text-xl cursor-pointer`}
                      />
                    </TableCell>
                  </TableRow>
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
