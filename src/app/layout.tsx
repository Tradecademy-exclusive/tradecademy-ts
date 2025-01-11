import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
import AuthProvider from '@/providers/AuthProvider'

const monsterrat = Montserrat({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_ORIGIN
  axios.defaults.withCredentials = true

  return (
    <html lang='en'>
      <body className={`${monsterrat.variable} antialiased`}>
        <AuthProvider>
          {children}
          <ToastContainer
            position='top-right'
            autoClose={3500}
            hideProgressBar={false}
            closeOnClick={false}
            draggable
            theme='light'
          />
        </AuthProvider>
      </body>
    </html>
  )
}
