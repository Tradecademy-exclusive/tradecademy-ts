'use client'
import { useContext, useState, useEffect, useRef } from 'react'
import { AuthContext } from '@/providers/AuthProvider'
import { toast } from 'react-toastify'
import Image from 'next/image'
import axios from 'axios'

const TradingPlan = () => {
  const { session, setSession } = useContext(AuthContext)
  const [edit, setEdit] = useState<boolean>(false)
  const firstInpRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (edit && firstInpRef.current) {
      firstInpRef.current.focus()
    }
  }, [edit])

  const updatePlan = async () => {
    try {
      const { data } = await axios.put('/api/plan', {
        steps: session?.user.plan.steps,
        planId: session?.user.planId,
      })

      if (data.updatedPlan && data.previousPlan) {
        if (session?.user && session.user.plan) {
          setSession((prev) => ({
            ...prev!,
            user: {
              ...prev!.user,
              plan: data.updatedPlan,
              previousPlans: data.updatedPlan,
            },
          }))
        }
        toast.error('Plan has been updated', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }
    } catch (err) {
      toast.error('Something went wrong.', {
        icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
      })
      console.error('error:', err)
    }
  }

  return (
    <div className='w-full p-10 flex flex-col gap-7'>
      <div className='w-full flex flex-col gap-3 p-7 rounded-[21px] shadow-even'>
        <h2 className='text-xl font-bold'>Current Trading Plan</h2>
        <div className='flex flex-col items-start gap-1 w-full'>
          {session?.user.plan.steps.map((step, idx) => {
            return (
              <div key={idx} className='w-full flex items-center'>
                <span>{idx + 1}.</span>
                <input
                  ref={idx === 0 ? firstInpRef : null}
                  value={step}
                  disabled={!edit}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const sessionInstance = { ...session }
                    sessionInstance.user.plan.steps[idx] = e.target.value
                    setSession(sessionInstance)
                  }}
                  className='w-full px-1 disabled:bg-transparent'
                />
              </div>
            )
          })}
        </div>
        <button
          onClick={async () => {
            if (edit) {
              await updatePlan()
            }
            setEdit((prev) => !prev)
          }}
          className='bg-lightblue text-white mt-16 rounded-[10px] w-[200px] py-2'
        >
          {edit ? 'Confirm' : 'Edit'}
        </button>
      </div>
    </div>
  )
}

export default TradingPlan
