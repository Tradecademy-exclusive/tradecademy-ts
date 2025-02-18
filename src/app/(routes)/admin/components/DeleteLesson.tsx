'use client'

import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const DeleteLesson = ({
  lessonId,
  setLessonId,
  courseId,
}: {
  lessonId: string
  courseId: string
  setLessonId: React.Dispatch<React.SetStateAction<string>>
}) => {
  const router = useRouter()
  const deleteLesson = async () => {
    try {
      const { data } = await axios.delete(
        `/api/admin/courses/lesson?id=${lessonId}?courseId=${courseId}`
      )

      if (data.deletedLesson) {
        setLessonId('')
        toast.error('Lesson has been deleted', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
        router.refresh()
      }
    } catch (err) {
      console.log(err)
      toast.error('Something went wrong', {
        icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
      })
    }
  }

  return (
    <div
      className={`w-[400px] transition-all duration-200 p-8 rounded-[15px] flex flex-col items-center bg-[#d0e0f5] gap-5 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[999] ${
        lessonId
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <h3 className='text-lg font-semibold text-center'>
        Are you sure u want to delete this lesson?
      </h3>
      <div className='w-full flex items-center justify-center gap-10'>
        <button
          onClick={deleteLesson}
          className='bg-lightblue text-white w-[110px] py-1.5 rounded-[5px]'
        >
          Yes
        </button>
        <button
          onClick={() => setLessonId('')}
          className='bg-[#C81313] text-white w-[110px] py-1.5 rounded-[5px]'
        >
          No
        </button>
      </div>
    </div>
  )
}

export default DeleteLesson
