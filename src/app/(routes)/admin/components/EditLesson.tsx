/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'
import { PiWarningCircle } from 'react-icons/pi'
import TextEditor from './TextEditor'
import UploadImage from './UploadImage'
import VideoSource from './VideoSource'
import UploadAttachments from './UploadAttachments'
import { toast } from 'react-toastify'
import Image from 'next/image'
import axios from 'axios'
import { ImSpinner3 } from 'react-icons/im'
import { Lesson } from '@prisma/client'
import { useRouter } from 'next/navigation'

const EditLesson = ({
  opened,
  close,
  image,
  attachments,
  setAttachments,
  setImage,
  courseId,
}: {
  opened: string
  close: () => void
  image: string
  attachments: string[]
  setAttachments: React.Dispatch<React.SetStateAction<string[]>>
  setImage: React.Dispatch<React.SetStateAction<string>>
  courseId: string
}) => {
  const router = useRouter()
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [type, setType] = useState<string>('Youtube')
  const [source, setSource] = useState<string>('')
  const [uploading, setUploading] = useState<boolean>(false)

  useEffect(() => {
    if (opened) {
      const getLesson = async () => {
        const { data } = await axios.get(`/api/courses/lesson?id=${opened}`)
        if (data.lesson) {
          const { lesson }: { lesson: Lesson } = data
          setTitle(lesson.title)
          setContent(lesson.content || '')
          setImage(lesson.thumbnail || '')
          setType(lesson.type || 'Youtube')
          setSource(lesson.source || '')
          setAttachments(lesson.attachments)
        }
      }
      getLesson()
    }
  }, [opened])

  const updateLesson = async () => {
    try {
      if (!title) {
        return toast.error('Lesson title is required', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }
      setUploading(true)
      const { data } = await axios.put(
        `/api/admin/courses/lesson?id=${opened}&&courseId=${courseId}`,
        {
          title,
          content,
          thumbnail: image,
          source,
          type,
          attachments: attachments,
        }
      )

      if (data.updatedLesson) {
        setTitle('')
        setContent('')
        setImage('')
        setType('')
        setSource('')
        setAttachments([])
        close()
        toast.error('Lesson has been updated.', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }
      setUploading(false)
      router.refresh()
    } catch (err) {
      console.log(err)
      toast.error('Could not update the lesson.', {
        icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
      })
      setUploading(false)
    }
  }

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-y-[50%] transition-all duration-300 -translate-x-1/2 z-[999] rounded-t-[15px] h-[900px] w-[800px] max-lg:w-[95%] max-lg:h-[700px] max-md:h-[620px] max-sm:h-[580px] overflow-hidden flex flex-col items-start ${
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
      <div className='w-full flex items-center justify-between px-5 bg-[#1D1D1D] py-6 rounded-b-[10px]'>
        <button
          onClick={close}
          className='bg-transparent border text-[15px] border-white text-white py-1.5 px-7 rounded-[6px]'
        >
          Cancel
        </button>
        <button
          disabled={uploading}
          onClick={updateLesson}
          className='bg-lightblue border w-[170px] border-lightblue text-[15px] text-white py-1.5 px-7 rounded-[6px]'
        >
          {!uploading ? (
            'Update Lesson'
          ) : (
            <div className='flex items-center gap-3'>
              Loading <ImSpinner3 className='text-base animate-spin' />
            </div>
          )}
        </button>
      </div>
    </div>
  )
}

export default EditLesson
