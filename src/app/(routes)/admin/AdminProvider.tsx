'use client'
import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { CourseType, EnrollType } from '@/types'

interface AdminContextType {
  courses: CourseType[] | null
  setCourses: React.Dispatch<React.SetStateAction<CourseType[] | null>>
  enrollments: EnrollType[] | null
  setEnrollments: React.Dispatch<React.SetStateAction<EnrollType[] | null>>
  loading: boolean
}

export const AdminContext = createContext<AdminContextType>({
  courses: [],
  setCourses: () => null,
  enrollments: null,
  setEnrollments: () => null,
  loading: true,
})

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [courses, setCourses] = useState<CourseType[] | null>(null)
  const [enrollments, setEnrollments] = useState<EnrollType[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, enrollmentsRes] = await Promise.all([
          axios.get('/api/courses'),
          axios.get('/api/admin/enroll'),
        ])
        setCourses(coursesRes.data.courses)
        setEnrollments(enrollmentsRes.data.enrollments)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading)
    return (
      <div className='h-screen flex items-center justify-center'>
        Loading...
      </div>
    )

  return (
    <AdminContext.Provider
      value={{ courses, setCourses, enrollments, setEnrollments, loading }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export default AdminProvider
