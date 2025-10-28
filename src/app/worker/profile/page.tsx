'use client'

import { useAuth } from '@/contexts/AuthContext'
import { OnixBackground } from '@/components/ui/onix-background'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Ship, 
  ArrowLeft, 
  User, 
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Award
} from 'lucide-react'
import Link from 'next/link'

// Моковые данные для статистики работника
const workerStats = {
  totalTasks: 24,
  completedTasks: 15,
  inProgressTasks: 5,
  overdueTasks: 2,
  efficiency: 87,
  onTimeCompletion: 92,
  averageCompletionTime: 2.3,
  rating: 4.8
}

const recentTasks = [
  { title: "Проводка кабелей", status: "completed", date: "2025-10-26" },
  { title: "Сборка каркаса", status: "overdue", date: "2025-10-25" },
  { title: "Установка двигателя", status: "in_progress", date: "2025-10-27" },
  { title: "Отделка салона", status: "completed", date: "2025-10-24" }
]

export default function WorkerProfilePage() {
  const { user } = useAuth()

  return (
    <OnixBackground>
      {/* Header */}
      <header className="backdrop-blur-md border-b" style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937' }}>
        <div className="max-w-md mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/worker">
                <Button variant="ghost" size="sm" className="rounded-lg" style={{ color: '#F1F5F9' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#111827';
                          e.currentTarget.style.color = '#E7B652';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#F1F5F9';
                        }}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="h-8 w-auto">
                <img 
                  src="/logo.svg" 
                  alt="ONIX Boats" 
                  className="h-full w-auto"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight" style={{ color: '#F1F5F9' }}>ONIX</h1>
                <p className="text-sm font-medium" style={{ color: '#E7B652' }}>ЛИЧНЫЙ КАБИНЕТ</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        {/* Profile Header */}
        <div className="backdrop-blur-md rounded-2xl p-6 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#A7C7FF' }}>
            <User className="h-10 w-10" style={{ color: '#0B1220' }} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: '#F1F5F9' }}>Иван Петров</h2>
          <p className="mb-4" style={{ color: '#F1F5F9' }}>Сборщик катеров</p>
          <div className="flex items-center justify-center space-x-2">
            <Award className="h-5 w-5" style={{ color: '#E7B652' }} />
            <span className="font-semibold" style={{ color: '#E7B652' }}>Рейтинг: {workerStats.rating}/5</span>
          </div>
        </div>

        {/* Efficiency Overview */}
        <div className="backdrop-blur-md rounded-2xl p-6 border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5" style={{ color: '#22C55E' }} />
            <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>Эффективность</h3>
          </div>
          <div className="text-center mb-4">
            <div className="text-4xl font-bold mb-2" style={{ color: '#22C55E' }}>
              {workerStats.efficiency}%
            </div>
            <p style={{ color: '#F1F5F9' }}>Общая эффективность</p>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span style={{ color: '#F1F5F9' }}>Выполнение в срок</span>
              <span className="font-semibold" style={{ color: '#F1F5F9' }}>{workerStats.onTimeCompletion}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ color: '#F1F5F9' }}>Среднее время выполнения</span>
              <span className="font-semibold" style={{ color: '#F1F5F9' }}>{workerStats.averageCompletionTime} дня</span>
            </div>
          </div>
        </div>

        {/* Task Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="backdrop-blur-md rounded-2xl p-4 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
            <div className="text-2xl font-bold mb-1" style={{ color: '#E7B652' }}>
              {workerStats.totalTasks}
            </div>
            <div className="text-sm" style={{ color: '#F1F5F9' }}>Всего задач</div>
          </div>
          <div className="backdrop-blur-md rounded-2xl p-4 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
            <div className="text-2xl font-bold mb-1" style={{ color: '#E7B652' }}>
              {workerStats.completedTasks}
            </div>
            <div className="text-sm" style={{ color: '#F1F5F9' }}>Выполнено</div>
          </div>
          <div className="backdrop-blur-md rounded-2xl p-4 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
            <div className="text-2xl font-bold mb-1" style={{ color: '#E7B652' }}>
              {workerStats.inProgressTasks}
            </div>
            <div className="text-sm" style={{ color: '#F1F5F9' }}>В работе</div>
          </div>
          <div className="backdrop-blur-md rounded-2xl p-4 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
            <div className="text-2xl font-bold mb-1" style={{ color: '#E7B652' }}>
              {workerStats.overdueTasks}
            </div>
            <div className="text-sm" style={{ color: '#F1F5F9' }}>Просрочено</div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="backdrop-blur-md rounded-2xl p-6 border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="h-5 w-5" style={{ color: '#A7C7FF' }} />
            <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>Последние задачи</h3>
          </div>
          <div className="space-y-3">
            {recentTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between py-2" style={{ borderBottom: index < recentTasks.length - 1 ? '1px solid #1F2937' : 'none' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full" style={{
                    backgroundColor: task.status === 'completed' ? '#22C55E' :
                                   task.status === 'in_progress' ? '#E7B652' :
                                   '#EF4444'
                  }} />
                  <span className="text-sm" style={{ color: '#F1F5F9' }}>{task.title}</span>
                </div>
                <span className="text-xs" style={{ color: '#94A3B8' }}>
                  {new Date(task.date).toLocaleDateString('ru-RU')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="backdrop-blur-md rounded-2xl p-6 border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="h-5 w-5" style={{ color: '#A7C7FF' }} />
            <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>График производительности</h3>
          </div>
          <div className="h-32 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0E1A2B' }}>
            <p style={{ color: '#94A3B8' }}>График будет добавлен позже</p>
          </div>
        </div>
      </div>
    </OnixBackground>
  )
}


