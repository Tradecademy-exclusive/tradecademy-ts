/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import OpacityBackground from '@/components/opacityBackground'
import CourseHeader from '../../components/CourseHeader'
import CreateLesson from '../../components/CreateLesson'
import EditCourse from '../../components/EditCourse'
import { CourseType } from '@/types'
import { useEffect, useMemo, useState } from 'react'
import EditLesson from '../../components/EditLesson'
import UploadCourse from '../../components/UploadCourse'
import { publicType } from '@prisma/client'
import { toast } from 'react-toastify'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Icons } from '@/components/icons'
import CreateChapter from '../../components/CreateChapter'
import UpdateChapter from '../../components/EditChapter'
import DeleteLesson from '../../components/DeleteLesson'
import DeleteChapter from '../../components/DeleteChapter'
import DeleteCourse from '../../components/DeleteCourse'
import { useContext } from 'react'
import { AdminContext } from '../../AdminProvider'

interface LessonComponentsObj {
  Component: React.ComponentType<any>
  props: any
  active: boolean
}

const Wrapper = ({ courses }: { courses: CourseType[] | null }) => {
  const { setCourses } = useContext(AdminContext)
  const router = useRouter()
  // chapter id
  const [lessonOpen, setLessonOpen] = useState<string>('')
  const [lessonId, setLessonId] = useState<string>('')
  const [order, setOrder] = useState<number>(1)
  const [attachments, setAttachments] = useState<string[]>([])
  const [image, setImage] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [maxStudents, setMaxStudents] = useState<string>('')
  const [learn, setLearn] = useState<string>('')
  const [courseStatus, setCourseStatus] = useState<publicType>('Published')
  const [paid, setPaid] = useState<boolean>(true)
  const [price, setPrice] = useState<string>('')
  const [discountedPrice, setDiscountedPrice] = useState<string>('')
  const [cover, setCover] = useState<string>('')
  const [duration, setDuration] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [chapterOpen, setChapterOpen] = useState<boolean>(false)
  const [chapterId, setChapterId] = useState<string>('')
  const [deleteLessonId, setDeleteLessonId] = useState<string>('')
  const [deleteChapterId, setDeleteChapterId] = useState<string>('')
  const [deleting, setDeleting] = useState<boolean>(false)
  const [deleteCourseId, setDeleteCourseId] = useState<string>('')
  const [courseById, setCourseById] = useState<CourseType | null>(null)

  useEffect(() => {
    if (courses && courses[0]) {
      const course = courses[0]
      setCourseById(course)
      setTitle(course.title)
      setDescription(course.description)
      setMaxStudents(course.maxStudents.toString())
      setLearn(course.learn)
      setCourseStatus(course.publishedCourse)
      setPaid(() => (course.price ? true : false))
      setPrice(course.price.toString())
      setDiscountedPrice(course.discountedPrice.toString())
      setCover(course.cover)
      setDuration(course.duration)
    }
  }, [courses])

  const lessonComponents = useMemo<LessonComponentsObj[]>(() => {
    return [
      {
        Component: EditLesson,
        props: {
          opened: lessonId,
          close: () => setLessonId(''),
          attachments,
          setAttachments,
          courseId: courseById?.id || '',
          image,
          setImage,
        },
        active: !!lessonId,
      },
      {
        Component: CreateLesson,
        props: {
          order,
          opened: lessonOpen,
          close: () => setLessonOpen(''),
          courseId: courseById?.id || '',
          attachments,
          setAttachments,
          image,
          setImage,
        },
        active: !!lessonOpen,
      },
    ]
  }, [lessonId, lessonOpen, attachments, image, order, courseById?.id])

  const publishCourse = async () => {
    try {
      if (!title || !description || !learn || !cover || !duration) {
        return toast.error('Please fill out all the fields!', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }
      if (paid && Number(price) <= Number(discountedPrice)) {
        return toast.error('Sales price must be less than regular price!', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }
      setLoading(true)
      const { data } = await axios.post('/api/admin/courses', {
        title,
        description,
        maxStudents: Number(maxStudents),
        learn,
        price: paid ? Number(price) : 0,
        discountedPrice: paid ? Number(discountedPrice) : 0,
        cover: cover,
        publishedCourse: courseStatus,
        duration: duration,
      })
      if (data.course) {
        setCourses((prev) => [...prev!, data.course])
        setLoading(false)
        router.push('/admin/courses')
        toast.error('Course has been published', {
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

  const updateCourse = async () => {
    try {
      if (!title || !description || !learn || !cover || !duration) {
        return toast.error('Please fill out all the fields!', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }
      if (paid && Number(price) <= Number(discountedPrice)) {
        return toast.error('Sales price must be less than regular price!', {
          icon: <Image src='/tc_icon.svg' alt='' height={25} width={25} />,
        })
      }
      setLoading(true)
      const { data } = await axios.put('/api/admin/courses', {
        id: courses![0].id,
        title,
        description,
        maxStudents: Number(maxStudents),
        learn,
        price: paid ? Number(price) : 0,
        discountedPrice: paid ? Number(discountedPrice) : 0,
        cover: cover,
        publishedCourse: courseStatus,
        duration: duration,
      })
      if (data.course) {
        setLoading(false)
        router.push('/admin/courses')
        toast.error('Course has been published', {
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
    <div className='w-full py-5 px-10 max-lg:px-5 max-md:px-4 max-sm:px-2.5 flex flex-col min-h-screen items-start gap-3 relative bg-[#F0F0F0]'>
      <OpacityBackground
        opened={
          !!lessonOpen ||
          !!lessonId ||
          chapterOpen ||
          !!chapterId ||
          !!deleteLessonId ||
          !!deleteChapterId ||
          !!deleteCourseId
        }
        close={() => {
          setLessonId('')
          setLessonOpen('')
          setChapterId('')
          setLessonId('')
          setChapterOpen(false)
          setDeleteChapterId('')
          setDeleteCourseId('')
        }}
      />

      {courses && courses[0] && (
        <>
          <CreateChapter
            opened={chapterOpen}
            setOpened={setChapterOpen}
            length={courses[0].chapters.length}
            courseId={courseById?.id || ''}
          />
          <UpdateChapter
            id={chapterId}
            opened={chapterId}
            setOpened={setChapterId}
            courseId={courseById?.id || ''}
          />
        </>
      )}

      {lessonComponents
        .filter((lesson) => lesson.active)
        .map(({ Component, props, active }, idx) => (
          <div
            key={idx}
            className={`${
              active ? 'opacity-100' : 'opacity-0'
            } transition-all duration-300`}
          >
            <Component {...props} />
          </div>
        ))}

      <DeleteLesson
        courseId={courseById?.id || ''}
        lessonId={deleteLessonId}
        setLessonId={setDeleteLessonId}
      />
      <DeleteChapter
        chapterId={deleteChapterId}
        setChapterId={setDeleteChapterId}
      />

      <DeleteCourse
        courseId={deleteCourseId}
        setCourseId={setDeleteCourseId}
        setLoading={setDeleting}
      />

      <CourseHeader
        page={!courses ? 'Create Course' : 'Update Course'}
        buttons={[
          ...(courses && courses[0]
            ? [
                {
                  label: 'Delete Course',
                  color: 'white',
                  bg: '#F44337',
                  action: () => setDeleteCourseId(courses[0].id),
                  loading: deleting,
                },
              ]
            : []),
          {
            loading: loading,
            label: 'Publish Course',
            color: 'white',
            bg: '#266CF7',
            action:
              courses && courses?.length > 0 ? updateCourse : publishCourse,
          },
        ]}
      />

      <div className='w-full flex flex-col items-start gap-10 relative mt-[200px] max-lg:mt-[280px]'>
        <UploadCourse
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          learn={learn}
          setLearn={setLearn}
          courseStatus={courseStatus}
          setCourseStatus={setCourseStatus}
          maxStudents={maxStudents}
          setMaxStudents={setMaxStudents}
          paid={paid}
          setPaid={setPaid}
          price={price}
          setPrice={setPrice}
          discountedPrice={discountedPrice}
          setDiscountedPrice={setDiscountedPrice}
          cover={cover}
          setCover={setCover}
          duration={duration}
          setDuration={setDuration}
        />
        <div className='w-full flex items-start gap-7'>
          <section
            id='builder'
            className='w-full h-[96vh] flex flex-col items-start gap-5 border rounded-[15px] border-[#B9B0B0B2] overflow-auto'
          >
            <div className='w-full min-h-[100px] max-h-[100px] border-b border-[#B9B0B0B2] px-10 flex items-center justify-start'>
              <h2 className='text-lg font-bold'>Course Builder</h2>
            </div>
            <div className='w-full flex flex-col items-start gap-3 px-5'>
              {courses &&
                courses.map((course) => {
                  return (
                    <EditCourse
                      openLesson={setLessonOpen}
                      key={course.id}
                      course={course as CourseType}
                      setOrder={setOrder}
                      setLessonId={setLessonId}
                      setChapterId={setChapterId}
                      setDeleteLessonId={setDeleteLessonId}
                      setDeleteChapterId={setDeleteChapterId}
                    />
                  )
                })}
            </div>
            {courses && courses[0] && (
              <button
                onClick={() => setChapterOpen(true)}
                className='mt-auto mb-3 ml-3 flex items-center gap-2 bg-lightblue px-2.5 py-2.5 text-sm rounded-[5px] text-white'
              >
                <Icons.plusWhite />
                Add New Chapter
              </button>
            )}
          </section>
          <div className='min-w-[250px] max-w-[250px] max-lg:hidden' />
        </div>
      </div>
    </div>
  )
}

export default Wrapper
