'use client'

import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const DeleteCourse = ({
  courseId,
  setCourseId,
  setLoading,
}: {
  courseId: string
  setCourseId: React.Dispatch<React.SetStateAction<string>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const router = useRouter()

  const deleteCourse = async () => {
    try {
      setLoading(true)
      setCourseId('')
      const { data } = await axios.delete(`/api/admin/courses/?id=${courseId}`)
      if (data.deletedCourse) {
        setLoading(false)
        router.replace('/admin/courses')
        toast.error('Course has been deleted', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
      return toast.error('Something went wrong!', {
        icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
      })
    }
  }

  return (
    <div
      className={`w-[400px] transition-all duration-200 p-8 rounded-[15px] flex flex-col items-center bg-[#d0e0f5] gap-5 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[999] ${
        courseId
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <h3 className='text-lg font-semibold text-center'>
        Are you sure u want to delete this course?
      </h3>
      <div className='w-full flex items-center justify-center gap-10'>
        <button
          onClick={deleteCourse}
          className='bg-lightblue text-white w-[110px] py-1.5 rounded-[5px]'
        >
          Yes
        </button>
        <button
          onClick={() => setCourseId('')}
          className='bg-[#C81313] text-white w-[110px] py-1.5 rounded-[5px]'
        >
          No
        </button>
      </div>
    </div>
  )
}

export default DeleteCourse
