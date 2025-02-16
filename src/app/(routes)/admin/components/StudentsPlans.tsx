'use client'

import { UserType } from '@/types'
import { useEffect, useRef, useState } from 'react'

const StudentsPlans = ({ student }: { student: UserType }) => {
  const [focusPoint, setFocusPoint] = useState<string>(
    student.focusPoint.description
  )
  const [editing, setEditing] = useState<boolean>(false)

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [focusPoint])

  useEffect(() => {
    if (editing) {
      textareaRef.current?.focus()
    }
  }, [editing])

  return (
    <div className='w-full flex flex-col gap-6'>
      <h4 className='font-semibold text-sm'>Their trading plan</h4>
      <div className='w-full flex flex-col items-start gap-3 p-6 shadow-evenLight rounded-[20px]'>
        <h3 className='text-lg font-bold'>Current Trading Plan</h3>
        <div className='w-full flex flex-col items-start gap-1'>
          {student.plan.steps.map((step, idx) => (
            <span key={step} className='text-[15px]'>
              {idx + 1}. {step}
            </span>
          ))}
        </div>
      </div>
      <div className='w-full flex flex-col items-start gap-3 p-6 shadow-evenLight rounded-[20px]'>
        <h3 className='text-lg font-bold'>Focus Point</h3>
        <textarea
          ref={textareaRef}
          disabled={!editing}
          value={focusPoint}
          onChange={(e) => setFocusPoint(e.target.value)}
          className='resize-none text-[15px] h-[100px] w-full disabled:bg-transparent py-1.5 rounded-[5px] focus:outline-lightblue'
        />
        <button
          onClick={() => {
            if (!editing) {
              setEditing(true)
            }
          }}
          className='bg-lightblue text-white px-16 py-1.5 rounded-[5px] text-[15px] mt-1'
        >
          {editing ? 'Save' : 'Edit'}
        </button>
      </div>
      <div className='w-full flex flex-col items-start gap-3 p-6 shadow-evenLight rounded-[20px]'>
        <h3 className='text-lg font-bold'>Previous Trading Plan</h3>
        <div className='w-full flex flex-col items-start gap-1'>
          {student?.previousPlans[student.previousPlans.length - 1] ? (
            student?.previousPlans[student.previousPlans.length - 1].steps.map(
              (step, idx) => (
                <span key={step} className='text-[15px]'>
                  {idx + 1}. {step}
                </span>
              )
            )
          ) : (
            <span>No previous plans</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentsPlans
