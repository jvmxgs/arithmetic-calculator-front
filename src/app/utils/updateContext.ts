import { AppContextProps, User } from '../../context/AppContext'

export const updateUserContext = (user: User, newToken: string, context: AppContextProps) => {
  context.setUser({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    credits: user.credits
  })
  localStorage.setItem('user', JSON.stringify(user))

  if (newToken) {
    context.setToken(newToken)
    localStorage.setItem('token', newToken)
  }
}
