import { http } from '@/lib/http'
import {
  TaskStatusEnum, TaskStatusFromApi,
  TaskPriorityEnum, TaskPriorityFromApi,
} from '@/lib/enums'
import type { Task, CreateTaskDTO, UpdateTaskDTO, TaskStatus, TaskPriority } from './types'

function fromApi(raw: Record<string, unknown>): Task {
  return {
    ...raw,
    status: TaskStatusFromApi[raw.status as number] ?? 'todo',
    priority: TaskPriorityFromApi[raw.priority as number] ?? 'medium',
  } as Task
}

export async function getTasks(params?: {
  projectId?: string
  searchTerm?: string
  status?: TaskStatus
  priority?: TaskPriority
  page?: number
  pageSize?: number
}): Promise<Task[]> {
  const raw = await http.get<Record<string, unknown>[]>('/Tasks', {
    ProjectId: params?.projectId,
    SearchTerm: params?.searchTerm,
    Status: params?.status ? TaskStatusEnum[params.status] : undefined,
    Priority: params?.priority ? TaskPriorityEnum[params.priority] : undefined,
    Page: params?.page,
    PageSize: params?.pageSize,
  })
  return raw.map(fromApi)
}

export async function getTask(id: string): Promise<Task> {
  const raw = await http.get<Record<string, unknown>>(`/Tasks/${id}`)
  return fromApi(raw)
}

export async function createTask(dto: CreateTaskDTO): Promise<Task> {
  const body = {
    ...dto,
    status: TaskStatusEnum[dto.status],
    priority: TaskPriorityEnum[dto.priority],
  }
  const raw = await http.post<Record<string, unknown>>('/Tasks', body)
  return fromApi(raw)
}

export async function updateTask({ id, ...dto }: UpdateTaskDTO): Promise<Task> {
  const body = {
    id,
    ...dto,
    status: dto.status ? TaskStatusEnum[dto.status] : undefined,
    priority: dto.priority ? TaskPriorityEnum[dto.priority] : undefined,
  }
  const raw = await http.put<Record<string, unknown>>(`/Tasks/${id}`, body)
  return fromApi(raw)
}

export async function updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  const raw = await http.patch<Record<string, unknown>>(`/Tasks/${id}/status`, {
    id,
    status: TaskStatusEnum[status],
  })
  return fromApi(raw)
}

export async function deleteTask(id: string): Promise<void> {
  return http.delete(`/Tasks/${id}`)
}
