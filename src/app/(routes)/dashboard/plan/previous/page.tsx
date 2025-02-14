import { getPreviousPlans } from '@/actions/plans'
import PreviousPlansWrapper from './Wrapper'

const PreviousPlan = async () => {
  const previousPlans = await getPreviousPlans()
  return <PreviousPlansWrapper previousPlans={previousPlans} />
}

export default PreviousPlan
