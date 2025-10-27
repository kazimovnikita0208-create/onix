'use client'

import { useAuth } from '@/contexts/AuthContext'
import { OnixBackground } from '@/components/ui/onix-background'
import { Button } from '@/components/ui/button'
import { 
  Ship, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Users, 
  Settings, 
  BarChart3,
  LogOut,
  Wrench
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Моковые данные для статистики
const stats = {
  totalTasks: 24,
  inProgressTasks: 5,
  completedTasks: 15,
  overdueTasks: 2
}

export default function ManagerPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  // Перенаправляем на выбор роли, если пользователь не авторизован или не руководитель
  if (!user || user.role !== 'ADMIN') {
    if (typeof window !== 'undefined') {
      window.location.href = '/role-selection'
    }
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/role-selection')
  }

  return (
    <OnixBackground>
      {/* Header */}
      <header className="backdrop-blur-md border-b" style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937' }}>
        <div className="max-w-md mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-auto">
                <img 
                  src="/logo.svg" 
                  alt="ONIX Boats" 
                  className="h-full w-auto filter brightness-0 invert"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="rounded-lg"
              style={{ color: '#F1F5F9' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#111827';
                e.currentTarget.style.color = '#E7B652';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#F1F5F9';
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold" style={{ color: '#F1F5F9' }}>Панель управления</h2>
          <p className="text-sm" style={{ color: '#94A3B8' }}>Управление производством алюминиевых лодок</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="backdrop-blur-md rounded-2xl p-6 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#E7B652' }}>
              {stats.totalTasks}
            </div>
            <div className="text-sm font-medium" style={{ color: '#F1F5F9' }}>ЗАДАЧИ</div>
            <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>Всего в системе</div>
          </div>
          <div className="backdrop-blur-md rounded-2xl p-6 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#E7B652' }}>
              {stats.inProgressTasks}
            </div>
            <div className="text-sm font-medium" style={{ color: '#F1F5F9' }}>В РАБОТЕ</div>
            <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>Активные</div>
          </div>
          <div className="backdrop-blur-md rounded-2xl p-6 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#E7B652' }}>
              {stats.completedTasks}
            </div>
            <div className="text-sm font-medium" style={{ color: '#F1F5F9' }}>ЗАВЕРШЕНО</div>
            <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>Выполнено</div>
          </div>
          <div className="backdrop-blur-md rounded-2xl p-6 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#E7B652' }}>
              {stats.overdueTasks}
            </div>
            <div className="text-sm font-medium" style={{ color: '#F1F5F9' }}>ПРОСРОЧЕНО</div>
            <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>Требуют внимания</div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="space-y-6">
          {/* Сборка */}
          <Link href="/manager/assembly">
            <div className="group backdrop-blur-md rounded-2xl p-6 transition-all duration-300 cursor-pointer border hover:shadow-xl" 
                 style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.borderColor = '#E7B652';
                   e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(231, 182, 82, 0.1), 0 10px 10px -5px rgba(231, 182, 82, 0.04)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.borderColor = '#1F2937';
                   e.currentTarget.style.boxShadow = 'none';
                 }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl shadow-lg" style={{ backgroundColor: '#E7B652' }}>
                    <Ship className="h-6 w-6" style={{ color: '#0B1220' }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>СБОРКА</h3>
                    <p className="text-sm" style={{ color: '#94A3B8' }}>Катера и блоки</p>
                    <p className="text-xs mt-1" style={{ color: '#A7C7FF' }}>Управление производством</p>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-all" 
                     style={{ backgroundColor: '#E7B652', color: '#0B1220' }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.backgroundColor = '#FFD06A';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.backgroundColor = '#E7B652';
                     }}>
                  ОТКРЫТЬ
                </div>
              </div>
            </div>
          </Link>

          {/* Работники */}
          <Link href="/manager/workers">
            <div className="group backdrop-blur-md rounded-2xl p-6 transition-all duration-300 cursor-pointer border hover:shadow-xl" 
                 style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.borderColor = '#E7B652';
                   e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(231, 182, 82, 0.1), 0 10px 10px -5px rgba(231, 182, 82, 0.04)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.borderColor = '#1F2937';
                   e.currentTarget.style.boxShadow = 'none';
                 }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl shadow-lg" style={{ backgroundColor: '#E7B652' }}>
                    <Users className="h-6 w-6" style={{ color: '#0B1220' }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>РАБОТНИКИ</h3>
                    <p className="text-sm" style={{ color: '#94A3B8' }}>Персонал и роли</p>
                    <p className="text-xs mt-1" style={{ color: '#A7C7FF' }}>Управление командой</p>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-all" 
                     style={{ backgroundColor: '#E7B652', color: '#0B1220' }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.backgroundColor = '#FFD06A';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.backgroundColor = '#E7B652';
                     }}>
                  ОТКРЫТЬ
                </div>
              </div>
            </div>
          </Link>

          {/* Работы */}
          <Link href="/manager/tasks">
            <div className="group backdrop-blur-md rounded-2xl p-6 transition-all duration-300 cursor-pointer border hover:shadow-xl" 
                 style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.borderColor = '#E7B652';
                   e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(231, 182, 82, 0.1), 0 10px 10px -5px rgba(231, 182, 82, 0.04)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.borderColor = '#1F2937';
                   e.currentTarget.style.boxShadow = 'none';
                 }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl shadow-lg" style={{ backgroundColor: '#E7B652' }}>
                    <Wrench className="h-6 w-6" style={{ color: '#0B1220' }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>РАБОТЫ</h3>
                    <p className="text-sm" style={{ color: '#94A3B8' }}>Справочник задач</p>
                    <p className="text-xs mt-1" style={{ color: '#A7C7FF' }}>Каталог операций</p>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-all" 
                     style={{ backgroundColor: '#E7B652', color: '#0B1220' }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.backgroundColor = '#FFD06A';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.backgroundColor = '#E7B652';
                     }}>
                  ОТКРЫТЬ
                </div>
              </div>
            </div>
          </Link>

          {/* Статистика */}
          <Link href="/manager/statistics">
            <div className="group backdrop-blur-md rounded-2xl p-6 transition-all duration-300 cursor-pointer border hover:shadow-xl" 
                 style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.borderColor = '#E7B652';
                   e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(231, 182, 82, 0.1), 0 10px 10px -5px rgba(231, 182, 82, 0.04)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.borderColor = '#1F2937';
                   e.currentTarget.style.boxShadow = 'none';
                 }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl shadow-lg" style={{ backgroundColor: '#E7B652' }}>
                    <BarChart3 className="h-6 w-6" style={{ color: '#0B1220' }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>СТАТИСТИКА</h3>
                    <p className="text-sm" style={{ color: '#94A3B8' }}>Панель эффективности</p>
                    <p className="text-xs mt-1" style={{ color: '#A7C7FF' }}>Аналитика и отчеты</p>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-all" 
                     style={{ backgroundColor: '#E7B652', color: '#0B1220' }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.backgroundColor = '#FFD06A';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.backgroundColor = '#E7B652';
                     }}>
                  ОТКРЫТЬ
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </OnixBackground>
  )
}
