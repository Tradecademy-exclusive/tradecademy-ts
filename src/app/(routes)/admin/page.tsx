import { getCourses } from '@/actions/courses'
import Wrapper from './Wrapper'
import { getGroups } from './actions/group'

const HomeAdmin = async () => {
  const courses = await getCourses()
  const groups = await getGroups()
  return <Wrapper courses={courses} groups={groups} />
}

export default HomeAdmin
