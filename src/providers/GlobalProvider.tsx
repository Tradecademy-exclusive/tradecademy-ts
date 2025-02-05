'use client'
import { createContext, useState } from 'react'

interface contextType {
  notificationsOpen: boolean
  setNotificationsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const globalContext = createContext<contextType>({
  notificationsOpen: false || true,
  setNotificationsOpen: () => false || true,
})

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false)
  return (
    <globalContext.Provider value={{ notificationsOpen, setNotificationsOpen }}>
      {children}
    </globalContext.Provider>
  )
}

export default GlobalProvider
