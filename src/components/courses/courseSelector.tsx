'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ChapterType, LessonType } from '@/types'
import { Icons } from '../icons'

const CourseSelector = ({
  chapters,
  open,
  setOpen,
  lesson: selectedLesson,
}: {
  chapters: ChapterType[]
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  lesson: LessonType
}) => {
  return (
    <div
      className={`h-full fixed top-0 right-0 transition-all duration-300 lg:-right-5 flex items-start z-[999] overflow-hidden ${
        !open && 'translate-x-[310px]'
      }`}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className='py-4 pl-2 pr-1 bg-charcoal rounded-l-[5px] mt-10'
      >
        <Icons.arrowRight />
      </button>
      <div
        className={`min-w-[310px] max-w-[310px] bg-charcoal  h-full right-0 top-0 flex flex-col items-start pt-5 pb-2 overflow-y-auto overflow-x-hidden`}
      >
        <h2
          className={`text-lg text-white font-semibold px-5 ${
            !open && 'whitespace-nowrap'
          }`}
        >
          Course Content
        </h2>
        <div className='w-full flex flex-col items-start mt-5'>
          {chapters.map((chapter) => {
            return (
              <Accordion
                key={chapter.id}
                type='single'
                collapsible
                className='w-full'
                style={{
                  border: 'none',
                  boxShadow: 'none',
                }}
              >
                <AccordionItem value={chapter.id}>
                  <AccordionTrigger className='w-full flex items-center justify-between px-5'>
                    <h3
                      className={`text-base text-white font-medium ${
                        !open && 'whitespace-nowrap'
                      }`}
                    >
                      {chapter.chapter}. {chapter.title}
                    </h3>
                    <span className='text-white'>
                      0/{chapter.lessons.length}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className='w-full flex flex-col items-start'>
                    {chapter.lessons
                      .sort((a, b) => a.order - b.order)
                      .map((lesson) => {
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              const newUrl = new URL(window.location.href)
                              newUrl.searchParams.set('lesson', lesson.id)

                              window.history.pushState({}, '', newUrl)
                              setOpen(false)
                            }}
                            className='w-full flex items-center justify-between px-3 py-3.5 group bg-[#292929]'
                          >
                            <div className='flex items-center gap-2'>
                              <div
                                className={`w-[30px] h-[20px] rounded-[6px] flex items-center justify-center bg-[#4D4D4D] group-hover:bg-tcblue transition-all duration-500 ${
                                  lesson.id === selectedLesson.id &&
                                  '!bg-tcblue'
                                }`}
                              >
                                <svg
                                  width='7'
                                  height='7'
                                  viewBox='0 0 7 7'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M0 0.799072C0 0.191815 0.699988 -0.192455 1.27225 0.0998963L6.55535 2.80085C7.14822 3.10384 7.14822 3.89579 6.55535 4.1992L1.27271 6.90016C0.700446 7.19251 0.000457775 6.80781 0.000457775 6.20098L0 0.799072Z'
                                    fill='white'
                                  />
                                </svg>
                              </div>
                              <h4
                                className={`font-medium text-white ${
                                  !open && 'whitespace-nowrap'
                                }`}
                              >
                                {lesson.title}
                              </h4>
                            </div>
                            <div
                              className={`h-[14px] w-[14px] rounded-full border border-white group-hover:bg-tcblue transition-all duration-200 ${
                                lesson.id === selectedLesson.id && '!bg-tcblue'
                              }`}
                            />
                          </button>
                        )
                      })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CourseSelector
