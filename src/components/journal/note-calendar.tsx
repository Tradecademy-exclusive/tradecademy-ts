import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Journal } from '@prisma/client'
import './calendar.css'

const CalendarComponent = ({ journals }: { journals: Journal[] }) => {
  const [events, setEvents] = useState(
    journals.map((entry) => ({
      date: entry.date,
      extendedProps: {
        journal: entry,
        winnings: entry.winnings,
      },
    }))
  )

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        events={events}
        eventContent={(eventInfo) => (
          <div
            className={`h-[170px] max-2xl:h-[126px] max-lg:h-[110px] max-md:h-[90px] absolute top-0 left-0 w-full border-2 rounded-[8px] p-1 ${
              eventInfo.event.extendedProps.winnings > 0
                ? '!bg-green-800 border-green-500'
                : '!bg-red-800 border-red-500'
            }`}
          >
            <h3 className='text-xl'>
              {eventInfo.event.extendedProps.journal.winnings}
            </h3>
          </div>
        )}
      />
    </div>
  )
}

export default CalendarComponent
