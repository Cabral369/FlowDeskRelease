import type { Client } from '@/types'

export type { Client }

export interface CreateClientDTO {
  workspaceId?: string
  name: string
  email: string
  phone?: string
  company?: string
}

export interface UpdateClientDTO extends Partial<CreateClientDTO> {
  id: string
}
