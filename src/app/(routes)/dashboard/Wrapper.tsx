import ExclusiveCourses from '@/components/courses/exclusive'
import JournalForm from '@/components/ui/journal-form'
import { CourseType } from '@/types'

const DashboardWrapper = ({ exclusive }: { exclusive: CourseType[] }) => {
  return (
    <div className='w-full flex items-start gap-7 p-4 max-lg:p-5 h-[89vh]'>
      <div className='flex flex-col items-start gap-9 w-full'>
        {exclusive.length > 0 && <ExclusiveCourses exclusive={exclusive} />}
      </div>
      <JournalForm />
    </div>
  )
}

export default DashboardWrapper
