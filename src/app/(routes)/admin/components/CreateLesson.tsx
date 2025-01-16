'use client'

import { IoMdClose } from 'react-icons/io'
import { PiWarningCircle } from 'react-icons/pi'

const CreateLesson = ({
  opened,
  close,
}: {
  opened: boolean
  close: () => void
}) => {
  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-y-[50%] transition-all duration-300 -translate-x-1/2 z-[999] rounded-t-[15px] h-[700px] w-[600px] overflow-hidden flex flex-col items-start gap-4 ${
        opened
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='w-full h-full flex flex-col items-center gap-5 bg-[#e4e8f1]'>
        <div className='w-full bg-[#F0F0F0] flex items-center justify-between px-5 py-4'>
          <h3 className='font-semibold'>Lesson</h3>
          <IoMdClose onClick={close} className='text-2xl cursor-pointer' />
        </div>
        <div className='flex flex-col items-start gap-2 w-full px-8'>
          <label htmlFor='title' className='text-lg font-bold'>
            Lesson Name
          </label>
          <input
            id='title'
            type='text'
            className='w-full rounded-[5px] border py-1.5 px-3 border-[#0000004D] text-[#00000066] font-semibold outline-none text-[15px]'
          />
          <div className='flex items-center gap-1 text-[12px] text-[#00000066]'>
            <PiWarningCircle className='text-[13px]' />
            Lesson titles are displayed publicly whenever required.
          </div>
        </div>
        <div className='flex flex-col items-start gap-2 w-full px-8'>
          <h2 className='text-lg font-bold'>Lesson Content</h2>

          <div className='flex items-center gap-1 text-[12px] text-[#00000066]'>
            <PiWarningCircle className='text-[13px]' />
            Lesson titles are displayed publicly whenever required.
          </div>
        </div>
      </div>
      <div className='w-full flex items-center justify-between px-5'>
        <button
          onClick={close}
          className='bg-transparent border text-[15px] border-white text-white py-1.5 px-7 rounded-[6px]'
        >
          Cancel
        </button>
        <button className='bg-lightblue border border-lightblue text-[15px] text-white py-1.5 px-7 rounded-[6px]'>
          Upload Lesson
        </button>
      </div>
    </div>
  )
}

export default CreateLesson