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
      className={`fixed h-screen top-0 right-0  z-[999] rounded-l-[12px] flex flex-col items-start w-[450px] transition-all duration-500 bg-[#E4E8F1] ${
        open
          ? 'translate-x-0 pointer-events-none'
          : 'translate-x-[500px] pointer-events-auto'
      }`}
    >
      <div className='w-full py-6 px-5 flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>Notifications</h2>
        <IoCloseOutline
          onClick={() => setOpen(false)}
          className='text-3xl cursor-pointer'
        />
      </div>
      {analysis.length > 0
        ? analysis.map((obj) => {
            return <div key={obj.id} className='w-full'></div>
          })
        : ''}
    </div>
  )
}

export default Notifications
