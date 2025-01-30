import { Icons } from '@/components/icons'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CourseType } from '@/types'
import { IoEyeSharp } from 'react-icons/io5'
import { FaLock } from 'react-icons/fa'
import Link from 'next/link'
import { formatToEuro } from '@/lib/utils'

const CoursesTable = ({ courses }: { courses: CourseType[] }) => {
  const returnStatusStyles = (course: CourseType) => {
    if (course.publishedCourse === 'Draft') {
      return {
        Icon: Icons.note,
        color: '#646464',
        bg: '#DAE1EC',
      }
    } else if (course.publishedCourse === 'Published') {
      return {
        Icon: IoEyeSharp,
        color: '#24A147',
        bg: '#E2F1E4',
      }
    } else {
      return {
        Icon: FaLock,
        color: '#F44337',
        bg: '#FFE4E2',
      }
    }
  }

  return (
    <Table
      className='border-separate border-spacing-y-4 h-full'
      style={{ borderSpacing: '0 16px' }}
    >
      <TableHeader className='bg-lightblue/10 rounded-[10px]'>
        <TableRow>
          <TableHead className='font-bold !text-black'>Course name</TableHead>
          <TableHead className='!text-black'>Chapters</TableHead>
          <TableHead className='!text-black'>Lessons</TableHead>
          <TableHead className='font-bold !text-black'>Price</TableHead>
          <TableHead className='font-bold !text-black'>Students</TableHead>
          <TableHead className='font-bold !text-black'>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => {
          const lessonsLength = course.chapters.reduce((total, chapter) => {
            return total + chapter.lessons.length
          }, 0)

          const statusStyles = returnStatusStyles(course)

          return (
            <TableRow key={course.id} className=''>
              <TableCell className='font-bold'>{course.title}</TableCell>
              <TableCell className='font-bold'>
                {course.chapters.length}
              </TableCell>
              <TableCell className='font-bold'>{lessonsLength}</TableCell>
              <TableCell className='font-bold'>
                {formatToEuro(course.discountedPrice || course.price)}
              </TableCell>
              <TableCell className='font-bold'>0</TableCell>
              <TableCell
                className='w-[120px] rounded-full font-bold py-1.5 px-3 flex items-center gap-2'
                style={{
                  color: statusStyles.color,
                  background: statusStyles.bg,
                }}
              >
                <statusStyles.Icon />
                {course.publishedCourse}
              </TableCell>
              <TableCell>
                <Link
                  href={`/admin/courses/manage?id=${course.id}`}
                  className='font-semibold text-lightblue'
                >
                  Edit Course
                </Link>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default CoursesTable
