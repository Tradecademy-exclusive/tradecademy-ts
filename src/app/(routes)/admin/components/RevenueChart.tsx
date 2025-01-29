'use client'

import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { format, subDays, subMonths, startOfWeek } from 'date-fns'
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Button } from '@/components/ui/button'
import { EnrollType } from '@/types'
import { formatToEuro } from '@/lib/utils'
import Link from 'next/link'

const timeRanges = ['Day', 'Week', 'Month']

const RevenueChart = ({ enrollments }: { enrollments: EnrollType[] }) => {
  const [selectedRange, setSelectedRange] = useState('Month')

  const groupEnrollments = (range: string) => {
    const groupedData: { period: string; expected: number; made: number }[] = []
    const now = new Date()

    const totalDays = 3 * 30
    const totalWeeks = 3 * 4
    const totalMonths = 3

    let periods: string[] = []

    if (range === 'Day') {
      // Last 7 days
      periods = Array.from({ length: 7 }, (_, i) =>
        format(subDays(now, i), 'EEE')
      ).reverse()
    } else if (range === 'Week') {
      // Last 4 weeks
      periods = Array.from({ length: 6 }, (_, i) =>
        format(startOfWeek(subDays(now, i * 7)), 'MMM d')
      ).reverse()
    } else if (range === 'Month') {
      // Last 3 months
      periods = Array.from({ length: 6 }, (_, i) =>
        format(subMonths(now, i), 'MMM')
      ).reverse()
    }

    enrollments.forEach((enroll) => {
      const createdAt = new Date(enroll.createdAt)
      const price = enroll.course.discountedPrice || enroll.course.price
      let period = ''

      if (range === 'Day') {
        period = format(createdAt, 'EEE')
      } else if (range === 'Week') {
        period = format(startOfWeek(createdAt), 'MMM d')
      } else if (range === 'Month') {
        period = format(createdAt, 'MMM')
      }

      if (periods.includes(period)) {
        const existingGroup = groupedData.find((g) => g.period === period)
        if (existingGroup) {
          existingGroup.made += price
        } else {
          let expected = 0
          if (range === 'Day') {
            expected = 30000 / totalDays
          } else if (range === 'Week') {
            expected = 30000 / totalWeeks
          } else if (range === 'Month') {
            expected = 30000 / totalMonths
          }

          groupedData.push({ period, expected, made: price })
        }
      }
    })

    // Ensure every period is represented, even if no revenue was made
    periods.forEach((period) => {
      if (!groupedData.find((g) => g.period === period)) {
        let expected = 0
        if (range === 'Day') {
          expected = 30000 / totalDays
        } else if (range === 'Week') {
          expected = 30000 / totalWeeks
        } else if (range === 'Month') {
          expected = 30000 / totalMonths
        }
        groupedData.push({ period, expected, made: 0 })
      }
    })

    return groupedData.sort(
      (a, b) => periods.indexOf(a.period) - periods.indexOf(b.period)
    )
  }

  const chartData = groupEnrollments(selectedRange)

  // Filter data based on the selected range
  let filteredData = chartData
  if (selectedRange === 'Month') {
    const currentMonth = format(new Date(), 'MMM')
    filteredData = chartData.filter((data) => data.period === currentMonth)
  } else if (selectedRange === 'Week') {
    const currentWeek = format(startOfWeek(new Date()), 'MMM d')
    filteredData = chartData.filter((data) => data.period === currentWeek)
  } else if (selectedRange === 'Day') {
    const today = format(new Date(), 'EEE')
    filteredData = chartData.filter((data) => data.period === today)
  }

  // Calculate totals based on the filtered data
  const totalExpected = filteredData.reduce(
    (acc, curr) => acc + curr.expected,
    0
  )
  const totalMade = filteredData.reduce((acc, curr) => acc + curr.made, 0)

  // Calculate the percentage difference
  const percentageDiff =
    totalExpected === 0
      ? 0
      : ((totalMade - totalExpected) / totalExpected) * 100

  return (
    <Card className='border-[#B9B0B0B2] !shadow-none !overflow-hidden w-[450px] h-[480px]'>
      <div className='flex items-center justify-between w-full py-6 px-6 border-b mb-3 border-[#B9B0B0B2] bg-[#F0F0F0]'>
        <div className='flex flex-col items-start w-fit translate-y-1'>
          <CardTitle>Revenue Chart</CardTitle>
          <CardDescription>Sales from Last 6 month</CardDescription>
        </div>
        <Link
          href='/admin/enrollments'
          className='px-5 py-1.5 rounded-[5px] text-[15px] font-medium border border-[#B9B0B0B2]'
        >
          View Sales
        </Link>
      </div>
      <CardContent>
        <div className='flex gap-4 mb-4'>
          {timeRanges.map((range) => (
            <Button
              key={range}
              variant={selectedRange === range ? 'default' : 'outline'}
              onClick={() => {
                setSelectedRange(range)
              }}
            >
              {range}
            </Button>
          ))}
        </div>
        <div className='w-full flex flex-col items-start gap-3'>
          <div className='flex flex-col items-start'>
            <span className='text-2xl font-medium'>
              {formatToEuro(Number(totalMade.toFixed(2)))}
            </span>
            <div className='flex items-center gap-2 text-sm font-medium'>
              <span
                className={`flex items-center text-sm ${
                  percentageDiff >= 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {percentageDiff >= 0 ? (
                  <IoIosArrowRoundUp className='text-xl' />
                ) : (
                  <IoIosArrowRoundDown className='text-xl' />
                )}
                {percentageDiff.toFixed(1)}%
              </span>
              <span className='text-gray-600'>vs target revenue</span>
            </div>
          </div>
          <ChartContainer config={{}} className='!w-full h-[200px]'>
            <BarChart data={chartData} barCategoryGap={'25%'}>
              <CartesianGrid vertical={false} strokeDasharray={'5 5'} />
              <XAxis dataKey='period' tickLine={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator='dashed' />}
              />
              <Bar
                dataKey='expected'
                name='Target Revenue'
                fill='#8c6df2'
                radius={100}
              />
              <Bar
                dataKey='made'
                name='Made Revenue'
                fill='#5ebc82'
                radius={100}
              />
            </BarChart>
          </ChartContainer>
          <div className='flex items-center gap-10'>
            <div className='flex items-center font-medium gap-2 text-[15px]'>
              <div className='w-[10px] h-[10px] text-gray-600 rounded-full bg-[#5ebc82]' />
              Income
            </div>
            <div className='flex text-gray-600 items-center font-medium gap-2 text-[15px]'>
              <div className='w-[10px] h-[10px] rounded-full bg-[#8c6df2]' />
              Target
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'></CardFooter>
    </Card>
  )
}

export default RevenueChart
