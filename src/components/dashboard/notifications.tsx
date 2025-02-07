/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Analysis } from '@prisma/client'
import axios from 'axios'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'

interface NotificationsProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Notifications = ({ open, setOpen }: NotificationsProps) => {
  const [analysis, setAnalysis] = useState<Analysis[]>([])
  const [analysisCopy, setAnalysisCopy] = useState<Analysis[]>([])
  const [selectedMentors, setSelectedMentors] = useState<string[]>([])

  useEffect(() => {
    const getAnalysis = async () => {
      const { data } = await axios.get('/api/analysis')
      if (data.analysis) {
        setAnalysis(data.analysis)
        setAnalysisCopy(data.analysis)
      }
    }
    getAnalysis()
  }, [])

  useEffect(() => {
    if (selectedMentors.length === 0) {
      return setAnalysisCopy(analysis)
    }
    const filteredByMentors = [...analysis].filter((obj) =>
      selectedMentors.includes(obj.publishedBy)
    )
    setAnalysisCopy(filteredByMentors)
  }, [selectedMentors])

  const uniquePublishedBy = [...new Set(analysis.map((obj) => obj.publishedBy))]

  const selectMentor = (mentor: string) => {
    const isSelected = [...selectedMentors].find((name) => name === mentor)
    if (isSelected) {
      setSelectedMentors((prev) => prev.filter((name) => name !== isSelected))
    } else {
      setSelectedMentors((prev) => [...prev, mentor])
    }
  }

  return (
    <div
      className={`fixed h-screen top-0 right-0  z-[999] rounded-l-[12px] pb-4 flex flex-col items-start w-[650px] transition-all duration-500 bg-[#E4E8F1] overflow-y-auto max-sm:w-full max-sm:rounded-none ${
        open
          ? 'translate-x-0 pointer-events-auto'
          : 'translate-x-[700px] pointer-events-none'
      }`}
    >
      <div className='w-full py-6 px-5 flex items-center justify-between'>
        <h2 className='text-lg font-bold'>Analysis</h2>
        <IoCloseOutline
          onClick={() => setOpen(false)}
          className='text-3xl cursor-pointer'
        />
      </div>

      <div className='w-full flex items-center gap-4 flex-wrap px-8 mb-5 mt-2'>
        {uniquePublishedBy.map((mentor) => (
          <button
            key={mentor}
            onClick={() => selectMentor(mentor)}
            className={`bg-white transition-all duration-200 text-black px-5 py-1.5 rounded-[5px] text-[15px] ${
              selectedMentors.includes(mentor) && '!bg-[#B1C3F7]'
            }`}
          >
            {mentor + "'" + 's' + ' ' + 'Analysis'}
          </button>
        ))}
      </div>

      <div className='w-full flex flex-col items-start gap-2 px-3'>
        {analysisCopy.length > 0
          ? analysisCopy.map((obj) => {
              const stripHtml = (html: string): string => {
                const doc: Document = new DOMParser().parseFromString(
                  html,
                  'text/html'
                )
                return doc.body.textContent || ''
              }

              const truncatedText =
                stripHtml(obj.content).length > 100
                  ? stripHtml(obj.content).substring(0, 100) + '...'
                  : stripHtml(obj.content)

              return (
                <Link
                  href={`/analysis/${obj.id}`}
                  key={obj.id}
                  className='w-full flex items-center justify-between p-4 rounded-[5px] gap-14 hover:bg-[#B1C3F7] cursor-pointer transition-all duration-150 max-sm:flex-col max-sm:items-start max-sm:gap-3'
                >
                  <div className='flex flex-col items-start gap-2'>
                    <h3 className='font-medium'>{obj.title}</h3>
                    <div className='text-sm text-[#000000B2]'>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: truncatedText,
                        }}
                      />
                    </div>
                    <span className='text-sm text-[#000000dc]'>
                      By {obj.publishedBy} Mentor{' '}
                      {format(obj.createdAt, 'MM-dd-yy h:mma')}
                    </span>
                  </div>
                  {obj.image && (
                    <div className='max-w-[50%] min-w-[50%] max-sm:min-w-full max-sm:max-w-full relative h-full max-sm:h-[200px] rounded-[5px] overflow-hidden'>
                      <Image
                        src={obj.image}
                        fill
                        alt='analysis image'
                        className='object-cover'
                      />
                    </div>
                  )}
                </Link>
              )
            })
          : ''}
      </div>
    </div>
  )
}

export default Notifications
