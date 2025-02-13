'use client'

import { UserType } from '@/types'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { IoCloseOutline } from 'react-icons/io5'
import StudentResults from './StudentResults'
import Image from 'next/image'

interface AddStudentProps {
  groupId: string
  setGroupId: React.Dispatch<React.SetStateAction<string>>
}

const AddStudent = ({ groupId, setGroupId }: AddStudentProps) => {
  const [students, setStudents] = useState<UserType[]>([])
  const [studentsCopy, setStudentsCopy] = useState<UserType[]>([])
  const [selectedStudents, setSelectedStudents] = useState<UserType[]>([])
  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    const getStudents = async () => {
      const { data } = await axios.get('/api/admin/students')
      if (data.students) {
        setStudents(data.students)
        setStudentsCopy(data.students.slice(0, 4))
      }
    }
    getStudents()
  }, [])

  const removeStudent = (id: string) => {
    setSelectedStudents((prev) => prev.filter((stud) => stud.id !== id))
  }

  return (
    <div
      className={`w-[650px] max-h-screen flex flex-col items-start rounded-[10px] overflow-hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] transition-all duration-200 ${
        groupId
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='w-full py-3 px-5 flex items-center justify-between bg-white'>
        <h3 className='text-[15px] font-semibold'>Add Student</h3>
        <IoCloseOutline
          onClick={() => setGroupId('')}
          className='cursor-pointer text-2xl'
        />
      </div>
      <div className='w-full flex flex-col items-start gap-3 bg-[#D9D9D9] p-4'>
        <div className='w-full flex flex-col items-start gap-2'>
          <label htmlFor='search' className='font-semibold'>
            Add Student To Group
          </label>
          <div className='w-full h-fit flex items-center gap-1.5 rounded-[5px] border border-[#0000004D] overflow-hidden px-1 bg-white'>
            <IoIosSearch className='text-3xl text-[#595454B2] pl-2' />
            <input
              placeholder='Search student'
              type='text'
              id='search'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className='w-full h-full text-[15px] outline-none text-[#00000066] placeholder:text-[#00000066] py-2 bg-transparent'
            />
          </div>
        </div>
        <StudentResults
          searchValue={searchValue}
          students={students}
          setStudentsCopy={setStudentsCopy}
          setSelectedStudents={setSelectedStudents}
          selectedStudents={selectedStudents}
          studentsCopy={studentsCopy}
        />
        <div className='w-full flex flex-col items-start gap-4 mt-4'>
          <h4 className='text-sm font-medium'>Selected Students</h4>
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
      <div className='bg-[#1D1D1D] w-full p-7 flex items-center justify-between gap-2'>
        <button
          onClick={() => setGroupId('')}
          className='px-10 py-1.5 rounded-[5px] bg-transparent border border-white text-[15px] text-white'
        >
          Close
        </button>
        <button className='px-10 py-1.5 rounded-[5px] bg-lightblue border border-lightblue text-[15px] text-white'>
          Add to group
        </button>
      </div>
    </div>
  )
}

export default AddStudent
