import { getAnalysis } from '@/actions/analysis'

interface NotificationsProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Notifications = async ({ open, setOpen }: NotificationsProps) => {
  const analysis = await getAnalysis()
  return <div>Notifications</div>
}

export default Notifications
