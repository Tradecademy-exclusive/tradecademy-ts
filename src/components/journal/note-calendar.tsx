import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Journal } from '@prisma/client'
import './calendar.css'
import { formatToDollars } from '@/lib/utils'

const NoteCalendar = ({ journals }: { journals: Journal[] }) => {
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
            className={`h-[169px] max-2xl:h-[125px] max-lg:h-[109px] max-md:h-[89px] absolute -top-[1px] -left-[1px] w-[102%] border-2 p-2 flex flex-col items-end justify-end ${
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
      />
    </div>
  )
}

export default NoteCalendar
