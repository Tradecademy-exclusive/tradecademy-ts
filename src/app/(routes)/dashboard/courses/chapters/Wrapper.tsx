import CourseChapter from '@/components/courses/chapter'
import { CourseType } from '@/types'

const ChaptersWrapper = ({ course }: { course: CourseType }) => {
  return (
    <div className='w-full relative p-10 flex flex-col items-start gap-5'>
      {course.chapters.length > 0 &&
        course.chapters.map((chapter) => (
          <CourseChapter
            key={chapter.id}
            chapter={chapter}
            cover={course.cover}
          />
        ))}
    </div>
  )
}

export default ChaptersWrapper
