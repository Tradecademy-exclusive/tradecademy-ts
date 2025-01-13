'use client'

import { LuLayoutGrid } from 'react-icons/lu'
import { Icons } from '../icons'
import NavLink from './navLink'
import { usePathname } from 'next/navigation'
import { BsJournalText } from 'react-icons/bs'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { IoExitOutline, IoSettingsOutline } from 'react-icons/io5'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { BsChat } from 'react-icons/bs'

export const Sidebar = () => {
  const router = useRouter()
  const { setSession } = useContext(AuthContext)
  const pathname = usePathname()

  const logout = async () => {
    await axios.delete('/api/auth')
    setSession(null)
    router.replace('/')
  }

  return (
    <div className='bg-charcoal min-w-[300px] max-w-[300px] rounded-r-2xl py-9 px-12 fixed left-0 top-0 flex flex-col items-center gap-8 min-h-screen h-full'>
      <Icons.icon />
      <nav className='w-fit flex flex-col items-start gap-6'>
        <NavLink
          Icon={
            <LuLayoutGrid
              className={`text-xl group-hover:text-tcblue transition-all duration-300 ${
                pathname === '/dashboard' ? 'text-tcblue' : 'text-white'
              }`}
            />
          }
          label='Dashboard'
          href='/dashboard'
        />
        <NavLink
          Icon={
            <svg
              width='22'
              height='15'
              viewBox='0 0 16 11'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7.08955 7.51831C6.77913 7.45589 6.48313 7.33594 6.21682 7.16465L2.72587 4.92292L2.25243 7.34148C2.02426 8.51654 3.93516 9.87983 6.52484 10.3875C9.11453 10.8952 11.3962 10.3533 11.6586 9.18393L12.132 6.76536L8.05356 7.52402C7.74434 7.58106 7.42729 7.58106 7.11807 7.52402L7.08955 7.51831Z'
                className={`
                  ${
                    pathname === '/dashboard/courses'
                      ? 'fill-tcblue'
                      : 'fill-white'
                  }
                   group-hover:fill-tcblue transition-all duration-300`}
              />
              <path
                d='M15.4518 4.76867C15.4378 4.84977 15.399 4.92454 15.3408 4.98274C15.2826 5.04095 15.2078 5.07974 15.1267 5.09381L7.99081 6.41718C7.52688 6.50351 7.04748 6.40967 6.65033 6.15479L2.22961 3.30841L1.77898 5.59007C1.86996 5.68262 1.93718 5.7958 1.97493 5.91996C2.01267 6.04412 2.01982 6.17557 1.99574 6.30309C1.97533 6.4232 1.92771 6.53705 1.85652 6.63592C1.78534 6.73479 1.69248 6.81606 1.58504 6.87351V8.28814C1.58483 8.38156 1.56432 8.47381 1.52492 8.55852C1.48552 8.64322 1.42818 8.71835 1.35688 8.7787C1.28494 8.83868 1.20037 8.88164 1.1095 8.90436C1.01863 8.92707 0.9238 8.92897 0.832094 8.90989L0.495549 8.84715C0.404019 8.82767 0.317827 8.7885 0.242963 8.73235C0.1681 8.6762 0.10636 8.60443 0.0620332 8.52201C0.0212169 8.43853 0 8.34684 0 8.25391C0 8.16099 0.0212169 8.0693 0.0620332 7.98582L0.632449 6.67957C0.555664 6.58944 0.500361 6.48305 0.470716 6.36843C0.441071 6.2538 0.43786 6.13393 0.461324 6.01789C0.487682 5.8922 0.54396 5.77473 0.625385 5.67543C0.706811 5.57613 0.810982 5.49794 0.929065 5.44747L1.44814 2.81785L0.575407 2.23603C0.506424 2.19044 0.45235 2.12559 0.4199 2.04953C0.387449 1.97348 0.378052 1.88957 0.392874 1.80822C0.409554 1.72732 0.449917 1.65321 0.508829 1.59532C0.567741 1.53742 0.64254 1.49835 0.723715 1.48308L5.62929 0.570416L8.48137 0L8.99474 0.325137L9.60509 0.701611L15.2351 4.32375C15.3153 4.36351 15.3801 4.42875 15.4193 4.50925C15.4586 4.58975 15.47 4.68098 15.4518 4.76867Z'
                className={`
                  ${
                    pathname === '/dashboard/courses'
                      ? 'fill-tcblue'
                      : 'fill-white'
                  }
                   group-hover:fill-tcblue transition-all duration-300`}
              />
            </svg>
          }
          label='Courses'
          href='/dashboard/courses'
        />
        <NavLink
          Icon={
            <BsJournalText
              className={`text-xl group-hover:text-tcblue transition-all duration-300 ${
                pathname === '/plan' ? 'text-tcblue' : 'text-white'
              }`}
            />
          }
          label='Trading Plan'
          href='/plan'
        />
        <NavLink
          Icon={
            <svg
              width='21'
              height='21'
              viewBox='0 0 13 14'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
            >
              <rect
                x='0.5'
                y='0.5'
                width='12'
                height='13'
                rx='1.5'
                className={`
                  ${pathname === '/journal' ? 'stroke-tcblue' : 'stroke-white'}
                   group-hover:stroke-tcblue transition-all duration-300`}
              />
              <rect
                x='8.75'
                y='3.25'
                width='6.5'
                height='0.5'
                rx='0.25'
                transform='rotate(90 8.75 3.25)'
                className={`
                  ${pathname === '/journal' ? 'stroke-tcblue' : 'stroke-white'}
                   group-hover:stroke-tcblue transition-all duration-300`}
                strokeWidth='0.5'
              />
              <rect
                x='6.75'
                y='5.25'
                width='4.5'
                height='0.5'
                rx='0.25'
                transform='rotate(90 6.75 5.25)'
                className={`
                  ${pathname === '/journal' ? 'stroke-tcblue' : 'stroke-white'}
                   group-hover:stroke-tcblue transition-all duration-300`}
                strokeWidth='0.5'
              />
              <rect
                x='4.75'
                y='7.25'
                width='2.5'
                height='0.5'
                rx='0.25'
                transform='rotate(90 4.75 7.25)'
                className={`
                  ${pathname === '/journal' ? 'stroke-tcblue' : 'stroke-white'}
                   group-hover:stroke-tcblue transition-all duration-300`}
                strokeWidth='0.5'
              />
            </svg>
          }
          label='Journal'
          href='/journal'
        />
        <NavLink
          Icon={
            <svg
              width='19'
              height='19'
              viewBox='0 0 11 11'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.447 5.50159C10.3011 5.50159 10.1613 5.55952 10.0582 5.66264C9.95506 5.76575 9.89713 5.90561 9.89713 6.05143V9.35048C9.89713 9.4963 9.8392 9.63616 9.73609 9.73927C9.63297 9.84239 9.49312 9.90032 9.34729 9.90032H1.64952C1.50369 9.90032 1.36384 9.84239 1.26073 9.73927C1.15761 9.63616 1.09968 9.4963 1.09968 9.35048V1.65271C1.09968 1.50688 1.15761 1.36703 1.26073 1.26391C1.36384 1.1608 1.50369 1.10287 1.64952 1.10287H4.94857C5.09439 1.10287 5.23425 1.04494 5.33736 0.941825C5.44048 0.83871 5.49841 0.698856 5.49841 0.553029C5.49841 0.407202 5.44048 0.267348 5.33736 0.164233C5.23425 0.0611176 5.09439 0.00318816 4.94857 0.00318816H1.64952C1.21204 0.00318816 0.792479 0.176977 0.483134 0.486322C0.173788 0.795667 0 1.21523 0 1.65271V9.35048C0 9.78796 0.173788 10.2075 0.483134 10.5169C0.792479 10.8262 1.21204 11 1.64952 11H9.34729C9.78477 11 10.2043 10.8262 10.5137 10.5169C10.823 10.2075 10.9968 9.78796 10.9968 9.35048V6.05143C10.9968 5.90561 10.9389 5.76575 10.8358 5.66264C10.7327 5.55952 10.5928 5.50159 10.447 5.50159ZM2.19936 5.91947V8.2508C2.19936 8.39662 2.25729 8.53648 2.36041 8.63959C2.46352 8.74271 2.60338 8.80064 2.7492 8.80064H5.08053C5.15289 8.80106 5.22462 8.78719 5.29161 8.75982C5.35861 8.73246 5.41954 8.69214 5.47091 8.64118L9.27581 4.83079L10.8374 3.30223C10.8889 3.25112 10.9298 3.1903 10.9577 3.1233C10.9856 3.0563 11 2.98443 11 2.91184C11 2.83926 10.9856 2.76739 10.9577 2.70039C10.9298 2.63339 10.8889 2.57257 10.8374 2.52146L8.50603 0.162642C8.45492 0.111106 8.39411 0.0702012 8.3271 0.0422865C8.2601 0.0143719 8.18823 0 8.11565 0C8.04306 0 7.97119 0.0143719 7.90419 0.0422865C7.83719 0.0702012 7.77637 0.111106 7.72526 0.162642L6.17471 1.71869L2.35882 5.52909C2.30786 5.58046 2.26754 5.64139 2.24018 5.70839C2.21281 5.77538 2.19894 5.84711 2.19936 5.91947ZM8.11565 1.3283L9.6717 2.88435L8.89092 3.66513L7.33487 2.10908L8.11565 1.3283ZM3.29904 6.14491L6.5596 2.88435L8.11565 4.4404L4.85509 7.70096H3.29904V6.14491Z'
                className={`
                  ${pathname === '/homework' ? 'fill-tcblue' : 'fill-white'}
                   group-hover:fill-tcblue transition-all duration-300`}
              />
            </svg>
          }
          label='Homework'
          href='/homework'
        />
        <NavLink
          Icon={
            <svg
              width='20'
              height='20'
              viewBox='0 0 13 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                x='0.5'
                y='0.5'
                width='12'
                height='13'
                rx='1.5'
                className={`
                  ${pathname === '/signals' ? 'stroke-tcblue' : 'stroke-white'}
                   group-hover:stroke-tcblue transition-all duration-300`}
              />
              <line
                x1='1'
                y1='9.5'
                x2='2'
                y2='9.5'
                className={`
  ${pathname === '/signals' ? 'stroke-tcblue' : 'stroke-white'}
   group-hover:stroke-tcblue transition-all duration-300`}
              />
              <line
                x1='2'
                y1='8.5'
                x2='3'
                y2='8.5'
                className={`
  ${pathname === '/signals' ? 'stroke-tcblue' : 'stroke-white'}
   group-hover:stroke-tcblue transition-all duration-300`}
              />
              <line
                x1='4'
                y1='8.5'
                x2='5'
                y2='8.5'
                className={`
  ${pathname === '/signals' ? 'stroke-tcblue' : 'stroke-white'}
   group-hover:stroke-tcblue transition-all duration-300`}
              />
              <line
                x1='11'
                y1='5.5'
                x2='12'
                y2='5.5'
                className={`
  ${pathname === '/signals' ? 'stroke-tcblue' : 'stroke-white'}
   group-hover:stroke-tcblue transition-all duration-300`}
              />
              <line
                x1='10'
                y1='4.5'
                x2='11'
                y2='4.5'
                className={`
  ${pathname === '/signals' ? 'stroke-tcblue' : 'stroke-white'}
   group-hover:stroke-tcblue transition-all duration-300`}
              />
              <line
                x1='9'
                y1='5.5'
                x2='10'
                y2='5.5'
                className={`
  ${pathname === '/signals' ? 'stroke-tcblue' : 'stroke-white'}
   group-hover:stroke-tcblue transition-all duration-300`}
              />
              <line
                x1='8'
                y1='6.5'
                x2='9'
                y2='6.5'
                className={`
  ${pathname === '/signals' ? 'stroke-tcblue' : 'stroke-white'}
   group-hover:stroke-tcblue transition-all duration-300`}
              />
              <line
                x1='7'
                y1='7.5'
                x2='8'
                y2='7.5'
                className={`${
                  pathname === '/signals' ? 'stroke-tcblue' : 'stroke-white'
                }group-hover:stroke-tcblue transition-all duration-300`}
              />
              <line
                x1='5.99788'
                y1='6.546'
                x2='6.99788'
                y2='6.546'
                className={`
  ${pathname === '/signals' ? 'stroke-tcblue' : 'stroke-white'}
   group-hover:stroke-tcblue transition-all duration-300`}
              />
              <line
                x1='5'
                y1='7.5'
                x2='6'
                y2='7.5'
                className={`
  ${pathname === '/signals' ? 'stroke-tcblue' : 'stroke-white'}
   group-hover:stroke-tcblue transition-all duration-300`}
              />
              <line
                x1='3'
                y1='7.5'
                x2='4'
                y2='7.5'
                className={`
  ${pathname === '/signals' ? 'stroke-tcblue' : 'stroke-white'}
   group-hover:stroke-tcblue transition-all duration-300`}
              />
            </svg>
          }
          label='Signals'
          href='/signals'
        />
        <NavLink
          Icon={
            <MdOutlineLocalOffer
              className={`text-[23px] group-hover:text-tcblue transition-all duration-300 ${
                pathname === '/offers' ? 'text-tcblue' : 'text-white'
              }`}
            />
          }
          label='Offers'
          href='/offers'
        />
        <NavLink
          Icon={
            <BsChat
              className={`text-xl group-hover:text-tcblue transition-all duration-300 ${
                pathname === '/offers' ? 'text-tcblue' : 'text-white'
              }`}
            />
          }
          label='Chats'
          href='/chats'
        />
      </nav>
      <div className='flex flex-col items-start gap-4 mt-auto w-full'>
        <Link
          href='/settings'
          className='flex items-center gap-3 w-full text-left text-lg  text-white'
        >
          <IoSettingsOutline className='text-[23px]' />
          Settings
        </Link>
        <button
          onClick={logout}
          className='flex items-center gap-3 w-full text-left text-lg  text-white'
        >
          <IoExitOutline className='text-2xl' />
          Log Out
        </button>
      </div>
    </div>
  )
}
