'use client'

import { UserType } from '@/types'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'

const StudentsPlans = ({ student }: { student: UserType }) => {
  const [focusPoint, setFocusPoint] = useState<string>(
    student.focusPoint.description
  )
  const [editing, setEditing] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

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

  const updateFocusPoint = async () => {
    try {
      setLoading(true)
      const { data } = await axios.put('/api/focus', {
        focusId: student.focusPointId,
        description: focusPoint,
      })
      if (data.updatedFocusPoint) {
        toast.error('Update Successful', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }
      setLoading(false)
      setEditing(false)
    } catch (err) {
      setLoading(false)
      setEditing(false)
      toast.error('Something went wrong.', {
        icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
      })
      console.error('error:', err)
    }
  }

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
          disabled={loading}
          onClick={() => {
            if (!editing) {
              setEditing(true)
            } else {
              updateFocusPoint()
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
