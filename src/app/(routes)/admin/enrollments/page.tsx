import { DataTableDemo } from '@/components/ui/table-data'
import CourseHeader from '../components/CourseHeader'

const Enrollments = () => {
  return (
    <div className='w-full p-10'>
      <CourseHeader page='Enrollment' />
      <div className='w-full translate-y-[200px] rounded-[15px] flex flex-col items-center gap-5 border border-[#B9B0B0B2]'>
        <DataTableDemo />
      </div>
    </div>
  )
}

export default Enrollments
