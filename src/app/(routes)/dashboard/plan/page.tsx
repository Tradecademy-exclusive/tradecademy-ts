'use client'
import { useContext } from 'react'
import { AuthContext } from '@/providers/AuthProvider'

const TradingPlan = () => {
  const { session, setSession } = useContext(AuthContext)
  return (
    <div className='w-full p-10 flex flex-col gap-7'>
      <div className='w-full flex flex-col gap-3 p-7 rounded-[21px] shadow-even'>
        <h2 className='text-xl font-bold'>Current Trading Plan</h2>
        <div className='flex flex-col items-start gap-1 w-full'>
          {session?.user.plan.steps.map((step, idx) => {
            return (
              <div key={idx} className='w-full flex items-center gap-1'>
                <span>{idx + 1}.</span>
                <input
                  value={step}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const sessionInstance = { ...session }
                    sessionInstance.user.plan.steps[idx] = e.target.value
                    setSession(sessionInstance)
                  }}
                  className='w-full'
                />
              </div>
            )
          })}
        </div>
        <button className='w-fit bg-lightblue text-white mt-10 rounded-[10px] px-16 py-2'>
          Edit
        </button>
      </div>
    </div>
  )
}

export default TradingPlan
