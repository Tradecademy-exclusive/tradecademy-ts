'use client'

import { formatToDollars } from '@/lib/utils'
import { useState } from 'react'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from './button'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import Image from 'next/image'
import axios from 'axios'
import { LuLoaderCircle } from 'react-icons/lu'

const JournalForm = () => {
  const [score, setScore] = useState<string>('')
  const [winnings, setWinnings] = useState<string>('')
  const [rawWinnings, setRawWinnings] = useState<string>('')
  const [biggestLesson, setBiggestLesson] = useState<string>('')
  const [tommorowPlan, setTommorowPlan] = useState<string>('')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [uploading, setUploading] = useState<boolean>(false)

  const handleWinningsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/(?!^-)[^0-9.]/g, '')

    const parts = rawValue.split('.')
    if (parts.length > 2) rawValue = parts[0] + '.' + parts.slice(1).join('')

    setRawWinnings(rawValue)

    const numericValue = parseFloat(rawValue)
    if (!isNaN(numericValue)) {
      setWinnings(formatToDollars(numericValue))
    } else {
      setWinnings('')
    }
  }

  const uploadJournal = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (score !== '0' && !score) {
        return toast.error('Score must be provided', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }
      if (!rawWinnings) {
        return toast.error('Winnings must be provided', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }
      if (!biggestLesson) {
        return toast.error('Todays biggest lesson must be provided', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }
      if (!tommorowPlan) {
        return toast.error('Plan for tommorow must be provided', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }
      if (!date) {
        return toast.error('Date must be provided', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }

      setUploading(true)
      const { data } = await axios.post('/api/journal', {
        score: Number(score),
        winnings: Number(rawWinnings.replace(/(?!^-)[^0-9.]/g, '')),
        biggestLesson,
        tommorowPlan,
        date,
      })

      if (data.journal) {
        setUploading(false)
        setTommorowPlan('')
        setScore('')
        setWinnings('')
        setRawWinnings('')
        setBiggestLesson('')
        setDate(new Date())
        toast.error('Journal has been uploaded', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }
    } catch (err) {
      setUploading(false)
      console.log(err)
      return toast.error('Something went wrong', {
        icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
      })
    }
  }

  return (
    <form
      onSubmit={uploadJournal}
      className='p-6 xl:p-7 h-full w-full flex flex-col items-start gap-5 rounded-[20px] shadow-evenLight'
    >
      <h3 className='text-xl font-bold'>Your Journal</h3>
      <div className='w-full flex items-center gap-3'>
        <div className='flex flex-col items-start w-full gap-1'>
          <label htmlFor='score' className='text-sm'>
            Today&apos;s score
          </label>
          <input
            id='score'
            type='number'
            className='outline-none border border-[#00000033] placeholder:text-[#00000033] px-3 py-1.5 w-full text-[15px]'
            placeholder='0 out of 100'
            value={score}
            onChange={(e) => {
              const numberValue = Number(e.target.value)
              if (numberValue < 0) return setScore('0')
              if (numberValue > 100) return setScore('100')
              setScore(e.target.value)
            }}
          />
        </div>

        <div className='flex flex-col items-start w-full gap-1'>
          <label htmlFor='winnings' className='text-sm'>
            Winnings
          </label>
          <input
            id='winnings'
            type='text'
            className='outline-none border border-[#00000033] placeholder:text-[#00000033] px-3 py-1.5 w-full text-[15px]'
            placeholder='$0.00'
            value={rawWinnings}
            onChange={handleWinningsChange}
            onBlur={() => {
              const numericValue = parseFloat(rawWinnings)
              if (!isNaN(numericValue)) {
                setWinnings(formatToDollars(numericValue))
                setRawWinnings(formatToDollars(numericValue))
              }
            }}
            onFocus={() => setRawWinnings(winnings.replace(/[^0-9.-]/g, ''))}
          />
        </div>
      </div>
      <div className='flex flex-col items-start w-full gap-1'>
        <label htmlFor='biggestLesson' className='text-sm'>
          Biggest Lesson today
        </label>
        <textarea
          id='biggestLesson'
          className='outline-none border border-[#00000033] placeholder:text-[#00000033] h-[100px] resize-none px-3 py-1.5 w-full text-[15px]'
          placeholder='...'
          value={biggestLesson}
          onChange={(e) => {
            setBiggestLesson(e.target.value)
          }}
        />
      </div>
      <div className='flex flex-col items-start w-full gap-1'>
        <label htmlFor='planTommorow' className='text-sm'>
          My trading plan for tommorow
        </label>
        <textarea
          id='planTommorow'
          className='outline-none border border-[#00000033] placeholder:text-[#00000033] h-[100px] resize-none px-3 py-1.5 w-full text-[15px]'
          placeholder='...'
          value={tommorowPlan}
          onChange={(e) => {
            setTommorowPlan(e.target.value)
          }}
        />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline'>
            {date ? format(date, 'PPP') : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent align='start'>
          <Calendar mode='single' selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
      <div className='mt-auto'>
        <button className='text-white px-9 py-2.5 rounded-[8px] bg-lightblue text-[15px]'>
          {!uploading ? (
            'Upload Journal'
          ) : (
            <div className='flex items-center gap-1.5'>
              <LuLoaderCircle className='animate-spin text-lg' />
              Loading
            </div>
          )}
        </button>
      </div>
    </form>
  )
}

export default JournalForm
