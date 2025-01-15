import { getCourses } from '@/actions/courses'
import CourseHeader from '../../components/CourseHeader'
import EditCourse from '../../components/EditCourse'
import { CourseType } from '@/types'

const UploadCourse = async () => {
  const courses = await getCourses()
  const publishCourse = async () => {}

  return (
    <div className='w-full py-5 px-20 flex flex-col h-screen items-start gap-3 relative'>
      <CourseHeader
        page='Create Course'
        path='Dashboard / My Course / Create Course'
        buttons={[
          {
            label: 'Publish Course',
            color: 'white',
            bg: '#266CF7',
            action: publishCourse,
          },
        ]}
      />
      <div className='w-full flex flex-col items-start gap-10'>
        <section className='w-full h-[77vh] flex flex-col items-start gap-5 border rounded-[15px] border-[#B9B0B0B2] overflow-auto'>
          <div className='w-full min-h-[100px] max-h-[100px] border-b border-[#B9B0B0B2] px-10 flex items-center justify-start'>
            <h2 className='text-lg font-bold'>Course Information</h2>
          </div>
        </section>
        <section className='w-full h-[95vh] flex flex-col items-start gap-5 border rounded-[15px] border-[#B9B0B0B2] overflow-auto'>
          <div className='w-full min-h-[100px] max-h-[100px] border-b border-[#B9B0B0B2] px-10 flex items-center justify-start'>
            <h2 className='text-lg font-bold'>Course Builder</h2>
          </div>
          <div className='w-full flex flex-col items-start gap-3 px-5'>
            {courses.map((course) => {
              return (
                <EditCourse key={course.id} course={course as CourseType} />
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

export default UploadCourse
