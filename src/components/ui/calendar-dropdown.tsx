import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

export default function CalendarDropdown({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date | undefined
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>
          {selectedDate ? selectedDate.toDateString() : 'Pick a date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-2'>
        <Calendar
          mode='single'
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
      </PopoverContent>
    </Popover>
  )
}
