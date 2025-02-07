import { getAnalysisById } from '@/actions/analysis'
import { notFound } from 'next/navigation'

const Analyisis = async ({ params }: { params: { id: string } }) => {
  const { id } = await params
  const analysis = await getAnalysisById(id)

  if (!analysis) {
    return notFound()
  }

  return <div>Analyisis</div>
}

export default Analyisis
