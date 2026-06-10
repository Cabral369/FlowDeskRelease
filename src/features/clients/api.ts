import type { Client, CreateClientDTO, UpdateClientDTO } from './types'
import { mockClients } from './mock'

// Simula latência de rede com dados mockados.
// TODO: substituir cada função por chamada real à API ASP.NET Core (/api/clients)
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms))

let store: Client[] = [...mockClients]

export async function getClients(): Promise<Client[]> {
  await delay()
  return [...store]
}

export async function getClient(id: string): Promise<Client> {
  await delay()
  const client = store.find((c) => c.id === id)
  if (!client) throw new Error('Cliente não encontrado')
  return { ...client }
}

export async function createClient(dto: CreateClientDTO): Promise<Client> {
  await delay()
  const newClient: Client = {
    id: String(Date.now()),
    workspaceId: 'ws-1',
    createdAt: new Date().toISOString(),
    ...dto,
  }
  store = [...store, newClient]
  return newClient
}

export async function updateClient({ id, ...dto }: UpdateClientDTO): Promise<Client> {
  await delay()
  store = store.map((c) => (c.id === id ? { ...c, ...dto } : c))
  const updated = store.find((c) => c.id === id)!
  return { ...updated }
}

export async function deleteClient(id: string): Promise<void> {
  await delay()
  store = store.filter((c) => c.id !== id)
}
