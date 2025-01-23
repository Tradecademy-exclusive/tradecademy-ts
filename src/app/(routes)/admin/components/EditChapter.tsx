'use client'

import { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { PiWarningOctagon } from 'react-icons/pi'
import axios from 'axios'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FiLoader } from 'react-icons/fi'

const UpdateChapter = ({
  opened,
  setOpened,
  id,
}: {
  opened: string
  setOpened: React.Dispatch<React.SetStateAction<string>>
  id: string
}) => {
  const router = useRouter()
  const [title, setTitle] = useState<string>('')
  const [summary, setSummary] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getChapter = async () => {
      const { data } = await axios.get(`/api/courses/chapter?id=${id}`)
      if (data.chapter) {
        setTitle(data.chapter.title)
        setSummary(data.chapter.summary || '')
      }
    }

    getChapter()
  }, [id])

  const updateChapter = async () => {
    try {
      if (!title) {
        return toast.error('Title is required!', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }
      setLoading(true)
      const { data } = await axios.put('/api/admin/courses/chapter', {
        id,
        title,
        summary,
      })
      if (data.updatedChapter) {
        toast.error('Chapter has been updated', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
        setTitle('')
        setSummary('')
        setLoading(false)
        setOpened('')
        router.refresh()
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
      return toast.error('Something went wrong', {
        icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
      })
    }
  }

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
          onClick={() => setOpened('')}
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
          onClick={() => setOpened('')}
          className='px-10 py-1.5 rounded-[5px] bg-transparent border border-white text-white text-[15px]'
        >
          Cancel
        </button>
        <button
          disabled={loading}
          onClick={updateChapter}
          className='px-6 py-1.5 rounded-[5px] bg-lightblue border border-lightblue text-white text-[15px]'
        >
          {loading ? (
            <div className='flex items-center gap-2'>
              <FiLoader className='animate-spin' />
              Loading
            </div>
          ) : (
            'Update Chapter'
          )}
        </button>
      </div>
    </div>
  )
}

export default UpdateChapter
