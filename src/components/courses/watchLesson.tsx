import { LessonType } from '@/types'
import PlyrIo from './plyrIo'
import Note from './note'

const WatchLesson = ({ lesson }: { lesson: LessonType }) => {
  if (!lesson.source || !lesson.type) return
  return (
    <div className='w-full flex flex-col items-center gap-20'>
      <div className='w-full flex flex-col items-center gap-3.5'>
        <PlyrIo
          source={lesson.source}
          type={lesson.type.toLowerCase() as 'youtube' | 'vimeo' | 'html5'}
        />
        <div className='w-full flex items-center justify-center gap-4'>
          <button className='text-sm bg-charcoal px-8 py-[5px] rounded-[5px] text-white'>
            Back
          </button>
          <button className='text-sm bg-tcblue px-8 py-[5px] rounded-[5px] text-white'>
            Next
          </button>
        </div>
      </div>
      <Note lessonId={lesson.id} />
    </div>
  )
}

export default WatchLesson
