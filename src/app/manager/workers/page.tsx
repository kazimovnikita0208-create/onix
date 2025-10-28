'use client'

import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { OnixBackground } from '@/components/ui/onix-background'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  ArrowLeft,
  Users,
  UserPlus,
  Trash2,
  Mail,
  Phone,
} from 'lucide-react'

interface WorkerItem {
  id: string
  name: string
  position: string
  grade: number
  email: string
  phone: string
  isActive: boolean
  hiredAt: Date
}

const seedWorkers: WorkerItem[] = [
  {
    id: '1',
    name: 'Иван Петров',
    position: 'Мастер по корпусу',
    grade: 5,
    email: 'ivan.petrov@onixboats.com',
    phone: '+7 (999) 123-45-67',
    isActive: true,
    hiredAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    name: 'Мария Сидорова',
    position: 'Специалист по двигателям',
    grade: 4,
    email: 'maria.sidorova@onixboats.com',
    phone: '+7 (999) 234-56-78',
    isActive: true,
    hiredAt: new Date('2023-03-20'),
  },
  {
    id: '3',
    name: 'Алексей Козлов',
    position: 'Электрик',
    grade: 4,
    email: 'alexey.kozlov@onixboats.com',
    phone: '+7 (999) 345-67-89',
    isActive: true,
    hiredAt: new Date('2023-02-10'),
  },
]

export default function ManagerWorkersPage() {
  const { user } = useAuth()
  const [workers, setWorkers] = useState<WorkerItem[]>([])

  // Форма добавления
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [grade, setGrade] = useState<number | ''>('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Загружаем из localStorage для демо
    const saved = typeof window !== 'undefined' ? localStorage.getItem('manager_workers') : null
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as WorkerItem[]
        setWorkers(parsed.map(w => ({ ...w, hiredAt: new Date(w.hiredAt) })))
      } catch {
        setWorkers(seedWorkers)
      }
    } else {
      setWorkers(seedWorkers)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('manager_workers', JSON.stringify(workers))
    }
  }, [workers])

  // Редирект, если нет прав
  if (!user || user.role !== 'ADMIN') {
    if (typeof window !== 'undefined') {
      window.location.href = '/role-selection'
    }
    return null
  }

  const canSubmit = useMemo(() => {
    return Boolean(name && position && grade && email && phone)
  }, [name, position, grade, email, phone])

  const handleAdd = async () => {
    if (!canSubmit || !grade) return
    setIsSubmitting(true)
    await new Promise(res => setTimeout(res, 400))
    const newItem: WorkerItem = {
      id: crypto.randomUUID(),
      name,
      position,
      grade: Number(grade),
      email,
      phone,
      isActive: true,
      hiredAt: new Date(),
    }
    setWorkers(prev => [newItem, ...prev])
    setName('')
    setPosition('')
    setGrade('')
    setEmail('')
    setPhone('')
    setIsSubmitting(false)
  }

  const handleDelete = (id: string) => {
    setWorkers(prev => prev.filter(w => w.id !== id))
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
              <img src="/logo.svg" alt="ONIX Boats" className="h-full w-auto" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight" style={{ color: '#F1F5F9' }}>ONIX</h1>
              <p className="text-sm font-medium" style={{ color: '#E7B652' }}>РАБОТНИКИ</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-6 py-8 space-y-8">
        {/* Add worker form */}
        <div className="backdrop-blur-md rounded-2xl p-6 border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
          <div className="flex items-center space-x-2 mb-4">
            <Users className="h-5 w-5" style={{ color: '#A7C7FF' }} />
            <h3 className="text-lg font-bold" style={{ color: '#F1F5F9' }}>Добавить работника</h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium" style={labelStyle}>ФИО</label>
              <input 
                value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Иванов Иван"
                className="w-full mt-1 px-3 py-3 rounded-lg border focus:outline-none"
                style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937', color: '#F1F5F9' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#E7B652' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#1F2937' }}
              />
            </div>
            <div>
              <label className="text-sm font-medium" style={labelStyle}>Должность</label>
              <input 
                value={position} onChange={(e) => setPosition(e.target.value)}
                placeholder="Специалист"
                className="w-full mt-1 px-3 py-3 rounded-lg border focus:outline-none"
                style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937', color: '#F1F5F9' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#E7B652' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#1F2937' }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium" style={labelStyle}>Разряд</label>
                <input 
                  value={grade}
                  onChange={(e) => setGrade(e.target.value ? Number(e.target.value) : '')}
                  type="number" min={1} max={6}
                  placeholder="5"
                  className="w-full mt-1 px-3 py-3 rounded-lg border focus:outline-none"
                  style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937', color: '#F1F5F9' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#E7B652' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#1F2937' }}
                />
              </div>
              <div>
                <label className="text-sm font-medium" style={labelStyle}>Телефон</label>
                <input 
                  value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                  className="w-full mt-1 px-3 py-3 rounded-lg border focus:outline-none"
                  style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937', color: '#F1F5F9' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#E7B652' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#1F2937' }}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium" style={labelStyle}>Email</label>
              <input 
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="name@onixboats.com"
                className="w-full mt-1 px-3 py-3 rounded-lg border focus:outline-none"
                style={{ backgroundColor: '#0E1A2B', borderColor: '#1F2937', color: '#F1F5F9' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#E7B652' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#1F2937' }}
              />
            </div>

            <div className="pt-2">
              <Button 
                onClick={handleAdd}
                disabled={!canSubmit || isSubmitting}
                className="rounded-lg font-semibold"
                style={{ backgroundColor: (!canSubmit || isSubmitting) ? '#1F2937' : '#E7B652', color: (!canSubmit || isSubmitting) ? '#94A3B8' : '#0B1220', border: 'none' }}
                onMouseEnter={(e) => {
                  if (canSubmit && !isSubmitting) e.currentTarget.style.backgroundColor = '#FFD06A'
                }}
                onMouseLeave={(e) => {
                  if (canSubmit && !isSubmitting) e.currentTarget.style.backgroundColor = '#E7B652'
                }}
              >
                <UserPlus className="h-4 w-4 mr-2" /> Добавить работника
              </Button>
            </div>
          </div>
        </div>

        {/* Workers list */}
        <div className="space-y-4">
          {workers.map((w) => (
            <div key={w.id} className="backdrop-blur-md rounded-2xl p-5 border" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold" style={{ color: '#F1F5F9' }}>{w.name}</h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-md" style={{ backgroundColor: 'rgba(231, 182, 82, 0.15)', color: '#E7B652' }}>Разряд {w.grade}
                    </span>
                  </div>
                  <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>{w.position}</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center space-x-2 text-xs" style={mutedStyle}>
                      <Mail className="h-3.5 w-3.5" />
                      <span>{w.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs" style={mutedStyle}>
                      <Phone className="h-3.5 w-3.5" />
                      <span>{w.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="rounded-lg"
                    style={{ color: '#F1F5F9' }}
                    onClick={() => handleDelete(w.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1F2937'
                      e.currentTarget.style.color = '#EF4444'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = '#F1F5F9'
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {workers.length === 0 && (
            <div className="backdrop-blur-md rounded-2xl p-6 border text-center" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>
              <p className="text-sm" style={{ color: '#94A3B8' }}>Пока нет работников. Добавьте первого с помощью формы выше.</p>
            </div>
          )}
        </div>
      </div>
    </OnixBackground>
  )
}


