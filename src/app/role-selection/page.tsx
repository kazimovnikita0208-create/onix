'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { OnixBackground } from '@/components/ui/onix-background'
import { Ship, Users, Settings } from 'lucide-react'

export default function RoleSelectionPage() {
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleRoleSelection = async (role: 'ADMIN' | 'WORKER') => {
    console.log('Выбрана роль:', role)
    setIsLoggingIn(true)
    try {
      if (role === 'ADMIN') {
        console.log('Попытка входа как руководитель...')
        const success = await login('admin@onixboats.com', 'password')
        console.log('Результат входа:', success)
        if (success) {
          console.log('Перенаправление на /manager')
          router.push('/manager')
        } else {
          console.log('Ошибка входа')
        }
      } else {
        console.log('Попытка входа как работник...')
        const success = await login('worker@onixboats.com', 'password')
        console.log('Результат входа:', success)
        if (success) {
          console.log('Перенаправление на /worker')
          router.push('/worker')
        } else {
          console.log('Ошибка входа')
        }
      }
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoggingIn(false)
    }
  }

  return (
    <OnixBackground className="flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-12">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="h-24 w-auto">
              <img 
                src="/logo.svg" 
                alt="ONIX Boats" 
                className="h-full w-auto"
              />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium" style={{ color: '#F1F5F9' }}>Система управления производством</p>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="space-y-6">
          {/* Manager Role */}
          <div 
            onClick={() => !isLoggingIn && handleRoleSelection('ADMIN')}
            className={`group relative backdrop-blur-md rounded-2xl p-8 cursor-pointer transition-all duration-300 border hover:shadow-xl ${
              isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ 
              backgroundColor: '#111827',
              borderColor: '#1F2937'
            }}
            onMouseEnter={(e) => {
              if (!isLoggingIn) {
                e.currentTarget.style.borderColor = '#E7B652';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(231, 182, 82, 0.1), 0 10px 10px -5px rgba(231, 182, 82, 0.04)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1F2937';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="p-4 rounded-xl shadow-lg" style={{ backgroundColor: '#E7B652' }}>
                  <Settings className="h-7 w-7" style={{ color: '#0B1220' }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1" style={{ color: '#F1F5F9' }}>РУКОВОДИТЕЛЬ</h3>
                  <p className="text-sm font-medium" style={{ color: '#94A3B8' }}>Управление производством</p>
                  <p className="text-xs mt-1" style={{ color: '#A7C7FF' }}>Полный доступ к системе</p>
                </div>
              </div>
              <div className="text-2xl transition-colors" style={{ color: '#F1F5F9' }}>
                {isLoggingIn ? '...' : '→'}
              </div>
            </div>
          </div>

          {/* Worker Role */}
          <div 
            onClick={() => !isLoggingIn && handleRoleSelection('WORKER')}
            className={`group relative backdrop-blur-md rounded-2xl p-8 cursor-pointer transition-all duration-300 border hover:shadow-xl ${
              isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ 
              backgroundColor: '#111827',
              borderColor: '#1F2937'
            }}
            onMouseEnter={(e) => {
              if (!isLoggingIn) {
                e.currentTarget.style.borderColor = '#E7B652';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(231, 182, 82, 0.1), 0 10px 10px -5px rgba(231, 182, 82, 0.04)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1F2937';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="p-4 rounded-xl shadow-lg" style={{ backgroundColor: '#E7B652' }}>
                  <Users className="h-7 w-7" style={{ color: '#0B1220' }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1" style={{ color: '#F1F5F9' }}>РАБОТНИК</h3>
                  <p className="text-sm font-medium" style={{ color: '#94A3B8' }}>Выполнение задач</p>
                  <p className="text-xs mt-1" style={{ color: '#A7C7FF' }}>Личный кабинет</p>
                </div>
              </div>
              <div className="text-2xl transition-colors" style={{ color: '#F1F5F9' }}>
                {isLoggingIn ? '...' : '→'}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-2">
          <div className="w-16 h-px mx-auto" style={{ background: 'linear-gradient(to right, transparent, #1F2937, transparent)' }}></div>
          <p className="text-xs font-medium" style={{ color: '#94A3B8' }}>© 2024 ONIX Boats. Все права защищены.</p>
        </div>
      </div>
    </OnixBackground>
  )
}
