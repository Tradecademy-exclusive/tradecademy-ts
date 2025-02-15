'use client'

import CustomAreaChart from '@/components/journal/area-chart'
import CustomLineChart from '@/components/journal/line-chart'
import NoteCalendar from '@/components/journal/note-calendar'
import { Journal } from '@prisma/client'
import { useState } from 'react'

const JournalWrapper = ({ journals }: { journals: Journal[] }) => {
  const [selectedChart, setSelectedChart] = useState<'Area' | 'Line'>('Area')
  return (
    <div className='w-full p-5 bg-white rounded-[15px] shadow-evenLight flex flex-col items-start gap-4'>
      {journals.length > 0 && (
        <div className='w-fit h-fit py-4 flex flex-col items-start gap-3 rounded-[15px] bg-lightblue/5 shadow-evenLight'>
          <div className='flex items-center gap-3 px-4'>
            <button
              onClick={() => setSelectedChart('Line')}
              className={`text-white px-6 py-1 rounded-[5px] hover:bg-lightblue transition-all duration-200 ${
                selectedChart === 'Line' ? 'bg-lightblue' : 'bg-[#B1C3F7]'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setSelectedChart('Area')}
              className={`text-white px-6 py-1 rounded-[5px] hover:bg-lightblue transition-all duration-200 ${
                selectedChart === 'Area' ? 'bg-lightblue' : 'bg-[#B1C3F7]'
              }`}
            >
              Area
            </button>
          </div>

          <div>
            {selectedChart === 'Area' ? (
              <CustomAreaChart journals={journals} />
            ) : (
              <CustomLineChart journals={journals} />
            )}
          </div>
        </div>
      )}
      <NoteCalendar journals={journals} />
    </div>
  )
}

export default JournalWrapper
