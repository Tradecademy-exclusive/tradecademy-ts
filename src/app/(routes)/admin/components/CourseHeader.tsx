import Link from 'next/link'

const ROUTES = [
  {
    label: 'Plan Course',
    path: '/admin/courses/plan',
  },
  {
    label: 'Create Your Course',
    path: '/admin/courses/upload',
  },
  {
    label: 'Edit Course',
    path: '/admin/courses/edit',
  },
  {
    label: 'Pricing Plan',
    path: '/admin/courses/pricing',
  },
  {
    label: 'Course Website',
    path: '/admin/courses/website',
  },
  {
    label: 'Create Quiz',
    path: '/admin/courses/quizzes',
  },
]

interface CourseHeaderProps {
  page: string
  path: string
  buttons?: {
    label: string
    action: () => void
    color: string
    bg: string
  }[]
}

const CourseHeader = ({ page, path, buttons }: CourseHeaderProps) => {
  return (
    <>
      <div className='absolute w-full top-0 left-0 h-[250px] bg-gradient-to-b from-[#6C91FF80] to-[#ffffff] z-[-1]' />
      <div className='w-full flex flex-col items-start gap-2 mt-16'>
        <div className='w-full flex items-center justify-between'>
          <div className='flex items-start gap-4'>
            <svg
              width='30'
              height='18'
              viewBox='0 0 25 13'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='translate-y-[8px]'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M5.93224 0.31619C6.09791 0.518909 6.19096 0.793704 6.19096 1.08021C6.19096 1.36672 6.09791 1.64152 5.93224 1.84424L3.01881 5.40488H22.1154C22.35 5.40488 22.575 5.51878 22.7409 5.72154C22.9068 5.9243 23 6.1993 23 6.48604C23 6.77278 22.9068 7.04778 22.7409 7.25054C22.575 7.4533 22.35 7.56721 22.1154 7.56721H3.01881L5.93224 11.1278C6.01916 11.2268 6.08887 11.3462 6.13722 11.4788C6.18557 11.6114 6.21157 11.7546 6.21367 11.8998C6.21576 12.0449 6.19391 12.1891 6.14942 12.3238C6.10493 12.4584 6.0387 12.5807 5.9547 12.6833C5.87069 12.786 5.77063 12.8669 5.66048 12.9213C5.55032 12.9757 5.43234 13.0024 5.31355 12.9998C5.19477 12.9973 5.07763 12.9655 4.96911 12.9064C4.8606 12.8473 4.76293 12.7621 4.68194 12.6559L0.258718 7.25006C0.0930525 7.04734 0 6.77255 0 6.48604C0 6.19953 0.0930525 5.92474 0.258718 5.72202L4.68194 0.31619C4.84782 0.113723 5.07266 0 5.30709 0C5.54153 0 5.76637 0.113723 5.93224 0.31619Z'
                fill='black'
                fillOpacity='0.7'
              />
            </svg>
            <div className='flex flex-col items-start gap-1'>
              <h1 className='font-bold text-2xl'>{page}</h1>
              <span className='text-sm text-black/90'>{path}</span>
            </div>
          </div>
          {buttons && (
            <div className='flex items-center gap-3'>
              {buttons.map((button) => (
                <button
                  key={button.label}
                  className='text-sm px-3 py-2.5 font-medium rounded-[5px]'
                  style={{
                    background: button.bg,
                    color: button.color,
                  }}
                >
                  {button.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className='flex items-center gap-2'>
          {ROUTES.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className='bg-white px-4 py-2.5 rounded-[5px] text-sm font-medium'
            >
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default CourseHeader