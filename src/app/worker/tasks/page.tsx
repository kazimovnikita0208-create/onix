'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { OnixBackground } from '@/components/ui/onix-background'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  CheckCircle, 
  Play,
  Check,
  X
} from 'lucide-react'
import Link from 'next/link'

// Моковые данные задач
const mockTasks = [
  {
    id: 1,
    title: "Проводка кабелей",
    boat: "ONIX 850",
    category: "Электрика",
    status: "IN_PROGRESS",
    priority: "HIGH",
    dueDate: "2025-10-30",
    description: "Прокладка электрических кабелей по всему катеру"
  },
  {
    id: 2,
    title: "Сборка каркаса",
    boat: "ONIX 680",
    category: "Корпус",
    status: "OVERDUE",
    priority: "HIGH",
    dueDate: "2025-10-25",
    description: "Сборка основного каркаса катера"
  },
  {
    id: 3,
    title: "Установка двигателя",
    boat: "ONIX 850",
    category: "Двигатель",
    status: "PENDING",
    priority: "MEDIUM",
    dueDate: "2025-11-05",
    description: "Установка и подключение двигателя"
  },
  {
    id: 4,
    title: "Отделка салона",
    boat: "ONIX 680",
    category: "Интерьер",
    status: "COMPLETED",
    priority: "LOW",
    dueDate: "2025-10-20",
    description: "Внутренняя отделка салона"
  }
]

const statusLabels = {
  PENDING: "Ожидает",
  IN_PROGRESS: "В работе",
  COMPLETED: "Выполнено",
  OVERDUE: "Просрочено"
}

const statusColors = {
  PENDING: { backgroundColor: '#94A3B8', color: '#F1F5F9' },
  IN_PROGRESS: { backgroundColor: '#E7B652', color: '#0B1220' },
  COMPLETED: { backgroundColor: '#22C55E', color: '#F1F5F9' },
  OVERDUE: { backgroundColor: '#EF4444', color: '#F1F5F9' }
}

const priorityColors = {
  HIGH: '#EF4444',
  MEDIUM: '#E7B652',
  LOW: '#22C55E'
}

