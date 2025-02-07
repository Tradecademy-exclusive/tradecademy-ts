import { getAnalysisById } from '@/actions/analysis'
import { notFound } from 'next/navigation'
import AnalysisWrapper from './Wrapper'
import { AnalysisType } from '@/types'

const Analyisis = async ({ params }: { params: { id: string } }) => {
  const { id } = await params
  const analysis = await getAnalysisById(id)

  if (!analysis) {
    return notFound()
  }

  return <AnalysisWrapper analysis={analysis as unknown as AnalysisType} />
}

export default Analyisis
