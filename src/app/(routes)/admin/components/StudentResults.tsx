/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { UserType } from '@/types'
import Image from 'next/image'
import { useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { BiLoaderAlt } from 'react-icons/bi'

interface StudentResultsProps {
  students: UserType[]
  searchValue: string
  studentsCopy: UserType[]
  setStudentsCopy: React.Dispatch<React.SetStateAction<UserType[]>>
}

const StudentResults = ({
  students,
  studentsCopy,
  setStudentsCopy,
  searchValue,
}: StudentResultsProps) => {
  useEffect(() => {
    if (!searchValue) {
      setStudentsCopy(students.slice(0, 6))
    }

    const filteredStudents = [...students].filter((student) => {
      const matchedEmail = student.email
        .toLowerCase()
        .includes(searchValue.toLowerCase())
      const matchedUsername = student.username
        .toLowerCase()
        .includes(searchValue.toLowerCase())

      return matchedEmail || matchedUsername
    })

    setStudentsCopy(filteredStudents)
  }, [searchValue])

  if (students.length === 0) {
    return (
      <div className='w-full h-[150px] flex items-center justify-center'>
        <BiLoaderAlt className='text-3xl text-lightblue animate-spin' />
      </div>
    )
  }

  if (studentsCopy.length === 0) {
    return (
      <div
        className='w-full h-[150px] flex items-center 
     justify-center'
      >
        <span className='text-[15px]'>Couldn&apos;t find a student</span>
      </div>
    )
  }

  return (
    <div
      className={`bg-transparent w-full rounded-[10px] flex flex-col items-start gap-3 overflow-hidden mt-3`}
    >
      {studentsCopy.map((student) => {
        return (
          <div
            key={student.id}
            className='w-full bg-white py-1.5 px-3 flex items-center justify-between rounded-[5px]'
          >
            <div className='flex items-center gap-3'>
              <Image
                src={student.picture || '/default_image.png'}
                width={45}
                height={45}
                className='object-cover rounded-full'
                alt='user picture'
              />
              <div className='flex flex-col items-start'>
                <h4 className='text-[15px] font-semibold'>
                  {student.username}
                </h4>
                <h5 className='text-[13px] text-gray-600'>{student.email}</h5>
              </div>
            </div>
            <FaPlus className='text-gray-500 cursor-pointer' />
          </div>
        )
      })}
    </div>
  )
}

export default StudentResults
