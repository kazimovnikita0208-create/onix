'use client'

import { useAuth } from '@/contexts/AuthContext'
import { OnixBackground } from '@/components/ui/onix-background'
import { Button } from '@/components/ui/button'
import { 
  Ship, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  User, 
  HelpCircle, 
  MessageCircle,
  BarChart3,
  LogOut
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function WorkerPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  // Перенаправляем на выбор роли, если пользователь не авторизован или не работник
  if (!user || user.role !== 'WORKER') {
    if (typeof window !== 'undefined') {
      window.location.href = '/role-selection'
    }
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/role-selection')
  }

  // Моковые данные для статистики работника
  const workerStats = {
    totalTasks: 24,
    completedTasks: 15,
    inProgressTasks: 5,
    overdueTasks: 2,
    efficiency: 87
  }

  return (
    <OnixBackground>
      {/* Header */}
      <header className="backdrop-blur-md border-b" style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937' }}>
        <div className="max-w-md mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-auto">
                <img 
                  src="/logo.svg" 
                  alt="ONIX Boats" 
                  className="h-full w-auto"
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
          <h2 className="text-2xl font-bold" style={{ color: '#F1F5F9' }}>Личный кабинет</h2>
          <p className="text-sm" style={{ color: '#94A3B8' }}>Управление задачами и статистика</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="backdrop-blur-md rounded-2xl p-6 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#E7B652' }}>
              {workerStats.totalTasks}
            </div>
            <div className="text-sm font-medium" style={{ color: '#F1F5F9' }}>ЗАДАЧИ</div>
            <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>Всего назначено</div>
          </div>
          <div className="backdrop-blur-md rounded-2xl p-6 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#E7B652' }}>
              {workerStats.completedTasks}
            </div>
            <div className="text-sm font-medium" style={{ color: '#F1F5F9' }}>ЗАВЕРШЕНО</div>
            <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>Выполнено</div>
          </div>
          <div className="backdrop-blur-md rounded-2xl p-6 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#E7B652' }}>
              {workerStats.inProgressTasks}
            </div>
            <div className="text-sm font-medium" style={{ color: '#F1F5F9' }}>В РАБОТЕ</div>
            <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>Активные</div>
          </div>
          <div className="backdrop-blur-md rounded-2xl p-6 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#E7B652' }}>
              {workerStats.overdueTasks}
            </div>
            <div className="text-sm font-medium" style={{ color: '#F1F5F9' }}>ПРОСРОЧЕНО</div>
            <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>Требуют внимания</div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="space-y-4">
          {/* Мои задачи */}
          <Link href="/worker/tasks">
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
                    <CheckCircle className="h-6 w-6" style={{ color: '#0B1220' }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>МОИ ЗАДАЧИ</h3>
                    <p className="text-sm" style={{ color: '#94A3B8' }}>Управление задачами</p>
                    <p className="text-xs mt-1" style={{ color: '#A7C7FF' }}>Активные и выполненные</p>
                  </div>
                </div>
                <div className="text-2xl transition-colors" style={{ color: '#F1F5F9' }}>
                  →
                </div>
              </div>
            </div>
          </Link>

          {/* Личный кабинет */}
          <Link href="/worker/profile">
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
                    <User className="h-6 w-6" style={{ color: '#0B1220' }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>ЛИЧНЫЙ КАБИНЕТ</h3>
                    <p className="text-sm" style={{ color: '#94A3B8' }}>Статистика и профиль</p>
                    <p className="text-xs mt-1" style={{ color: '#A7C7FF' }}>Персональные данные</p>
                  </div>
                </div>
                <div className="text-2xl transition-colors" style={{ color: '#F1F5F9' }}>
                  →
                </div>
              </div>
            </div>
          </Link>

          {/* Помощь */}
          <Link href="/worker/help">
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
                    <HelpCircle className="h-6 w-6" style={{ color: '#0B1220' }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>ПОМОЩЬ</h3>
                    <p className="text-sm" style={{ color: '#94A3B8' }}>Инструкции и документы</p>
                    <p className="text-xs mt-1" style={{ color: '#A7C7FF' }}>Справочная информация</p>
                  </div>
                </div>
                <div className="text-2xl transition-colors" style={{ color: '#F1F5F9' }}>
                  →
                </div>
              </div>
            </div>
          </Link>

          {/* Связь с руководством */}
          <Link href="/worker/contact">
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
                    <MessageCircle className="h-6 w-6" style={{ color: '#0B1220' }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>СВЯЗЬ С РУКОВОДСТВОМ</h3>
                    <p className="text-sm" style={{ color: '#94A3B8' }}>Обратная связь</p>
                    <p className="text-xs mt-1" style={{ color: '#A7C7FF' }}>Коммуникация с руководством</p>
                  </div>
                </div>
                <div className="text-2xl transition-colors" style={{ color: '#F1F5F9' }}>
                  →
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </OnixBackground>
  )
}
