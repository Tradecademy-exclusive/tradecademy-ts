'use client'
import { redirect } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import AdminProvider from './AdminProvider'

const AdminProtection = ({
  children,
  admins,
}: {
  children: React.ReactNode
  admins: string[]
}) => {
  const { user, isLoaded } = useUser()

  if (isLoaded && !user) {
    return redirect('/')
  }

  if (user && !admins.includes(user.primaryEmailAddress?.emailAddress || '')) {
    return redirect('/dashboard')
  }

  if (!user) {
    return <div></div>
  }

  return <AdminProvider>{children}</AdminProvider>
}

export default AdminProtection
