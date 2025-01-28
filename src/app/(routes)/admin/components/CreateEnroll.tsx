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
import Image from 'next/image'

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
  const [selectedStudents, setSelectedStudents] = useState<UserType[]>([])

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

  const removeStudent = (id: string) => {
    setSelectedStudents((prev) => prev.filter((stud) => stud.id !== id))
  }

  return (
    <div
      className={`w-[550px] rounded-[10px] flex flex-col items-center fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[999] transition-all overflow-hidden bg-[#D9D9D9] ${
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
            selectedStudents={selectedStudents}
            setSelectedStudents={setSelectedStudents}
          />
          <div className='w-full flex flex-col items-start gap-4 mt-4'>
            <h4 className='text-sm font-medium'>Selected Student</h4>
            <div className='w-full flex items-center flex-wrap gap-3'>
              {selectedStudents.map((student, idx) => {
                return (
                  <div
                    key={student.id}
                    className='bg-white px-2.5 py-1.5 rounded-[5px] flex items-center gap-3 animate-shake'
                    style={{
                      animationDelay: `${idx / 10}s`,
                    }}
                  >
                    <div className='flex items-center gap-2'>
                      <Image
                        src={student.picture || '/default_image.png'}
                        alt='student picture'
                        height={40}
                        width={40}
                        className='object-contain rounded-full'
                      />
                      <div className='flex flex-col items-start'>
                        <h3 className='font-semibold'>{student.username}</h3>
                        <h4 className='text-[13px] text-gray-600'>
                          {student.email}
                        </h4>
                      </div>
                    </div>
                    <IoCloseOutline
                      onClick={() => removeStudent(student.id)}
                      className='text-xl cursor-pointer text-gray-600'
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEnroll
