'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EtherealBackground } from '@/components/ui/ethereal-background'
import { mockStats, mockBoats, mockTasks } from '@/data/mockData'
import { formatDate, getBoatStatusColor, getStatusColor, getPriorityColor } from '@/lib/utils'
import { 
  Ship, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  BarChart3,
  Calendar,
  Settings
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const { user, login, logout, switchRole } = useAuth()

  if (!user) {
    // Перенаправляем на страницу выбора роли
    if (typeof window !== 'undefined') {
      window.location.href = '/role-selection'
    }
    return null
  }

  // Перенаправляем на соответствующий интерфейс только если пользователь не на нужной странице
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname
    if (user.role === 'WORKER' && currentPath !== '/worker') {
      window.location.href = '/worker'
      return null
    } else if (user.role === 'ADMIN' && currentPath !== '/manager') {
      window.location.href = '/manager'
      return null
    }
  }

  return (
    <EtherealBackground
      color="rgba(59, 130, 246, 0.08)"
      animation={{ scale: 60, speed: 50 }}
      noise={{ opacity: 0.2, scale: 0.8 }}
      sizing="fill"
      className="min-h-screen"
    >
      <div className="min-h-screen bg-white/80 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Добро пожаловать, {user.name}!
          </h2>
          <p className="text-gray-600">
            {user.role === 'ADMIN' 
              ? 'Управляйте производством лодок и отслеживайте прогресс команды'
              : 'Просматривайте свои задачи и отслеживайте прогресс работы'
            }
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего задач</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalTasks}</div>
              <p className="text-xs text-muted-foreground">
                +2 с прошлой недели
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Выполнено</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{mockStats.completedTasks}</div>
              <p className="text-xs text-muted-foreground">
                {mockStats.completionRate}% от общего числа
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">В работе</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{mockStats.inProgressTasks}</div>
              <p className="text-xs text-muted-foreground">
                Активные задачи
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ожидают</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{mockStats.pendingTasks}</div>
              <p className="text-xs text-muted-foreground">
                Требуют назначения
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.role === 'ADMIN' ? (
            <>
              <Link href="/boats">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Ship className="h-5 w-5" />
                      <span>Управление катерами</span>
                    </CardTitle>
                    <CardDescription>
                      Просмотр и управление катерами в производстве
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">
                      {mockBoats.length} катеров в работе
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/workers">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Работники</span>
                    </CardTitle>
                    <CardDescription>
                      Управление командой и назначение задач
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">
                      5 активных работников
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/stats">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Статистика</span>
                    </CardTitle>
                    <CardDescription>
                      Аналитика и отчеты по производству
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">
                      {mockStats.completionRate}% выполнения
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </>
          ) : (
            <>
              <Link href="/my-tasks">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5" />
                      <span>Мои задачи</span>
                    </CardTitle>
                    <CardDescription>
                      Просмотр и управление назначенными задачами
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">
                      {mockTasks.filter(t => t.assignedToId === user.id).length} активных задач
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/my-stats">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Моя статистика</span>
                    </CardTitle>
                    <CardDescription>
                      Личные показатели и прогресс
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">
                      Отслеживание эффективности
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </>
          )}
        </div>

        {/* Recent Tasks Preview */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Последние задачи</h3>
          <div className="space-y-2">
            {mockTasks.slice(0, 3).map((task) => (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-gray-600">{task.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">
                        {task.status === 'COMPLETED' ? 'Выполнено' :
                         task.status === 'IN_PROGRESS' ? 'В работе' :
                         task.status === 'PENDING' ? 'Ожидает' : 'Отклонено'}
                      </Badge>
                      <Badge variant="secondary">
                        {task.priority === 'HIGH' ? 'Высокий' :
                         task.priority === 'MEDIUM' ? 'Средний' : 'Низкий'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
    </div>
    </EtherealBackground>
  )
}