export default function WorkerTasksPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'COMPLETED' | 'ALL'>('ACTIVE')
  const [selectedTask, setSelectedTask] = useState<number | null>(null)

  const filteredTasks = mockTasks.filter(task => {
    if (activeTab === 'ACTIVE') return task.status === 'IN_PROGRESS' || task.status === 'PENDING'
    if (activeTab === 'COMPLETED') return task.status === 'COMPLETED'
    return true
  })

  const handleStatusChange = (taskId: number, newStatus: string) => {
    // Здесь будет логика обновления статуса задачи
    console.log(`Task ${taskId} status changed to ${newStatus}`)
    setSelectedTask(null)
  }

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
                <p className="text-sm font-medium" style={{ color: '#E7B652' }}>МОИ ЗАДАЧИ</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 backdrop-blur-md rounded-lg p-1" style={{ backgroundColor: '#111827' }}>
          {[
            { key: 'ACTIVE', label: 'АКТИВНЫЕ' },
            { key: 'COMPLETED', label: 'ВЫПОЛНЕННЫЕ' },
            { key: 'ALL', label: 'ВСЕ' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
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
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tasks List */}
        <div className="space-y-6">
          {filteredTasks.map((task) => (
            <div key={task.id} className="backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl"
                 style={{ 
                   backgroundColor: '#111827', 
                   borderColor: priorityColors[task.priority as keyof typeof priorityColors]
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.borderColor = '#E7B652';
                   e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(231, 182, 82, 0.1), 0 10px 10px -5px rgba(231, 182, 82, 0.04)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.borderColor = priorityColors[task.priority as keyof typeof priorityColors];
                   e.currentTarget.style.boxShadow = 'none';
                 }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#F1F5F9' }}>
                    {task.title}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: '#94A3B8' }}>
                    {task.boat} • {task.category}
                  </p>
                </div>
                <div className="px-4 py-2 rounded-full text-xs font-semibold shadow-lg"
                     style={statusColors[task.status as keyof typeof statusColors]}>
                  {statusLabels[task.status as keyof typeof statusLabels]}
                </div>
              </div>

              <p className="text-sm mb-4" style={{ color: '#F1F5F9' }}>
                {task.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="text-sm" style={{ color: '#94A3B8' }}>
                  Срок: {new Date(task.dueDate).toLocaleDateString('ru-RU')}
                </div>
                <button
                  onClick={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
                  className="text-sm font-medium transition-colors"
                  style={{ color: '#A7C7FF' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#E7B652';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#A7C7FF';
                  }}
                >
                  {selectedTask === task.id ? 'Скрыть' : 'Изменить статус'}
                </button>
              </div>

              {/* Status Change Buttons */}
              {selectedTask === task.id && (
                <div className="mt-6 pt-4" style={{ borderTop: '1px solid #1F2937' }}>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleStatusChange(task.id, 'IN_PROGRESS')}
                      className="px-4 py-3 rounded-xl text-xs font-semibold shadow-lg transition-all"
                      style={{
                        backgroundColor: task.status === 'IN_PROGRESS' ? '#E7B652' : '#0E1A2B',
                        color: task.status === 'IN_PROGRESS' ? '#0B1220' : '#F1F5F9',
                        border: '1px solid #1F2937'
                      }}
                      onMouseEnter={(e) => {
                        if (task.status !== 'IN_PROGRESS') {
                          e.currentTarget.style.backgroundColor = '#111827';
                          e.currentTarget.style.borderColor = '#E7B652';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (task.status !== 'IN_PROGRESS') {
                          e.currentTarget.style.backgroundColor = '#0E1A2B';
                          e.currentTarget.style.borderColor = '#1F2937';
                        }
                      }}
                    >
                      <Play className="h-3 w-3 mr-1 inline" />
                      В работе
                    </button>
                    <button
                      onClick={() => handleStatusChange(task.id, 'COMPLETED')}
                      className="px-4 py-3 rounded-xl text-xs font-semibold shadow-lg transition-all"
                      style={{
                        backgroundColor: task.status === 'COMPLETED' ? '#22C55E' : '#0E1A2B',
                        color: task.status === 'COMPLETED' ? '#F1F5F9' : '#F1F5F9',
                        border: '1px solid #1F2937'
                      }}
                      onMouseEnter={(e) => {
                        if (task.status !== 'COMPLETED') {
                          e.currentTarget.style.backgroundColor = '#111827';
                          e.currentTarget.style.borderColor = '#22C55E';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (task.status !== 'COMPLETED') {
                          e.currentTarget.style.backgroundColor = '#0E1A2B';
                          e.currentTarget.style.borderColor = '#1F2937';
                        }
                      }}
                    >
                      <Check className="h-3 w-3 mr-1 inline" />
                      Выполнена
                    </button>
                    <button
                      onClick={() => handleStatusChange(task.id, 'DIFFICULT')}
                      className="px-4 py-3 rounded-xl text-xs font-semibold shadow-lg transition-all"
                      style={{
                        backgroundColor: '#0E1A2B',
                        color: '#F1F5F9',
                        border: '1px solid #1F2937'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#111827';
                        e.currentTarget.style.borderColor = '#EF4444';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#0E1A2B';
                        e.currentTarget.style.borderColor = '#1F2937';
                      }}
                    >
                      <X className="h-3 w-3 mr-1 inline" />
                      Затрудняюсь
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="h-12 w-12 mx-auto mb-4" style={{ color: '#94A3B8' }} />
            <p style={{ color: '#94A3B8' }}>Нет задач в этой категории</p>
          </div>
        )}
      </div>
    </OnixBackground>
  )
}
