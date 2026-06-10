export interface User {
  id: string
  name: string
  email: string
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
  notes?: string
  createdAt: string
}

export interface Project {
  id: string
  workspaceId: string
  clientId: string
  clientName: string
  name: string
  status: ProjectStatus
  dueDate?: string
  estimatedValue?: number
  createdAt: string
}

export type ProjectStatus = 'active' | 'completed' | 'paused' | 'cancelled'

export interface Task {
  id: string
  projectId: string
  projectName: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: string
  createdAt: string
}

export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'
