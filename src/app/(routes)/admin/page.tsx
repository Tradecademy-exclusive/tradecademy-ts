import Wrapper from './Wrapper'
import { getGroups } from './actions/group'

const HomeAdmin = async () => {
  const groups = await getGroups()
  return <Wrapper groups={groups} />
}

export default HomeAdmin
