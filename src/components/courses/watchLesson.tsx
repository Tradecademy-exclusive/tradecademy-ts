import { LessonType } from '@/types'
import PlyrIo from './plyrIo'

const WatchLesson = ({ lesson }: { lesson: LessonType }) => {
  if (!lesson.source || !lesson.type) return
  return (
    <div className='w-full flex flex-col items-center gap-20'>
      <div className='w-full flex flex-col items-center gap-3.5'>
        <PlyrIo source={lesson.source} cover={lesson.thumbnail || ''} />
      </div>
    </div>
  )
}

export default WatchLesson
