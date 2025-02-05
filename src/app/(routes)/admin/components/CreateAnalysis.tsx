'use client'

import { IoCloseOutline } from 'react-icons/io5'
import TextEditor from './TextEditor'
import { useContext, useState } from 'react'
import { AuthContext } from '@/providers/AuthProvider'
import { toast } from 'react-toastify'
import Image from 'next/image'
import axios from 'axios'
import { RiLoader4Fill } from 'react-icons/ri'

interface CreateAnalysisProps {
  content: string
  modalOpen: boolean
  setContent: React.Dispatch<React.SetStateAction<string>>
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateAnalysis = ({
  content,
  setContent,
  modalOpen,
  setModalOpen,
}: CreateAnalysisProps) => {
  const [title, setTitle] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { session } = useContext(AuthContext)

  const publishAnalysis = async () => {
    if (!session?.user) return
    try {
      if (!title) {
        return toast.error('Title is required', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }
      if (!content) {
        return toast.error('Content is required', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }

      setLoading(true)

      const { data } = await axios.post('/api/admin/analysis', {
        title,
        content,
        publishedBy: session.user.username,
      })

      if (data.analysis) {
        setTitle('')
        setContent('')
        window.location.reload()
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
      toast.error('Something went wrong', {
        icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
      })
    }
  }

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] bg-white rounded-[15px] w-[550px] flex flex-col items-start transition-all duration-200 ${
        modalOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='w-full flex items-center justify-between py-3.5 px-4'>
        <h3 className='text-[15px] font-semibold'>Analysis</h3>
        <IoCloseOutline
          onClick={() => setModalOpen(false)}
          className='cursor-pointer text-2xl'
        />
      </div>
      <div className='w-full py-5 px-4 flex flex-col items-start gap-4 bg-[#D9D9D9]'>
        <div className='flex flex-col items-start gap-1 w-full'>
          <label htmlFor='title' className='font-semibold text-lg'>
            Analysis Title
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full px-4 py-1 rounded-[5px] outline-none border border-[#0000004D] text-[15px] text-[#00000066] font-medium'
          />
        </div>
        <div className='flex flex-col items-start gap-1 w-full'>
          <h3 className='font-semibold text-lg'>Analysis Content</h3>
          <TextEditor content={content} setContent={setContent} />
        </div>
      </div>
      <div className='w-full py-7 px-16 flex items-center justify-between gap-5 bg-[#1D1D1D] rounded-b-[10px]'>
        <button
          onClick={() => setModalOpen(false)}
          className='text-white bg-transparent border border-white px-8 py-1 rounded-[5px]'
        >
          Close
        </button>
        <button
          disabled={loading}
          onClick={publishAnalysis}
          className='text-white bg-lightblue border border-lightblue px-8 py-1 rounded-[5px]'
        >
          {!loading ? (
            'Publish'
          ) : (
            <div className='flex items-center gap-1 text-white'>
              <RiLoader4Fill className='animate-spin' />
              Loading
            </div>
          )}
        </button>
      </div>
    </div>
  )
}

export default CreateAnalysis
