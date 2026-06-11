import { http } from '@/lib/http'
import { WORKSPACE_ID } from '@/lib/constants'
import type { Client, CreateClientDTO, UpdateClientDTO } from './types'

export async function getClients(params?: {
  searchTerm?: string
  page?: number
  pageSize?: number
}): Promise<Client[]> {
  const data = await http.get<{ clients?: Client[] } | Client[]>('/Clients', {
    WorkspaceId: WORKSPACE_ID,
    SearchTerm: params?.searchTerm,
    Page: params?.page,
    PageSize: params?.pageSize,
  })
  return Array.isArray(data) ? data : (data.clients ?? [])
}

export async function getClient(id: string): Promise<Client> {
  return http.get<Client>(`/Clients/${id}`)
}

export async function createClient(dto: CreateClientDTO): Promise<Client> {
  return http.post<Client>('/Clients', { ...dto, workspaceId: WORKSPACE_ID })
}

export async function updateClient({ id, ...dto }: UpdateClientDTO): Promise<Client> {
  return http.put<Client>(`/Clients/${id}`, { id, workspaceId: WORKSPACE_ID, ...dto })
}

export async function deleteClient(id: string): Promise<void> {
  return http.delete(`/Clients/${id}`)
}
