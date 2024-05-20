import React, { ReactNode, createContext, useContext, useState } from 'react'

interface User { first_name: string, last_name: string, email: string, credits: string }

interface AppContextProps {
  token: string
  setToken: (user: string) => void
  user: User | null
  setUser: (user: User) => void
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string>('')

  return (
    <AppContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AppContext.Provider>
  )
}
