import type { Client } from './types'

export const mockClients: Client[] = [
  {
    id: '1',
    workspaceId: 'ws-1',
    name: 'Ana Paula Silva',
    email: 'ana@empresa.com.br',
    phone: '(11) 99999-1111',
    company: 'Empresa A Ltda',
    createdAt: '2025-01-10T10:00:00Z',
  },
  {
    id: '2',
    workspaceId: 'ws-1',
    name: 'Carlos Eduardo Santos',
    email: 'carlos@startup.io',
    phone: '(21) 98888-2222',
    company: 'Startup B',
    createdAt: '2025-02-15T14:30:00Z',
  },
  {
    id: '3',
    workspaceId: 'ws-1',
    name: 'Mariana Costa',
    email: 'mariana@freelancer.dev',
    company: 'Autônoma',
    createdAt: '2025-03-01T09:15:00Z',
  },
]
