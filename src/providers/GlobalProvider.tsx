'use client'
import { createContext, useState } from 'react'

interface contextType {
  notificationsOpen: boolean
  setNotificationsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const GlobalContext = createContext<contextType>({
  notificationsOpen: false || true,
  setNotificationsOpen: () => false || true,
})

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false)
  return (
    <GlobalContext.Provider value={{ notificationsOpen, setNotificationsOpen }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
