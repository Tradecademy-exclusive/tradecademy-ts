import { Sidebar } from '@/components/dashboard/sidebar'
import Protected from './protected'
import Header from '@/components/dashboard/header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full flex items-start gap-5 min-h-screen relative'>
      <div className='w-full h-full flex items-start gap-0'>
        <Sidebar />
        <div className='w-full flex flex-col items-start gap-5'>
          <Header />
          <Protected>
            <div className='translate-x-[315px] w-[calc(100%-335px)]'>
              {children}
            </div>
          </Protected>
        </div>
      </div>
    </div>
  )
}

export default Layout
