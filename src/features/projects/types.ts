import type { Project, ProjectStatus } from '@/types'

export type { Project, ProjectStatus }

export interface CreateProjectDTO {
  clientId: string
  name: string
  status: ProjectStatus
  dueDate?: string
  estimatedValue?: number
}

export interface UpdateProjectDTO extends Partial<CreateProjectDTO> {
  id: string
}

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  active: 'Em andamento',
  completed: 'Concluído',
  paused: 'Pausado',
  cancelled: 'Cancelado',
}
