import { Sidebar } from '@/components/dashboard/sidebar'
import Protected from './protected'
import Header from '@/components/dashboard/header'
import { SidebarMobile } from '@/components/dashboard/sidebarMobile'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full flex items-start gap-5 min-h-screen relative overflow-x-hidden'>
      <div className='w-full h-full flex items-start gap-0'>
        <div className='hidden lg:block'>
          <Sidebar />
        </div>
        <div className='block lg:hidden'>
          <SidebarMobile />
        </div>
        <div className='w-full flex flex-col items-start gap-5'>
          <Header />
          <Protected>
            <div className='translate-x-[315px] w-[calc(100%-335px)] max-lg:translate-x-[55px] max-lg:w-[calc(100%-55px)]'>
              {children}
            </div>
          </Protected>
        </div>
      </div>
    </div>
  )
}

export default Layout
