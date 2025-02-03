import { Journal } from '@prisma/client'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const CustomAreaChart = ({ journals }: { journals: Journal[] }) => {
  const formattedData = journals.map((journal) => ({
    ...journal,
    losings: journal.winnings < 0 ? Math.abs(journal.winnings) : 0,
    winnings: journal.winnings >= 0 ? journal.winnings : 0,
  }))

  return (
    <div className='w-[450px] h-[330px]'>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart width={450} height={330} data={formattedData}>
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
          <Area
            type='monotone'
            dataKey='winnings'
            stackId={2}
            fill='url(#winningsGradient)'
            stroke='#2E7D32'
          />
          <Area
            type='monotone'
            dataKey='losings'
            stackId={1}
            fill='url(#losingsGradient)'
            stroke='#C62828'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomAreaChart
