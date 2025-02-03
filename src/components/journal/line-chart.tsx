import { Journal } from '@prisma/client'
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const CustomLineChart = ({ journals }: { journals: Journal[] }) => {
  const formattedData = journals.map((journal) => ({
    ...journal,
    losings: journal.winnings < 0 ? Math.abs(journal.winnings) : 0,
    winnings: journal.winnings >= 0 ? journal.winnings : 0,
  }))

  return (
    <div className='w-[450px] h-[330px]'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart width={450} height={330} data={formattedData}>
          <defs>
            <linearGradient
              id='winningsGradient'
              x1='0%'
              y1='0%'
              x2='0%'
              y2='100%'
            >
              <stop offset='0%' stopColor='#9CD5B1' stopOpacity={1} />
              <stop offset='100%' stopColor='#DCF0E4' stopOpacity={1} />
            </linearGradient>

            <linearGradient
              id='losingsGradient'
              x1='0%'
              y1='0%'
              x2='0%'
              y2='100%'
            >
              <stop offset='0%' stopColor='#E53935' stopOpacity={1} />
              <stop offset='100%' stopColor='#EEB9B7' stopOpacity={1} />
            </linearGradient>
          </defs>

          <YAxis />
          <XAxis />

          <Tooltip />

          <CartesianGrid strokeDasharray='5 5' />
          <Line
            type='monotone'
            dataKey='winnings'
            stroke='#5ebc82'
            strokeWidth={2}
          />
          <Line
            type='monotone'
            dataKey='losings'
            stroke='#ef4444'
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart
