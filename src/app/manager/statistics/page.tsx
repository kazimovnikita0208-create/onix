'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { OnixBackground } from '@/components/ui/onix-background'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Ship,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Target
} from 'lucide-react'
import Link from 'next/link'

// Моковые данные для статистики сборок
const assemblyStats = {
  totalBoats: 12,
  inProgress: 4,
  completed: 7,
  planned: 1,
  averageCompletionTime: 45, // дни
  efficiency: 87, // %
  onTimeDelivery: 92 // %
}

// Моковые данные для статистики работников
const workerStats = [
  {
    id: '1',
    name: 'Иван Петров',
    position: 'Мастер по корпусу',
    totalTasks: 24,
    completedTasks: 22,
    inProgressTasks: 2,
    efficiency: 92,
    onTimeRate: 96,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Мария Сидорова',
    position: 'Специалист по двигателям',
    totalTasks: 18,
    completedTasks: 16,
    inProgressTasks: 2,
    efficiency: 89,
    onTimeRate: 94,
    rating: 4.6
  },
  {
    id: '3',
    name: 'Алексей Козлов',
    position: 'Электрик',
    totalTasks: 21,
    completedTasks: 19,
    inProgressTasks: 2,
    efficiency: 90,
    onTimeRate: 91,
    rating: 4.5
  },
  {
    id: '4',
    name: 'Елена Волкова',
    position: 'Дизайнер интерьеров',
    totalTasks: 15,
    completedTasks: 14,
    inProgressTasks: 1,
    efficiency: 93,
    onTimeRate: 98,
    rating: 4.9
  }
]

// Моковые данные для статистики проектов
const projectStats = {
  totalProjects: 8,
  activeProjects: 3,
  completedProjects: 4,
  delayedProjects: 1,
  averageProjectDuration: 120, // дни
  budgetUtilization: 94, // %
  qualityScore: 4.7
}

const recentProjects = [
  {
    id: '1',
    name: 'ONIX 850 CABIN',
    status: 'IN_PROGRESS',
    progress: 75,
    deadline: '2024-12-15',
    assignedWorkers: 3
  },
  {
    id: '2',
    name: 'ONIX 12X CRUISER',
    status: 'IN_PROGRESS',
    progress: 45,
    deadline: '2025-01-20',
    assignedWorkers: 4
  },
  {
    id: '3',
    name: 'ONIX 680 SPORT',
    status: 'COMPLETED',
    progress: 100,
    deadline: '2024-11-30',
    assignedWorkers: 2
  }
]

