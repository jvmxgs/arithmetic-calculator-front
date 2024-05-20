import React, { ReactNode, createContext, useContext, useState } from 'react'

export interface User { first_name: string, last_name: string, email: string, credits: string }

export interface AppContextProps {
  token: string
  setToken: (user: string) => void
  user: User | null
  setUser: (user: User) => void
  showBuyCoins: boolean
  setShowBuyCoins: (showBuyCoins: boolean) => void
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
  const [showBuyCoins, setShowBuyCoins] = useState(false)

  return (
    <AppContext.Provider value={{ user, setUser, token, setToken, showBuyCoins, setShowBuyCoins }}>
      {children}
    </AppContext.Provider>
  )
}
