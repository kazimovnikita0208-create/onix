'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, Calendar, User, FileText } from 'lucide-react'

interface TaskAssignmentModalProps {
  isOpen: boolean
  onClose: () => void
  onAssign: (assignment: TaskAssignment) => void
  taskName: string
  blockName: string
}

interface TaskAssignment {
  taskName: string
  blockName: string
  workerId: string
  workerName: string
  deadline: string
}

// Моковые данные работников
const workers = [
  { id: '1', name: 'Иван Петров', position: 'Мастер по корпусу' },
  { id: '2', name: 'Мария Сидорова', position: 'Специалист по двигателям' },
  { id: '3', name: 'Алексей Козлов', position: 'Электрик' }
]

export function TaskAssignmentModal({ isOpen, onClose, onAssign, taskName, blockName }: TaskAssignmentModalProps) {
  const [selectedWorker, setSelectedWorker] = useState('')
  const [deadline, setDeadline] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedWorker || !deadline) return

    setIsSubmitting(true)
    
    // Находим выбранного работника
    const worker = workers.find(w => w.id === selectedWorker)
    if (!worker) return

    // Создаем объект назначения
    const assignment: TaskAssignment = {
      taskName,
      blockName,
      workerId: selectedWorker,
      workerName: worker.name,
      deadline
    }

    // Имитируем задержку API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onAssign(assignment)
    setIsSubmitting(false)
    onClose()
    
    // Сброс формы
    setSelectedWorker('')
    setDeadline('')
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
      setSelectedWorker('')
      setDeadline('')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md backdrop-blur-md rounded-2xl border p-6"
           style={{ 
             backgroundColor: '#111827', 
             borderColor: '#1F2937',
             boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
           }}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(231, 182, 82, 0.2)' }}>
              <FileText className="h-5 w-5" style={{ color: '#E7B652' }} />
            </div>
            <div>
              <h2 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>Присвоить задачу</h2>
              <p className="text-sm" style={{ color: '#94A3B8' }}>Назначение работника</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-lg"
            style={{ color: '#94A3B8' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1F2937';
              e.currentTarget.style.color = '#F1F5F9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#94A3B8';
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Info */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium" style={{ color: '#F1F5F9' }}>
                Наименование задачи
              </label>
              <div className="mt-1 p-3 rounded-lg" style={{ backgroundColor: '#0E1A2B', border: '1px solid #1F2937' }}>
                <p className="text-sm" style={{ color: '#F1F5F9' }}>{taskName}</p>
                <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>Блок: {blockName}</p>
              </div>
            </div>
          </div>

          {/* Worker Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium" style={{ color: '#F1F5F9' }}>
              Выберите работника
            </label>
            <div className="space-y-2">
              {workers.map((worker) => (
                <div
                  key={worker.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedWorker === worker.id ? 'border-[#E7B652]' : 'border-[#1F2937]'
                  }`}
                  style={{
                    backgroundColor: selectedWorker === worker.id ? 'rgba(231, 182, 82, 0.1)' : '#0E1A2B'
                  }}
                  onClick={() => setSelectedWorker(worker.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                         style={{
                           borderColor: selectedWorker === worker.id ? '#E7B652' : '#1F2937',
                           backgroundColor: selectedWorker === worker.id ? '#E7B652' : 'transparent'
                         }}>
                      {selectedWorker === worker.id && (
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#0B1220' }} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#F1F5F9' }}>{worker.name}</p>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>{worker.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deadline */}
          <div className="space-y-3">
            <label className="text-sm font-medium" style={{ color: '#F1F5F9' }}>
              Срок выполнения
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#94A3B8' }} />
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none"
                style={{
                  backgroundColor: '#0E1A2B',
                  borderColor: '#1F2937',
                  color: '#F1F5F9'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#E7B652';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#1F2937';
                }}
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 rounded-lg"
              style={{
                borderColor: '#1F2937',
                color: '#94A3B8',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#A7C7FF';
                e.currentTarget.style.color = '#F1F5F9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1F2937';
                e.currentTarget.style.color = '#94A3B8';
              }}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={!selectedWorker || !deadline || isSubmitting}
              className="flex-1 rounded-lg font-semibold"
              style={{
                backgroundColor: (!selectedWorker || !deadline || isSubmitting) ? '#1F2937' : '#E7B652',
                color: (!selectedWorker || !deadline || isSubmitting) ? '#94A3B8' : '#0B1220',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                if (selectedWorker && deadline && !isSubmitting) {
                  e.currentTarget.style.backgroundColor = '#FFD06A';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedWorker && deadline && !isSubmitting) {
                  e.currentTarget.style.backgroundColor = '#E7B652';
                }
              }}
            >
              {isSubmitting ? 'Назначаем...' : 'Назначить'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
