import CourseHeader from '../../components/CourseHeader'

const UploadCourse = () => {
  const saveUpdates = async () => {}
  const publishCourse = async () => {}

  return (
    <div className='w-full py-10 px-20 flex flex-col items-start gap-3 relative'>
      <CourseHeader
        page='Create Course'
        path='Dashboard / My Course / Create Course'
        buttons={[
          {
            label: 'Save Updates',
            color: 'black',
            bg: 'white',
            action: saveUpdates,
          },
          {
            label: 'Publish Course',
            color: 'white',
            bg: '#266CF7',
            action: publishCourse,
          },
        ]}
      />
    </div>
  )
}

export default UploadCourse
