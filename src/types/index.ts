// Типы данных для системы управления производством лодок

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'WORKER';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Boat {
  id: string;
  name: string;
  model: string;
  image: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: Date;
  updatedAt: Date;
}

export interface AssemblyBlock {
  id: string;
  name: string;
  description: string;
  boatId: string;
  order: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assemblyBlockId: string;
  assignedToId: string;
  assignedById: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskType {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedHours: number;
}

export interface Worker {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  avatar?: string;
  isActive: boolean;
  hiredAt: Date;
}

export interface Stats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  pendingTasks: number;
  completionRate: number;
  onTimeRate: number;
}

export interface WorkerStats extends Stats {
  workerId: string;
  workerName: string;
  efficiency: number;
  tasksThisMonth: number;
  averageCompletionTime: number;
}

export interface BoatStats extends Stats {
  boatId: string;
  boatName: string;
  progress: number;
  estimatedCompletion: Date;
  actualCompletion?: Date;
}


