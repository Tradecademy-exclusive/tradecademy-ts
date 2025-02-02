import { PiWarningOctagon } from 'react-icons/pi'

interface CourseFormProps {
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
  learn: string
  setLearn: React.Dispatch<React.SetStateAction<string>>
  maxStudents: string
  setMaxStudents: React.Dispatch<React.SetStateAction<string>>
  duration: string
  setDuration: React.Dispatch<React.SetStateAction<string>>
}

const CourseForm = ({
  title,
  setTitle,
  description,
  setDescription,
  maxStudents,
  setMaxStudents,
  duration,
  setDuration,
  learn,
  setLearn,
}: CourseFormProps) => {
  return (
    <form className='h-full w-full pb-5 flex flex-col items-start gap-5 px-5 z-'>
      <div className='w-full flex flex-col items-start gap-1'>
        <label htmlFor='title' className='text-lg font-bold'>
          Course Title
        </label>
        <input
          id='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full outline-none py-1.5 text-[15px] px-5 font-bold border border-[#0000004D] rounded-[5px]'
        />
      </div>
      <div className='w-full flex flex-col items-start gap-1'>
        <label htmlFor='description' className='text-lg font-bold'>
          Course Description
        </label>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full outline-none py-5 text-[15px] px-5 border border-[#0000004D] rounded-[5px] h-[150px] resize-none'
        />
      </div>
      <div className='flex items-start gap-8 w-full'>
        <label htmlFor='students' className='text-lg font-bold w-[200px]'>
          Maximum Students
        </label>
        <div className='flex flex-col items-start gap-5 w-[250px]'>
          <input
            id='students'
            type='text'
            value={maxStudents}
            onChange={(e) => {
              if (!Number.isInteger(Number(e.target.value))) return
              setMaxStudents(e.target.value)
            }}
            className='w-[250px] outline-none py-1.5 text-[15px] px-5 border border-[#0000004D] rounded-[5px]'
          />
          <p className='text-[12px] text-gray-500'>
            <PiWarningOctagon className='inline text-sm -translate-y-[0.5px]' />{' '}
            Number of students that can enrol in this course, set 0 for no
            limits.
          </p>
        </div>
      </div>
      <div className='flex items-start gap-8 w-full mb-8'>
        <label htmlFor='duration' className='text-lg font-bold w-[200px]'>
          Course Duration
        </label>
        <div className='flex flex-col items-start gap-5 w-[250px]'>
          <input
            id='duration'
            type='text'
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value)
            }}
            className='w-[250px] outline-none py-1.5 text-[15px] px-5 border border-[#0000004D] rounded-[5px]'
          />
        </div>
      </div>
      <div className='w-full flex flex-col items-start gap-1'>
        <label htmlFor='learn' className='text-lg font-bold'>
          What Will I Learn?
        </label>
        <textarea
          id='learn'
          value={learn}
          onChange={(e) => setLearn(e.target.value)}
          className='w-full outline-none py-5 text-[15px] px-5 border border-[#0000004D] rounded-[5px] h-[150px] resize-none'
        />
      </div>
    </form>
  )
}

export default CourseForm
