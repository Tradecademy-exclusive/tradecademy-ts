import { getAnalysis } from '@/actions/analysis'
import AnalysisWrapper from './Wrapper'

const Analysis = async () => {
  const analysis = await getAnalysis(100)
  return <AnalysisWrapper analysis={analysis} />
}

export default Analysis
