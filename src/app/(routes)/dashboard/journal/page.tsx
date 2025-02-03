import { getJournals } from '@/actions/journals'
import JournalWrapper from './Wrapper'

const Journal = async () => {
  const journals = await getJournals()
  return <JournalWrapper journals={journals} />
}

export default Journal
