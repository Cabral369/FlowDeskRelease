import { http } from '@/lib/http'
import type { Client, CreateClientDTO, UpdateClientDTO } from './types'

export async function getClients(params?: {
  workspaceId?: string
  searchTerm?: string
  page?: number
  pageSize?: number
}): Promise<Client[]> {
  return http.get<Client[]>('/Clients', {
    WorkspaceId: params?.workspaceId,
    SearchTerm: params?.searchTerm,
    Page: params?.page,
    PageSize: params?.pageSize,
  })
}

export async function getClient(id: string): Promise<Client> {
  return http.get<Client>(`/Clients/${id}`)
}

export async function createClient(dto: CreateClientDTO): Promise<Client> {
  return http.post<Client>('/Clients', dto)
}

export async function updateClient({ id, ...dto }: UpdateClientDTO): Promise<Client> {
  return http.put<Client>(`/Clients/${id}`, { id, ...dto })
}

export async function deleteClient(id: string): Promise<void> {
  return http.delete(`/Clients/${id}`)
}
