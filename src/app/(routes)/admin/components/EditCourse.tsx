'use client'
import { CourseType } from '@/types'
import { useState } from 'react'

const EditCourse = ({ course }: { course: CourseType }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  return (
    <div className='w-full flex flex-col items-start'>
      <div
        onClick={() => {
          setModalOpen((prev) => !prev)
        }}
        className={`w-full flex flex-col items-center transition-all duration-200 ease justify-between py-3.5 px-6 border border-[#B9B0B0B2] bg-[#D3DBF366] cursor-pointer ${
          modalOpen
            ? 'rounded-b-none rounded-t-[15px] shadow-even'
            : 'rounded-[15px]'
        }`}
      >
        <div className='w-full flex items-center justify-between'>
          <h2 className='text-lg font-bold'>{course.title}</h2>
          <button className='h-[24px] w-[26px] rounded-[5px] border border-[#C9C4C4] flex items-center justify-center'>
            <svg
              width='17'
              height='10'
              viewBox='0 0 17 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.76129 8.79871C8.62067 8.93916 8.43004 9.01805 8.23129 9.01805C8.03254 9.01805 7.84192 8.93916 7.70129 8.79871L0.201292 1.29871C0.0688118 1.15653 -0.00331137 0.968487 0.000116847 0.774186C0.00354506 0.579885 0.0822571 0.394499 0.21967 0.257086C0.357083 0.119673 0.542468 0.0409614 0.736769 0.0375332C0.93107 0.034105 1.11912 0.106228 1.26129 0.238708L8.23129 7.20871L15.2013 0.238708C15.27 0.165021 15.3528 0.105919 15.4448 0.064927C15.5368 0.023935 15.6361 0.00189351 15.7368 0.000116722C15.8375 -0.00166006 15.9375 0.0168643 16.0309 0.0545854C16.1243 0.0923064 16.2091 0.148451 16.2803 0.21967C16.3515 0.290888 16.4077 0.375722 16.4454 0.46911C16.4831 0.562499 16.5017 0.662527 16.4999 0.76323C16.4981 0.863933 16.4761 0.963247 16.4351 1.05525C16.3941 1.14725 16.335 1.23005 16.2613 1.29871L8.76129 8.79871Z'
                fill='#C9C4C4'
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`bg-[#D3DBF366] w-full transition-all duration-[400ms] border border-[#B9B0B0B2] border-t-0 rounded-b-[15px] flex flex-col items-start border-b-0 ${
          modalOpen
            ? 'h-[400px] !border-b-[1px] shadow-even'
            : 'h-[0px] overflow-hidden'
        }`}
      >
        <span className='px-5 text-sm mt-5'>Course Builder</span>
        {course.chapters.length > 0 ? (
          ''
        ) : (
          <div className='w-full h-full flex items-center justify-center'>
            This Course has no chapters.
          </div>
        )}
      </div>
    </div>
  )
}

export default EditCourse
