import { publicType } from '@prisma/client'

interface CourseFormProps {
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

const CourseForm = ({
  title,
  setTitle,
  description,
  setDescription,
}: CourseFormProps) => {
  return (
    <form className='h-full w-full flex flex-col items-start gap-5 px-5 z-'>
      <div className='w-full flex flex-col items-start gap-1'>
        <label htmlFor='title' className='text-lg font-semibold'>
          Course Title
        </label>
        <input
          id='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full outline-none py-1 text-[15px] px-5 font-semibold border border-[#0000004D] rounded-[5px]'
        />
      </div>
      <div className='w-full flex flex-col items-start gap-1'>
        <label htmlFor='description' className='text-lg font-semibold'>
          Course Description
        </label>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full outline-none py-5 text-[15px] px-5 font-semibold border border-[#0000004D] rounded-[5px] h-[150px] resize-none'
        />
      </div>
      <div className=''></div>
    </form>
  )
}

export default CourseForm
