import { LessonType } from '@/types'
import PlyrIo from './plyrIo'

const WatchLesson = ({ lesson }: { lesson: LessonType }) => {
  return (
    <div className='w-full flex flex-col items-center gap-14'>
      <PlyrIo
        source={lesson.source!}
        type={lesson.type?.toLowerCase() as 'youtube' | 'vimeo' | 'html5'}
      />
    </div>
  )
}

export default WatchLesson
