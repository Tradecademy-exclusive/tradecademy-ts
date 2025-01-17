'use client'
import { CourseType } from '@/types'
import { useState } from 'react'
import { Icons } from '@/components/icons'

const EditCourse = ({
  course,
  openLesson,
  setOrder,
}: {
  course: CourseType
  openLesson: React.Dispatch<React.SetStateAction<string>>
  setOrder: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <div className='w-full flex flex-col items-start'>
      <div
        onClick={() => {
          setModalOpen((prev) => !prev)
        }}
        className={`w-full flex flex-col items-center transition-all duration-200 ease justify-between py-3.5 px-6 border border-[#B9B0B0B2] bg-[#D3DBF366] cursor-pointer ${
          modalOpen
            ? 'rounded-b-none rounded-t-[15px] shadow-even'
            : 'rounded-[15px]'
        }`}
      >
        <div className='w-full flex items-center justify-between'>
          <h2 className='text-lg font-bold'>{course.title}</h2>
          <button className='h-[24px] w-[26px] rounded-[5px] border border-[#C9C4C4] flex items-center justify-center'>
            <Icons.arrowDown />
          </button>
        </div>
      </div>
      <div
        className={`bg-[#D3DBF366] w-full transition-all duration-300 border border-[#B9B0B0B2] border-t-0 overflow-hidden rounded-b-[15px] border-b-0 ${
          modalOpen ? 'h-[400px] !border-b-[1px] shadow-even' : 'h-[0px]'
        }`}
      >
        {course.chapters.length > 0 ? (
          <div className='w-full flex flex-col gap-5 items-start mt-10 px-5'>
            {course.chapters.map((chapter) => {
              return (
                <div
                  key={chapter.id}
                  className='w-full flex flex-col items-start gap-4'
                >
                  <div className='w-full flex items-center justify-between'>
                    <div className='flex items-center gap-2.5'>
                      <Icons.menu />
                      <div className='flex items-center gap-1 font-semibold text-[15px]'>
                        <span>{chapter.chapter}.</span>
                        <span>{chapter.title}</span>
                      </div>
                    </div>
                    <div className='flex items-center gap-4'>
                      <button>
                        <Icons.edit />
                      </button>
                      <button>
                        <Icons.delete />
                      </button>
                    </div>
                  </div>
                  <div className='flex flex-col items-start gap-2.5 w-full pl-8'>
                    {chapter.lessons.map((lesson) => {
                      return (
                        <div
                          key={lesson.id}
                          className='w-full bg-white border border-[#BBB6B9] rounded-[5px] py-3 px-3 flex items-center justify-between'
                        >
                          <div className='flex items-center gap-2.5'>
                            <Icons.menu />
                            <h3 className='flex items-center gap-1 text-[15px] font-semibold'>
                              <span>Lesson {lesson.order}:</span>
                              <span>{lesson.title}</span>
                            </h3>
                          </div>
                          <div className='flex items-center gap-4'>
                            <button>
                              <Icons.edit />
                            </button>
                            <button>
                              <Icons.delete />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className='w-full flex items-center px-[52px] gap-5'>
                    <button
                      onClick={() => {
                        openLesson(chapter.id)
                        setOrder(chapter.lessons.length + 1)
                      }}
                      className='flex items-center gap-2 bg-white w-[120px] px-3 py-2 rounded-[6px] text-[15px]'
                    >
                      <Icons.plusBlack />
                      Lesson
                    </button>
                    <button className='flex items-center gap-2 bg-lightblue py-2 px-3 w-[120px] rounded-[6px] text-white text-[15px]'>
                      <Icons.plusWhite />
                      Quiz
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className='mt-10 px-[52px]'>This course has no chapters.</p>
        )}
      </div>
    </div>
  )
}

export default EditCourse
