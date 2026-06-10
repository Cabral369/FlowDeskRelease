import type { Project, CreateProjectDTO, UpdateProjectDTO } from './types'
import { mockProjects } from './mock'

// TODO: substituir por chamadas reais à API ASP.NET Core (/api/projects)
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms))

let store: Project[] = [...mockProjects]

export async function getProjects(status?: string): Promise<Project[]> {
  await delay()
  if (status && status !== 'all') return store.filter((p) => p.status === status)
  return [...store]
}

export async function getProject(id: string): Promise<Project> {
  await delay()
  const project = store.find((p) => p.id === id)
  if (!project) throw new Error('Projeto não encontrado')
  return { ...project }
}

export async function createProject(dto: CreateProjectDTO): Promise<Project> {
  await delay()
  const newProject: Project = {
    id: String(Date.now()),
    workspaceId: 'ws-1',
    clientName: '',
    createdAt: new Date().toISOString(),
    ...dto,
  }
  store = [...store, newProject]
  return newProject
}

export async function updateProject({ id, ...dto }: UpdateProjectDTO): Promise<Project> {
  await delay()
  store = store.map((p) => (p.id === id ? { ...p, ...dto } : p))
  return { ...store.find((p) => p.id === id)! }
}

export async function deleteProject(id: string): Promise<void> {
  await delay()
  store = store.filter((p) => p.id !== id)
}
