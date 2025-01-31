import { UserType } from '@/types'
import CourseHeader from '../../components/CourseHeader'
import Image from 'next/image'

const StudentWrapper = ({ student }: { student: UserType }) => {
  const lessonsByCourse = student?.courses?.map((course) => ({
    title: course.title,
    lessons: course.chapters.flatMap((chapter) => chapter.lessons || []),
  }))

  const courseCompleted = lessonsByCourse.filter((course) =>
    course.lessons.every((lesson) =>
      lesson.completed.some((complete) => complete.id === student.id)
    )
  )

  console.log(courseCompleted)

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
          <div className='w-full bg-[#D9D9D9] rounded-[12px] p-5 flex items-center gap-3.5'>
            <div className='w-[55px] h-[55px] rounded-full bg-[#99B2FA] flex items-center justify-center'></div>
            <div className='flex flex-col gap-0.5'>
              <h5 className='font-semibold'>{student.courses.length}</h5>
              <span className='text-sm'>Enrolled Courses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentWrapper
