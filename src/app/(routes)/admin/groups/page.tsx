import { getGroups } from '../actions/group'
import GroupsWrapper from './Wrapper'

const Groups = async () => {
  const groups = await getGroups()
  return <GroupsWrapper groups={groups} />
}

export default Groups
