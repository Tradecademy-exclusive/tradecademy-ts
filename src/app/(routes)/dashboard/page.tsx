import { getExclusive } from '@/actions/courses'
import DashboardWrapper from './Wrapper'

const Dashboard = async () => {
  const exclusive = await getExclusive()
  return <DashboardWrapper exclusive={exclusive} />
}

export default Dashboard
