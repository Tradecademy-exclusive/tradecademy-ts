'use client'

import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { PiWarningCircle } from 'react-icons/pi'
import TextEditor from './TextEditor'
import UploadImage from './UploadImage'
import VideoSource from './VideoSource'
import UploadAttachments from './UploadAttachments'

const CreateLesson = ({
  opened,
  close,
}: {
  opened: string
  close: () => void
}) => {
  const [content, setContent] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [type, setType] = useState<string>('Youtube')
  const [source, setSource] = useState<string>('')
  const [attachments, setAttachments] = useState<string[]>([])

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-y-[50%] transition-all duration-300 -translate-x-1/2 z-[999] rounded-t-[15px] h-[900px] w-[800px] overflow-hidden flex flex-col items-start gap-4 ${
        opened
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='w-full h-full flex flex-col items-center gap-5 bg-[#e4e8f1] overflow-auto pb-5'>
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
          <TextEditor content={content} setContent={setContent} />
          <div className='flex items-center mt-2 gap-1 text-[12px] text-[#00000066]'>
            <PiWarningCircle className='text-[13px] min-w-[13px]' />
            The idea of a summary is a short text to prepare students for the
            activities within the topic or week. The text is shown on the course
            page unde the topic name.
          </div>
        </div>
        <div className='flex flex-col items-start gap-2 w-full px-8'>
          <h2 className='text-lg font-bold'>Feature Image</h2>
          <UploadImage image={image} setImage={setImage} />
        </div>
        <div className='flex flex-col items-start gap-2 w-full px-8 relative'>
          <h2 className='text-lg font-bold'>Video Source</h2>
          <VideoSource
            type={type}
            setType={setType}
            source={source}
            setSource={setSource}
          />
        </div>
        <div className='flex flex-col items-start gap-2 w-full px-8 relative'>
          <h2 className='text-lg font-bold'>
            Upload exercise files to the Lesson
          </h2>
          <UploadAttachments
            attachments={attachments}
            setAttachments={setAttachments}
          />
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
