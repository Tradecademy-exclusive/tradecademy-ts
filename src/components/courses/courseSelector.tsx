import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ChapterType } from '@/types'

const CourseSelector = ({ chapters }: { chapters: ChapterType[] }) => {
  return (
    <div className='min-w-[310px] max-w-[310px] bg-[#1D1D1D] h-full fixed right-0 top-0  flex flex-col lg:-right-5 items-start pt-5 pb-2 overflow-y-auto'>
      <h2 className='text-lg text-white font-semibold px-5'>Course Content</h2>
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
                  <h3 className='text-base text-white font-medium'>
                    {chapter.chapter}. {chapter.title}
                  </h3>
                  <span className='text-white'>0/{chapter.lessons.length}</span>
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
                          }}
                          className='w-full flex items-center justify-between px-3 py-3.5 group bg-[#292929]'
                        >
                          <div className='flex items-center gap-2'>
                            <div
                              className={`w-[30px] h-[20px] rounded-[6px] flex items-center justify-center bg-[#4D4D4D] group-hover:bg-tcblue transition-all duration-500`}
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
                            <h4 className='font-medium text-white'>
                              {lesson.title}
                            </h4>
                          </div>
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
  )
}

export default CourseSelector
