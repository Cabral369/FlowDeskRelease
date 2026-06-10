export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  isActive: boolean
  createdAt: string
}

export interface Workspace {
  id: string
  name: string
  ownerId: string
  createdAt: string
}

export interface Client {
  id: string
  workspaceId: string
  name: string
  email: string
  phone?: string
  company?: string
  createdAt: string
}

export interface Project {
  id: string
  workspaceId: string
  clientId: string
  clientName?: string
  name: string
  description?: string
  status: ProjectStatus
  startDate?: string
  dueDate?: string
  estimatedValue?: number
  createdAt: string
}

export interface Task {
  id: string
  projectId: string
  projectName?: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: string
  createdAt: string
}

export type ProjectStatus = 'planning' | 'active' | 'paused' | 'completed' | 'cancelled'
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical'
export type UserRole = 'user' | 'admin'
