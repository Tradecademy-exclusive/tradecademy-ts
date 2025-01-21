import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import CourseForm from './CourseForm'
import { publicType } from '@prisma/client'

interface UploadCourseProps {
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
  learn: string
  setLearn: React.Dispatch<React.SetStateAction<string>>
  maxStudents: string
  setMaxStudents: React.Dispatch<React.SetStateAction<string>>
  publicCourse: boolean
  setPublicCourse: React.Dispatch<React.SetStateAction<boolean>>
  courseStatus: publicType
  setCourseStatus: React.Dispatch<React.SetStateAction<publicType>>
}

const UploadCourse = ({
  publicCourse,
  setPublicCourse,
  title,
  setTitle,
  description,
  setCourseStatus,
  setDescription,
  learn,
  setLearn,
  courseStatus,
  maxStudents,
  setMaxStudents,
}: UploadCourseProps) => {
  return (
    <section className='w-full flex items-start gap-7'>
      <div className='w-full h-[77vh] flex flex-col items-start gap-5 border rounded-[15px] border-[#B9B0B0B2] overflow-auto'>
        <div className='w-full min-h-[100px] max-h-[100px] border-b border-[#B9B0B0B2] px-10 flex items-center justify-start'>
          <h2 className='text-lg font-bold'>Course Information</h2>
        </div>
        <CourseForm
          publicCourse={publicCourse}
          setPublicCourse={setPublicCourse}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          learn={learn}
          setLearn={setLearn}
          courseStatus={courseStatus}
          setCourseStatus={setCourseStatus}
          maxStudents={maxStudents}
          setMaxStudents={setMaxStudents}
        />
      </div>
      <div className='min-w-[250px] max-w-[250x] border rounded-[15px] border-[#B9B0B0B2] p-3'>
        <div className='bg-lightblue/10 rounded-[10px] flex flex-col items-start p-3'>
          <div className='flex flex-col items-start gap-1'>
            <h4 className='font-semibold'>Publish</h4>
            <div className='flex items-center gap-2'>
              <span>Status:</span>
              <DropdownMenu>
                <DropdownMenuTrigger id='status' className='!outline-none'>
                  <div>
                    <span className='text-lightblue'>{courseStatus}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => setCourseStatus('Published')}
                  >
                    Published
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCourseStatus('Private')}>
                    Private
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCourseStatus('Draft')}>
                    Draft
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UploadCourse
