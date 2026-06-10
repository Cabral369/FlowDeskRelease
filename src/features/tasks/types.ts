import type { Task, TaskStatus, TaskPriority } from '@/types'

export type { Task, TaskStatus, TaskPriority }

export interface CreateTaskDTO {
  projectId: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: string
}

export interface UpdateTaskDTO extends Partial<CreateTaskDTO> {
  id: string
}

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'A fazer',
  in_progress: 'Em andamento',
  review: 'Em revisão',
  done: 'Concluído',
}

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
  critical: 'Crítica',
}
