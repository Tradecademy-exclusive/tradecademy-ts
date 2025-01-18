/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import OpacityBackground from '@/components/opacityBackground'
import CourseHeader from '../components/CourseHeader'
import CreateLesson from '../components/CreateLesson'
import EditCourse from '../components/EditCourse'
import { CourseType } from '@/types'
import { useMemo, useState } from 'react'
import EditLesson from '../components/EditLesson'

interface LessonComponentsObj {
  Component: React.ComponentType<any>
  props: any
  active: boolean
}

const Wrapper = ({ courses }: { courses: CourseType[] }) => {
  // chapter id
  const [lessonOpen, setLessonOpen] = useState<string>('')
  const [lessonId, setLessonId] = useState<string>('')
  const [order, setOrder] = useState<number>(1)
  const [attachments, setAttachments] = useState<string[]>([])
  const [image, setImage] = useState<string>('')

  const lessonComponents = useMemo<LessonComponentsObj[]>(() => {
    return [
      {
        Component: EditLesson,
        props: {
          opened: lessonId,
          close: () => setLessonId(''),
          attachments,
          setAttachments,
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
          attachments,
          setAttachments,
          image,
          setImage,
        },
        active: !!lessonOpen,
      },
    ]
  }, [lessonId, lessonOpen, attachments, image, order])

  const publishCourse = async () => {}

  return (
    <div className='w-full py-5 px-20 flex flex-col h-screen items-start gap-3 relative'>
      <OpacityBackground
        opened={!!lessonOpen || !!lessonId}
        close={() => {
          setLessonId('')
          setLessonOpen('')
        }}
      />

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

      <CourseHeader
        page='Create Course'
        path='Dashboard / My Course / Create Course'
        buttons={[
          {
            label: 'Publish Course',
            color: 'white',
            bg: '#266CF7',
            action: publishCourse,
          },
        ]}
      />
      <div className='w-full flex flex-col items-start gap-10 relative'>
        <section className='w-full h-[77vh] flex flex-col items-start gap-5 border rounded-[15px] border-[#B9B0B0B2] overflow-auto'>
          <div className='w-full min-h-[100px] max-h-[100px] border-b border-[#B9B0B0B2] px-10 flex items-center justify-start'>
            <h2 className='text-lg font-bold'>Course Information</h2>
          </div>
        </section>
        <section className='w-full h-[95vh] flex flex-col items-start gap-5 border rounded-[15px] border-[#B9B0B0B2] overflow-auto'>
          <div className='w-full min-h-[100px] max-h-[100px] border-b border-[#B9B0B0B2] px-10 flex items-center justify-start'>
            <h2 className='text-lg font-bold'>Course Builder</h2>
          </div>
          <div className='w-full flex flex-col items-start gap-3 px-5'>
            {courses.map((course) => {
              return (
                <EditCourse
                  openLesson={setLessonOpen}
                  key={course.id}
                  course={course as CourseType}
                  setOrder={setOrder}
                  setLessonId={setLessonId}
                />
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Wrapper