export default function StatisticsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'assembly' | 'workers' | 'projects'>('assembly')

  // Перенаправляем на выбор роли, если пользователь не авторизован или не руководитель
  if (!user || user.role !== 'ADMIN') {
    if (typeof window !== 'undefined') {
      window.location.href = '/role-selection'
    }
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return '#22C55E'
      case 'IN_PROGRESS': return '#E7B652'
      case 'DELAYED': return '#EF4444'
      default: return '#94A3B8'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'Завершен'
      case 'IN_PROGRESS': return 'В работе'
      case 'DELAYED': return 'Просрочен'
      default: return 'Планируется'
    }
  }

  return (
    <OnixBackground>
      {/* Header */}
      <header className="backdrop-blur-md border-b" style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937' }}>
        <div className="max-w-md mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/manager">
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
                  className="h-full w-auto filter brightness-0 invert"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight" style={{ color: '#F1F5F9' }}>ONIX</h1>
                <p className="text-sm font-medium" style={{ color: '#E7B652' }}>СТАТИСТИКА</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 backdrop-blur-md rounded-lg p-1" style={{ backgroundColor: '#111827' }}>
          {[
            { key: 'assembly', label: 'Сборки', icon: Ship },
            { key: 'workers', label: 'Работники', icon: Users },
            { key: 'projects', label: 'Проекты', icon: Target }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className="flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                style={{
                  backgroundColor: activeTab === tab.key ? '#E7B652' : 'transparent',
                  color: activeTab === tab.key ? '#0B1220' : '#94A3B8'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.key) {
                    e.currentTarget.style.color = '#F1F5F9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.key) {
                    e.currentTarget.style.color = '#94A3B8';
                  }
                }}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Assembly Statistics */}
        {activeTab === 'assembly' && (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="backdrop-blur-md rounded-2xl p-4 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: '#E7B652' }}>
                  {assemblyStats.totalBoats}
                </div>
                <div className="text-sm" style={{ color: '#F1F5F9' }}>Всего катеров</div>
              </div>
              <div className="backdrop-blur-md rounded-2xl p-4 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: '#E7B652' }}>
                  {assemblyStats.completed}
                </div>
                <div className="text-sm" style={{ color: '#F1F5F9' }}>Завершено</div>
              </div>
              <div className="backdrop-blur-md rounded-2xl p-4 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: '#E7B652' }}>
                  {assemblyStats.inProgress}
                </div>
                <div className="text-sm" style={{ color: '#F1F5F9' }}>В работе</div>
              </div>
              <div className="backdrop-blur-md rounded-2xl p-4 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: '#E7B652' }}>
                  {assemblyStats.planned}
                </div>
                <div className="text-sm" style={{ color: '#F1F5F9' }}>Запланировано</div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="backdrop-blur-md rounded-2xl p-6 border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-5 w-5" style={{ color: '#22C55E' }} />
                <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>Показатели эффективности</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span style={{ color: '#F1F5F9' }}>Общая эффективность</span>
                  <span className="font-semibold" style={{ color: '#22C55E' }}>{assemblyStats.efficiency}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: '#F1F5F9' }}>Сдача в срок</span>
                  <span className="font-semibold" style={{ color: '#22C55E' }}>{assemblyStats.onTimeDelivery}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: '#F1F5F9' }}>Среднее время сборки</span>
                  <span className="font-semibold" style={{ color: '#E7B652' }}>{assemblyStats.averageCompletionTime} дней</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workers Statistics */}
        {activeTab === 'workers' && (
          <div className="space-y-4">
            {workerStats.map((worker) => (
              <div key={worker.id} className="backdrop-blur-md rounded-2xl p-4 border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#A7C7FF' }}>
                      <Users className="h-5 w-5" style={{ color: '#0B1220' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: '#F1F5F9' }}>{worker.name}</h3>
                      <p className="text-sm" style={{ color: '#94A3B8' }}>{worker.position}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold" style={{ color: '#E7B652' }}>{worker.rating}/5</div>
                    <div className="text-xs" style={{ color: '#94A3B8' }}>Рейтинг</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold" style={{ color: '#E7B652' }}>{worker.totalTasks}</div>
                    <div className="text-xs" style={{ color: '#94A3B8' }}>Всего</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold" style={{ color: '#22C55E' }}>{worker.completedTasks}</div>
                    <div className="text-xs" style={{ color: '#94A3B8' }}>Выполнено</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold" style={{ color: '#A7C7FF' }}>{worker.inProgressTasks}</div>
                    <div className="text-xs" style={{ color: '#94A3B8' }}>В работе</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: '#F1F5F9' }}>Эффективность</span>
                    <span className="text-sm font-semibold" style={{ color: '#22C55E' }}>{worker.efficiency}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: '#F1F5F9' }}>Сдача в срок</span>
                    <span className="text-sm font-semibold" style={{ color: '#22C55E' }}>{worker.onTimeRate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Statistics */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Project Overview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="backdrop-blur-md rounded-2xl p-4 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: '#E7B652' }}>
                  {projectStats.totalProjects}
                </div>
                <div className="text-sm" style={{ color: '#F1F5F9' }}>Всего проектов</div>
              </div>
              <div className="backdrop-blur-md rounded-2xl p-4 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: '#E7B652' }}>
                  {projectStats.completedProjects}
                </div>
                <div className="text-sm" style={{ color: '#F1F5F9' }}>Завершено</div>
              </div>
              <div className="backdrop-blur-md rounded-2xl p-4 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: '#E7B652' }}>
                  {projectStats.activeProjects}
                </div>
                <div className="text-sm" style={{ color: '#F1F5F9' }}>Активных</div>
              </div>
              <div className="backdrop-blur-md rounded-2xl p-4 text-center border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: '#E7B652' }}>
                  {projectStats.delayedProjects}
                </div>
                <div className="text-sm" style={{ color: '#F1F5F9' }}>Просрочено</div>
              </div>
            </div>

            {/* Project Performance */}
            <div className="backdrop-blur-md rounded-2xl p-6 border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="h-5 w-5" style={{ color: '#A7C7FF' }} />
                <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>Показатели проектов</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span style={{ color: '#F1F5F9' }}>Средняя длительность</span>
                  <span className="font-semibold" style={{ color: '#E7B652' }}>{projectStats.averageProjectDuration} дней</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: '#F1F5F9' }}>Использование бюджета</span>
                  <span className="font-semibold" style={{ color: '#22C55E' }}>{projectStats.budgetUtilization}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: '#F1F5F9' }}>Оценка качества</span>
                  <span className="font-semibold" style={{ color: '#22C55E' }}>{projectStats.qualityScore}/5</span>
                </div>
              </div>
            </div>

            {/* Recent Projects */}
            <div className="backdrop-blur-md rounded-2xl p-6 border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="h-5 w-5" style={{ color: '#A7C7FF' }} />
                <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>Последние проекты</h3>
              </div>
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#0E1A2B' }}>
                    <div className="flex-1">
                      <h4 className="font-semibold" style={{ color: '#F1F5F9' }}>{project.name}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs" style={{ color: '#94A3B8' }}>
                          {project.assignedWorkers} работников
                        </span>
                        <span className="text-xs" style={{ color: '#94A3B8' }}>
                          Срок: {new Date(project.deadline).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold mb-1" style={{ color: getStatusColor(project.status) }}>
                        {getStatusText(project.status)}
                      </div>
                      <div className="text-xs" style={{ color: '#94A3B8' }}>
                        {project.progress}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </OnixBackground>
  )
}
