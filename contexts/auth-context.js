"use client"
import { createContext, useContext, useState, useEffect } from "react"
const AuthContext = createContext()
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])
  const login = async (email, password) => {
    const mockUser = {
      id: 1,
      email,
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    }
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    return mockUser
  }
  const register = async (name, email, password) => {
    const mockUser = {
      id: 1,
      email,
      name,
      avatar: "/placeholder.svg?height=40&width=40",
    }
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    return mockUser
  }
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
