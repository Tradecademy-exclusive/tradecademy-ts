import { Sidebar } from '@/components/dashboard/sidebar'
import Protected from './protected'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full flex items-start gap-5 min-h-screen'>
      <Sidebar />
      <Protected>{children}</Protected>
    </div>
  )
}

export default Layout
