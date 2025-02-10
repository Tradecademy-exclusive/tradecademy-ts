'use client'
import { redirect } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

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

  return <>{children}</>
}

export default AdminProtection
