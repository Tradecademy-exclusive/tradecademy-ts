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
    <div className='bg-lightblue/5 p-5 rounded-[15px] shadow-evenLight w-full'>
      <div className='w-full flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-3'>
        <h2 className='text-xl font-bold'>Trade Calendar</h2>
        <div className='flex items-center gap-0'>
          <RiArrowLeftDoubleLine
            onClick={goToPreviousYear}
            className='text-3xl cursor-pointer text-[#555556]'
          />
          <RiArrowLeftSLine
            onClick={goToPreviousMonth}
            className='text-3xl cursor-pointer text-[#555556] -translate-x-1.5'
          />
          <button className='flex items-center gap-4 bg-lightblue rounded-[5px] py-0.5 text-[15px] px-3 text-white font-medium'>
            <span>{currentMonth}</span>
          </button>
          <button className='flex items-center gap-4 bg-lightblue rounded-[5px] py-0.5 text-[15px] px-3 text-white font-medium ml-5'>
            Year <span>{currentYear}</span>
          </button>
          <RiArrowLeftSLine
            onClick={goToNextMonth}
            className='text-3xl rotate-180 cursor-pointer text-[#555556] translate-x-1.5'
          />
          <RiArrowLeftDoubleLine
            onClick={goToNextYear}
            className='text-3xl rotate-180 cursor-pointer text-[#555556]'
          />
        </div>
        <button
          onClick={() => setCurrentDate(new Date())}
          className='bg-lightblue text-white font-medium py-0.5 px-5 rounded-[5px]'
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
            className={`h-[175px] max-2xl:h-[104px] max-lg:h-[99px] max-md:h-[65px] absolute w-[calc(100%+17px)] -top-[9px] rounded-[5px] -left-[8px] border-2 p-2 flex flex-col items-end justify-end ${
              eventInfo.event.extendedProps.winnings > 0
                ? 'bg-[#6DB571] text-[#3B9441] border-[#3B9441]'
                : '!bg-[#E8666F] text-[#FF312E] border-[#FF312E]'
            }`}
          >
            <div className='w-full flex flex-col items-center'>
              <h3 className='text-xl max-xl:text-lg text-center overflow-hidden text-ellipsis max-w-full break-words font-semibold'>
                {formatToDollars(
                  eventInfo.event.extendedProps.journal.winnings
                )}
              </h3>
              <span className='text-white text-base max-xl:text-sm font-semibold text-center overflow-hidden text-ellipsis max-w-full break-words'>
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
