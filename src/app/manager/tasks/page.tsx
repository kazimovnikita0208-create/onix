'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { OnixBackground } from '@/components/ui/onix-background'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Ship,
  Wrench,
  ListChecks,
  Plus,
  Pencil,
  Trash2,
} from 'lucide-react'
import { mockBoats as defaultBoats, mockAssemblyBlocks as defaultBlocks, mockTasks as defaultTasks } from '@/data/mockData'
import { Boat, AssemblyBlock, Task } from '@/types'

type BoatLite = Boat
type BlockLite = AssemblyBlock
type TaskLite = Task

const STORAGE_KEY = 'manager_tasks_state_v1'

interface TasksState {
  boats: BoatLite[]
  blocks: BlockLite[]
  tasks: TaskLite[]
}

function loadInitialState(): TasksState {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as TasksState
        // Восстанавливаем даты
        return {
          boats: parsed.boats.map(b => ({ ...b, createdAt: new Date(b.createdAt), updatedAt: new Date(b.updatedAt) })),
          blocks: parsed.blocks,
          tasks: parsed.tasks.map(t => ({
            ...t,
            dueDate: new Date(t.dueDate),
            createdAt: new Date(t.createdAt),
            updatedAt: new Date(t.updatedAt),
            completedAt: t.completedAt ? new Date(t.completedAt) : undefined,
          })),
        }
      } catch {
        // ignore and fallback
      }
    }
  }
  return {
    boats: defaultBoats,
    blocks: defaultBlocks,
    tasks: defaultTasks,
  }
}

