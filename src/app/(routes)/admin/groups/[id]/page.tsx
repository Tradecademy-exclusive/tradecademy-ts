import { getCourses } from '@/actions/courses'
import { getGroupById } from '../../actions/group'
import GroupWrapper from './Wrapper'
import { notFound } from 'next/navigation'

const GroupById = async ({ params }: { params: { id: string } }) => {
  const { id } = await params
  const group = await getGroupById(id)
  if (!group) {
    return notFound()
  }
  const courses = await getCourses()

  return <GroupWrapper group={group} courses={courses} />
}

export default GroupById
