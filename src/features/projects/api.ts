import { http } from '@/lib/http'
import { WORKSPACE_ID } from '@/lib/constants'
import { ProjectStatusEnum, ProjectStatusFromApi } from '@/lib/enums'
import type { Project, CreateProjectDTO, UpdateProjectDTO, ProjectStatus } from './types'

function fromApi(raw: Record<string, unknown>): Project {
  return {
    ...raw,
    status: ProjectStatusFromApi[raw.status as number] ?? 'planning',
  } as Project
}

function toPagedArray(data: Record<string, unknown>[] | { projects?: Record<string, unknown>[] }): Record<string, unknown>[] {
  return Array.isArray(data) ? data : (data.projects ?? [])
}

export async function getProjects(params?: {
  clientId?: string
  searchTerm?: string
  status?: ProjectStatus
  page?: number
  pageSize?: number
}): Promise<Project[]> {
  const raw = await http.get<Record<string, unknown>[] | { projects?: Record<string, unknown>[] }>('/Projects', {
    WorkspaceId: WORKSPACE_ID,
    SearchTerm: params?.searchTerm,
    Status: params?.status ? ProjectStatusEnum[params.status] : undefined,
    ClientId: params?.clientId,
    Page: params?.page,
    PageSize: params?.pageSize,
  })
  return toPagedArray(raw).map(fromApi)
}

export async function getProject(id: string): Promise<Project> {
  const raw = await http.get<Record<string, unknown>>(`/Projects/${id}`)
  return fromApi(raw)
}

export async function createProject(dto: CreateProjectDTO): Promise<Project> {
  const raw = await http.post<Record<string, unknown>>('/Projects', {
    ...dto,
    workspaceId: WORKSPACE_ID,
    status: dto.status ? ProjectStatusEnum[dto.status] : undefined,
    startDate: dto.startDate || undefined,
    dueDate: dto.dueDate || undefined,
    description: dto.description || undefined,
  })
  return fromApi(raw)
}

export async function updateProject({ id, ...dto }: UpdateProjectDTO): Promise<Project> {
  const body = {
    id,
    workspaceId: WORKSPACE_ID,
    ...dto,
    status: dto.status ? ProjectStatusEnum[dto.status] : undefined,
    startDate: dto.startDate || undefined,
    dueDate: dto.dueDate || undefined,
    description: dto.description || undefined,
  }
  const raw = await http.put<Record<string, unknown>>(`/Projects/${id}`, body)
  return fromApi(raw)
}

export async function deleteProject(id: string): Promise<void> {
  return http.delete(`/Projects/${id}`)
}
