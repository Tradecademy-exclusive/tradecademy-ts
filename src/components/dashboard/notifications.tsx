'use client'

import { Analysis } from '@prisma/client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'

interface NotificationsProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Notifications = ({ open, setOpen }: NotificationsProps) => {
  const [analysis, setAnalysis] = useState<Analysis[]>([])

  useEffect(() => {
    const getAnalysis = async () => {
      const { data } = await axios.get('/api/analysis')
      if (data.analysis) {
        setAnalysis(data.analysis)
      }
    }
    getAnalysis()
  }, [])

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#E3E3E3] z-[999] rounded-[12px] flex flex-col items-start w-[700px] transition-all duration-200 ${
        open
          ? 'opacity-100 pointer-events-none'
          : 'opacity-0 pointer-events-auto'
      }`}
    >
      <div className='w-full py-6 px-5 flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>Notifications</h2>
        <IoCloseOutline
          onClick={() => setOpen(false)}
          className='text-3xl cursor-pointer'
        />
      </div>
    </div>
  )
}

export default Notifications
