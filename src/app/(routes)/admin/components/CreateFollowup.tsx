/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { IoCloseOutline } from 'react-icons/io5'
import TextEditor from './TextEditor'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/providers/AuthProvider'
import { toast } from 'react-toastify'
import Image from 'next/image'
import axios from 'axios'
import { RiLoader4Fill } from 'react-icons/ri'
import UploadAnalysis from './UploadAnalysis'
import { FaArrowTrendUp } from 'react-icons/fa6'

interface CreateFollowUpProps {
  content: string
  modalOpen?: string
  updateId?: string
  setContent: React.Dispatch<React.SetStateAction<string>>
  setUpdateId?: React.Dispatch<React.SetStateAction<string>>
  setModalOpen?: React.Dispatch<React.SetStateAction<string>>
}

const CreateFollowUp = ({
  content,
  setContent,
  modalOpen,
  setModalOpen,
  setUpdateId,
  updateId,
}: CreateFollowUpProps) => {
  const [title, setTitle] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [image, setImage] = useState<string>('')
  const [video, setVideo] = useState<string>('')
  const [strategy, setStrategy] = useState<string>('Neutral')
  const { session } = useContext(AuthContext)

  useEffect(() => {
    setTitle('')
    setVideo('')
    setImage('')
    setContent('')
    setStrategy('Neutral')
  }, [modalOpen])

  useEffect(() => {
    const initializeAnalysis = async () => {
      const { data } = await axios.get(
        `/api/admin/analysis/followup/${updateId}`
      )
      if (data.analysis) {
        setTitle(data.analysis.title)
        setVideo(data.analysis.video || '')
        setImage(data.analysis.image || '')
        setStrategy(data.analysis.strategy)
        setContent(data.analysis.content)
      }
    }
    if (updateId) {
      initializeAnalysis()
    }
  }, [updateId])

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

      const { data } = await axios.post('/api/admin/analysis/followup', {
        analysisId: modalOpen,
        title,
        content,
        publishedBy: session.user.username,
        video,
        image,
        strategy,
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

  const updateAnalysis = async () => {
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
      const { data } = await axios.put('/api/admin/analysis/followup', {
        id: updateId,
        title,
        content,
        publishedBy: session.user.username,
        video,
        image,
        strategy,
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
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] bg-white rounded-[15px] w-[750px] flex flex-col items-start transition-all duration-200 ${
        modalOpen || updateId
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='w-full flex items-center justify-between py-3.5 px-4'>
        <h3 className='text-[15px] font-semibold'>Analysis</h3>
        <IoCloseOutline
          onClick={() => {
            if (setModalOpen) {
              setModalOpen('')
            }
            if (setUpdateId) {
              setUpdateId('')
            }
          }}
          className='cursor-pointer text-2xl'
        />
      </div>
      <div className='w-full py-5 px-4 flex flex-col items-start gap-4 bg-[#E4E8F1]'>
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
        <div className='w-full flex flex-col items-start gap-1'>
          <h3 className='font-semibold text-lg'>Upload Analysis</h3>
          <div className='w-full flex items-center justify-between gap-3'>
            <div className='flex flex-col items-start gap-2'>
              <UploadAnalysis
                label='Upload Image'
                setFile={setImage}
                id='image-followup'
              />
              <UploadAnalysis
                label='Upload Video'
                setFile={setVideo}
                id='video-followup'
              />
            </div>
            <div className='w-full flex items-center gap-3'>
              {image && (
                <div className='w-1/2 flex flex-col items-end gap-0.5'>
                  <button
                    onClick={() => setImage('')}
                    className='flex items-center gap-0.5 text-sm'
                  >
                    <IoCloseOutline className='text-lg' />
                    remove
                  </button>
                  <div className='w-full relative h-[120px] rounded-[5px] overflow-hidden'>
                    <Image
                      src={image}
                      alt='Analysis image'
                      fill
                      className='object-cover'
                    />
                  </div>
                </div>
              )}
              {video && (
                <div className='w-1/2 flex flex-col items-end gap-0.5'>
                  <button
                    onClick={() => setVideo('')}
                    className='flex items-center gap-0.5 text-sm'
                  >
                    <IoCloseOutline className='text-lg' />
                    remove
                  </button>
                  <video src={video} className='w-full h-[120px]' controls />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-col items-start gap-1 w-full'>
          <h3 className='font-semibold text-lg'>Investment Strategy</h3>
          <div className='w-full flex items-center h-[45px] bg-white rounded-[5px] p-1 gap-2'>
            <button
              onClick={() => setStrategy('Long')}
              className={`w-full flex items-center justify-center gap-2 h-full rounded-[5px] text-green-600 hover:bg-[#B1C3F7] transition-all duration-300 ${
                strategy === 'Long' && '!bg-[#B1C3F7]'
              }`}
            >
              <FaArrowTrendUp />
              Long
            </button>
            <button
              onClick={() => setStrategy('Neutral')}
              className={`w-full flex items-center justify-center gap-2 h-full rounded-[5px] text-slate-700 hover:bg-[#B1C3F7] transition-all duration-300 ${
                strategy === 'Neutral' && '!bg-[#B1C3F7]'
              }`}
            >
              Neutral
            </button>
            <button
              onClick={() => setStrategy('Short')}
              className={`w-full flex items-center justify-center gap-2 h-full rounded-[5px] text-red-600 hover:bg-[#B1C3F7] transition-all duration-300 ${
                strategy === 'Short' && '!bg-[#B1C3F7]'
              }`}
            >
              <FaArrowTrendUp className='rotate-90' />
              Short
            </button>
          </div>
        </div>
        <div className='flex flex-col items-start gap-1 w-full'>
          <h3 className='font-semibold text-lg'>Analysis Content</h3>
          <TextEditor content={content} setContent={setContent} />
        </div>
      </div>
      <div className='w-full py-7 px-16 flex items-center justify-between gap-5 bg-[#1D1D1D] rounded-b-[10px]'>
        <button
          onClick={() => {
            if (setModalOpen) {
              setModalOpen('')
            }
            if (setUpdateId) {
              setUpdateId('')
            }
          }}
          className='text-white bg-transparent border border-white px-8 py-1 rounded-[5px]'
        >
          Close
        </button>
        <button
          disabled={loading}
          onClick={updateId ? updateAnalysis : publishAnalysis}
          className='text-white bg-lightblue border border-lightblue px-8 py-1 rounded-[5px]'
        >
          {!loading ? (
            updateId ? (
              'Update'
            ) : (
              'Publish'
            )
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

export default CreateFollowUp
