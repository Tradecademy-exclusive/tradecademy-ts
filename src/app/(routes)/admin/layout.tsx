import AdminProtection from './protect'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const admins = JSON.parse(process.env.ADMINS || '[]')

  return <AdminProtection admins={admins}>{children}</AdminProtection>
}

export default AdminLayout
