import { createContext, useMemo, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  const login = useCallback((username, password) => {
    const ok = username.trim() === 'admin' && password === '1234'

    if (!ok) return { ok: false, message: 'credenciales inválidas' }

    const session = { username, name: 'Administrador' }

    setUser(session)

    navigate('/usuarios', { replace: true })

    return { ok: true }
  }, [navigate, setUser])

  const logout = useCallback(() => {
    setUser(null)

    navigate('/login', { replace: true })
  }, [navigate, setUser])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}