import type { Project } from './types'

export const mockProjects: Project[] = [
  {
    id: '1',
    workspaceId: 'ws-1',
    clientId: '1',
    clientName: 'Ana Paula Silva',
    name: 'Site institucional',
    status: 'active',
    dueDate: '2025-08-31',
    estimatedValue: 8000,
    createdAt: '2025-01-20T10:00:00Z',
  },
  {
    id: '2',
    workspaceId: 'ws-1',
    clientId: '2',
    clientName: 'Carlos Eduardo Santos',
    name: 'App mobile MVP',
    status: 'active',
    dueDate: '2025-09-15',
    estimatedValue: 15000,
    createdAt: '2025-02-10T09:00:00Z',
  },
  {
    id: '3',
    workspaceId: 'ws-1',
    clientId: '3',
    clientName: 'Mariana Costa',
    name: 'Identidade visual',
    status: 'completed',
    estimatedValue: 3500,
    createdAt: '2025-01-05T08:00:00Z',
  },
]
