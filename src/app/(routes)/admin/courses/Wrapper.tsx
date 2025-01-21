/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import OpacityBackground from '@/components/opacityBackground'
import CourseHeader from '../components/CourseHeader'
import CreateLesson from '../components/CreateLesson'
import EditCourse from '../components/EditCourse'
import { CourseType } from '@/types'
import { useMemo, useState } from 'react'
import EditLesson from '../components/EditLesson'
import UploadCourse from '../components/UploadCourse'
import { publicType } from '@prisma/client'

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
  const [published, setPublished] = useState<boolean>(true)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [maxStudents, setMaxStudents] = useState<string>('')
  const [learn, setLearn] = useState<string>('')
  const [courseStatus, setCourseStatus] = useState<publicType>('Published')

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
    <div className='w-full py-5 px-20 flex flex-col min-h-screen items-start gap-3 relative bg-[#F0F0F0]'>
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

      <div className='w-full flex flex-col items-start gap-10 relative pt-[250px]'>
        <UploadCourse
          publicCourse={published}
          setPublicCourse={setPublished}
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
          <div className='min-w-[250px] max-w-[250px]'></div>
        </div>
      </div>
    </div>
  )
}

export default Wrapper
