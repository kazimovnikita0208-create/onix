'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '@/types'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  switchRole: (role: 'ADMIN' | 'WORKER') => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Моковые пользователи для демонстрации
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@onixboats.com',
    name: 'Администратор',
    role: 'ADMIN',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-10-27'),
  },
  {
    id: '2',
    email: 'worker@onixboats.com',
    name: 'Работник',
    role: 'WORKER',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-10-27'),
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Проверяем сохраненного пользователя в localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Имитация задержки API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Простая проверка для демонстрации
    const foundUser = mockUsers.find(u => u.email === email)
    
    if (foundUser && password === 'password') {
      setUser(foundUser)
      localStorage.setItem('user', JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const switchRole = (role: 'ADMIN' | 'WORKER') => {
    if (user) {
      const updatedUser = { ...user, role }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}