export default function TasksDirectoryPage() {
  const { user } = useAuth()
  const [state, setState] = useState<TasksState>(() => loadInitialState())
  const [selectedBoatId, setSelectedBoatId] = useState<string | null>(null)
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)

  // Формы добавления/редактирования
  const [newBoatName, setNewBoatName] = useState('')
  const [newBoatModel, setNewBoatModel] = useState('')

  const [newBlockName, setNewBlockName] = useState('')
  const [newBlockDescription, setNewBlockDescription] = useState('')

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')

  const [editingBlockId, setEditingBlockId] = useState<string | null>(null)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }, [state])

  // Guard
  if (!user || user.role !== 'ADMIN') {
    if (typeof window !== 'undefined') {
      window.location.href = '/role-selection'
    }
    return null
  }

  const boats = state.boats
  const blocks = useMemo(() => state.blocks.filter(b => b.boatId === selectedBoatId), [state.blocks, selectedBoatId])
  const tasks = useMemo(() => state.tasks.filter(t => {
    if (!selectedBlockId) return false
    return t.assemblyBlockId === selectedBlockId
  }), [state.tasks, selectedBlockId])

  // Helpers
  const findBoat = (id: string | null) => state.boats.find(b => b.id === id)
  const findBlock = (id: string | null) => state.blocks.find(b => b.id === id)

  // CRUD Boats
  const handleAddBoat = () => {
    if (!newBoatName.trim()) return
    const now = new Date()
    const newBoat: BoatLite = {
      id: crypto.randomUUID(),
      name: newBoatName.trim(),
      model: newBoatModel.trim() || newBoatName.trim(),
      image: '/images/placeholder.jpg',
      status: 'PLANNED',
      createdAt: now,
      updatedAt: now,
    }
    setState(prev => ({ ...prev, boats: [newBoat, ...prev.boats] }))
    setNewBoatName('')
    setNewBoatModel('')
  }

  const handleDeleteBoat = (boatId: string) => {
    setState(prev => ({
      boats: prev.boats.filter(b => b.id !== boatId),
      blocks: prev.blocks.filter(bl => bl.boatId !== boatId),
      tasks: prev.tasks.filter(t => prev.blocks.find(b => b.id === t.assemblyBlockId)?.boatId !== boatId),
    }))
    if (selectedBoatId === boatId) {
      setSelectedBoatId(null)
      setSelectedBlockId(null)
    }
  }

  // CRUD Blocks
  const handleAddBlock = () => {
    if (!selectedBoatId || !newBlockName.trim()) return
    const newBlock: BlockLite = {
      id: crypto.randomUUID(),
      name: newBlockName.trim(),
      description: newBlockDescription.trim(),
      boatId: selectedBoatId,
      order: (state.blocks.filter(b => b.boatId === selectedBoatId).length || 0) + 1,
    }
    setState(prev => ({ ...prev, blocks: [newBlock, ...prev.blocks] }))
    setNewBlockName('')
    setNewBlockDescription('')
  }

  const handleDeleteBlock = (blockId: string) => {
    setState(prev => ({
      ...prev,
      blocks: prev.blocks.filter(b => b.id !== blockId),
      tasks: prev.tasks.filter(t => t.assemblyBlockId !== blockId),
    }))
    if (selectedBlockId === blockId) setSelectedBlockId(null)
  }

  const handleUpdateBlock = (blockId: string, fields: Partial<BlockLite>) => {
    setState(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => b.id === blockId ? { ...b, ...fields } : b)
    }))
    setEditingBlockId(null)
  }

  // CRUD Tasks
  const handleAddTask = () => {
    if (!selectedBlockId || !newTaskTitle.trim()) return
    const now = new Date()
    const newTask: TaskLite = {
      id: crypto.randomUUID(),
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim(),
      assemblyBlockId: selectedBlockId,
      assignedToId: '1',
      assignedById: '1',
      status: 'PENDING',
      priority: 'MEDIUM',
      dueDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7),
      createdAt: now,
      updatedAt: now,
    }
    setState(prev => ({ ...prev, tasks: [newTask, ...prev.tasks] }))
    setNewTaskTitle('')
    setNewTaskDescription('')
  }

  const handleDeleteTask = (taskId: string) => {
    setState(prev => ({ ...prev, tasks: prev.tasks.filter(t => t.id !== taskId) }))
  }

  const handleUpdateTask = (taskId: string, fields: Partial<TaskLite>) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === taskId ? { ...t, ...fields, updatedAt: new Date() } : t)
    }))
    setEditingTaskId(null)
  }

  const labelStyle = { color: '#F1F5F9' }
  const mutedStyle = { color: '#94A3B8' }

  return (
    <OnixBackground>
      {/* Header */}
      <header className="backdrop-blur-md border-b" style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937' }}>
        <div className="max-w-md mx-auto px-6 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/manager">
              <Button variant="ghost" size="sm" className="rounded-lg" style={{ color: '#F1F5F9' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#111827'; e.currentTarget.style.color = '#E7B652' }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#F1F5F9' }}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="h-8 w-auto">
              <img src="/logo.svg" alt="ONIX Boats" className="h-full w-auto" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight" style={{ color: '#F1F5F9' }}>ONIX</h1>
              <p className="text-sm font-medium" style={{ color: '#E7B652' }}>РАБОТЫ</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-6 py-8 space-y-8">
        {/* Level 1: Boats */}
        {!selectedBoatId && (
          <div className="space-y-6">
            <div className="backdrop-blur-md rounded-2xl p-6 border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
              <div className="flex items-center space-x-2 mb-4">
                <Ship className="h-5 w-5" style={{ color: '#A7C7FF' }} />
                <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>Катера</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {boats.map(boat => (
                  <div key={boat.id} className="rounded-xl p-4 border cursor-pointer transition-all"
                       style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937' }}
                       onClick={() => setSelectedBoatId(boat.id)}
                       onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#E7B652' }}
                       onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1F2937' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold" style={{ color: '#F1F5F9' }}>{boat.name}</div>
                        <div className="text-xs mt-1" style={mutedStyle}>Модель: {boat.model}</div>
                      </div>
                      <Button variant="ghost" size="sm" className="rounded-lg" style={{ color: '#F1F5F9' }}
                              onClick={(e) => { e.stopPropagation(); handleDeleteBoat(boat.id) }}
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1F2937'; e.currentTarget.style.color = '#EF4444' }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#F1F5F9' }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {boats.length === 0 && (
                  <div className="text-center text-sm" style={mutedStyle}>Нет катеров — добавьте новый ниже.</div>
                )}
              </div>

              {/* Add boat */}
              <div className="mt-6 space-y-3">
                <div>
                  <label className="text-sm font-medium" style={labelStyle}>Название катера</label>
                  <input value={newBoatName} onChange={(e) => setNewBoatName(e.target.value)}
                         className="w-full mt-1 px-3 py-3 rounded-lg border focus:outline-none"
                         placeholder="ONIX 850 CABIN"
                         style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937', color: '#F1F5F9' }}
                         onFocus={(e) => { e.currentTarget.style.borderColor = '#E7B652' }}
                         onBlur={(e) => { e.currentTarget.style.borderColor = '#1F2937' }} />
                </div>
                <div>
                  <label className="text-sm font-medium" style={labelStyle}>Модель</label>
                  <input value={newBoatModel} onChange={(e) => setNewBoatModel(e.target.value)}
                         className="w-full mt-1 px-3 py-3 rounded-lg border focus:outline-none"
                         placeholder="ONIX 850 CABIN"
                         style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937', color: '#F1F5F9' }}
                         onFocus={(e) => { e.currentTarget.style.borderColor = '#E7B652' }}
                         onBlur={(e) => { e.currentTarget.style.borderColor = '#1F2937' }} />
                </div>
                <div className="pt-1">
                  <Button onClick={handleAddBoat} className="rounded-lg font-semibold"
                          style={{ backgroundColor: newBoatName ? '#E7B652' : '#1F2937', color: newBoatName ? '#0B1220' : '#94A3B8', border: 'none' }}
                          onMouseEnter={(e) => { if (newBoatName) e.currentTarget.style.backgroundColor = '#FFD06A' }}
                          onMouseLeave={(e) => { if (newBoatName) e.currentTarget.style.backgroundColor = '#E7B652' }}>
                    <Plus className="h-4 w-4 mr-2" /> Добавить катер
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Level 2: Blocks */}
        {selectedBoatId && !selectedBlockId && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: '#F1F5F9' }}>{findBoat(selectedBoatId)?.name}</h2>
                <p className="text-sm mt-1" style={mutedStyle}>Блоки сборки</p>
              </div>
              <Button variant="ghost" className="rounded-lg" style={{ color: '#F1F5F9' }} onClick={() => setSelectedBoatId(null)}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#111827'; e.currentTarget.style.color = '#E7B652' }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#F1F5F9' }}>← Назад
              </Button>
            </div>

            <div className="backdrop-blur-md rounded-2xl p-6 border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
              <div className="flex items-center space-x-2 mb-4">
                <Wrench className="h-5 w-5" style={{ color: '#A7C7FF' }} />
                <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>Блоки</h3>
              </div>

              <div className="space-y-3">
                {blocks.map(block => (
                  <div key={block.id} className="rounded-xl p-4 border" style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937' }}>
                    {editingBlockId === block.id ? (
                      <div className="space-y-3">
                        <input defaultValue={block.name} className="w-full px-3 py-3 rounded-lg border focus:outline-none"
                               onBlur={(e) => handleUpdateBlock(block.id, { name: e.target.value })}
                               style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937', color: '#F1F5F9' }} />
                        <input defaultValue={block.description} className="w-full px-3 py-3 rounded-lg border focus:outline-none"
                               onBlur={(e) => handleUpdateBlock(block.id, { description: e.target.value })}
                               style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937', color: '#F1F5F9' }} />
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm" className="rounded-lg" style={{ color: '#F1F5F9' }} onClick={() => setEditingBlockId(null)}>Готово</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-semibold" style={{ color: '#F1F5F9' }}>{block.name}</div>
                          <div className="text-xs mt-1" style={mutedStyle}>{block.description}</div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="ghost" size="sm" className="rounded-lg" style={{ color: '#F1F5F9' }} onClick={() => setSelectedBlockId(block.id)}>
                            <ListChecks className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-lg" style={{ color: '#F1F5F9' }} onClick={() => setEditingBlockId(block.id)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-lg" style={{ color: '#F1F5F9' }} onClick={() => handleDeleteBlock(block.id)}
                                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1F2937'; e.currentTarget.style.color = '#EF4444' }}
                                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#F1F5F9' }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {blocks.length === 0 && (
                  <div className="text-center text-sm" style={mutedStyle}>Нет блоков — добавьте первый ниже.</div>
                )}
              </div>

              {/* Add block */}
              <div className="mt-6 space-y-3">
                <div>
                  <label className="text-sm font-medium" style={labelStyle}>Название блока</label>
                  <input value={newBlockName} onChange={(e) => setNewBlockName(e.target.value)}
                         className="w-full mt-1 px-3 py-3 rounded-lg border focus:outline-none"
                         placeholder="ЭЛЕКТРИКА"
                         style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937', color: '#F1F5F9' }} />
                </div>
                <div>
                  <label className="text-sm font-medium" style={labelStyle}>Описание</label>
                  <input value={newBlockDescription} onChange={(e) => setNewBlockDescription(e.target.value)}
                         className="w-full mt-1 px-3 py-3 rounded-lg border focus:outline-none"
                         placeholder="Описание работ"
                         style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937', color: '#F1F5F9' }} />
                </div>
                <div className="pt-1">
                  <Button onClick={handleAddBlock} className="rounded-lg font-semibold"
                          style={{ backgroundColor: newBlockName ? '#E7B652' : '#1F2937', color: newBlockName ? '#0B1220' : '#94A3B8', border: 'none' }}
                          onMouseEnter={(e) => { if (newBlockName) e.currentTarget.style.backgroundColor = '#FFD06A' }}
                          onMouseLeave={(e) => { if (newBlockName) e.currentTarget.style.backgroundColor = '#E7B652' }}>
                    <Plus className="h-4 w-4 mr-2" /> Добавить блок
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Level 3: Tasks */}
        {selectedBoatId && selectedBlockId && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: '#F1F5F9' }}>{findBoat(selectedBoatId)?.name}</h2>
                <p className="text-sm mt-1" style={mutedStyle}>{findBlock(selectedBlockId)?.name} • Задачи</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" className="rounded-lg" style={{ color: '#F1F5F9' }} onClick={() => setSelectedBlockId(null)}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#111827'; e.currentTarget.style.color = '#E7B652' }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#F1F5F9' }}>← Блоки
                </Button>
                <Button variant="ghost" className="rounded-lg" style={{ color: '#F1F5F9' }} onClick={() => { setSelectedBlockId(null); setSelectedBoatId(null) }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#111827'; e.currentTarget.style.color = '#E7B652' }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#F1F5F9' }}>← Катера
                </Button>
              </div>
            </div>

            <div className="backdrop-blur-md rounded-2xl p-6 border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
              <div className="flex items-center space-x-2 mb-4">
                <ListChecks className="h-5 w-5" style={{ color: '#A7C7FF' }} />
                <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>Задачи</h3>
              </div>

              <div className="space-y-3">
                {tasks.map(task => (
                  <div key={task.id} className="rounded-xl p-4 border" style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937' }}>
                    {editingTaskId === task.id ? (
                      <div className="space-y-3">
                        <input defaultValue={task.title} className="w-full px-3 py-3 rounded-lg border focus:outline-none"
                               onBlur={(e) => handleUpdateTask(task.id, { title: e.target.value })}
                               style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937', color: '#F1F5F9' }} />
                        <input defaultValue={task.description} className="w-full px-3 py-3 rounded-lg border focus:outline-none"
                               onBlur={(e) => handleUpdateTask(task.id, { description: e.target.value })}
                               style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937', color: '#F1F5F9' }} />
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm" className="rounded-lg" style={{ color: '#F1F5F9' }} onClick={() => setEditingTaskId(null)}>Готово</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-semibold" style={{ color: '#F1F5F9' }}>{task.title}</div>
                          <div className="text-xs mt-1" style={mutedStyle}>{task.description}</div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="ghost" size="sm" className="rounded-lg" style={{ color: '#F1F5F9' }} onClick={() => setEditingTaskId(task.id)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-lg" style={{ color: '#F1F5F9' }} onClick={() => handleDeleteTask(task.id)}
                                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1F2937'; e.currentTarget.style.color = '#EF4444' }}
                                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#F1F5F9' }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {tasks.length === 0 && (
                  <div className="text-center text-sm" style={mutedStyle}>Нет задач — добавьте задачу ниже.</div>
                )}
              </div>

              {/* Add task */}
              <div className="mt-6 space-y-3">
                <div>
                  <label className="text-sm font-medium" style={labelStyle}>Наименование задачи</label>
                  <input value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)}
                         className="w-full mt-1 px-3 py-3 rounded-lg border focus:outline-none"
                         placeholder="Прокладка электропроводки"
                         style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937', color: '#F1F5F9' }} />
                </div>
                <div>
                  <label className="text-sm font-medium" style={labelStyle}>Описание</label>
                  <input value={newTaskDescription} onChange={(e) => setNewTaskDescription(e.target.value)}
                         className="w-full mt-1 px-3 py-3 rounded-lg border focus:outline-none"
                         placeholder="Краткое описание работ"
                         style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937', color: '#F1F5F9' }} />
                </div>
                <div className="pt-1">
                  <Button onClick={handleAddTask} className="rounded-lg font-semibold"
                          style={{ backgroundColor: newTaskTitle ? '#E7B652' : '#1F2937', color: newTaskTitle ? '#0B1220' : '#94A3B8', border: 'none' }}
                          onMouseEnter={(e) => { if (newTaskTitle) e.currentTarget.style.backgroundColor = '#FFD06A' }}
                          onMouseLeave={(e) => { if (newTaskTitle) e.currentTarget.style.backgroundColor = '#E7B652' }}>
                    <Plus className="h-4 w-4 mr-2" /> Добавить задачу
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </OnixBackground>
  )
}


