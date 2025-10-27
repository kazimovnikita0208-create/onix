'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { OnixBackground } from '@/components/ui/onix-background'
import { TaskAssignmentModal } from '@/components/ui/task-assignment-modal'
import { 
  Ship, 
  ArrowLeft, 
  CheckCircle, 
  Plus,
  Wrench
} from 'lucide-react'
import Link from 'next/link'

// Моковые данные для катеров
const mockBoats = [
  {
    id: 1,
    name: "ONIX 850 CABIN",
    model: "ONIX 850 CABIN",
    status: "IN_PROGRESS",
    progress: 65,
    blocks: [
      {
        id: 1,
        name: "КОРПУС",
        tasks: [
          { id: 1, name: "Сборка каркаса", completed: false },
          { id: 2, name: "Закрепить палубу", completed: false }
        ]
      },
      {
        id: 2,
        name: "ЭЛЕКТРИКА",
        tasks: [
          { id: 3, name: "Проводка кабелей", completed: false },
          { id: 4, name: "Щиток питания", completed: false }
        ]
      },
      {
        id: 3,
        name: "ИНТЕРЬЕР",
        tasks: [
          { id: 5, name: "Панели салона", completed: false },
          { id: 6, name: "Сиденья", completed: false }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "ONIX 12X CRUISER",
    model: "ONIX 12X CRUISER",
    status: "PENDING",
    progress: 25,
    blocks: [
      {
        id: 1,
        name: "КОРПУС",
        tasks: [
          { id: 1, name: "Сборка каркаса", completed: true },
          { id: 2, name: "Закрепить палубу", completed: false }
        ]
      },
      {
        id: 2,
        name: "ДВИГАТЕЛЬ",
        tasks: [
          { id: 3, name: "Установка двигателя", completed: false },
          { id: 4, name: "Подключение систем", completed: false }
        ]
      }
    ]
  }
]

export default function AssemblyPage() {
  const { user } = useAuth()
  const [selectedBoat, setSelectedBoat] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<{name: string, block: string} | null>(null)

  // Перенаправляем на выбор роли, если пользователь не авторизован или не руководитель
  if (!user || user.role !== 'ADMIN') {
    if (typeof window !== 'undefined') {
      window.location.href = '/role-selection'
    }
    return null
  }

  const handleAssignTask = (boatId: number, blockId: number, taskName: string, blockName: string) => {
    setSelectedTask({ name: taskName, block: blockName })
    setIsModalOpen(true)
  }

  const handleTaskAssignment = (assignment: any) => {
    console.log('Task assigned:', assignment)
    // Здесь будет логика сохранения назначения задачи
    // Можно добавить уведомление об успешном назначении
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTask(null)
  }

  return (
    <OnixBackground>
      {/* Header */}
      <header className="backdrop-blur-md border-b" style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937' }}>
        <div className="max-w-md mx-auto px-6 py-6">
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
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-6 py-8">
        {!selectedBoat ? (
          // Список катеров
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: '#F1F5F9' }}>Катера в производстве</h2>
                <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>Управление блоками сборки</p>
              </div>
              <Button className="rounded-xl shadow-lg font-semibold" 
                      style={{ backgroundColor: '#E7B652', color: '#0B1220' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFD06A';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#E7B652';
                      }}>
                <Plus className="h-4 w-4 mr-2" />
                Добавить катер
              </Button>
            </div>

            {mockBoats.map((boat) => (
              <div 
                key={boat.id}
                onClick={() => setSelectedBoat(boat.id)}
                className="group backdrop-blur-md rounded-2xl p-6 cursor-pointer transition-all duration-300 border hover:shadow-xl"
                style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#E7B652';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(231, 182, 82, 0.1), 0 10px 10px -5px rgba(231, 182, 82, 0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#1F2937';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#E7B652' }}>
                      <Ship className="h-8 w-8" style={{ color: '#0B1220' }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>{boat.name}</h3>
                      <p className="text-sm" style={{ color: '#94A3B8' }}>Прогресс: {boat.progress}%</p>
                      <div className="w-32 rounded-full h-2 mt-2" style={{ backgroundColor: '#1F2937' }}>
                        <div 
                          className="rounded-full transition-all duration-300"
                          style={{ 
                            width: `${boat.progress}%`,
                            backgroundColor: '#E7B652',
                            height: '100%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl transition-colors" style={{ color: '#F1F5F9' }}>
                    →
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Детали катера
          <div className="space-y-6">
            {(() => {
              const boat = mockBoats.find(b => b.id === selectedBoat)
              if (!boat) return null

              return (
                <>
                  {/* Заголовок катера */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold" style={{ color: '#F1F5F9' }}>{boat.name}</h2>
                      <p style={{ color: '#94A3B8' }}>Прогресс: {boat.progress}%</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={() => setSelectedBoat(null)}
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
                      ← Назад
                    </Button>
                  </div>

                  {/* Блок сборки */}
                  <div className="backdrop-blur-md rounded-2xl p-6 border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
                    <h3 className="text-lg font-bold mb-4" style={{ color: '#F1F5F9' }}>СБОРКА</h3>
                    <div className="h-24 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#0E1A2B' }}>
                      <Wrench className="h-8 w-8" style={{ color: '#E7B652' }} />
                    </div>
                  </div>

                  {/* Блоки задач */}
                  {boat.blocks.map((block) => (
                    <div key={block.id} className="backdrop-blur-md rounded-2xl p-6 border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>{block.name}</h3>
                        <button
                          onClick={() => handleAssignTask(boat.id, block.id, block.tasks[0]?.name || 'Задача', block.name)}
                          className="px-6 py-3 rounded-xl text-sm font-semibold shadow-lg transition-all"
                          style={{ backgroundColor: '#E7B652', color: '#0B1220' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FFD06A';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#E7B652';
                          }}
                        >
                          ПРИСВОИТЬ
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        {block.tasks.map((task) => (
                          <div key={task.id} className="flex items-center space-x-4 rounded-lg p-4" style={{ backgroundColor: '#0E1A2B' }}>
                            <div className={`w-6 h-6 border-2 rounded-lg flex items-center justify-center ${
                              task.completed 
                                ? 'border-green-500' 
                                : ''
                            }`}
                            style={{ 
                              backgroundColor: task.completed ? '#22C55E' : 'transparent',
                              borderColor: task.completed ? '#22C55E' : '#1F2937'
                            }}>
                              {task.completed && (
                                <CheckCircle className="w-4 h-4" style={{ color: '#F1F5F9' }} />
                              )}
                            </div>
                            <span className="text-sm font-medium flex-1" style={{ color: '#F1F5F9' }}>{task.name}</span>
                            <div className="flex items-center space-x-2">
                              {task.completed ? (
                                <div className="text-xs font-medium" style={{ color: '#22C55E' }}>Выполнено</div>
                              ) : (
                                <button
                                  onClick={() => handleAssignTask(boat.id, block.id, task.name, block.name)}
                                  className="px-3 py-1 rounded-lg text-xs font-semibold transition-all"
                                  style={{ 
                                    backgroundColor: '#E7B652', 
                                    color: '#0B1220',
                                    border: 'none'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#FFD06A';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#E7B652';
                                  }}
                                >
                                  Назначить
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )
            })()}
          </div>
        )}
      </div>

      {/* Task Assignment Modal */}
      {selectedTask && (
        <TaskAssignmentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAssign={handleTaskAssignment}
          taskName={selectedTask.name}
          blockName={selectedTask.block}
        />
      )}
    </OnixBackground>
  )
}
