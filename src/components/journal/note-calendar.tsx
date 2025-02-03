'use client'

import { useEffect, useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Journal } from '@prisma/client'
import './calendar.css'
import { formatToDollars } from '@/lib/utils'
import { RiArrowLeftDoubleLine, RiArrowLeftSLine } from 'react-icons/ri'

const NoteCalendar = ({ journals }: { journals: Journal[] }) => {
  const calendarRef = useRef<FullCalendar | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState(
    journals.map((entry) => ({
      date: entry.date,
      extendedProps: {
        journal: entry,
        winnings: entry.winnings,
      },
    }))
  )

  const getSelectedDate = () => {
    const currentMonthName = currentDate.toLocaleString('default', {
      month: 'long',
    })
    const currentYear = currentDate.getFullYear()

    return { currentYear, currentMonth: currentMonthName }
  }

  const { currentYear, currentMonth } = getSelectedDate()

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi()

      setTimeout(() => {
        calendarApi.gotoDate(currentDate)
      }, 0)
    }
  }, [currentDate])

  const goToNextYear = () => {
    const newDate = new Date(currentDate)
    newDate.setFullYear(newDate.getFullYear() + 1)
    setCurrentDate(newDate)
  }

  const goToPreviousYear = () => {
    const newDate = new Date(currentDate)
    newDate.setFullYear(newDate.getFullYear() - 1)
    setCurrentDate(newDate)
  }

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() - 1)
    setCurrentDate(newDate)
  }

  const goToNextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + 1)
    setCurrentDate(newDate)
  }

  return (
    <div>
      <div className='w-full flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>Trade Calendar</h2>
        <div className='flex items-center gap-0'>
          <RiArrowLeftDoubleLine
            onClick={goToPreviousYear}
            className='text-3xl cursor-pointer text-[#595454B2]'
          />
          <RiArrowLeftSLine
            onClick={goToPreviousMonth}
            className='text-3xl cursor-pointer text-[#595454B2] -translate-x-1.5'
          />
          <button className='flex items-center gap-4 bg-[#B1C3F7] rounded-[5px] py-0.5 text-[15px] px-3 text-white'>
            <span>{currentMonth}</span>
          </button>
          <button className='flex items-center gap-4 bg-[#B1C3F7] rounded-[5px] py-0.5 text-[15px] px-3 text-white ml-5'>
            Year <span>{currentYear}</span>
          </button>
          <RiArrowLeftSLine
            onClick={goToNextMonth}
            className='text-3xl rotate-180 cursor-pointer text-[#595454B2] translate-x-1.5'
          />
          <RiArrowLeftDoubleLine
            onClick={goToNextYear}
            className='text-3xl rotate-180 cursor-pointer text-[#595454B2]'
          />
        </div>
        <button
          onClick={() => setCurrentDate(new Date())}
          className='bg-[#B1C3F7] text-white py-0.5 px-5 rounded-[5px]'
        >
          Today
        </button>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        events={events}
        eventContent={(eventInfo) => (
          <div
            className={`h-[179px] max-2xl:h-[132px] max-lg:h-[116px] max-md:h-[94px] absolute -top-[1px] -left-[1px] w-[102%] border-2 p-2 flex flex-col items-end justify-end ${
              eventInfo.event.extendedProps.winnings > 0
                ? '!bg-green-800 border-green-500 text-green-500'
                : '!bg-red-800 border-red-500 text-red-500'
            }`}
          >
            <div className='w-full flex flex-col items-center gap-1'>
              <h3 className='text-2xl max-xl:text-xl text-center overflow-hidden text-ellipsis max-w-full break-words font-medium'>
                {formatToDollars(
                  eventInfo.event.extendedProps.journal.winnings
                )}
              </h3>
              <span className='text-white text-lg max-xl:text-base text-center overflow-hidden text-ellipsis max-w-full break-words'>
                1 trade
              </span>
            </div>
          </div>
        )}
        headerToolbar={{
          left: '',
          center: '',
          right: '',
        }}
      />
    </div>
  )
}

export default NoteCalendar
