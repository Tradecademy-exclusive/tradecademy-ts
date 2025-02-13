import { getCourses } from '@/actions/courses'
import { getGroups } from '../actions/group'
import GroupsWrapper from './Wrapper'

const Groups = async () => {
  const groups = await getGroups()
  const courses = await getCourses()
  return <GroupsWrapper groups={groups} courses={courses} />
}

export default Groups
