'use client'

import NoteCalendar from '@/components/journal/note-calendar'
import { Journal } from '@prisma/client'

const JournalWrapper = ({ journals }: { journals: Journal[] }) => {
  return (
    <div className='w-full p-3'>
      <NoteCalendar journals={journals} />
    </div>
  )
}

export default JournalWrapper
