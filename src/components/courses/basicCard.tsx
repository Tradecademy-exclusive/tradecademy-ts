/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'

interface CourseCardProps {
  title: string
  description: string
  cover: string
  percentage: number
}

const BasicCard = ({
  title,
  description,
  cover,
  percentage,
}: CourseCardProps) => {
  return (
    <div
      className={`w-full bg-[#E3E3E3] rounded-[23px] p-6 flex flex-col items-start gap-3`}
    >
      <div className='w-full flex items-start gap-4'>
        <div className='flex flex-col w-1/2 items-start gap-3'>
          <div className='w-full relative h-[80px] xl:h-[120px] 2xl:h-[170px] rounded-[10px] overflow-hidden'>
            <Image
              src={cover}
              fill
              alt='course cover image'
              className='object-cover'
            />
          </div>
          <div className='w-full flex flex-col items-end gap-1'>
            <div className='w-full relative h-[4px] xl:h-[5px] bg-[#D9D9D9]'>
              <div
                className='absolute h-full top-0 left-0 bg-lightblue'
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>
            <span className='text-[12px] text-[#606060]'>
              {percentage}% Complete
            </span>
          </div>
        </div>
        <div className='w-1/2 flex flex-col items-start gap-1'>
          <h2 className='text-lg font-semibold xl:text-[22px]'>{title}</h2>
          <p className='text-[12px] text-black/60 xl:text-sm'>{description}</p>
        </div>
      </div>
      <button className='text-[13px] w-full bg-lightblue py-2 rounded-[8px] text-white xl:text-[15px]'>
        Begin You're Course
      </button>
    </div>
  )
}

export default BasicCard
