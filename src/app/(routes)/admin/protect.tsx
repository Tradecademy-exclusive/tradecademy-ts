'use client'
import { AuthContext } from '@/providers/AuthProvider'
import { useContext } from 'react'
import { redirect } from 'next/navigation'

const AdminProtection = ({
  children,
  admins,
}: {
  children: React.ReactNode
  admins: string[]
}) => {
  const { session, loading } = useContext(AuthContext)

  console.log(admins)

  if (!loading && !session) {
    return redirect('/')
  }

  if (session && !admins.includes(session.user.email)) {
    return redirect('/dashboard')
  }

  if (!session) {
    return <div></div>
  }

  return <>{children}</>
}

export default AdminProtection
