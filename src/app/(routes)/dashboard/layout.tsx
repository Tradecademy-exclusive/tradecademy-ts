import { Sidebar } from '@/components/dashboard/sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full flex items-start gap-5 bg-creme min-h-screen'>
      <Sidebar />
      {children}
    </div>
  )
}

export default Layout
