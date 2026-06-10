import type { Client } from '@/types'

export type { Client }

export interface CreateClientDTO {
  name: string
  email: string
  phone?: string
  company?: string
  notes?: string
}

export interface UpdateClientDTO extends Partial<CreateClientDTO> {
  id: string
}
