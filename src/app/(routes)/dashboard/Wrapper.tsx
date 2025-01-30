import ExclusiveCourses from '@/components/courses/exclusive'
import { CourseType } from '@/types'

const DashboardWrapper = ({ exclusive }: { exclusive: CourseType[] }) => {
  return (
    <div className='w-full flex items-start gap-5 p-4 max-lg:p-5'>
      <div className='flex flex-col items-start gap-8 w-full'>
        <ExclusiveCourses exclusive={exclusive} />
      </div>
      <div className='w-full'></div>
    </div>
  )
}

export default DashboardWrapper
