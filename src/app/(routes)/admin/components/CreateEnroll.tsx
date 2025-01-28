import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CourseType, UserType } from '@/types'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { IoSearch } from 'react-icons/io5'
import StudentResults from './StudentResults'

const CreateEnroll = ({
  opened,
  setOpened,
  courses,
}: {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  courses: CourseType[]
}) => {
  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null)
  const [students, setStudents] = useState<UserType[]>([])
  const [studentsCopy, setStudentsCopy] = useState<UserType[]>([])
  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    const fetchStudents = async () => {
      const { data } = await axios.get('/api/admin/students')
      if (data.students) {
        setStudents(data.students)
        setStudentsCopy(data.students.slice(0, 6))
      }
    }

    fetchStudents()
  }, [])

  return (
    <div
      className={`w-[500px] rounded-[10px] flex flex-col items-center fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[999] transition-all overflow-hidden bg-[#D9D9D9] ${
        opened
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='w-full flex items-center justify-between bg-white px-5 py-3 text-[15px]'>
        <h4 className='font-semibold'>Enrollment</h4>
        <IoCloseOutline
          onClick={() => setOpened(false)}
          className='text-2xl cursor-pointer'
        />
      </div>
      <div className='px-5 flex flex-col items-start gap-5 w-full py-5'>
        <div className='w-full flex flex-col items-start gap-1'>
          <h3 className='text-lg font-semibold'>Course/Bundle</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='w-full bg-white border border-[#0000004D] text-[#00000066] font-medium rounded-[5px] py-1.5 px-2.5 text-left text-[15px]'>
                {selectedCourse?.title || 'Select a course/bundle'}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='z-[999999] max-h-[250px] overflow-auto'
              align='start'
            >
              {courses.length > 0 &&
                courses.map((course) => {
                  return (
                    <DropdownMenuItem
                      onClick={() => setSelectedCourse(course)}
                      key={course.id}
                      className='w-full'
                    >
                      {course.title}
                    </DropdownMenuItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='w-full flex flex-col items-start gap-1 relative'>
          <h3 className='text-lg font-semibold'>Student</h3>
          <div className='w-full flex items-center gap-2 px-3 rounded-[5px] border border-[#0000004D] text-[#00000066] bg-white'>
            <IoSearch className='text-xl' />
            <input
              placeholder='Search student'
              type='text'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className='w-full py-1.5 text-[15px] bg-transparent outline-none'
            />
          </div>
          <StudentResults
            setStudentsCopy={setStudentsCopy}
            students={students}
            searchValue={searchValue}
            studentsCopy={studentsCopy}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateEnroll
