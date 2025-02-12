/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { IoCloseOutline } from 'react-icons/io5'
import { HexColorPicker } from 'react-colorful'
import { useState, useEffect } from 'react'
import StudentResults from './StudentResults'
import { UserType } from '@/types'
import axios from 'axios'
import { IoSearch } from 'react-icons/io5'
import Image from 'next/image'
import { toast } from 'react-toastify'
import CalendarDropdown from '@/components/ui/calendar-dropdown'
import { RiLoader4Fill } from 'react-icons/ri'

interface ManageGroupProps {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
  selectedStudentsInstance?: UserType[]
}

const ManageGroup = ({
  opened,
  setOpened,
  selectedStudentsInstance,
}: ManageGroupProps) => {
  const [color, setColor] = useState<string>('#1336EA')
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedStudents, setSelectedStudents] = useState<UserType[]>([])
  const [students, setStudents] = useState<UserType[]>([])
  const [studentsCopy, setStudentsCopy] = useState<UserType[]>([])
  const [name, setName] = useState<string>('')
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  const createGroup = async () => {
    try {
      if (!name) {
        return toast.error('Group name must be provided', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }

      if (!color) {
        return toast.error('Group color must be provided', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }

      if (!endDate) {
        return toast.error('Group end date must be provided', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }

      if (!startDate) {
        return toast.error('Group start date must be provided', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }

      if (selectedStudents.length < 1) {
        return toast.error('Group must have a student', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }

      setLoading(true)

      const { data } = await axios.post('/api/admin/group', {
        students: selectedStudents,
        name,
        color,
        dateFrom: startDate,
        dateUntil: endDate,
      })

      setLoading(false)
      if (data.group) {
        setStudents([])
        setEndDate(undefined)
        setStartDate(undefined)
        setName('')
        setSearchValue('')
        window.location.reload()
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
      return toast.error('Something went wrong', {
        icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
      })
    }
  }

  useEffect(() => {
    if (selectedStudentsInstance) {
      setSelectedStudents(selectedStudentsInstance)
    }

    const getStudents = async () => {
      const { data } = await axios.get('/api/admin/students')
      if (data.students) {
        setStudents(data.students.slice(0, 4))
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
      className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] max-h-[100vh] flex flex-col z-[999] items-start rounded-[10px] transition-opacity duration-200 overflow-hidden ${
        opened
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='bg-white w-full flex items-center justify-between py-3 px-5'>
        <h3 className='text-[15px] font-semibold'>Add Group</h3>
        <IoCloseOutline
          onClick={() => {
            setOpened(false)
          }}
          className='text-3xl cursor-pointer'
        />
      </div>
      <div className='w-full px-5 py-4 flex flex-col items-start gap-4 bg-[#D9D9D9] overflow-y-auto'>
        <div className='w-full flex flex-col items-start gap-1.5'>
          <label htmlFor='name' className='font-semibold'>
            Group Name
          </label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name your group'
            className='w-full rounded-[5px] px-4 py-1.5 text-[15px] border border-[#0000004D] text-[#00000066] placeholder:text-[#00000066] font-medium outline-none'
          />
        </div>

        <div className='w-full flex flex-col items-start gap-1.5'>
          <h4 className='font-semibold'>Group Color</h4>
          <div className='w-full flex items-start gap-7'>
            <div className='flex flex-col items-start gap-3'>
              <HexColorPicker
                color={color}
                onChange={setColor}
                className='min-w-[250px]'
              />
              <div className='w-full flex flex-col items-start gap-1'>
                <label htmlFor='hex-input' className='font-medium'>
                  Input Hex Color
                </label>
                <input
                  id='hex-input'
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  type='text'
                  className='w-full text-[15px] outline-none rounded-[5px] py-1 px-4 border border-[#0000004D] text-[#00000066]'
                />
              </div>
            </div>
            <div className='flex flex-col items-start gap-5'>
              <div className='flex flex-col items-start gap-1.5'>
                <h4 className='font-semibold'>Start Date</h4>
                <CalendarDropdown
                  selectedDate={startDate}
                  setSelectedDate={setStartDate}
                />
              </div>
              <div className='flex flex-col items-start gap-1.5'>
                <h4 className='font-semibold'>End Date</h4>
                <CalendarDropdown
                  selectedDate={endDate}
                  setSelectedDate={setEndDate}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='w-full flex flex-col items-start gap-1.5'>
          <label htmlFor='student' className='font-semibold'>
            Student
          </label>
          <div className='w-full h-fit flex items-center gap-1 rounded-[5px] pl-3 bg-white border border-[#0000004D]'>
            <IoSearch className='text-[#595454B2] text-lg' />
            <input
              id='student'
              type='text'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className='w-full rounded-[5px] px-1 py-1.5 text-[15px] bg-transparent text-[#00000066] placeholder:text-[#00000066] font-medium outline-none'
            />
          </div>
        </div>
        <StudentResults
          searchValue={searchValue}
          selectedStudents={selectedStudents}
          setSelectedStudents={setSelectedStudents}
          students={students}
          setStudentsCopy={setStudentsCopy}
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
      <div className='bg-[#1D1D1D] py-7 px-6 rounded-b-[10px] flex items-center justify-between gap-2 w-full'>
        <button
          onClick={() => setOpened(false)}
          className='px-7 py-2 rounded-[5px] bg-transparent text-white border border-white text-[15px]'
        >
          Cancel
        </button>
        <button
          disabled={loading}
          onClick={createGroup}
          className='px-7 py-2 rounded-[5px] bg-lightblue text-white border border-lightblue text-[15px]'
        >
          {loading ? (
            <div className='flex items-center gap-2'>
              <RiLoader4Fill className='text-lg animate-spin' />
              Loading
            </div>
          ) : (
            'Add to group'
          )}
        </button>
      </div>
    </div>
  )
}

export default ManageGroup
