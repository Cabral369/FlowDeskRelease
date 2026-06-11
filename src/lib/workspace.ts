import { http } from './http'

const STORAGE_KEY = 'flowdesk_workspace_id'

async function createWorkspace(): Promise<string> {
  const data = await http.post<{ id: string }>('/Workspaces', {
    name: 'FlowDesk Workspace',
    ownerId: '00000000-0000-0000-0000-000000000001',
  })
  return data.id
}

export async function getOrCreateWorkspaceId(): Promise<string> {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) return stored

  const res = await http.get<{ workspaces?: { id: string }[] }>('/Workspaces')
  const existing = res.workspaces?.[0]?.id

  const id = existing ?? await createWorkspace()
  localStorage.setItem(STORAGE_KEY, id)
  return id
}
