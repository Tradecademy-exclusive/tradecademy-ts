import { getAnalysis } from '@/actions/analysis'
import AnalysisWrapper from './Wrapper'

const Analysis = async () => {
  const analysis = await getAnalysis()
  return <AnalysisWrapper analysis={analysis} />
}

export default Analysis
