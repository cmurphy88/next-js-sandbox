'use client'

import storage from '@/utils/storage'
import { createContext, useContext, useCallback, useState } from 'react'
import * as actions from '@/utils/actions'

const AuthContext = createContext({})

const handleUserResponse = (accessToken) => {
  storage.setAccessToken(accessToken)
}

export const AuthProvider = (children) => {
  const [user, setUser] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [loadingInitial, setLoadingInitial] = useState(true)

  const getLoggedInUser = () => {
    actions
      .getCurrentUser()
      .then((user) => {
        setUser(user)
      })
      .catch((error) => {})
      .finally(() => setLoadingInitial(false))
  }

  const login = useCallback((data) => {
    setLoading(true)
    actions
      .login(data)
      .then((user) => {
        setError(null)
        handleUserResponse
        getLoggedInUser()
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }, [])

  const logout = () => {
    window.localStorage.removeItem(localStorageKey)
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      signUp,
      logout,
    }),
    [user, login, loading, error]
  )

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
