import type { Task } from './types'

export const mockTasks: Task[] = [
  {
    id: '1',
    projectId: '1',
    projectName: 'Site institucional',
    title: 'Criar wireframes das páginas',
    status: 'done',
    priority: 'high',
    dueDate: '2025-07-10',
    createdAt: '2025-06-01T10:00:00Z',
  },
  {
    id: '2',
    projectId: '1',
    projectName: 'Site institucional',
    title: 'Desenvolver página inicial',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2025-07-25',
    createdAt: '2025-06-10T10:00:00Z',
  },
  {
    id: '3',
    projectId: '2',
    projectName: 'App mobile MVP',
    title: 'Configurar ambiente React Native',
    status: 'todo',
    priority: 'medium',
    dueDate: '2025-08-01',
    createdAt: '2025-06-15T10:00:00Z',
  },
  {
    id: '4',
    projectId: '2',
    projectName: 'App mobile MVP',
    title: 'Modelar banco de dados',
    status: 'todo',
    priority: 'high',
    createdAt: '2025-06-15T11:00:00Z',
  },
]
