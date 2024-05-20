'use client'
import { Inter } from 'next/font/google'
import { AppProvider } from '../context/AppContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <html lang="en">
        <head>
          {/* <ThemeModeScript /> */}
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </AppProvider>
  )
}
