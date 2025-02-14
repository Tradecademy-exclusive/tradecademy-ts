import { PreviousPlan } from '@prisma/client'

const PreviousPlansWrapper = ({
  previousPlans,
}: {
  previousPlans: PreviousPlan[] | null
}) => {
  return (
    <div className='w-full flex flex-col items-start gap-4 p-10 max-lg:p-5 max-md:p-4 max-sm:p-3 overflow-y-auto h-[85vh]'>
      {previousPlans && previousPlans.length > 0 ? (
        previousPlans.map((plan) => (
          <div
            key={plan.id}
            className='bg-white shadow-evenLight rounded-[20px] w-full flex flex-col items-end gap-3 p-6'
          >
            <span className='max-sm:text-[15px]'>
              {plan.createdAt.toLocaleDateString().replaceAll('/', '-')}
            </span>
            <div className='w-full flex flex-col items-start gap-1 max-sm:text-sm max-md:text-[15px]'>
              {plan.steps.map((step, idx) => (
                <p key={idx} className='flex items-center gap-0.5'>
                  {idx + 1}. {step}
                </p>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className='w-full h-[70vh] flex items-center justify-center'>
          No previous plans
        </div>
      )}
    </div>
  )
}

export default PreviousPlansWrapper
