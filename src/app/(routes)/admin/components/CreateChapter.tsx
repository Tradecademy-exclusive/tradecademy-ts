'use client'

import { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { PiWarningOctagon } from 'react-icons/pi'

const CreateChapter = ({
  opened,
  setOpened,
}: {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [title, setTitle] = useState<string>('')
  const [summary, setSummary] = useState<string>('')
  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col transition-all duration-100 items-center w-[500px] rounded-t-[10px] z-[999] overflow-hidden ${
        opened
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='px-5 py-3.5 flex items-center justify-between w-full bg-white'>
        <h3 className='font-bold'>Chapters</h3>
        <IoCloseOutline
          onClick={() => setOpened(false)}
          className='text-2xl cursor-pointer'
        />
      </div>
      <div className='w-full flex flex-col items-start py-4 px-5 gap-6 bg-[#D9D9D9]'>
        <div className='w-full flex flex-col items-start gap-1'>
          <label htmlFor='chapter-name' className='text-lg font-bold'>
            Chapter Name
          </label>
          <input
            id='chapter-name'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full py-1.5 px-3 text-[15px] font-semibold rounded-[5px] border border-[#0000004D] outline-none text-[#00000066]'
          />
          <p className='text-[13px] text-[#00000066]'>
            <PiWarningOctagon className='inline' /> Lesson titles are displayed
            publicly whenever required.
          </p>
        </div>
        <div className='w-full flex flex-col items-start gap-1'>
          <label htmlFor='chapter-summary' className='text-lg font-bold'>
            Chapter Summary
          </label>
          <textarea
            id='chapter-summary'
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className='w-full py-4 px-3 text-[15px] rounded-[5px] border border-[#0000004D] outline-none text-[#00000066] resize-none'
          />
          <p className='text-[13px] text-[#00000066]'>
            <PiWarningOctagon className='inline' /> Add a summary of short text
            to prepare students for the activities on the topic. The text is
            shown on the course page beside the tooltip beside the topic name.
          </p>
        </div>
      </div>
      <div className='w-full flex items-center justify-center gap-8 mt-5'>
        <button
          onClick={() => setOpened(false)}
          className='px-10 py-1.5 rounded-[5px] bg-transparent border border-white text-white text-[15px]'
        >
          Cancel
        </button>
        <button className='px-6 py-1.5 rounded-[5px] bg-lightblue border border-lightblue text-white text-[15px]'>
          Create Chapter
        </button>
      </div>
    </div>
  )
}

export default CreateChapter
